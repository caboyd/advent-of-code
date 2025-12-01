import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

const mod = (v: number, m: number) => ((v % m) + m) % m;

export const equation_one = (input: string): number => {
    let dial = 50;
    let password = 0;
    const lines = input.split(/\r?\n/);
    for (const line of lines) {
        const dir = line[0] == 'L' ? -1 : 1;
        const amount = Number(line.slice(1));

        const rotations = Math.floor(amount / 100);
        const remainer = amount - rotations * 100;
        const new_dial = dial + dir * remainer;

        if (dial == 0) {
            password++;
        }
        dial = mod(new_dial, 100);
    }
    return password;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1147 ~1.35ms
    })();
}
