import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

const COL_MAX = 8;

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);

    let max = 0;
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
        max = Math.max(max, row_result * COL_MAX + col_result);
    }
    return max;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //896 1.52ms
    })();
}
