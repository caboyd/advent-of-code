import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

export const equation_one = (
    input: string,
    noun: number | undefined = undefined,
    verb: number | undefined = undefined
): Array<number> => {
    const data = input.split(/,/).map(n => Number(n));

    let stack_pointer = 0;

    //apply bugfixes
    data[1] = noun || data[1];
    data[2] = verb || data[2];

    while (data[stack_pointer] !== 99) {
        const [op_code, d1, d2, result] = data.slice(stack_pointer, stack_pointer + 4);

        switch (op_code) {
            case 1: {
                //Add next 2 values and store into 3rd
                const v1 = data[d1];
                const v2 = data[d2];
                data[result] = v1 + v2;
                break;
            }
            case 2: {
                //multiplies next 2 values and store into 3rd
                const v1 = data[d1];
                const v2 = data[d2];
                data[result] = v1 * v2;
                break;
            }
        }
        stack_pointer += 4;
    }

    return data;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input, 12, 2))}`);
    })();
}
