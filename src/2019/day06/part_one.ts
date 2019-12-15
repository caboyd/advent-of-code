import {benchmark, read_input} from '../../lib';
import {day, OrbitObject, year} from './index';

export const equation_one = (input: string): number => {
    const oo = OrbitObject.fromInput(input);
    return oo.get_orbits();
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //387356 ~3 ms
    })();
}
