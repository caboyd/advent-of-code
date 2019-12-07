import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it(`works for the given input, resolves ${results.two}`, async () => {
            expect(await equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
