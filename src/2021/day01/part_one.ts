/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let result = 0;
    input.split(/\r?\n/).map((item, index, array) => {
        if (+item > +array[index - 1]) result++;
    });
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1502 ~0.402ms
    })();
}
