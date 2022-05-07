import {benchmark, read_input} from 'src/lib';
import {day, flash, year} from './index';

export const equation_two = (input: string): number => {
    const arr = input.split(/\r?\n/).map((x) => x.trim().split('').map(Number));

    let count = 0;
    for (let i = 0; ; i++) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                arr[y][x]++;
                if (arr[y][x] === 10) {
                    flash(arr, x, y);
                }
            }
        }
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (arr[y][x] < 0) {
                    arr[y][x] = 0;
                    count++;
                }
            }
        }
        if (count === 100) return i + 1;
        count = 0;
    }

    return 0;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //510 ~8.01ms
    })();
}
