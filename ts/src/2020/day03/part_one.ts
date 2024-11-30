import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

type Vec2 = [number, number];

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);

    const end_y = lines.length;
    const end_x = lines[0].length;
    const pos: Vec2 = [0, 0];
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const slope: Vec2 = [3, 1];

    let tree_count = 0;

    do {
        //update pos
        pos[0] += slope[0];
        pos[1] += slope[1];

        //check for tree
        if (lines[pos[1]][pos[0]] === '#') {
            tree_count++;
        }

        //wrap x
        if (pos[0] + slope[0] >= end_x) {
            pos[0] -= end_x;
        }
    } while (pos[1] + slope[1] < end_y);

    return tree_count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //181 0.22ms
    })();
}
