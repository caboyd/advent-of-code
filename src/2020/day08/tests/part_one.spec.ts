import {day, results, year} from '../index';
import {equation_one} from '../part_one';
import {read_input} from '../../../lib';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works for example 1`, async () => {
            expect(
                equation_one(
                    'nop +0\n' +
                        'acc +1\n' +
                        'jmp +4\n' +
                        'acc +3\n' +
                        'jmp -3\n' +
                        'acc -99\n' +
                        'acc +1\n' +
                        'jmp -4\n' +
                        'acc +6',
                ),
            ).toStrictEqual(5);
        });

        it(`for the given input, expect ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });
    });
});
