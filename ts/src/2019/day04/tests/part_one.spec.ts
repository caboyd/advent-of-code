import {day, DIGITS, num_to_digits, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_one, invariant_one} from '../part_one';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
    });

    describe(invariant_one, () => {
        it(`accepts example 1`, () => {
            expect(invariant_one(num_to_digits(111111, new Array(DIGITS)))).toEqual(true);
        });

        it(`rejects example 2`, () => {
            expect(invariant_one(num_to_digits(223450, new Array(DIGITS)))).toEqual(false);
        });

        it(`rejects example 3`, () => {
            expect(invariant_one(num_to_digits(123789, new Array(DIGITS)))).toEqual(false);
        });
    });
});
