import {benchmark, read_input} from 'src/lib';
import {day, shoot, Target, year} from './index';

export const equation_one = (input: string): number => {
    input = input.slice(13);
    let [xs, ys] = input.split(', ').map((v) => v.slice(2));
    let [x_min, x_max] = xs.split('..').map(Number);
    let [y_min, y_max] = ys.split('..').map(Number);

    let t: Target = {x_min: x_min, x_max: x_max, y_min: y_min, y_max: y_max};

    let max_y = 0;
    for (let x_vel = 0; x_vel <= x_max; x_vel++) {
        for (let y_vel = -100; y_vel <= 100; y_vel++) {
            let result = shoot(x_vel, y_vel, t, 200);
            if (result.hit) max_y = Math.max(result.max_y, max_y);
        }
    }

    return max_y;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //2628 ~44.2ms
    })();
}
