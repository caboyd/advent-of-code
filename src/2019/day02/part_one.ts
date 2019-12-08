import {benchmark, read_input} from '../../lib';
import {day, noun, verb, year} from './index';

enum OP_CODE {
    ADD = 1,
    MULT = 2,
    QUIT = 99,
}

enum INSTRUCTION_FORMAT {
    OP_CODE = 0,
    SOURCE_1 = 1,
    SOURCE_2 = 2,
    DEST = 3,
    SIZE = 4,
}

interface Instruction {
    op_code: OP_CODE;
    src_addr_1: number;
    src_addr_2: number;
    dest_addr: number;
}

export const decode_instruction = (buffer: Uint32Array, stack_pointer: number): Instruction => {
    return {
        op_code: buffer[stack_pointer + INSTRUCTION_FORMAT.OP_CODE],
        src_addr_1: buffer[stack_pointer + INSTRUCTION_FORMAT.SOURCE_1],
        src_addr_2: buffer[stack_pointer + INSTRUCTION_FORMAT.SOURCE_2],
        dest_addr: buffer[stack_pointer + INSTRUCTION_FORMAT.DEST],
    };
};

export const compute = (
    buffer: Uint32Array,
    noun: number | undefined = undefined,
    verb: number | undefined = undefined
): Uint32Array => {
    //apply noun and verb
    buffer[1] = noun || buffer[1];
    buffer[2] = verb || buffer[2];

    let stack_pointer = 0;

    while (buffer[stack_pointer] !== OP_CODE.QUIT) {
        const instruction = decode_instruction(buffer, stack_pointer);

        switch (instruction.op_code) {
            case OP_CODE.ADD:
                buffer[instruction.dest_addr] = buffer[instruction.src_addr_1] + buffer[instruction.src_addr_2];
                break;
            case OP_CODE.MULT:
                buffer[instruction.dest_addr] = buffer[instruction.src_addr_1] * buffer[instruction.src_addr_2];
                break;
        }
        stack_pointer += INSTRUCTION_FORMAT.SIZE;
    }
    return buffer;
};

export const equation_one = (
    input: string,
    noun: number | undefined = undefined,
    verb: number | undefined = undefined
): Array<number> => {
    const data = input.split(/,/).map(n => Number(n));

    return Array.from(compute(new Uint32Array(data), noun, verb));
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input, noun, verb))}`); //3716293 ~0.14 ms
    })();
}
