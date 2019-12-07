import {day, results, year} from '../index';
import {equation_one} from '../part_one';
import {read_input} from 'src/lib';

describe(`${year} - Day${day} Part One`, () => {
    it('for a mass of 12, expect 2', () => {
        expect(equation_one('12')).toStrictEqual(2);
    });
    it('for a mass of 14, expect 2', () => {
        expect(equation_one('14')).toStrictEqual(2);
    });
    it('for a mass of 1969, expect 654', () => {
        expect(equation_one('1969')).toStrictEqual(654);
    });
    it('for a mass of 100756, expect 33583', () => {
        expect(equation_one('100756')).toStrictEqual(33583);
    });
    it(`for the given input, expect ${results.one}`, async () => {
        expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
    });
});
