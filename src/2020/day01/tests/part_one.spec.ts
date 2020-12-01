import {day, results, year} from '../index';
import {equation_one} from '../part_one';
import {read_input} from '../../../lib';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`for the given input, expect ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
    });
});
