import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let most_calories = 0;
    input.split(/(\r?\n){2}/).map((item, index, array) => {
        const calories = item
            .trim()
            .split(/\r?\n/)
            .map((s) => Number(s))
            .reduce((sum, cur) => (sum += cur), 0);
        if (calories > most_calories) most_calories = calories;
    });
    return most_calories;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //69310 ~0.667ms
    })();
}
