import {benchmark, read_input} from 'src/lib';
import {compare, day, get_neighbours, pos_to_id, QueueNode, vec2, year} from './index';
import {PriorityQueue} from 'typescript-collections';

export const equation_one = (input: string): number => {
    const queue = new PriorityQueue<QueueNode>(compare);
    const start: vec2 = [0, 0];

    const map = input.split(/\r?\n/).map((x) => x.split('').map(Number));

    const end: vec2 = [map[0].length - 1, map.length - 1];
    const came_from = new Map<number, vec2>();
    const cost_so_far = new Map<number, number>();

    cost_so_far.set(pos_to_id(start), 0);
    queue.add(new QueueNode(start, 0));

    while (!queue.isEmpty()) {
        const pos = queue.dequeue()!.pos;

        if (pos[0] == end[0] && pos[1] == end[1]) break;

        for (const nb of get_neighbours(map, pos)) {
            const new_cost = cost_so_far.get(pos_to_id(pos))! + map[nb[1]][nb[0]];
            if (!cost_so_far.has(pos_to_id(nb)) || new_cost < cost_so_far.get(pos_to_id(nb))!) {
                cost_so_far.set(pos_to_id(nb), new_cost);
                const priority = new_cost;
                queue.add(new QueueNode(nb, priority));
                came_from.set(pos_to_id(nb), pos);
            }
        }
    }

    const path = [];
    let current = end;
    while (current[0] != start[0] || current[1] != start[1]) {
        path.push(current);
        current = came_from.get(pos_to_id(current))!;
    }

    return path.reduce((acc, i) => acc + map[i[1]][i[0]], 0);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //745 ~47.54ms
    })();
}
