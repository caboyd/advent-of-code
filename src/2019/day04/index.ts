import {Results} from 'src/lib';

export const year = 2019;
export const day = 4;

export const results: Results = {
    one: 1955,
    two: 1319,
};

export const DIGITS = 6;
export const num_to_digits = (n: number, arr: number[]): number[] => {
    const base = 10;
    for (let i = 0; i < DIGITS; i++) {
        arr[DIGITS - i] = n % base;
        n = Math.floor(n / base);
    }
    return arr;
};

export const password_solver = (input: string, invariant: (digits: number[]) => boolean): number => {
    const [min, max] = input.split(/-/).map(n => Number(n));
    let count = 0;
    const digits = new Array(DIGITS);
    for (let i = min; i < max; i++) {
        num_to_digits(i, digits);
        if (invariant(digits)) count++;
    }
    return count;
};
