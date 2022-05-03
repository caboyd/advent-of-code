/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let pos = 0;
    let depth = 0;
    const arr = input.split(/\r?\n/);
    for (const line of arr) {
        const s = line.split(' ');
        switch (s[0]) {
            case 'forward':
                pos += +s[1];
                break;
            case 'up':
                depth -= +s[1];
                break;
            case 'down':
                depth += +s[1];
                break;
        }
    }
    return pos * depth;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1813801 ~0.807ms
    })();
}
