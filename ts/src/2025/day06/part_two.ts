import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);

    const operator_line_y_index = lines.length - 1;
    const operator_line = lines[operator_line_y_index];
    let next_row_end_index = operator_line.length - 1;

    //walk the line backwards
    while (next_row_end_index >= 0) {
        let operator_x_index = next_row_end_index;
        let row_end_index = next_row_end_index;
        let operator = '';

        while ((operator = operator_line[operator_x_index]) == ' ') {
            operator_x_index--;
        }
        //to skip over one space and onto next equation
        next_row_end_index = operator_x_index - 2;

        let accumulator = operator === '+' ? 0 : 1;

        for (let row_index = row_end_index; row_index >= operator_x_index; row_index--) {
            let column = '';
            for (let y_index = 0; y_index < operator_line_y_index; y_index++) {
                const value = lines[y_index][row_index];
                if (!Number.isNaN(Number(value))) column += value;
            }
            const column_value = Number(column);
            accumulator = operator === '+' ? accumulator + column_value : accumulator * column_value;
        }

        result += accumulator;
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //9077004354241 ~1.12ms
    })();
}
