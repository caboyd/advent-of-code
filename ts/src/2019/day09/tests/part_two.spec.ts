import {day, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_two} from '../part_two';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_two, () => {
        it(`works with the given input, resolves ${results.two}`, async () => {
            expect(await equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
