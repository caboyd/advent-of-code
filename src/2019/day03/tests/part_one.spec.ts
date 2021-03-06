import {day, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_one} from '../part_one';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect(equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });

        it(`works for example 1`, async () => {
            expect(equation_one('R8,U5,L5,D3\nU7,R6,D4,L4')).toStrictEqual(6);
        });

        it(`works for example 2`, async () => {
            expect(equation_one('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')).toStrictEqual(
                159,
            );
        });

        it(`works for example 2`, async () => {
            expect(
                equation_one('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'),
            ).toStrictEqual(135);
        });
    });
});
