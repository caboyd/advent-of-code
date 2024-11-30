import {Results} from 'src/lib';

export const year = 2021;
export const day = 17;

export const results: Results = {
    one: 2628,
    two: 1334,
};

export type Target = {
    x_min: number;
    x_max: number;
    y_min: number;
    y_max: number;
};

export type HitResult = {
    hit: boolean;
    max_y: number;
};

function toZero(value: number): number {
    if (value > 0) value--;
    else if (value < 0) value++;
    return value;
}

export function shoot(x_vel: number, y_vel: number, target: Target, tries:number): HitResult {
    let x = 0,
        y = 0;
    let max_y = y;
    for (let i = 0; i < tries; i++) {
        x += x_vel;
        x_vel = toZero(x_vel);
        y += y_vel;
        y_vel--;
        max_y = Math.max(y, max_y);

        if (x >= target.x_min && x <= target.x_max && y >= target.y_min && y <= target.y_max)
            return {hit: true, max_y: max_y};
    }
    return {hit: false, max_y: max_y};
}
