import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);
    outer: for (const line of lines) {
        const s = line.split(': ');
        const id = s[0].match(/\d+/)![0];
        const sets = s[1].split('; ');
        for (const set of sets) {
            let red = 12;
            let green = 13;
            let blue = 14;
            const cubes = set.split(', ');
            for (const cube of cubes) {
                let [num, color] = cube.split(' ');
                switch (color) {
                    case 'blue':
                        blue -= +num;
                        break;
                    case 'green':
                        green -= +num;
                        break;
                    case 'red':
                        red -= +num;
                        break;
                }
            }

            if (red < 0 || green < 0 || blue < 0) continue outer;
        }
        result += Number(id);
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //2541 ~1.14ms
    })();
}
