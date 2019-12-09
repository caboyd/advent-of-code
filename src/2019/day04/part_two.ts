import {benchmark, read_input} from '../../lib';
import {day, password_solver, year} from './index';

export const invariant_two = (digits: number[]): boolean => {
    let is_increasing = true;
    let has_doubles = false;
    let double_digit = -1;
    for (let i = 1; i < digits.length; i++) {
        if (has_doubles) {
            if (digits[i] === double_digit) has_doubles = false;
        } else {
            if (digits[i - 1] === digits[i] && digits[i] !== double_digit) {
                has_doubles = true;
                double_digit = digits[i];
            }
        }
        if (digits[i] < digits[i - 1]) is_increasing = false;
    }
    return is_increasing && has_doubles;
};

export const equation_two = (input: string): number => {
    return password_solver(input, invariant_two);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1319 ~34ms
    })();
}
