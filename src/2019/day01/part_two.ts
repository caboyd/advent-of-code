/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    return input
        .split(/\r?\n/)
        .map((n) => {
            let fuel = 0;
            let remaining_mass = Number(n);
            for (;;) {
                remaining_mass = Math.floor(Number(remaining_mass) / 3) - 2;
                if (remaining_mass < 0) return fuel;
                fuel += remaining_mass;
            }
        })
        .reduce((sum, item) => sum + item);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //5101069 ~0.23ms
    })();
}
