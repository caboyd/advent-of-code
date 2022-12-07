import {Results} from 'src/lib';

export const year = 2022;
export const day = 7;

export const results: Results = {
    one: 1444896,
    two: 404395,
};

export type File = {
    parent: Directory;
    name: string;
    size: number;
};

export type Directory = {
    parent?: Directory;
    name: string;
    dirs: Directory[];
    files: File[];
    size: number;
};

export function buildDirectory(lines: string[], root: Directory): void {
    let current_dir = root;
    for (const line of lines) {
        const parts = line.split(' ');

        if (parts[0] === '$') {
            if (parts[1] === 'cd') {
                const dir_name = parts[2];
                if (dir_name === '/') {
                    current_dir = root;
                } else if (dir_name === '..') {
                    current_dir = current_dir.parent!;
                } else
                    for (const dir of current_dir.dirs) {
                        if (dir.name === dir_name) {
                            current_dir = dir;
                            break;
                        }
                    }
            }
        } else {
            //add files
            const parts = line.split(' ');
            if (parts[0] == 'dir') {
                //directory
                current_dir.dirs.push({parent: current_dir, name: parts[1], dirs: [], files: [], size: 0});
            } else {
                //file
                const size = Number(parts[0]);
                current_dir.files.push({parent: current_dir, name: parts[1], size: size});
                updateSize(current_dir, size);
            }
        }
    }
}

export function getSumOfDirSizeLessThanSize(dir: Directory, size: number): number {
    let curr_size = dir.size <= size ? dir.size : 0;
    for (const child of dir.dirs) {
        curr_size += getSumOfDirSizeLessThanSize(child, size);
    }
    return curr_size;
}

export function getSmallestDirBiggerThan(dir: Directory, size: number, old_best_size: number = 0): number {
    let best_size = dir.size > size ? dir.size : old_best_size;
    for (const child of dir.dirs) {
        best_size = Math.min(getSmallestDirBiggerThan(child, size, best_size), best_size);
    }
    return best_size;
}

export function updateSize(node: Directory, size: number): void {
    node.size += size;
    if (node.parent) {
        updateSize(node.parent, size);
    }
}
