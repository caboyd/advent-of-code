import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    let result = 0;

    return result;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        // const input = 'target area: x=20..30, y=-10..-5';
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1334 ~43.6ms
    })();
}
