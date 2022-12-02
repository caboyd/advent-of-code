import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    let most_calories = [0];
    input.split(/\r?\n\r?\n/).map((item, index, array) => {
        const calories = item
            .split(/\r?\n/)
            .map((s) => Number(s))
            .reduce((sum, cur) => (sum += cur), 0);
        if (calories > most_calories[0]) most_calories.unshift(calories);
        else if (calories > most_calories[1]) most_calories = [most_calories.shift()!, calories, ...most_calories];
        else if (calories > most_calories[2])
            most_calories = [most_calories.shift()!, most_calories.shift()!, calories, ...most_calories];
    });
    return most_calories[0] + most_calories[1] + most_calories[2];
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //206104 ~0.63049ms
    })();
}
