import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

function getManhattanDist(x1: number, y1: number, x2: number, y2: number) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

export const equation_one = (input: string): number => {
    let lines = input.split(/\r?\n/);

    let target_row = 2000000;
    let sensor_markers = new Set();

    for (const line of lines) {
        let [a, b] = line.split(': closest beacon is at ');
        a = a.split('Sensor at ')[1];
        let [x1, y1] = a.split(', ').map((s) => Number(s.slice(2)));
        let [x2, y2] = b.split(', ').map((s) => Number(s.slice(2)));

        const dist = getManhattanDist(x1, y1, x2, y2);
        const remaining_dist = dist - Math.abs(y1 - target_row);
        if (remaining_dist <= 0) continue;
        if (y1 + dist >= target_row && y1 - dist <= target_row) {
            for (let x = x1 - remaining_dist; x < x1 + remaining_dist; x++) {
                sensor_markers.add(x);
            }
        }
    }

    return sensor_markers.size;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //4737567 ~1333.82ms
    })();
}
