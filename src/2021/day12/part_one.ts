import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_one = (input: string): number => {
    const arr = input.split(/\r?\n/).map((x) => x.trim());

    const lookup: any = {};
    const adjacency = new Array(11).fill(0).map(() => Array(11));
    let index = 0;
    for (const item of arr) {
        const [first, second] = item.split('-');
        if (lookup[first] === undefined) {
            lookup[first] = index;
            lookup[index] = first;
            index++;
        }
        if (lookup[second] === undefined) {
            lookup[second] = index;
            lookup[index] = second;
            index++;
        }

        //build adjacency matrix
        adjacency[lookup[first]][lookup[second]] = 1;
        adjacency[lookup[second]][lookup[first]] = 1;
    }

    //depth first search to build all paths
    const result = build_paths(adjacency, 'start');

    function build_paths(adj: number[][], node: string): string[][] {
        if (node == 'end') return [['end']];
        const node_id = lookup[node];
        const paths: string[][] = [];
        const a2 = adj.map((x) => x.slice());
        if (node === node.toLowerCase())
            for (let i = 0; i < 11; i++) {
                a2[i][node_id] = 0;
            }

        for (let i = 0; i < 11; i++) {
            if (adj[node_id][i] === 1) {
                const node_name = lookup[i];
                for (const path of build_paths(a2, node_name)) {
                    paths.push([node, ...path]);
                }
            }
        }
        return paths;
    }

    return result.length;
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //3450 ~32.82ms
    })();
}
