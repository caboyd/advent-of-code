import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);
    for (const line of lines) {
        let [a, b] = line.split(' | ');
        let winning_nums = a.split(': ')[1].split(' ');
        let winning: Record<string, boolean> = {};
        let win_count = 0;

        for (const num of winning_nums) {
            if (num.length) winning[num] = true;
        }
        let have_nums = b.split(' ');
        for (const num of have_nums) {
            if (winning[num]) win_count++;
        }
        if (win_count > 0) {
            let score = 1;
            score = score * Math.pow(2, win_count - 1);
            result += score;
        }
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //20667 ~1.87ms
    })();
}
