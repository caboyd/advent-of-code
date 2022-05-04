import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';
import {equation_one} from './part_one';

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);

    const num_to_find = equation_one(input);

    //find contiguous numbers
    for (let i = 0; i < lines.length; i++) {
        let sum = 0;
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (let j = i; sum < num_to_find; j++) {
            sum += Number(lines[j]);
            min = Math.min(Number(lines[j]), min);
            max = Math.max(Number(lines[j]), max);
            if (sum === num_to_find) return min + max;
        }
    }

    return 0;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //2980044 10.8ms
    })();
}
