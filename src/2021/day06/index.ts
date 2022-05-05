import {Results} from 'src/lib';

export const year = 2021;
export const day = 6;

export const results: Results = {
    one: 0,
    two: 0,
};

export const shift_fish = (fish_buckets: number[]): void => {
    const temp = fish_buckets[0];
    for (let i = 0; i < 8; i++) {
        fish_buckets[i] = fish_buckets[i + 1];
    }
    fish_buckets[6] += temp;
    fish_buckets[8] = temp;
};
