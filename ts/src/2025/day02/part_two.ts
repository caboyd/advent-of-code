import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

function count_digits(v: number): number {
    let digits = 0;
    while (v > 0) {
        v = Math.floor(v / 10);
        digits++;
    }
    return digits;
}

export const equation_two = (input: string): number => {
    let result = 0;
    const lines = input.split(',');
    for (const line of lines) {
        const [min, max] = line.split('-').map(Number);
        for (let num = min; num <= max; num++) {
            const num_digits = count_digits(num);
            const s = String(num);

            for (let sub_digits = 1; sub_digits <= Math.floor(num_digits / 2); sub_digits++) {
                let valid = true;
                if (num_digits % sub_digits == 0) {
                    const value = s.slice(0, sub_digits);
                    const first_value = value;
                    for (let sub_slice_index = sub_digits; sub_slice_index < num_digits; sub_slice_index += sub_digits) {
                        const sub_slice_value = s.slice(sub_slice_index, sub_slice_index + sub_digits);
                        if (sub_slice_value !== first_value) {
                            valid = false;
                            break;
                        }
                    }
                    if (valid) {
                        result += num;
                        break;
                    }
                }
            }
        }
    }
    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //31578210022 ~310ms
    })();
}
