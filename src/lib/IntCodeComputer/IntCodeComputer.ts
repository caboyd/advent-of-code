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
    MODE_RELATIVE_BASE = 9,
    QUIT = 99,
}

enum PARAMETER_MODE {
    POSITION = 0,
    IMMEDIATE = 1,
    RELATIVE = 2,
}

interface Parameters {
    one: number;
    two: number;
    three: number;
}

export class IntCodeComputer<T = BigInt64Array> {
    private backup_memory: BigInt64Array;
    private memory: BigInt64Array;
    private instruction_pointer: number;
    private last_output: number = 0;
    private input_buffer: number[] | undefined;
    private halted: boolean = false;
    private relative_base: number = 0;

    public parameter_mode: boolean = true;
    public silent_mode: boolean = false;
    public pause_on_output_mode: boolean = false;

    public constructor(program: number[] | bigint[]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.memory = BigInt64Array.from(program.map(BigInt));
        this.backup_memory = BigInt64Array.from(this.memory);
        this.instruction_pointer = 0;
    }

    public static fromInput(input: string): IntCodeComputer {
        const data = input.split(/,/).map(n => BigInt(n));
        return new IntCodeComputer(data);
    }

    public is_halted(): boolean {
        return this.halted;
    }

    public load_program(program: number[]): void {
        this.memory = BigInt64Array.from(program.map(BigInt));
        this.backup_memory = BigInt64Array.from(this.memory);
    }

    public set_input_buffer(buffer: number[]): void {
        this.input_buffer = Array.from(buffer);
    }

    public apply_noun(noun: number): void {
        this.memory[1] = BigInt(noun);
    }

    public apply_verb(verb: number): void {
        this.memory[2] = BigInt(verb);
    }

    public peek(): number {
        return Number(this.memory[0]);
    }

    public load_from_backup(): void {
        this.instruction_pointer = 0;
        this.halted = false;
        this.memory.set(this.backup_memory);
    }

    public read_memory(): number[] {
        const a: number[] = new Array(this.memory.length);

        for (let i = 0; i < a.length; i++) a[i] = Number(this.memory[i]);
        return a;
    }

    public async run(): Promise<number> {
        const params = {} as Parameters;
        run_loop: for (;;) {
            const instruction = Number(this.memory[this.instruction_pointer]);
            const op_code = this.decode_instruction(instruction, params);
            switch (op_code) {
                case OP_CODE.ADD:
                    this.op_add(params);
                    break;
                case OP_CODE.MULT:
                    this.op_mult(params);
                    break;
                case OP_CODE.INPUT:
                    await this.op_input(params);
                    break;
                case OP_CODE.OUTPUT:
                    this.op_output(params);
                    if (this.pause_on_output_mode) return this.last_output;
                    break;
                case OP_CODE.JUMP_NOT_ZERO:
                    this.op_jump_not_zero(params);
                    break;
                case OP_CODE.JUMP_ZERO:
                    this.op_jump_zero(params);
                    break;
                case OP_CODE.LESS_THAN:
                    this.op_less(params);
                    break;
                case OP_CODE.EQUAL:
                    this.op_equal(params);
                    break;
                case OP_CODE.MODE_RELATIVE_BASE:
                    this.op_mod_relative_base(params);
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
            p2 = PARAMETER_MODE.POSITION,
            p3 = PARAMETER_MODE.POSITION;
        if (this.parameter_mode) {
            let temp = Math.floor(instruction / 100);
            p1 = temp % 10;
            temp = Math.floor(temp / 10);
            p2 = temp % 10;
            temp = Math.floor(temp / 10);
            p3 = temp % 10;
        }
        switch (op_code) {
            case OP_CODE.ADD:
            case OP_CODE.MULT:
            case OP_CODE.EQUAL:
            case OP_CODE.LESS_THAN:
                if (p3 === PARAMETER_MODE.RELATIVE)
                    out_params.three = this.relative_base + Number(this.memory[this.instruction_pointer + 3]);
                else out_params.three = Number(this.memory[this.instruction_pointer + 3]);
                if (out_params.three >= this.memory.length) {
                    const new_arr = new BigInt64Array(out_params.three + 1).fill(0n);
                    new_arr.set(this.memory);
                    this.memory = new_arr;
                }
            //FALLTHROUGH -- below instructions have param 2
            case OP_CODE.JUMP_NOT_ZERO:
            case OP_CODE.JUMP_ZERO:
                if (p2 === PARAMETER_MODE.IMMEDIATE) out_params.two = this.instruction_pointer + 2;
                else if (p2 === PARAMETER_MODE.RELATIVE)
                    out_params.two = this.relative_base + Number(this.memory[this.instruction_pointer + 2]);
                else out_params.two = Number(this.memory[this.instruction_pointer + 2]);
            //FALLTHROUGH -- all instructions have param 1
            case OP_CODE.INPUT:
            case OP_CODE.OUTPUT:
            case OP_CODE.MODE_RELATIVE_BASE:
                if (p1 === PARAMETER_MODE.IMMEDIATE) out_params.one = this.instruction_pointer + 1;
                else if (p1 === PARAMETER_MODE.RELATIVE)
                    out_params.one = this.relative_base + Number(this.memory[this.instruction_pointer + 1]);
                else out_params.one = Number(this.memory[this.instruction_pointer + 1]);
        }
        return op_code;
    }

    private op_add(params: Parameters): void {
        // mem[dest] = mem[src1] + mem[src2]
        this.memory[params.three] = BigInt(this.memory[params.one]) + BigInt(this.memory[params.two]);
        this.instruction_pointer += 4;
    }
    private op_mult(params: Parameters): void {
        //mem[dest] = mem[src1] * mem[src2]
        this.memory[params.three] = this.memory[params.one] * this.memory[params.two];
        this.instruction_pointer += 4;
    }

    private async op_input(params: Parameters): Promise<void> {
        if (!this.silent_mode) process.stdout.write('Input: ');

        //Read from input buffer if not empty else read from prompt
        if (this.input_buffer && this.input_buffer.length) {
            const n = BigInt(this.input_buffer.shift());
            this.memory[params.one] = n;
            if (!this.silent_mode) process.stdout.write(`${n}\n`);
        } else {
            this.memory[params.one] = await this.input_from_console();
            // Gotta pause stdin after we're done so it doesn't look like the process is stuck
            process.stdin.pause();
        }

        this.instruction_pointer += 2;
    }

    private async input_from_console(): Promise<bigint> {
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
        return BigInt(await getLine());
    }

    private op_output(params: Parameters): void {
        if (!this.silent_mode) console.log(this.memory[params.one]);
        this.last_output = Number(this.memory[params.one]);
        this.instruction_pointer += 2;
    }

    private op_jump_not_zero(params: Parameters): void {
        if (this.memory[params.one] !== 0n) this.instruction_pointer = Number(this.memory[params.two]);
        else this.instruction_pointer += 3;
    }

    private op_jump_zero(params: Parameters): void {
        if (this.memory[params.one] === 0n) this.instruction_pointer = Number(this.memory[params.two]);
        else this.instruction_pointer += 3;
    }

    private op_less(params: Parameters): void {
        this.memory[params.three] = this.memory[params.one] < this.memory[params.two] ? 1n : 0n;
        this.instruction_pointer += 4;
    }

    private op_equal(params: Parameters): void {
        this.memory[params.three] = this.memory[params.one] === this.memory[params.two] ? 1n : 0n;
        this.instruction_pointer += 4;
    }

    private op_mod_relative_base(params: Parameters): void {
        this.relative_base += Number(this.memory[params.one]);
        this.instruction_pointer += 2;
    }
}
