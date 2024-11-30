import {day, DIGITS, num_to_digits, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_two, invariant_two} from '../part_two';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it(`works with the given input, resolves ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });

    describe(invariant_two, () => {
        it(`accepts example 1`, () => {
            expect(invariant_two(num_to_digits(112233, new Array(DIGITS)))).toEqual(true);
        });

        it(`rejects example 2`, () => {
            expect(invariant_two(num_to_digits(123444, new Array(DIGITS)))).toEqual(false);
        });

        it(`accepts example 3`, () => {
            expect(invariant_two(num_to_digits(111122, new Array(DIGITS)))).toEqual(true);
        });
    });
});
