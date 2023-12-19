import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let result = 0;
    let lines = input.split(/\r?\n/);
    for (const line of lines) {
        let first = 0;
        let last = 0;
        for (const c of line) {
            let num = Number(c);
            if (num) {
                if (!first) first = num;
                last = num;
            }
        }
        result += first * 10 + last;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //53651 ~3.83ms
    })();
}
