import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

interface O {
    [key: number]: boolean;
}

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/).map((n) => Number(n));

    for (const item of arr) {
        const pair_found = {} as O;
        const pair_sum = year - item;
        for (const n of arr) {
            if (pair_found[pair_sum - n]) return n * (pair_sum - n) * item;
            pair_found[n] = true;
        }
    }
    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //223162626 ~15.7ms
    })();
}
