import {benchmark, read_input} from 'src/lib';
import {compare, day, year} from './index';

export const equation_one = (input: string): number => {
    let line_pairs = input.split(/\r?\n\r?\n/);

    let index = 0;
    let total = 0;
    for (const line_pair of line_pairs) {
        let [left, right] = line_pair.split(/\r?\n/);
        index++;

        const l = JSON.parse(left);
        const r = JSON.parse(right);

        //compare
        if (compare(l, r) < 0) {
            total += index;
        }
    }

    return total;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //4894 ~1.02ms
    })();
}
