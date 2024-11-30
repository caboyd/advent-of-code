import {IntCodeComputer} from '../IntCodeComputer';

describe(IntCodeComputer, () => {
    const pc_run_test = (test_data: number[][], pc: IntCodeComputer, program: number[], type: string): void => {
        beforeAll(() => {
            pc.load_program(program as number[]);
            pc.parameter_mode = type === 'immediate';
        });
        beforeEach(() => {
            pc.load_from_backup();
        });
        describe.each(test_data)('input %i', (input: number, expected: number) => {
            it(`outputs ${expected}`, async () => {
                pc.set_input_buffer([input]);
                await expect(await pc.run()).toStrictEqual(expected);
            });
        });
    };

    const pc = new IntCodeComputer([]);
    pc.silent_mode = true;

    describe(`Jump Tests`, () => {
        describe.each([
            ['position', [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]],
            ['immediate', [3, 3, 1108, -1, 8, 3, 4, 3, 99]],
        ])(`%s mode program that outputs 1 when input is equal to 8`, (type, program) =>
            pc_run_test(
                [
                    [8, 1],
                    [1, 0],
                    [9, 0],
                    [-8, 0],
                ],
                pc,
                program as number[],
                type as string,
            ),
        );

        describe.each([
            ['position', [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]],
            ['immediate', [3, 3, 1107, -1, 8, 3, 4, 3, 99]],
        ])(`%s mode program that outputs 1 when input is less than 8`, (type, program) => {
            pc_run_test(
                [
                    [8, 0],
                    [1, 1],
                    [9, 0],
                    [-8, 1],
                ],
                pc,
                program as number[],
                type as string,
            );
        });

        describe.each([
            ['position', [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]],
            ['immediate', [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]],
        ])(`%s mode program that outputs 0 when input is 0 and 1 when input is non zero`, (type, program) => {
            pc_run_test(
                [
                    [0, 0],
                    [1, 1],
                    [9, 1],
                    [-8, 1],
                ],
                pc,
                program as number[],
                type as string,
            );
        });
    });
});
