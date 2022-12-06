import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/);
    let result = 0;
    for (const line of arr) {
        const [first, second] = line.trim().split(',');
        const [first_a, first_b] = first.split('-').map(Number);
        const [second_a, second_b] = second.split('-').map(Number);
        if (Math.min(first_b, second_b) >= Math.max(first_a, second_a)) result++;
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //876 ~2.28ms
    })();
}
