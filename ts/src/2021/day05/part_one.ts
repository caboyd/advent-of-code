import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/);
    const grid = Array(1000)
        .fill(0)
        .map(() => Array(1000).fill(0));

    let acc = 0;
    for (const line of arr) {
        const a = line.split(' -> ');
        const [x0, y0] = a[0].split(',').map(Number);
        const [x1, y1] = a[1].split(',').map(Number);

        if (x1 === x0) {
            for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
                grid[y][x0]++;
                if (grid[y][x0] > 1) acc++, (grid[y][x0] = -1000);
            }
        } else if (y1 === y0) {
            for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
                grid[y0][x]++;
                if (grid[y0][x] > 1) acc++, (grid[y0][x] = -1000);
            }
        }
    }
    return acc;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //6283 ~38.5ms
    })();
}
