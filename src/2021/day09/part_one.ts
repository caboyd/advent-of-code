import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/).map((x) => x.trim());
    const height = arr.length;
    const width = arr[0].length;
    let total = 0;
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
            total += +n + 1;
        }
    }
    return total;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //588 ~9.83ms
    })();
}
