import {benchmark, read_input} from 'src/lib';
import {createSnailfish, day, magnitude, PairToString, reduce, year} from './index';

export const equation_two = (input: string): number => {
    let lines = input.split(/\r?\n/);

    let best_magnitude = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if (i == j) continue;
            let root = {left: createSnailfish(lines[i]), right: createSnailfish(lines[j]), reduced: false};
            root.left.parent = root;
            root.right.parent = root;
            reduce(root);
            let mag = magnitude(root);
            best_magnitude = Math.max(best_magnitude, mag);
        }
    }
    return best_magnitude;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //4855 ~160ms
    })();
}
