import {Results} from 'src/lib';

export const year = 2022;
export const day = 9;

export const results: Results = {
    one: 6067,
    two: 2471,
};

export type vec2 = [number, number];

export type Rope = {
    body: vec2[];
    tail: vec2;
};

export function createRope(length: number): Rope {
    let rope: Rope = {body: [], tail: [0, 0]};
    for (let i = 0; i < length; i++) rope.body.push([0, 0]);

    rope.tail = rope.body[rope.body.length - 1];
    return rope;
}

export function moveRope(rope: Rope, new_pos: vec2, index: number = 0) {
    if (index >= rope.body.length) return;

    if (index == 0) {
        //awalys move head
        rope.body[index][0] = new_pos[0];
        rope.body[index][1] = new_pos[1];
        moveRope(rope, new_pos, index + 1);
    } else if (!within_dist(rope.body[index], new_pos, 1)) {
        //if should move
        const x_diff = new_pos[0] - rope.body[index][0];
        const y_diff = new_pos[1] - rope.body[index][1];
        const x = x_diff > 0 ? 1 : x_diff < 0 ? -1 : 0;
        const y = y_diff > 0 ? 1 : y_diff < 0 ? -1 : 0;
        rope.body[index][0] += x;
        rope.body[index][1] += y;
        moveRope(rope, [rope.body[index][0], rope.body[index][1]], index + 1);
    }

    return;
}

export class vec2Set extends Set<number> {
    addVec2(value: vec2) {
        const compressed = value[0] * 1e6 + value[1];
        super.add(compressed);
    }
}

export function within_dist(a: vec2, b: vec2, radius: number): boolean {
    let result = true;
    if (Math.abs(a[0] - b[0]) > radius) result = false;
    if (Math.abs(a[1] - b[1]) > radius) result = false;
    return result;
}

export function solveRope(rope_length: number, tail_set: vec2Set, lines: string[]) {
    let rope = createRope(rope_length);
    tail_set.addVec2(rope.tail);
    for (const line of lines) {
        let s = line.split(' ');
        let dir = s[0];
        let amount = Number(s[1]);
        for (let i = 0; i < amount; i++) {
            let new_pos: vec2 = [rope.body[0][0], rope.body[0][1]];
            switch (dir) {
                case 'U':
                    new_pos[1]++;
                    break;
                case 'D':
                    new_pos[1]--;
                    break;
                case 'R':
                    new_pos[0]++;
                    break;
                case 'L':
                    new_pos[0]--;
                    break;
            }
            moveRope(rope, new_pos);
            tail_set.addVec2(rope.tail);
        }
    }
}
