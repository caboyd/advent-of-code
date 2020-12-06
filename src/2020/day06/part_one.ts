/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const groups = input.split(/\r?\n\r?\n/);

    let sum = 0;
    for (const group of groups) {
        const answer = new Map<string, boolean>();
        const line = group.replace(/\r?\n/g, '');
        for (const char of line) {
            answer.set(char, true);
        }
        sum += answer.size;
    }
    return sum;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //6878 4.64ms
    })();
}
