/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);

    for (let i = 25; i < lines.length; i++) {
        const num_to_find = Number(lines[i]);
        let found = false;
        for (let x = i - 25; x < i; x++) {
            for (let y = i - 25; y < i; y++) {
                if (x === y) continue;
                if (Number(lines[x]) + Number(lines[y]) === num_to_find) found = true;
            }
        }
        if (!found)
            return num_to_find;
    }
    return -1;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //22477624 8.6ms
    })();
}
