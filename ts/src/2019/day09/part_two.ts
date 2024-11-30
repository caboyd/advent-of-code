import {benchmark, read_input} from '../../lib';
import {day, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const equation_two = async (input: string): Promise<number> => {
    const pc = IntCodeComputer.fromInput(input);
    pc.set_input_buffer([2]);
    pc.silent_mode = true;
    return await pc.run();
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_two(input))}`); //46470n ~60ms
    })();
}
