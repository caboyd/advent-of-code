import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/).map((x) => x.trim());
    const height = arr.length;
    const width = arr[0].length;
    let answers = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const n = arr[y][x];
            const top = arr[y - 1] ? arr[y - 1][x] : undefined;
            const left = arr[y][x - 1];
            const bottom = arr[y + 1] ? arr[y + 1][x] : undefined;
            const right = arr[y][x + 1];

            if (top && n >= top) continue;
            if (left && n >= left) continue;
            if (bottom && n >= bottom) continue;
            if (right && n >= right) continue;

            answers.push(flood_fill(arr, x, y));
        }
    }
    answers = answers.sort((a, b) => b - a);
    return answers[0] * answers[1] * answers[2];
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //964712 ~14.85ms
    })();
}

const flood_fill = (arr: string[], x: number, y: number): number => {
    if (arr[y] === undefined) return 0;
    if (arr[y][x] === '9' || arr[y][x] === undefined) return 0;
    arr[y] = arr[y].substring(0, x) + '9' + arr[y].substring(x + 1);
    return (
        1 +
        flood_fill(arr, x, y + 1) +
        flood_fill(arr, x, y - 1) +
        flood_fill(arr, x - 1, y) +
        flood_fill(arr, x + 1, y)
    );
};
