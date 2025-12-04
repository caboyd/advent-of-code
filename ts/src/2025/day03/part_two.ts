import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);
    for (const line of lines) {
        let current_result = 0;
        let best_previous_index = 0;
        for (let digits_required_at_end = 11; digits_required_at_end >= 0; digits_required_at_end--) {
            let best_value = -1;

            for (
                let current_index = best_previous_index;
                current_index < line.length - digits_required_at_end;
                current_index++
            ) {
                const num = Number(line.at(current_index));
                if (num > best_value) {
                    best_value = num;
                    best_previous_index = current_index + 1;
                }
            }
            current_result += best_value * Math.pow(10, digits_required_at_end);
            best_value = 0;
        }
        result += current_result;
        current_result = 0;
        best_previous_index = 0;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //172119830406258 ~4.52ms
    })();
}
