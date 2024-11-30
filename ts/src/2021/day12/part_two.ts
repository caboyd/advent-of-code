import {benchmark, read_input} from 'src/lib';
import {day, year} from './index';

export const equation_two = (input: string): number => {
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
        adjacency[lookup[first]][lookup[second]] = 2;
        adjacency[lookup[second]][lookup[first]] = 2;
    }

    //depth first search to build all paths
    const result = build_paths(adjacency, 'start', false);

    function build_paths(adj: number[][], node: string, repeat: boolean): string[][] {
        if (node == 'end') return [['end']];
        const node_id = lookup[node];
        const paths: string[][] = [];
        const a2 = adj.map((x) => x.slice());
        let lower = false;
        if (node === node.toLowerCase()) {
            for (let i = 0; i < 11; i++) {
                a2[i][node_id]--;
                if (node === 'start') a2[i][node_id] = -1;
                if (lookup[i] === 'start') continue;

                if (a2[i][node_id] === 0 && !repeat) {
                    repeat = true;
                    lower = true;
                }
            }
            if (lower)
                for (let i = 0; i < 11; i++) {
                    for (let j = 0; j < 11; j++) {
                        a2[i][j]--;
                    }
                }
        }

        for (let i = 0; i < 11; i++) {
            if (a2[node_id][i] >= 1) {
                const node_name = lookup[i];
                for (const path of build_paths(a2, node_name, repeat)) {
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
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //96528 ~405ms
    })();
}
