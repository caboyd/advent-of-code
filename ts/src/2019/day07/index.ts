import {Results} from '../../lib';

export const year = 2019;
export const day = 7;

export const results: Results = {
    one: 14902,
    two: 6489132,
};

//https://stackoverflow.com/a/22063440
export const permute = (permutation: number[]): number[][] => {
    const length = permutation.length;
    const result = [permutation.slice()];
    const c = new Array(length).fill(0);
    let i = 1;
    let k;
    let p;

    while (i < length) {
        if (c[i] < i) {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
};
