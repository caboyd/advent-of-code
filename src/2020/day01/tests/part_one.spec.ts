import {day, year} from '../index';
import {equation_one} from '../part_one';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it('works for example 1', () => {
            expect(equation_one('0')).toStrictEqual(0);
        });

    });
});
