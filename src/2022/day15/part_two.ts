import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

const MAX_SIZE = 4000000;

function getManhattanDist(x1: number, y1: number, x2: number, y2: number) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

function getManhattanDistBS(bs: BeaconSensor) {
    return Math.abs(bs.x2 - bs.x1) + Math.abs(bs.y2 - bs.y1);
}

type vec2 = {x: number; y: number};
type BeaconSensor = {x1: number; y1: number; x2: number; y2: number};
type BeaconSensors = BeaconSensor[];

function checkPosition(x1: number, y1: number, beacon_sensors: BeaconSensors): boolean {
    for (const beacon_sensor of beacon_sensors) {
        const sensor_dist = getManhattanDist(beacon_sensor.x1, beacon_sensor.y1, beacon_sensor.x2, beacon_sensor.y2);
        const check_dist = getManhattanDist(x1, y1, beacon_sensor.x1, beacon_sensor.y1);
        if (check_dist <= sensor_dist) return false;
    }
    return true;
}

function getEdges(bs: BeaconSensor): vec2[] {
    let result: vec2[] = [];
    const dist = getManhattanDistBS(bs) + 1;

    //edges of diamond shape dist + 1 
    //top to right
    for (let x = bs.x1, y = bs.y1 - dist; getManhattanDist(x, y, bs.x1, bs.y1) === dist; x++, y++) {
        if (x < 0 || x > MAX_SIZE || y < 0 || y > MAX_SIZE) continue;
        result.push({x: x, y: y});
    }
    //bottom to right
    for (let x = bs.x1, y = bs.y1 + dist; getManhattanDist(x, y, bs.x1, bs.y1) === dist; x++, y--) {
        if (x < 0 || x > MAX_SIZE || y < 0 || y > MAX_SIZE) continue;
        result.push({x: x, y: y});
    }

    //top to left
    for (let x = bs.x1, y = bs.y1 - dist; getManhattanDist(x, y, bs.x1, bs.y1) === dist; x--, y++) {
        if (x < 0 || x > MAX_SIZE || y < 0 || y > MAX_SIZE) continue;
        result.push({x: x, y: y});
    }
    //bottom to left
    for (let x = bs.x1, y = bs.y1 + dist; getManhattanDist(x, y, bs.x1, bs.y1) === dist; x--, y--) {
        if (x < 0 || x > MAX_SIZE || y < 0 || y > MAX_SIZE) continue;
        result.push({x: x, y: y});
    }

    return result;
}

export const equation_two = (input: string): number => {
    let lines = input.split(/\r?\n/);

    let beacon_sensors: BeaconSensors = [];

    for (const line of lines) {
        let [a, b] = line.split(': closest beacon is at ');
        a = a.split('Sensor at ')[1];
        let [x1, y1] = a.split(', ').map((s) => Number(s.slice(2)));
        let [x2, y2] = b.split(', ').map((s) => Number(s.slice(2)));
        beacon_sensors.push({x1: x1, y1: y1, x2: x2, y2: y2});
    }

    for (const bs of beacon_sensors) {
        const edges = getEdges(bs);
        for (const edge of edges) {
            if (checkPosition(edge.x, edge.y, beacon_sensors)) {
                console.log(edge.x, edge.y);
                return edge.x * 4000000 + edge.y;
            }
        }
    }

    return 0;
};

if (require.main === module) {
    (async () => {
         const input = await read_input(year, day);


        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //13267474686239 ~390.72ms
    })();
}
