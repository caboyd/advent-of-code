import {day, results, year} from "../index";
import {rocket_equation} from "../part_one";
import {read_input} from "src/lib";

describe(`${year} - Day${day} Part One`, () => {
    describe('Rocket Equation', () => {
        it('for a mass of 12, expect 2', () => {
            expect(rocket_equation('12')).toStrictEqual(2);
        });
        it('for a mass of 14, expect 2', () => {
            expect(rocket_equation('14')).toStrictEqual(2);
        });
        it('for a mass of 1969, expect 654', () => {
            expect(rocket_equation('1969')).toStrictEqual(654);
        });
        it('for a mass of 100756, expect 33583', () => {
            expect(rocket_equation('100756')).toStrictEqual(33583);
        });
        it(`for the given input, expect ${results.one}`, async () => {
            expect(rocket_equation(await read_input(year, day))).toStrictEqual(results.one);
        })
    })
});