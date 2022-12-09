import { benchmark, read_input } from 'src/lib';
import { day, solveRope, vec2Set, year } from './index';

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);
    let rope_length = 10;
    let tail_set = new vec2Set();
    solveRope(rope_length, tail_set, lines);
    return tail_set.size;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //2471 ~15.89
    })();
}
