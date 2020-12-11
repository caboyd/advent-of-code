import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from '../../../lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it('works for example 1', () => {
            expect(
                equation_two(
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
            ).toStrictEqual(8);
        });
        it(`for the given input, expect ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
