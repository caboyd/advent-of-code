import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);
    outer: for (const line of lines) {
        const s = line.split(': ');
        const sets = s[1].split('; ');
        let max_red = 0;
        let max_green = 0;
        let max_blue = 0;
        for (const set of sets) {
            const cubes = set.split(', ');
            for (const cube of cubes) {
                let [num, color] = cube.split(' ');
                switch (color) {
                    case 'blue':
                        max_blue = Math.max(max_blue, Number(num));
                        break;
                    case 'green':
                        max_green = Math.max(max_green, Number(num));
                        break;
                    case 'red':
                        max_red = Math.max(max_red, Number(num));
                        break;
                }
            }
        }
        result += max_red * max_green * max_blue;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //66016 ~1.33ms
    })();
}
