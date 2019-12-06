import {day, results, year} from "../index";
import {rocket_equation_two} from "../part_two";
import {read_input} from "src/lib";

describe(`${year} - Day${day} Part Two`, () => {
    describe('Rocket Equation', () => {
        it('for a mass of 14, expect 2', () => {
            expect(rocket_equation_two('14')).toStrictEqual(2);
        });
        it('for a mass of 1969, expect 966', () => {
            expect(rocket_equation_two('1969')).toStrictEqual(966);
        });
        it('for a mass of 100756, expect 50346', () => {
            expect(rocket_equation_two('100756')).toStrictEqual(50346);
        });
        it(`for the given input, expect ${results.two}`, async () => {
            expect(rocket_equation_two(await read_input(year, day))).toStrictEqual(results.two);
        })
    })
});
