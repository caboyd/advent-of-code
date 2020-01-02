import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

type Vec2 = [number, number];

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

export const equation_one = async (input: string): Promise<number> => {
    const data = input.split(/\r?\n/).map(n => n.split(''));
    const copy = input.split(/\r?\n/).map(n => n.split(''));

    const WIDTH = data[0].length;
    const HEIGHT = data.length;

    let count = 0;

    function find_and_block_rocks(data: string[][], station: Vec2, rock_spot: Vec2): boolean {
        if (data[rock_spot[1]][rock_spot[0]] !== '#') {
            return false;
        }
        data[rock_spot[1]][rock_spot[0]] = 'G';
        //found one in line of sigh
        //block all ones along path
        const gcd1 = gcd(Math.abs(rock_spot[0] - station[0]), Math.abs(rock_spot[1] - station[1]));
        const x_factor = (rock_spot[0] - station[0]) / gcd1;
        const y_factor = (rock_spot[1] - station[1]) / gcd1;
        for (
            let x = station[0] + x_factor * 2, y = station[1] + y_factor * 2;
            y < HEIGHT && x < WIDTH && x >= 0 && y >= 0;
            x += x_factor, y += y_factor
        ) {
            if (data[y][x] === '#') data[y][x] = 'B';
        }
        return true;
    }

    for (let start_y = 0; start_y < HEIGHT; start_y++) {
        for (let start_x = 0; start_x < WIDTH; start_x++) {
            const station: Vec2 = [start_x, start_y];
            const item = data[start_y][start_x];
            if (item !== '#') continue;
            let curr_count = 0;

            //to the right
            for (let i = start_x + 1; i <= WIDTH - 1; i++)
                if (find_and_block_rocks(data, station, [i, start_y])) curr_count++;
            //to the left
            for (let i = start_x - 1; i >= 0; i--) if (find_and_block_rocks(data, station, [i, start_y])) curr_count++;
            //all lines below
            for (let y = start_y + 1; y <= HEIGHT - 1; y++)
                for (let x = 0; x <= WIDTH - 1; x++) {
                    if (find_and_block_rocks(data, station, [x, y])) curr_count++;
                }
            //all lines above
            for (let y = start_y - 1; y >= 0; y--)
                for (let x = 0; x <= WIDTH - 1; x++) {
                    if (find_and_block_rocks(data, station, [x, y])) curr_count++;
                }

            count = Math.max(count, curr_count);
            for (let i = 0; i < data.length; i++) for (let j = 0; j < data[i].length; j++) data[i][j] = copy[i][j];
        }
    }

    return count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //
    })();
}
