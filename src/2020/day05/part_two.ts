/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

const COL_MAX = 8;

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);

    const seats = [];
    for (const line of lines) {
        let row_exp = 6;
        let col_exp = 2;
        let row_result = 0;
        let col_result = 0;

        for (const char of line) {
            if (char === 'B') {
                row_result += Math.pow(2, row_exp--);
            }
            if (char === 'F') row_exp--;
            if (char === 'R') {
                col_result += Math.pow(2, col_exp--);
            }
            if (char === 'L') col_exp--;
        }
        seats.push(row_result * COL_MAX + col_result);
    }
    seats.sort((a, b) => a - b);
    for (let i = 0; i < seats.length - 1; i++) {
        if (seats[i + 1] - seats[i] === 2) return seats[i] + 1;
    }
    return -1;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //659 3.37ms
    })();
}
