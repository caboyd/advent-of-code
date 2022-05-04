import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    return input
        .split(/\r?\n/)
        .map((n) => Math.floor(Number(n) / 3) - 2)
        .reduce((sum, item) => sum + item);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //3402634 ~0.16ms
    })();
}
