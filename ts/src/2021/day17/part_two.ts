import {benchmark, read_input} from 'src/lib';
import {day, shoot, Target, year} from './index';

export const equation_two = (input: string): number => {
    input = input.slice(13);
    let [xs, ys] = input.split(', ').map((v) => v.slice(2));
    let [x_min, x_max] = xs.split('..').map(Number);
    let [y_min, y_max] = ys.split('..').map(Number);

    let t: Target = {x_min: x_min, x_max: x_max, y_min: y_min, y_max: y_max};

    let count = 0;
    for (let x_vel = 0; x_vel <= x_max; x_vel++) {
        for (let y_vel = -100; y_vel <= 100; y_vel++) {
            let result = shoot(x_vel, y_vel, t, 200);
            if (result.hit) count++;
        }
    }

    return count;
};
if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        // const input = 'target area: x=20..30, y=-10..-5';
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //1334 ~43.6ms
    })();
}
