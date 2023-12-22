import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);

    let cards: Record<number, number> = {};
    for (let i = 0; i < lines.length; i++) {
        cards[i] = 1;
    }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let [a, b] = line.split(' | ');
        let winning_nums = a.split(': ')[1].split(' ');
        let winning: Record<string, boolean> = {};

        for (const num of winning_nums) {
            if (num.length) winning[num] = true;
        }
        let have_nums = b.split(' ');
        let win_count = 0;

        for (const num of have_nums) {
            if (winning[num]) win_count++;
        }
        for (let j = 1; j <= win_count; j++) {
            cards[i + j] += cards[i];
        }
    }
    for (const v of Object.values(cards)) {
        result += v;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //5833065 ~1.911ms
    })();
}
