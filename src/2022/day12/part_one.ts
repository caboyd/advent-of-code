import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let lines = input.split(/\r?\n/);
    let width = lines[0].length;
    let height = lines.length;
    let start: [number, number] = [0, 0];
    let end: [number, number] = [0, 0];

    let height_map = lines.map((line) => line.split('').map((c) => c.charCodeAt(0)));
    let direction_map: string[][] = Array(height)
        .fill(0)
        .map((_) => new Array(width).fill('.'));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let char = height_map[y][x];
            //S
            if (char == 83) {
                start = [x, y];
                height_map[y][x] = 97; //a
            }
            //E
            if (char == 69) {
                end = [x, y];
                height_map[y][x] = 122; //z
                direction_map[y][x] = 'E';
            }
        }
    }

    //breadth first search fill the direction map
    let valid_list: [number, number][] = [[end[0], end[1]]];
    while (valid_list.length > 0) {
        const loc = valid_list.shift()!;
        const current = height_map[loc[1]][loc[0]];
        //look in four direction
        const east = height_map[loc[1]][loc[0] + 1];
        const east_dir = direction_map[loc[1]][loc[0] + 1];
        if (east !== undefined && east_dir == '.') {
            if (east >= current - 1) {
                direction_map[loc[1]][loc[0] + 1] = '<';
                valid_list.push([loc[0] + 1, loc[1]]);
            }
        }
        const west = height_map[loc[1]][loc[0] - 1];
        const west_dir = direction_map[loc[1]][loc[0] - 1];
        if (west !== undefined && west_dir == '.') {
            if (west >= current - 1) {
                direction_map[loc[1]][loc[0] - 1] = '>';
                valid_list.push([loc[0] - 1, loc[1]]);
            }
        }
        if (height_map[loc[1] - 1]) {
            const north = height_map[loc[1] - 1][loc[0]];
            const north_dir = direction_map[loc[1] - 1][loc[0]];
            if (north !== undefined && north_dir == '.') {
                if (north >= current - 1) {
                    direction_map[loc[1] - 1][loc[0]] = 'v';
                    valid_list.push([loc[0], loc[1] - 1]);
                }
            }
        }
        if (height_map[loc[1] + 1]) {
            const south = height_map[loc[1] + 1][loc[0]];
            const south_dir = direction_map[loc[1] + 1][loc[0]];
            if (south !== undefined && south_dir == '.') {
                if (south >= current - 1) {
                    direction_map[loc[1] + 1][loc[0]] = '^';
                    valid_list.push([loc[0], loc[1] + 1]);
                }
            }
        }
    }

    //follow path
    let steps = 0;
    while (true) {
        let current = direction_map[start[1]][start[0]];
        if (current == 'E') break;
        switch (current) {
            case '>':
                start[0]++;
                break;
            case '<':
                start[0]--;
                break;
            case '^':
                start[1]--;
                break;
            case 'v':
                start[1]++;
                break;
        }
        steps++;
    }

    return steps;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //462 ~3.65ms
    })();
}
