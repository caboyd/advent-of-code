import {day, results, year} from '../index';
import {read_input} from '../../../lib';
import {equation_one} from '../part_one';

describe(`${year} - Day${day} Part One`, () => {
    describe(equation_one, () => {
        it(`works with the given input, resolves ${results.one}`, async () => {
            expect(await equation_one(await read_input(year, day))).toStrictEqual(results.one);
        });

        it('works for example 1', async () => {
            expect(
                await equation_one(`......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`),
            ).toStrictEqual(33);
        });
        it('works for example 2', async () => {
            expect(
                await equation_one(`#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`),
            ).toStrictEqual(35);
        });
        it('works for example 3', async () => {
            expect(
                await equation_one(`.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`),
            ).toStrictEqual(41);
        });
        it('works for example 4', async () => {
            expect(
                await equation_one(`.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`),
            ).toStrictEqual(210);
        });
    });
});
