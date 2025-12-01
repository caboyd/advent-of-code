import {Results} from 'src/lib';

export const year = 2021;
export const day = 15;

export const results: Results = {
    one: 745,
    two: 3002,
};

export type vec2 = [number, number];
export class QueueNode {
    public constructor(public pos: vec2, public priority: number) {}
}

export function compare(a: QueueNode, b: QueueNode): number {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
}

export function get_neighbours(map: number[][], pos: vec2): vec2[] {
    const arr: vec2[] = [];
    //right
    if (map[pos[1]][pos[0] + 1] !== undefined) arr.push([pos[0] + 1, pos[1]]);
    //down
    if (map[pos[1] + 1] !== undefined) if (map[pos[1] + 1][pos[0]] !== undefined) arr.push([pos[0], pos[1] + 1]);
    //left
    if (map[pos[1]][pos[0] - 1] !== undefined) arr.push([pos[0] - 1, pos[1]]);
    //up
    if (map[pos[1] - 1] !== undefined) if (map[pos[1] - 1][pos[0]] !== undefined) arr.push([pos[0], pos[1] - 1]);

    return arr;
}

export function pos_to_id(pos: vec2): number {
    return pos[0] * 10000 + pos[1];
}
