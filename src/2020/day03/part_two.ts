/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

type Vec2 = [number, number];

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);

    const end_y = lines.length;
    const end_x = lines[0].length;

    const slopes: Vec2[] = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    let answer = 1;

    for (const slope of slopes) {
        let tree_count = 0;
        const pos: Vec2 = [0, 0];
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
        answer *= tree_count;
    }

    return answer;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1260601650 0.48ms
    })();
}
