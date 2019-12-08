import {day, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_one} from '../part_one';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
    });


});
