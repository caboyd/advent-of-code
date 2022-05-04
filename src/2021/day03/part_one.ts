import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const bits: number[] = Array(12).fill(0);
    const arr = input.split(/\r?\n/);
    for (const line of arr) {
        const n = [...line];
        for (let i = 0; i < 12; i++) bits[i] += +n[i] == 1 ? +1 : -1;
    }

    let num = 0;
    for (let i = 0; i < 12; i++) {
        num += bits[11 - i] > 0 ? 1 << i : 0;
    }
    return num * (4095 - num);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //4103154 ~3.06ms
    })();
}
