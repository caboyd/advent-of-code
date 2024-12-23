import {benchmark, read_input} from 'src/lib';
import {day, fold, year} from './index';

export const equation_one = (input: string): number => {
    const [data, folds] = input.split(/\r?\n\r?\n/).map((x) =>
        x
            .trim()
            .split(/\r?\n/)
            .map((x) => x.trim()),
    );

    // let arr = Array(15)
    //     .fill(0)
    //     .map(() => Array(11).fill('.'));
    let arr = Array(895)
        .fill(0)
        .map(() => Array(1311).fill('.'));
    for (const item of data) {
        const [x, y] = item.split(',').map(Number);
        arr[y][x] = '#';
    }
    const f = folds[0];
    const s = f.split('=');
    const dir = s[0].slice(-1) === 'x' ? true : false;
    arr = fold(arr, dir);

    let count = 0;
    for (let y = 0; y < arr.length; y++) {
        count += arr[y].reduce((acc, v) => acc + (v === '#' ? 1 : 0), 0);
    }
    return count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //827 ~17.5ms
    })();
}
