import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it('works for example 1', () => {
            expect(
                // prettier-ignore
                equation_two(
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`),
            ).toStrictEqual(5905);
        });
        it(`for the given input, expect ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
