import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from '../../../lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it(`for the given input, expect ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
