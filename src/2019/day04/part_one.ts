import {benchmark, read_input} from '../../lib';
import {day, password_solver, year} from './index';

export const invariant_one = (digits: number[]): boolean => {
    let is_increasing = true;
    let has_doubles = false;
    for (let i = 1; i < digits.length; i++) {
        if (digits[i - 1] === digits[i]) has_doubles = true;
        if (digits[i] < digits[i - 1]) is_increasing = false;
    }
    return is_increasing && has_doubles;
};

export const equation_one = (input: string): number => {
    return password_solver(input, invariant_one);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${benchmark(() => equation_one(input))}`); //1955 ~29ms
    })();
}
