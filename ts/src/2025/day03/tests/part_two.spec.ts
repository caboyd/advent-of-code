import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it('works for example 1', () => {
            expect(
                // prettier-ignore
                equation_two(
`987654321111111
811111111111119
234234234234278
818181911112111`),
            ).toStrictEqual(3121910778619);
        });
        it(`for the given input, expect ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
