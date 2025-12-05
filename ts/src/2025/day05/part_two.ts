import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';
import {skip} from 'node:test';

type Range = {
    min: number;
    max: number;
    skip: boolean;
};

export const equation_two = (input: string): number => {
    let result = 0;
    const sections = input.split(/\r?\n\r?\n/);
    const range_lines = sections[0].split(/\r?\n/);
    const food_lines = sections[1].split(/\r?\n/);

    let ranges: Range[] = new Array(range_lines.length).fill(0).map(() => ({}) as Range);

    for (let line_index = 0; line_index < range_lines.length; ++line_index) {
        const line = range_lines[line_index];
        const [min, max] = line.split('-').map(Number);
        ranges[line_index].min = min;
        ranges[line_index].max = max;
    }
    ranges = ranges.sort((a: Range, b: Range) => a.min - b.min);

    for (let outer_range_index = 0; outer_range_index < ranges.length; ++outer_range_index) {
        const outer_range = ranges[outer_range_index];
        for (let range_index = outer_range_index + 1; range_index < ranges.length; ++range_index) {
            const range = ranges[range_index];
            if (range.skip) {
                continue;
            } else if (range.min > outer_range.max) {
                break;
            } else if (range.min >= outer_range.min && range.max <= outer_range.max) {
                //range inside another we can skip it in future
                range.skip = true;
            } else if (range.max > outer_range.max && range.min >= outer_range.min && range.min <= outer_range.max) {
                //range has higher max but min is between outer min and max
                //we need to expand the outer range to encompass it
                outer_range.max = range.max;
                //now we can skip this range
                range.skip = true;
            }
        }
        if (!outer_range.skip) result += outer_range.max - outer_range.min + 1;
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //358155203664116 ~0.44ms
    })();
}
