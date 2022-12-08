import {Results} from 'src/lib';

export const year = 2021;
export const day = 18;

export const results: Results = {
    one: 4145,
    two: 4855,
};

export type Snailfish = {
    reduced: boolean;
} & Pair;

type Pair = {
    parent?: Pair;
    left?: Pair | number;
    right?: Pair | number;
};

export function PairToString(s: Pair): string {
    let result = '[';
    if (typeof s.left == 'object') result += PairToString(s.left);
    else result += s.left;
    result += ',';
    if (typeof s.right == 'object') result += PairToString(s.right);
    else result += s.right;
    result += ']';
    return result;
}

export function createSnailfish(s: string): Snailfish {
    let root: Snailfish = {reduced: false};
    let cur_pair: Pair = root;
    //skip first for root
    for (let i = 1; i < s.length; i++) {
        const until = s.slice(i).search(/[\[\],]/);
        const next = s.slice(i, i + until + 1);
        i += until;
        switch (next.slice(-1)) {
            case '[':
                if (cur_pair.left === undefined) {
                    cur_pair.left = {parent: cur_pair};
                    cur_pair = cur_pair.left;
                } else {
                    cur_pair.right = {parent: cur_pair};
                    cur_pair = cur_pair.right;
                }
                break;
            case ',':
                if (next.length !== 1) cur_pair.left = Number(next.slice(0, next.length - 1));
                break;
            case ']':
                if (next.length !== 1) cur_pair.right = Number(next.slice(0, next.length - 1));
                if (cur_pair.parent) cur_pair = cur_pair.parent;

                break;
        }
    }

    return root;
}

function addToLeftParent(p: Pair | undefined, value: number): void {
    if (!p) return;

    if (typeof p.left == 'object') {
        if (!p.parent) return;
        if (p.parent?.left === p) {
            addToLeftParent(p.parent, value);
        } else {
            if (typeof p.parent?.left == 'object') {
                addToRightChild(p.parent?.left, value);
            } else {
                p.parent!.left! += value;
                return;
            }
        }
    } else p.left! += value;
    return;
}

function addToRightParent(p: Pair | undefined, value: number): void {
    if (!p) return;

    if (typeof p.right == 'object') {
        if (!p.parent) return;
        if (p.parent?.right === p) {
            addToRightParent(p.parent, value);
        } else {
            if (typeof p.parent?.right == 'object') {
                addToLeftChild(p.parent?.right, value);
            } else {
                p.parent!.right! += value;
                return;
            }
        }
    } else p.right! += value;
    return;
}

function addToLeftChild(p: Pair | undefined, value: number): void {
    if (!p) return;
    if (typeof p.left === 'object') {
        addToLeftChild(p.left, value);
    } else {
        p.left! += value;
    }
}
function addToRightChild(p: Pair | undefined, value: number): void {
    if (!p) return;
    if (typeof p.right === 'object') {
        addToRightChild(p.right, value);
    } else {
        p.right! += value;
    }
}

function split(p: Pair, depth: number = 1): boolean {
    if (typeof p.left == 'object') {
        if (split(p.left, depth + 1)) return true;
    } else if (typeof p.left == 'number' && p.left >= 10) {
        //split
        let num = p.left;
        p.left = {parent: p, left: Math.floor(num / 2), right: Math.ceil(num / 2)};
        return true;
    }

    if (typeof p.right == 'object') {
        if (split(p.right, depth + 1)) return true;
    } else if (typeof p.right == 'number' && p.right >= 10) {
        //split
        let num = p.right;
        p.right = {parent: p, left: Math.floor(num / 2), right: Math.ceil(num / 2)};
        return true;
    }
    return false;
}

function explode(p: Pair, depth: number = 1): boolean {
    if (typeof p.left == 'object') {
        if (depth + 1 > 4) {
            //explode child
            //console.log(`explode left: ${p.left.left},${p.left.right}`);
            addToLeftParent(p, p.left.left as number);
            if (typeof p.right == 'object') addToLeftChild(p.right, p.left.right as number);
            else addToRightParent(p, p.left.right as number);
            p.left = 0;
            return true;
        } else {
            if (explode(p.left, depth + 1)) return true;
        }
    }
    if (typeof p.right == 'object') {
        if (depth + 1 > 4) {
            //explode child
            //console.log(`explode right: ${p.right.left},${p.right.right}`);
            if (typeof p.left == 'object') addToRightChild(p.left, p.right.left as number);
            else addToLeftParent(p, p.right.left as number);
            addToRightParent(p, p.right.right as number);
            p.right = 0;
            return true;
        } else {
            if (explode(p.right, depth + 1)) return true;
        }
    }
    return false;
}

export function reduce(r: Snailfish): void {
    do {
        r.reduced = false;
        r.reduced = explode(r);
        if (!r.reduced) r.reduced = split(r);
        //console.log(PairToString(r));
    } while (r.reduced == true);
}

export function magnitude(r: Pair | number | undefined): number {
    if (!r) return 0;
    if (typeof r == 'number') return r;
    else return 3 * magnitude(r.left) + 2 * magnitude(r.right);
}
