import {benchmark, read_input} from '../../lib';
import {day, year} from './index';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const equation_one = async (input: string): Promise<number> => {
    const data = input.split(/,/).map(n => Number(n));

    const pc = new IntCodeComputer(data);
    pc.parameter_mode = true;
    pc.set_input_buffer([1]);
    return await pc.run();
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //15426686 ~2.8ms
    })();
}
