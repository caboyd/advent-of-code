import {benchmark, read_input} from '../../lib';
import {build_lines, day, Direction, find_line_intersections, HorizLine, VertLine, year} from './index';

export const line_distance = (h: HorizLine, v: VertLine): number => {
    let distance = h.steps + v.steps;

    if (h.dir == Direction.EAST) distance += v.x - h.x_min;
    else distance += h.x_max - v.x;

    if (v.dir == Direction.NORTH) distance += h.y - v.y_min;
    else distance += v.y_max - h.y;

    return distance;
};

export const equation_two = (input: string): number => {
    const [line1, line2] = build_lines(input);

    return Math.min(
        find_line_intersections(line1.horiz_lines, line2.vert_lines, line_distance),
        find_line_intersections(line2.horiz_lines, line1.vert_lines, line_distance),
    );
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //13836 ~6.02 ms
    })();
}
