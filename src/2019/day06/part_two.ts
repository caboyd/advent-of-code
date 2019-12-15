import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

export const build_path = (child: string, parent: string, reverse_orbit_map: Map<string, string>): string[] => {
    let curr: string | undefined = child;
    const path = [];
    while (curr !== parent) {
        curr = reverse_orbit_map.get(curr);
        if (curr === undefined) throw new Error('no path from you to com');
        path.push(curr);
    }
    return path;
};

export const equation_two = (input: string): number => {
    const reverse_orbit_map = new Map<string, string>();
    input.split(/\r?\n/).map(line => {
        const pair = line.split(/\)/);
        reverse_orbit_map.set(pair[1], pair[0]);
    });

    //build path to com
    const p1 = build_path('YOU', 'COM', reverse_orbit_map);
    const p2 = build_path('SAN', 'COM', reverse_orbit_map);

    //intersect arrays to find first common ancestor
    const ancestor = p1.filter(v => p2.includes(v))[0];

    //distances
    const d1 = p1.lastIndexOf(ancestor);
    const d2 = p2.lastIndexOf(ancestor);

    return d1 + d2;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(async () => await equation_two(input))}`); //532 ~1.3 ms
    })();
}
