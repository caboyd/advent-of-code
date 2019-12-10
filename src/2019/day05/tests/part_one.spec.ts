import {day, part_one_input, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_one} from '../part_one';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect(await equation_one(await read_input(year, day), [part_one_input])).toStrictEqual(results.one);
        });
    });
});
