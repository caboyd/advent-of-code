import {day, results, year} from '../index';
import {equation_two} from '../part_two';
import {read_input} from '../../../lib';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it('works for example 1', () => {
            expect(
                equation_two(
                    'shiny gold bags contain 2 dark red bags.\n' +
                        'dark red bags contain 2 dark orange bags.\n' +
                        'dark orange bags contain 2 dark yellow bags.\n' +
                        'dark yellow bags contain 2 dark green bags.\n' +
                        'dark green bags contain 2 dark blue bags.\n' +
                        'dark blue bags contain 2 dark violet bags.\n' +
                        'dark violet bags contain no other bags.',
                ),
            ).toStrictEqual(126);
        });
        it(`for the given input, expect ${results.two}`, async () => {
            expect(equation_two(await read_input(year, day))).toStrictEqual(results.two);
        });
    });
});
