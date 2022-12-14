import {Results} from 'src/lib';

export const year = 2022;
export const day = 13;

export const results: Results = {
    one: 4894,
    two: 24180,
};

export function compare(a: number[] | number[][] | number, b: number[] | number[][] | number): -1 | 0 | 1 {
    if (!Array.isArray(a) && !Array.isArray(b)) {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0;
    }

    if (!Array.isArray(a)) {
        a = [a];
    }
    if (!Array.isArray(b)) {
        b = [b];
    }

    let length_compare: -1 | 0 | 1 = 0;
    if (a.length < b.length) length_compare = -1;
    if (a.length > b.length) length_compare = 1;

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        const c = compare(a[i], b[i]);
        if (c == 0) continue;
        else return c;
    }

    return length_compare;
}
