import {day, year} from '../index';
import {equation_two} from '../part_two';

describe(`${year} - Day${day} Part Two`, () => {
    describe(equation_two, () => {
        it('works for example 1', () => {
            expect(equation_two('0')).toStrictEqual(0);
        });

    });
});
