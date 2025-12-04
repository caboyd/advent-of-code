import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

const is_acessible = (grid: string[][], grid_x: number, grid_y: number): boolean => {
    let blockages = 0;
    const grid_height = grid.length;
    const grid_width = grid[0].length;
    for (let y = grid_y - 1; y <= grid_y + 1; y++) {
        for (let x = grid_x - 1; x <= grid_x + 1; x++) {
            if (grid_x == x && grid_y == y) continue;
            if (x >= 0 && y >= 0 && x < grid_width && y < grid_height) {
                if (grid[y][x] == '@') {
                    blockages++;
                }
            }
        }
    }
    return blockages < 4;
};

export const equation_one = (input: string): number => {
    let result = 0;
    const grid: string[][] = input.split(/\r?\n/).map((line) => line.split(''));
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const item = grid[y][x];
            if (item == '@' && is_acessible(grid, x, y)) {
                result++;
            }
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1547 ~10.3ms
    })();
}
