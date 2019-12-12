import {benchmark, read_input} from '../../lib';
import {day, year} from './index';

interface OrbitEdge {
    object: string;
    orbiter: string;
}

export class OrbitObject {
    id: string;
    children: OrbitObject[] | undefined;

    constructor(id: string) {
        this.id = id;
    }

    public insert(parent_id: string, n: OrbitObject): boolean {
        //new parent...

        if (this.id === n.id) {
            n.children = this.children;
            this.id = parent_id;
            this.children = [];
            this.children.push(n);
            return true;
        }

        if (this.id === parent_id) {
            if (!this.children) this.children = [];
            this.children.push(n);
            return true;
        } else if (this.children) {
            let insertable = false;
            for (const child of this.children) {
                insertable = child.insert(parent_id, n);
                if (insertable) break;
            }
            return insertable;
        }
        return false;
    }

    public get_orbits(depth: number = 0): number {
        let total = 0;

        if (this.children) {
            for (const child of this.children) {
                total += child.get_orbits(depth + 1);
            }
        }
        return depth + total;
    }
}

export const equation_one = (input: string): number => {
    const orbits: OrbitEdge[] = input.split(/\r?\n/).map(n => {
        const o = n.split(/\)/);
        return {object: o[0], orbiter: o[1]} as OrbitEdge;
    });
    // console.log(orbits);
    const oo = new OrbitObject(orbits[0].object);
    while (orbits.length > 0) {
        for (let i = orbits.length - 1; i >= 0; i--) {
            if (oo.insert(orbits[i].object, new OrbitObject(orbits[i].orbiter))) {
                orbits.splice(i, 1);
            }
        }
    }

    return oo.get_orbits();
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(async () => await equation_one(input))}`); //387356 ~2743ms
    })();
}
