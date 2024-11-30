import {day, results, year} from '../index';
import {equation_one} from '../part_one';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it('works for example 1', () => {
            expect(equation_one('12')).toStrictEqual(2);
        });
        it('works for example 2', () => {
            expect(equation_one('14')).toStrictEqual(2);
        });
        it('works for example 3', () => {
            expect(equation_one('1969')).toStrictEqual(654);
        });
        it('works for example 4', () => {
            expect(equation_one('100756')).toStrictEqual(33583);
        });
        it(`for the given input, expect ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
    });
});
