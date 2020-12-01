import {Results} from 'src/lib';
import {IntCodeComputer} from '../../lib/IntCodeComputer/IntCodeComputer';

export const year = 2019;
export const day = 5;

export const part_one_input = 1;
export const part_two_input = 5;

export const results: Results = {
    one: 15426686,
    two: 11430197,
};

export const equation = async (input: string, input_buffer: number[] | undefined = undefined): Promise<number> => {
    const data = input.split(/,/).map((n) => Number(n));

    const pc = new IntCodeComputer(data);
    pc.parameter_mode = true;
    pc.silent_mode = true;
    if (input_buffer) pc.set_input_buffer(input_buffer);
    return await pc.run();
};
