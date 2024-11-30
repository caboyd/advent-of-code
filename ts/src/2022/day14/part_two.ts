import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

type vec2 = {
    x: number;
    y: number;
};

export const equation_two = (input: string): number => {
    let lines = input.split(/\r?\n/);

    let min_y = 0;
    let max_y = 182;
    let min_x = 490 - max_y;
    let max_x = 573 + max_y;
    let floor = max_y + 2;

    //create array
    let arr = new Array(floor + 2 - min_y).fill(0).map((_) => new Array(max_x + 2 - min_x).fill('.'));
    arr[floor] = new Array(max_x + 2 - min_x).fill('#');

    for (const line of lines) {
        const coords = line.split(' -> ');
        for (let i = 0; i < coords.length - 1; i++) {
            let [x0, y0] = coords[i].split(',').map(Number);
            let [x1, y1] = coords[i + 1].split(',').map(Number);
            x0 -= min_x;
            x1 -= min_x;
            if (x0 == x1) {
                //vertical
                if (y0 > y1) [y0, y1] = [y1, y0]; //swap so smaller to larger always
                for (let y = y0; y <= y1; y++) arr[y][x0] = '#';
            } else if (y0 === y1) {
                //horizontal
                if (x0 > x1) [x0, x1] = [x1, x0]; //swap so smaller to larger always
                for (let x = x0; x <= x1; x++) arr[y0][x] = '#';
            }
        }
    }

    let count = 0;
    //drop sand
    outer: do {
        let settled = false;
        let sand: vec2 = {x: 500 - min_x, y: 0};
        while (!settled) {
            //check below sand
            if (arr[sand.y + 1][sand.x] == '.') {
                //move sand
                sand.y++;
            } else if (arr[sand.y + 1][sand.x - 1] == '.') {
                sand.y++;
                sand.x--;
            } else if (arr[sand.y + 1][sand.x + 1] == '.') {
                sand.y++;
                sand.x++;
            } else {
                //   console.log(`x:${sand.x}, y:${sand.y}`);
                arr[sand.y][sand.x] = 'O';
                settled = true;
                count++;
                if (sand.x === 500 - min_x && sand.y === 0) break outer;
            }
        }
    } while (true);

    return count;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //32041 ~28.21ms
    })();
}
