import {benchmark, read_input} from 'src/lib';
import {day, shift_fish, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/,/).map(Number);
    const fish_buckets = Array(9).fill(0);
    for (const fish of arr) {
        fish_buckets[fish]++;
    }
    for (let i = 0; i < 80; i++) {
        shift_fish(fish_buckets);
    }

    return fish_buckets.reduce((acc, x) => acc + x);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //346063 ~0.219ms
    })();
}
