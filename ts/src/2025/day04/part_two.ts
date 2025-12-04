import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

let grid_height: number;
let grid_width: number;

const is_acessible = (grid: string[], grid_x: number, grid_y: number): boolean => {
    let blockages = 0;

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

export const equation_two = (input: string): number => {
    let result = 0;
    let grid: string[] = input.split(/\r?\n/);
    grid_height = grid.length;
    grid_width = grid[0].length;
    console.log(grid.length, grid[0].length);
    let did_remove = true;
    while (did_remove) {
        const immutable_grid = grid;
        grid = structuredClone(immutable_grid);
        let removed = 0;
        did_remove = false;
        for (let y = 0; y < immutable_grid.length; y++) {
            for (let x = 0; x < immutable_grid[0].length; x++) {
                const item = immutable_grid[y][x];
                if (item == '@' && is_acessible(immutable_grid, x, y)) {
                    const row = grid[y];
                    grid[y] = row.slice(0, x) + 'x' + row.slice(x + 1);
                    result++;
                    removed++;
                    did_remove = true;
                }
            }
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //8948 ~75.6ms
    })();
}
