import {day, results, year} from '../index';
import {equation_one} from '../part_one';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it('works for example 1', () => {
            expect(
                // prettier-ignore
                equation_one(
`987654321111111
811111111111119
234234234234278
818181911112111`),
            ).toStrictEqual(357);
        });
        it(`for the given input, expect ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
    });
});
