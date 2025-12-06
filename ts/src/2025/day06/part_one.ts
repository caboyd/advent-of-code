import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

type Equation = {
    numbers: number[];
    operator: string;
};

export const equation_one = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);
    const equations: Equation[] = [];

    for (const line of lines) {
        let equations_index = 0;
        const values = line.trim().split(/\s+/);
        for (const value of values) {
            let num = Number(value);
            if (!Number.isNaN(num)) {
                if (!equations[equations_index]) {
                    equations[equations_index] = {numbers: [], operator: ''};
                }
                equations[equations_index].numbers.push(Number(values[equations_index]));
            } else {
                if (equations[equations_index]) {
                    equations[equations_index].operator = values[equations_index];
                }
            }
            equations_index++;
        }
    }
    for (const equation of equations) {
        let accumulator = equation.operator === '+' ? 0 : 1;
        for (const num of equation.numbers) {
            accumulator = equation.operator === '+' ? accumulator + num : accumulator * num;
        }
        result += accumulator;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //4364617236318 ~1.77ms
    })();
}
