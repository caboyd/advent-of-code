import {day, results, year} from '../index';
import {equation_one} from '../part_one';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it('works for example 1', () => {
            expect(
                // prettier-ignore
                equation_one(
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`),
            ).toStrictEqual(142);
        });
        it(`for the given input, expect ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
    });
});
