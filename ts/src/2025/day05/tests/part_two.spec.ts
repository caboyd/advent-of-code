import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it('works for example 1', () => {
            expect(
                // prettier-ignore
                equation_two(
`3-5
10-14
16-20
12-18

1
5
8
11
17
32`),
            ).toStrictEqual(14);
        });
        it(`for the given input, expect ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
