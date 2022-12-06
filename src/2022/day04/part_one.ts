import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

function is_between(x: number, first: number, second: number) {
    return x >= first && x <= second;
}

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/);
    let result = 0;
    for (const line of arr) {
        const [first, second] = line.trim().split(',');
        const [first_a, first_b] = first.split('-').map(Number);
        const [second_a, second_b] = second.split('-').map(Number);
        if (is_between(first_a, second_a, second_b) && is_between(first_b, second_a, second_b)) {
            result++;
            continue;
        }
        if (is_between(second_a, first_a, first_b) && is_between(second_b, first_a, first_b)) {
            result++;
            continue;
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //556 ~2.362ms
    })();
}
