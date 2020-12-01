import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

export const equation_one = async (input: string): Promise<number> => {
    const data = input.split(/\r?\n/).map((n) => n.split(''));
    const copy = JSON.parse(JSON.stringify(data));

    const WIDTH = data[0].length;
    const HEIGHT = data.length;

    const block_rocks = (station_x: number, station_y: number, rock_x: number, rock_y: number): boolean => {
        const rock_relative_to_station = [rock_x - station_x, rock_y - station_y];
        const gcd1 = gcd(Math.abs(rock_relative_to_station[0]), Math.abs(rock_relative_to_station[1]));
        const x_factor = rock_relative_to_station[0] / gcd1;
        const y_factor = rock_relative_to_station[1] / gcd1;
        //Now that we have the multiples of x and y we can jump along the path and block all rocks behind this one
        for (
            let x = rock_x + x_factor, y = rock_y + y_factor;
            y < HEIGHT && x < WIDTH && x >= 0 && y >= 0;
            x += x_factor, y += y_factor
        ) {
            if (data[y][x] === '#') data[y][x] = 'B';
        }
        return true;
    };

    const is_rock = (x: number, y: number, station_x: number, station_y: number): boolean => {
        if (data[y][x] !== '#') return false;
        data[y][x] = 'G';
        block_rocks(station_x, station_y, x, y);
        return true;
    };

    //Count rocks visible from this station location
    const count_rocks = (station_x: number, station_y: number): number => {
        let count = 0;
        //rocks to the right of station
        for (let i = station_x + 1; i <= WIDTH - 1; i++) {
            if (is_rock(i, station_y, station_x, station_y)) count++;
        }
        //rocks to the left of station
        for (let i = station_x - 1; i >= 0; i--) {
            if (is_rock(i, station_y, station_x, station_y)) count++;
        }
        //all rock lines below station (left to right)
        for (let y = station_y + 1; y <= HEIGHT - 1; y++)
            for (let x = 0; x <= WIDTH - 1; x++) {
                if (is_rock(x, y, station_x, station_y)) count++;
            }
        //all rock lines above station (left to right)
        for (let y = station_y - 1; y >= 0; y--)
            for (let x = 0; x <= WIDTH - 1; x++) {
                if (is_rock(x, y, station_x, station_y)) count++;
            }
        return count;
    };

    let best_count = 0;
    for (let station_y = 0; station_y < HEIGHT; station_y++) {
        for (let station_x = 0; station_x < WIDTH; station_x++) {
            const item = data[station_y][station_x];
            //not a station
            if (item !== '#') continue;
            const count = count_rocks(station_x, station_y);

            best_count = Math.max(best_count, count);
            //reset data
            for (let i = 0; i < data.length; i++) for (let j = 0; j < data[i].length; j++) data[i][j] = copy[i][j];
        }
    }

    return best_count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //256 rocks @ [29,28] 22ms
    })();
}
