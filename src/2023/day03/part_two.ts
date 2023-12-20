import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

function findNumber(line: string[], x: number): [number, number] {
    let chars = line[x];
    //find digits to the left
    let xi = x - 1;
    while (line[xi] && line[xi].match(/\d/)) {
        let c = line[xi];
        chars = '' + c + chars;
        xi -= 1;
    }
    //find digits to the right
    xi = x + 1;
    while (line[xi] && line[xi].match(/\d/)) {
        let c = line[xi];
        chars = chars + (c + '');
        xi += 1;
    }
    return [+chars, xi - 1];
}

function findAllNumbers(grid: string[][], x: number, y: number, symbol: string) {
    //...
    //.*.
    //...
    let line;
    let numbers = [];
    let ys = [y - 1, y, y + 1];
    for (const yi of ys) {
        line = grid[yi];
        if (line == undefined) continue;
        for (let xi = x - 1; xi <= x + 1; xi++) {
            if (line[xi] && line[xi].match(/\d/)) {
                let [num, new_xi] = findNumber(line, xi);
                numbers.push(num);
                xi = new_xi;
            }
        }
    }
    let temp_mult = 1;
    for (const num of numbers) {
        if (symbol == '*') {
            temp_mult *= num;
        }
    }
    if (symbol == '*' && numbers.length > 1) {
        result += temp_mult;
    }
}

let result = 0;
export const equation_two = (input: string): number => {
    result = 0;
    const grid = input.split(/\r?\n/).map((line) => line.split(''));
    const width = grid[0].length;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x].match(/\%|\@|\#|\$|\&|\*|\+|\-|\=|\//)) {
                findAllNumbers(grid, x, y, grid[y][x]);
            }
        }
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //86879020 ~6.54ms
    })();
}
