/* eslint-disable @typescript-eslint/no-magic-numbers */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

enum OP_CODE {
    ADD = 1,
    MULT = 2,
    INPUT = 3,
    OUTPUT = 4,
    QUIT = 99,
}

enum PARAMETER_MODE {
    POSITION = 0,
    IMMEDIATE = 1,
}

interface Parameters {
    src_addr1: number;
    src_addr2: number;
    dest_addr: number;
}

export class IntCodeComputer {
    private backup_memory: Int32Array;
    private memory: Int32Array;
    private instruction_pointer: number;
    public parameter_mode: boolean = false;

    constructor(program: Int32Array | number[]) {
        this.backup_memory = new Int32Array(program);
        this.memory = new Int32Array(program);
        this.instruction_pointer = 0;
    }

    public load_program(program: Int32Array | number[]): void {
        this.backup_memory = new Int32Array(program);
        this.memory = new Int32Array(program);
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
        for (let i = 0; i < this.memory.length; i++) {
            this.memory[i] = this.backup_memory[i];
        }
    }

    public read_memory(): Readonly<Int32Array> {
        return this.memory;
    }

    public run(): void {
        for (;;) {
            const instruction = this.memory[this.instruction_pointer];
            const op_code = instruction % 100;
            if (op_code === OP_CODE.QUIT) break;
            const params = this.decode_parameters(instruction);
            switch (op_code) {
                case OP_CODE.ADD:
                    this.add(params);
                    break;
                case OP_CODE.MULT:
                    this.mult(params);
                    break;
                case OP_CODE.INPUT:
                    this.input();
                    break;
                case OP_CODE.OUTPUT:
                    this.output();
                    break;
            }
        }
    }

    private add(params: Parameters): void {
        // mem[dest] = mem[src1] + mem[src2]
        this.memory[params.dest_addr] = this.memory[params.src_addr1] + this.memory[params.src_addr2];
        this.instruction_pointer += 4;
    }
    private mult(params: Parameters): void {
        //mem[dest] = mem[src1] * mem[src2]
        this.memory[params.dest_addr] = this.memory[params.src_addr1] * this.memory[params.src_addr2];
        this.instruction_pointer += 4;
    }

    private decode_parameters(instruction: number): Parameters {
        const op_code = instruction % 100;
        let p1 = 0,
            p2 = 0,
            p3 = 0;
        if (this.parameter_mode) {
            let temp = Math.floor(instruction / 100);
            p1 = temp % 10;
            temp = Math.floor(temp / 10);
            p2 = temp % 10;
            temp = Math.floor(temp / 10);
            p3 = temp % 10;
        }
        const params: Parameters = {dest_addr: 0, src_addr1: 0, src_addr2: 0};
        switch (op_code) {
            case OP_CODE.ADD:
            case OP_CODE.MULT:
                params.src_addr1 = this.instruction_pointer + 1;
                if (p1 === PARAMETER_MODE.POSITION) params.src_addr1 = this.memory[params.src_addr1];
                params.src_addr2 = this.instruction_pointer + 2;
                if (p2 === PARAMETER_MODE.POSITION) params.src_addr2 = this.memory[params.src_addr2];
                params.dest_addr = this.instruction_pointer + 3;
                if (p3 === PARAMETER_MODE.POSITION) params.dest_addr = this.memory[params.dest_addr];
                break;
            case OP_CODE.INPUT:
                params.dest_addr = this.instruction_pointer + 1;
                if (p1 === PARAMETER_MODE.POSITION) params.dest_addr = this.memory[params.dest_addr];
                break;
            case OP_CODE.OUTPUT:
                params.src_addr1 = this.instruction_pointer + 1;
                if (p1 === PARAMETER_MODE.POSITION) params.src_addr1 = this.memory[params.src_addr1];
                break;
        }
        return params;
    }

    private input(): void {
        readline.question('Input: ', (answer: string) => {
            this.memory[this.memory[this.instruction_pointer + 1]] = Number(answer);
        });
        this.instruction_pointer += 2;
    }

    private output(): void {
        console.log(this.memory[this.memory[this.instruction_pointer + 1]]);
        this.instruction_pointer += 2;
    }
}
