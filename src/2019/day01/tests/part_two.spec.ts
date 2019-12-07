import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it('works for example 1', () => {
            expect(equation_two('14')).toStrictEqual(2);
        });
        it('works for example 2', () => {
            expect(equation_two('1969')).toStrictEqual(966);
        });
        it('works for example 3', () => {
            expect(equation_two('100756')).toStrictEqual(50346);
        });
        it(`for the given input, expect ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
