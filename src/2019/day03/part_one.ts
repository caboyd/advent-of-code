/* eslint-disable @typescript-eslint/no-magic-numbers */
import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

interface Vec2 {
    x: number;
    y: number;
}

interface HorizLine {
    y: number;
    x_min: number;
    x_max: number;
}

interface VertLine {
    x: number;
    y_min: number;
    y_max: number;
}

interface Lines {
    vert_lines: VertLine[];
    horiz_lines: HorizLine[];
}

export const compare_lines = (horiz: HorizLine[], vert: VertLine[]): number => {
    let shortest_distance = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < horiz.length; i++) {
        const l1 = horiz[i];
        if (l1.x_min === 0) continue;
        for (let j = 0; j < vert.length; j++) {
            const l2 = vert[j];
            if (l2.x === 0) continue;
            //find intersections
            if (l1.y < l2.y_max && l1.y > l2.y_min) {
                if (l2.x < l1.x_max && l2.x > l1.x_min) {
                    //intersection point
                    const distance = Math.abs(l2.x) + Math.abs(l1.y);
                    //find manhattan distance
                    if (distance < shortest_distance) shortest_distance = distance;
                }
            }
        }
    }
    return shortest_distance;
};

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/).map(s => {
        const path_walker = {x: 0, y: 0} as Vec2;
        const lines: Lines = {vert_lines: [], horiz_lines: []};
        s.split(/,/).map(n => {
            const cardinal = n[0];
            const len = Number(n.slice(1));

            switch (cardinal) {
                case 'L':
                    lines.horiz_lines.push({
                        y: path_walker.y,
                        x_min: path_walker.x - len,
                        x_max: path_walker.x,
                    });
                    path_walker.x -= len;
                    break;
                case 'R':
                    lines.horiz_lines.push({
                        y: path_walker.y,
                        x_min: path_walker.x,
                        x_max: path_walker.x + len,
                    });
                    path_walker.x += len;
                    break;
                case 'U':
                    lines.vert_lines.push({
                        x: path_walker.x,
                        y_min: path_walker.y,
                        y_max: path_walker.y + len,
                    });
                    path_walker.y += len;
                    break;
                case 'D':
                    lines.vert_lines.push({
                        x: path_walker.x,
                        y_min: path_walker.y - len,
                        y_max: path_walker.y,
                    });
                    path_walker.y -= len;
                    break;
            }
        });
        return lines;
    });

    return Math.min(
        compare_lines(arr[0].horiz_lines, arr[1].vert_lines),
        compare_lines(arr[1].horiz_lines, arr[0].vert_lines)
    );
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input))}`); //~5.4 ms
    })();
}
