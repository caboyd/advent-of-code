import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

type Range = {
    min: number;
    max: number;
};

export const equation_one = (input: string): number => {
    let result = 0;
    const sections = input.split(/\r?\n\r?\n/);
    const range_lines = sections[0].split(/\r?\n/);
    const food_lines = sections[1].split(/\r?\n/);

    const ranges: Range[] = new Array(range_lines.length).fill(0).map(() => ({}) as Range);

    for (let line_index = 0; line_index < range_lines.length; ++line_index) {
        const line = range_lines[line_index];
        const [min, max] = line.split('-').map(Number);
        ranges[line_index].min = min;
        ranges[line_index].max = max;
    }
    for (const line of food_lines) {
        const food_id = Number(line);

        for (const range of ranges) {
            if (food_id >= range.min && food_id <= range.max) {
                result++;
                break;
            }
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //679 ~6.82ms
    })();
}
