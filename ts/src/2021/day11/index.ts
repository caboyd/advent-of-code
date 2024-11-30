import {Results} from 'src/lib';

export const year = 2021;
export const day = 11;

export const results: Results = {
    one: 1613,
    two: 510,
};

export const flash = (arr: number[][], x: number, y: number): void => {
    if (arr[y] === undefined) return;
    if (arr[y][x] === undefined) return;
    arr[y][x]++;
    if (arr[y][x] >= 10) {
        arr[y][x] *= -1;
        flash(arr, x + 1, y);
        flash(arr, x + 1, y + 1);
        flash(arr, x, y + 1);
        flash(arr, x - 1, y + 1);
        flash(arr, x - 1, y);
        flash(arr, x - 1, y - 1);
        flash(arr, x, y - 1);
        flash(arr, x + 1, y - 1);
    }
};
