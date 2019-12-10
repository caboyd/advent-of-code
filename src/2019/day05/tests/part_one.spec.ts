import {day, part_one_input, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation} from '../index';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect(await equation(await read_input(year, day), [part_one_input])).toStrictEqual(results.one);
        });
    });
});
