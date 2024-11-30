import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

interface O {
    [key: number]: boolean;
}

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/).map((n) => Number(n));
    const pair_found = {} as O;
    for (const n of arr) {
        if (pair_found[year - n] !== undefined) return n * (year - n);
        pair_found[n] = true;
    }
    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //55776 0.22ms
    })();
}
