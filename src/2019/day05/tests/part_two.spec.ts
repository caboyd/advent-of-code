import {day, equation, results, year} from '../index';
import {read_input} from '../../../lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation, () => {
        it(`works with the given input, resolves ${results.two}`, async () => {
            expect(await equation(await read_input(year, day), [5])).toStrictEqual(results.two);
        });
    });
});
