import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/);
    let result = 0;
    for (const s of arr) {
        const middle = s.length / 2;
        const first = s.slice(0, middle);
        const second = s.slice(middle, s.length);
        for (const c of first) {
            if (second.includes(c)) {
                let amount = 0;
                if (c.toLowerCase() === c) amount = 26 - (122 - c.charCodeAt(0));
                else amount = 52 - (90 - c.charCodeAt(0));
                result += amount;
                break;
            }
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //7716 ~0.466ms
    })();
}
