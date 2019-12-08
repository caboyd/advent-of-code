/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from '../../lib';
import {build_lines, day, find_line_intersections, HorizLine, VertLine, year} from './index';

export const manhattan_distance = (h: HorizLine, v: VertLine): number => {
    return Math.abs(h.y) + Math.abs(v.x);
};

export const equation_one = (input: string): number => {
    const [line1, line2] = build_lines(input);

    return Math.min(
        find_line_intersections(line1.horiz_lines, line2.vert_lines, manhattan_distance),
        find_line_intersections(line2.horiz_lines, line1.vert_lines, manhattan_distance),
    );
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input))}`); //709 ~5.6 ms
    })();
}
