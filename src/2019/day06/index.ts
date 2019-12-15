import {Results} from '../../lib';

export const year = 2019;
export const day = 6;

export const results: Results = {
    one: 387356,
    two: 532,
};

export class OrbitObject {
    id: string;
    children: OrbitObject[];

    constructor(id: string) {
        this.id = id;
        this.children = [];
    }

    public insert_all(map: Map<string, string[]>): void {
        const children = map.get(this.id);
        if (!children) return;

        for (const child of children) {
            this.children.push(new OrbitObject(child));
        }
        for (const child of this.children) {
            child.insert_all(map);
        }
    }

    public get_orbits(depth: number = 0): number {
        let total = 0;
        for (const child of this.children) {
            total += child.get_orbits(depth + 1);
        }
        return depth + total;
    }

    public static fromInput(input: string): OrbitObject {
        const orbit_map = OrbitObject.gen_orbit_map(input);
        const o = new OrbitObject('COM');
        o.insert_all(orbit_map);
        return o;
    }

    public static gen_orbit_map(input: string): Map<string, string[]> {
        const orbit_map: Map<string, string[]> = new Map<string, string[]>();
        input.split(/\r?\n/).map(line => {
            const pair = line.split(/\)/);
            if (orbit_map.has(pair[0])) {
                const arr = orbit_map.get(pair[0]);
                if (arr) arr.push(pair[1]);
            } else orbit_map.set(pair[0], [pair[1]]);
        });
        return orbit_map;
    }
}
