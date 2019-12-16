/* eslint-disable @typescript-eslint/no-magic-numbers */

enum OP_CODE {
    ADD = 1,
    MULT = 2,
    INPUT = 3,
    OUTPUT = 4,
    JUMP_NOT_ZERO = 5,
    JUMP_ZERO = 6,
    LESS_THAN = 7,
    EQUAL = 8,
    QUIT = 99,
}

enum PARAMETER_MODE {
    POSITION = 0,
    IMMEDIATE = 1,
}

interface Parameters {
    one: number;
    two: number;
    three: number;
}

export class IntCodeComputer {
    private backup_memory: Int32Array;
    private memory: Int32Array;
    private instruction_pointer: number;
    public parameter_mode: boolean = true;
    private last_output: number = 0;
    private input_buffer: number[] | undefined;
    public silent_mode: boolean = false;
    public pause_on_output_mode: boolean = false;
    private halted: boolean = false;

    public constructor(program: number[]) {
        this.memory = new Int32Array(program);
        this.backup_memory = new Int32Array(program);
        this.instruction_pointer = 0;
    }

    public static fromInput(input: string): IntCodeComputer {
        const data = input.split(/,/).map(n => Number(n));
        return new IntCodeComputer(data);
    }

    public is_halted(): boolean {
        return this.halted;
    }

    public load_program(program: Int32Array | number[]): void {
        this.backup_memory = new Int32Array(program);
        this.memory = new Int32Array(program);
    }

    public set_input_buffer(buffer: number[]): void {
        this.input_buffer = Array.from(buffer);
    }

    public apply_noun(noun: number): void {
        this.memory[1] = noun;
    }

    public apply_verb(verb: number): void {
        this.memory[2] = verb;
    }

    public peek(): number {
        return this.memory[0];
    }

    public load_from_backup(): void {
        this.instruction_pointer = 0;
        this.halted = false;
        this.memory.set(this.backup_memory);
    }

    public read_memory(): number[] {
        return Array.from(this.memory);
    }

    public async run(): Promise<number> {
        const params = {} as Parameters;
        run_loop: for (;;) {
            const instruction = this.memory[this.instruction_pointer];
            const op_code = this.decode_instruction(instruction, params);
            switch (op_code) {
                case OP_CODE.ADD:
                    this.add(params);
                    break;
                case OP_CODE.MULT:
                    this.mult(params);
                    break;
                case OP_CODE.INPUT:
                    await this.input(params);
                    break;
                case OP_CODE.OUTPUT:
                    this.output(params);
                    if (this.pause_on_output_mode) return this.last_output;
                    break;
                case OP_CODE.JUMP_NOT_ZERO:
                    this.jump_not_zero(params);
                    break;
                case OP_CODE.JUMP_ZERO:
                    this.jump_zero(params);
                    break;
                case OP_CODE.LESS_THAN:
                    this.less(params);
                    break;
                case OP_CODE.EQUAL:
                    this.equal(params);
                    break;
                case OP_CODE.QUIT:
                    break run_loop;
                default:
                    throw new Error(`Bad Instruction: ${op_code}`);
            }
        }
        this.halted = true;
        return this.last_output;
    }

    private decode_instruction(instruction: number, out_params: Parameters): number {
        const op_code = instruction % 100;
        let p1 = PARAMETER_MODE.POSITION,
            p2 = PARAMETER_MODE.POSITION;

        if (this.parameter_mode) {
            let temp = Math.floor(instruction / 100);
            p1 = temp % 10;
            temp = Math.floor(temp / 10);
            p2 = temp % 10;
        }
        switch (op_code) {
            case OP_CODE.ADD:
            case OP_CODE.MULT:
            case OP_CODE.EQUAL:
            case OP_CODE.LESS_THAN:
                out_params.three = this.memory[this.instruction_pointer + 3];
            //FALLTHROUGH -- below instructions have param 2
            case OP_CODE.JUMP_NOT_ZERO:
            case OP_CODE.JUMP_ZERO:
                if (p2 === PARAMETER_MODE.IMMEDIATE) out_params.two = this.instruction_pointer + 2;
                else out_params.two = this.memory[this.instruction_pointer + 2];
            //FALLTHROUGH -- all instructions have param 1
            case OP_CODE.INPUT:
            case OP_CODE.OUTPUT:
                if (p1 === PARAMETER_MODE.IMMEDIATE) out_params.one = this.instruction_pointer + 1;
                else out_params.one = this.memory[this.instruction_pointer + 1];
        }
        return op_code;
    }

    private add(params: Parameters): void {
        // mem[dest] = mem[src1] + mem[src2]
        this.memory[params.three] = this.memory[params.one] + this.memory[params.two];
        this.instruction_pointer += 4;
    }
    private mult(params: Parameters): void {
        //mem[dest] = mem[src1] * mem[src2]
        this.memory[params.three] = this.memory[params.one] * this.memory[params.two];
        this.instruction_pointer += 4;
    }

    private async input(params: Parameters): Promise<void> {
        if (!this.silent_mode) process.stdout.write('Input: ');

        //Read from input buffer if not empty else read from prompt
        if (this.input_buffer?.length) {
            const n = Number(this.input_buffer.shift());
            this.memory[params.one] = n;
            if (!this.silent_mode) process.stdout.write(`${n}\n`);
        } else {
            this.memory[params.one] = await this.input_from_console();
            // Gotta pause stdin after we're done so it doesn't look like the process is stuck
            process.stdin.pause();
        }

        this.instruction_pointer += 2;
    }

    private async input_from_console(): Promise<number> {
        //Synchronous read from console
        const getLine = (function() {
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            const getLineGen = (async function*() {
                for await (const line of readline) {
                    yield line;
                }
            })();
            return async () => (await getLineGen.next()).value;
        })();
        return Number(await getLine());
    }

    private output(params: Parameters): void {
        if (!this.silent_mode) console.log(this.memory[params.one]);
        this.last_output = this.memory[params.one];
        this.instruction_pointer += 2;
    }

    private jump_not_zero(params: Parameters): void {
        if (this.memory[params.one] !== 0) this.instruction_pointer = this.memory[params.two];
        else this.instruction_pointer += 3;
    }

    private jump_zero(params: Parameters): void {
        if (this.memory[params.one] === 0) this.instruction_pointer = this.memory[params.two];
        else this.instruction_pointer += 3;
    }

    private less(params: Parameters): void {
        this.memory[params.three] = this.memory[params.one] < this.memory[params.two] ? 1 : 0;
        this.instruction_pointer += 4;
    }

    private equal(params: Parameters): void {
        this.memory[params.three] = this.memory[params.one] === this.memory[params.two] ? 1 : 0;
        this.instruction_pointer += 4;
    }
}
