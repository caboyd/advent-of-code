import {day, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_one} from '../part_one';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect(await equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
        it('works for example 1', async () => {
            expect(await equation_one('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0')).toStrictEqual(43210);
        });

        it('works for example 2', async () => {
            expect(
                await equation_one('3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'),
            ).toStrictEqual(54321);
        });

        it('works for example 3', async () => {
            expect(
                await equation_one(
                    '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,' +
                        '1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0',
                ),
            ).toStrictEqual(65210);
        });
    });
});
