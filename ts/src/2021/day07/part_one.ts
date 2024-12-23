import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(',').map(Number);

    let min = 10000000;
    for (let i = 1; i <= 1000; i++) {
        const a = arr.reduce((acc, item) => acc + Math.abs(item - i), 0);
        min = Math.min(min, a);
    }
    return min;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //325528 ~11.08ms
    })();
}
