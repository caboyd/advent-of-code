import {Results} from 'src/lib';

export const year = 2021;
export const day = 13;

export const results: Results = {
    one: 827,
    two: 104,
};

export const fold = (arr: string[][], dir: boolean): string[][] => {
    if (dir) {
        const len = arr[0].length;
        //fold vertical along x = value
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < Math.floor(len / 2); x++) {
                arr[y][x] = arr[y][len - x - 1] === '#' ? arr[y][len - x - 1] : arr[y][x];
            }
            arr[y].length = Math.floor(len / 2);
        }
    } else {
        const len = arr.length;
        //fold horizontal along y = value
        for (let y = 0; y < Math.floor(arr.length / 2); y++) {
            for (let x = 0; x < arr[y].length; x++) {
                arr[y][x] = arr[len - y - 1][x] === '#' ? arr[len - y - 1][x] : arr[y][x];
            }
        }
        arr.length = Math.floor(len / 2);
    }

    return arr;
};
