import {benchmark, read_input} from 'src/lib';
import {createSnailfish, day, magnitude, reduce, Snailfish, year} from './index';

export const equation_one = (input: string): number => {
    let lines = input.split(/\r?\n/);
    let left_snail: Snailfish | undefined;
    for (const line of lines) {
        if (!left_snail) {
            left_snail = createSnailfish(line);
        } else {
            let right_snail = createSnailfish(line);
            const root: Snailfish = {left: left_snail, right: right_snail, reduced: false};
            left_snail.parent = root;
            right_snail.parent = root;
            left_snail = root;
        }
        reduce(left_snail);
    }

    return magnitude(left_snail);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //4145 ~18.9ms
    })();
}
