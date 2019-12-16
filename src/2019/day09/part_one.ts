import {benchmark, read_input} from '../../lib';
import {day, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const equation_one = async (input: string): Promise<number> => {
    const pc = IntCodeComputer.fromInput(input);

    return await pc.run();
};

if (require.main === module) {
    (async () => {
        // const input = await read_input(year, day);
        const input = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //
    })();
}
