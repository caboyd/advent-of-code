import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/);
    let result = 0;
    for (const s of arr) {
        let [opp, me] = s.trim().split(' ');
        if (opp === 'A') {
            if (me === 'X') result += 3 + 0;
            else if (me === 'Y') result += 1 + 3;
            else if (me === 'Z') result += 2 + 6;
        } else if (opp === 'B') {
            if (me === 'X') result += 1 + 0;
            else if (me === 'Y') result += 2 + 3;
            else if (me === 'Z') result += 3 + 6;
        } else if (opp === 'C') {
            if (me === 'X') result += 2 + 0;
            else if (me === 'Y') result += 3 + 3;
            else if (me === 'Z') result += 1 + 6;
        }
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //12767 ~1.5657ms
    })();
}
