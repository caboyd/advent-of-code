import {day, results, year} from '../index';
import {equation_one} from '../part_one';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect((await equation_one(await read_input(year, day), 12, 2))[0]).toStrictEqual(results.one);
        });

        it('works for example 0', async () => {
            // prettier-ignore
            expect(await equation_one('1,9,10,3,2,3,11,0,99,30,40,50')).toStrictEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
        });

        it('works for example 1', async () => {
            expect(await equation_one('1,0,0,0,99')).toStrictEqual([2, 0, 0, 0, 99]);
        });

        it('works for example 2', async () => {
            expect(await equation_one('2,3,0,3,99')).toStrictEqual([2, 3, 0, 6, 99]);
        });

        it('works for example 3', async () => {
            expect(await equation_one('2,4,4,5,99,0')).toStrictEqual([2, 4, 4, 5, 99, 9801]);
        });

        it('works for example 4', async () => {
            expect(await equation_one('1,1,1,4,99,5,6,0,99')).toStrictEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
        });
    });
});
