import {Results} from 'src/lib';

export const year = 2019;
export const day = 3;

export const results: Results = {
    one: 709,
    two: 13836,
};

export interface Vec2 {
    x: number;
    y: number;
}
export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}

export interface HorizLine {
    dir: Direction.WEST | Direction.EAST;
    steps: number;
    y: number;
    x_min: number;
    x_max: number;
}

export interface VertLine {
    dir: Direction.NORTH | Direction.SOUTH;
    steps: number;
    x: number;
    y_min: number;
    y_max: number;
}

export interface Lines {
    vert_lines: VertLine[];
    horiz_lines: HorizLine[];
}

export const find_line_intersections = (
    horiz: HorizLine[],
    vert: VertLine[],
    distance_function: (h: HorizLine, v: VertLine) => number,
): number => {
    let shortest_distance = Number.MAX_SAFE_INTEGER;

    for (const l1 of horiz) {
        if (l1.x_min === 0) continue;
        for (const l2 of vert) {
            if (l2.x === 0) continue;
            //find intersections
            if (l1.y < l2.y_max && l1.y > l2.y_min) {
                if (l2.x < l1.x_max && l2.x > l1.x_min) {
                    //intersection point
                    const distance = distance_function(l1, l2);

                    if (distance < shortest_distance) shortest_distance = distance;
                }
            }
        }
    }
    return shortest_distance;
};

export const build_lines = (input: string): Lines[] => {
    return input.split(/\r?\n/).map((s) => {
        const path_walker: Vec2 = {x: 0, y: 0};
        let steps = 0;
        const lines: Lines = {vert_lines: [], horiz_lines: []};
        s.split(/,/).map((n) => {
            const cardinal = n[0];
            const len = Number(n.slice(1));
            switch (cardinal) {
                case 'L':
                    lines.horiz_lines.push({
                        dir: Direction.WEST,
                        steps: steps,
                        y: path_walker.y,
                        x_min: path_walker.x - len,
                        x_max: path_walker.x,
                    });
                    path_walker.x -= len;
                    break;
                case 'R':
                    lines.horiz_lines.push({
                        dir: Direction.EAST,
                        steps: steps,
                        y: path_walker.y,
                        x_min: path_walker.x,
                        x_max: path_walker.x + len,
                    });
                    path_walker.x += len;
                    break;
                case 'U':
                    lines.vert_lines.push({
                        dir: Direction.NORTH,
                        steps: steps,
                        x: path_walker.x,
                        y_min: path_walker.y,
                        y_max: path_walker.y + len,
                    });
                    path_walker.y += len;
                    break;
                case 'D':
                    lines.vert_lines.push({
                        dir: Direction.SOUTH,
                        steps: steps,
                        x: path_walker.x,
                        y_min: path_walker.y - len,
                        y_max: path_walker.y,
                    });
                    path_walker.y -= len;
                    break;
            }
            steps += len;
        });
        return lines;
    });
};
