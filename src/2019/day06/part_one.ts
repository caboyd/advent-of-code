import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

export class OrbitObject {
    id: string;
    children: OrbitObject[];

    constructor(id: string) {
        this.id = id;
        this.children = [];
    }

    public insert(parent_id: string, n: OrbitObject): string | null {
        if (this.id === parent_id) {
            this.children.push(n);
            return n.id;
        } else {
            for (const child of this.children) {
                const result = child.insert(parent_id, n);
                if (result !== null) return result;
            }
            return null;
        }
    }

    public get_orbits(depth: number = 0): number {
        let total = 0;
        for (const child of this.children) {
            total += child.get_orbits(depth + 1);
        }
        return depth + total;
    }
}

export const equation_one = (input: string): number => {
    const orbit_map: Map<string, string[]> = new Map<string, string[]>();
    input.split(/\r?\n/).map(n => {
        const pair = n.split(/\)/);
        if (orbit_map.has(pair[0])) {
            const arr = orbit_map.get(pair[0]);
            if (arr) arr.push(pair[1]);
        } else orbit_map.set(pair[0], [pair[1]]);
    });

    let parent_objects: string[] = [];
    let inserted_objects: string[] = [];
    parent_objects.push('COM');
    const oo = new OrbitObject('COM');

    while (true) {
        for (const parent of parent_objects) {
            const children = orbit_map.get(parent);
            if (!children) continue;

            for (const child of children) {
                let result;
                if ((result = oo.insert(parent, new OrbitObject(child))) !== null) {
                    inserted_objects.push(result);
                }
            }
        }
        parent_objects = inserted_objects;
        if (!parent_objects.length) break;
        inserted_objects = [];
    }

    return oo.get_orbits();
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //387356 ~24 ms
    })();
}
