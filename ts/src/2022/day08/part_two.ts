import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/).map((arr) => arr.split('').map(Number));
    let height = arr.length;
    let width = arr[0].length;
    let best_score = 0;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const tree = arr[y][x];
            let score = 1;
            let trees_can_see = 0;

            for (let to_left = x - 1; to_left >= 0; to_left--) {
                trees_can_see++;
                if (arr[y][to_left] >= tree) break;
            }

            score *= trees_can_see;
            trees_can_see = 0;

            for (let to_right = x + 1; to_right < width; to_right++) {
                trees_can_see++;
                if (arr[y][to_right] >= tree) break;
            }

            score *= trees_can_see;
            trees_can_see = 0;

            for (let to_up = y - 1; to_up >= 0; to_up--) {
                trees_can_see++;
                if (arr[to_up][x] >= tree) break;
            }

            score *= trees_can_see;
            trees_can_see = 0;

            for (let to_down = y + 1; to_down < height; to_down++) {
                trees_can_see++;
                if (arr[to_down][x] >= tree) break;
            }

            score *= trees_can_see;
            best_score = Math.max(best_score, score);
        }
    }
    return best_score;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //201600 ~4.57
    })();
}
