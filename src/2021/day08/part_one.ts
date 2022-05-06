import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/);

    const counts = Array(10).fill(0);
    for (const line of arr) {
        const s = line.split(' | ')[1].split(' ');
        for (const item of s) {
            counts[item.length]++;
        }
    }

    return counts[2] + counts[4] + counts[3] + counts[7];
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //288 ~0.55ms
    })();
}
