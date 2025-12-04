import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    let result = 0;
    const lines = input.split(/\r?\n/);
    for (const line of lines) {
        let best_first = -1;
        let best_first_index = -1;
        let first_index = 0;
        for (first_index; first_index < line.length - 1; first_index++) {
            const num = Number(line.at(first_index));
            if (num > best_first) {
                best_first = num;
                best_first_index = first_index;
            }
        }
        let best_second = -1;
        let best_second_index = -1;
        for (let second_index = best_first_index + 1; second_index < line.length; second_index++) {
            const num = Number(line.at(second_index));
            if (num > best_second) {
                best_second = num;
                best_second_index = second_index;
            }
        }

        result += best_first * 10 + best_second;
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //17376 ~1.55ms
    })();
}
