import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

type Vec2 = [number, number];

const STATION_X = 29;
const STATION_Y = 28;
const ROCK_200 = 200;

export const equation_two = async (input: string, station_x: number, station_y: number): Promise<number> => {
    const data = input.split(/\r?\n/).map((n) => n.split(''));

    const WIDTH = data[0].length;
    const HEIGHT = data.length;

    const angle_map = new Map<number, Vec2[]>();

    const insert = (angle: number, rock: Vec2): void => {
        const pos = angle_map.get(angle);
        if (pos !== undefined) pos.push(rock);
        else angle_map.set(angle, [rock]);
    };

    const is_rock = (x: number, y: number): boolean => {
        return data[y][x] === '#';
    };

    //because top left is 0,0
    //x:0,y:-1 is 0 rads
    //increasing clockwise
    const get_angle = (x: number, y: number): number => {
        if (x < 0) return Math.atan2(x, -y) + Math.PI * 2;
        else return Math.atan2(x, -y);
    };

    //Count rocks visible from this station location
    const generate_rock_angle_map = (station_x: number, station_y: number): void => {
        //rocks to the right of station
        for (let x = station_x + 1; x <= WIDTH - 1; x++) {
            if (is_rock(x, station_y)) insert(get_angle(x - station_x, station_y - station_y), [x, station_y]);
        }
        // //rocks to the left of station
        for (let x = station_x - 1; x >= 0; x--) {
            if (is_rock(x, station_y)) insert(get_angle(x - station_x, station_y - station_y), [x, station_y]);
        }
        //all rock lines below station (left to right)
        for (let y = station_y + 1; y <= HEIGHT - 1; y++)
            for (let x = 0; x <= WIDTH - 1; x++) {
                if (is_rock(x, y)) insert(get_angle(x - station_x, y - station_y), [x, y]);
            }
        //all rock lines above station (left to right)
        for (let y = station_y - 1; y >= 0; y--)
            for (let x = 0; x <= WIDTH - 1; x++) {
                if (is_rock(x, y)) insert(get_angle(x - station_x, y - station_y), [x, y]);
            }
    };

    generate_rock_angle_map(station_x, station_y);
    // for (const [key, value] of angle_map.entries()) {
    //     console.log(`angle: ${key}, rock: ${value}`);
    // }
    //
    const sorted = new Map([...angle_map.entries()].sort());

    let count = 0;
    let rock_200: Vec2 | undefined = [0, 0];
    until_200: do {
        for (const [key, value] of sorted.entries()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            rock_200 = value.shift()!;
            count++;
            if (count === ROCK_200) break until_200;
            if (!value.length) sorted.delete(key);
        }
    } while (true);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return rock_200[0] * 100 + rock_200[1];
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_two(input, STATION_X, STATION_Y))}`); //17,7 2.7ms
    })();
}
