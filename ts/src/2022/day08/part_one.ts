import {benchmark, read_input} from 'src/lib';
import { day,    year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/).map((arr) => arr.split('').map(Number));
    let height = arr.length;
    let width = arr[0].length;
    let total_trees_visible = (width - 1) * 2 + (height - 1) * 2;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const tree_height = arr[y][x];
            let can_see = true;
            for (let to_left = x - 1; to_left >= 0; to_left--) {
                if (arr[y][to_left] >= tree_height) can_see = false;
            }
            if (can_see) {
                total_trees_visible++;
                continue;
            }
            can_see = true;
            for (let to_right = x + 1; to_right < width; to_right++) {
                if (arr[y][to_right] >= tree_height) can_see = false;
            }
            if (can_see) {
                total_trees_visible++;
                continue;
            }
            can_see = true;
            for (let to_up = y - 1; to_up >= 0; to_up--) {
                if (arr[to_up][x] >= tree_height) can_see = false;
            }
            if (can_see) {
                total_trees_visible++;
                continue;
            }
            can_see = true;
            for (let to_down = y + 1; to_down < height; to_down++) {
                if (arr[to_down][x] >= tree_height) can_see = false;
            }
            if (can_see) {
                total_trees_visible++;
                continue;
            }
        }
    }
    return total_trees_visible;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1849 ~17.8ms
    })();
}
