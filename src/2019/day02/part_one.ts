import {benchmark, read_input} from '../../lib';
import {day, noun, verb, year} from './index';

enum OP_CODE {
    ADD = 1,
    MULT = 2,
    QUIT = 99,
}

const INSTRUCTION_WIDTH = 4;

export const equation_one = (
    input: string,
    noun: number | undefined = undefined,
    verb: number | undefined = undefined
): Array<number> => {
    const data = input.split(/,/).map(n => Number(n));

    //apply noun and verb
    data[1] = noun || data[1];
    data[2] = verb || data[2];

    let stack_pointer = 0;

    while (data[stack_pointer] !== OP_CODE.QUIT) {
        const [op_code, d1, d2, result] = data.slice(stack_pointer, stack_pointer + INSTRUCTION_WIDTH);

        switch (op_code) {
            case OP_CODE.ADD:
                data[result] = data[d1] + data[d2];
                break;
            case OP_CODE.MULT:
                data[result] = data[d1] * data[d2];
                break;
        }
        stack_pointer += INSTRUCTION_WIDTH;
    }
    return data;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input, noun, verb))}`);
    })();
}
