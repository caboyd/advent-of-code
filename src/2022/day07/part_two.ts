import {benchmark, read_input} from 'src/lib';
import {buildDirectory, day, Directory, getSmallestDirBiggerThan, updateSize, year} from './index';

export const equation_two = (input: string): number => {
    const lines = input.split(/\r?\n/);

    const root: Directory = {name: '/', dirs: [], files: [], size: 0};

    //build directory tree
    buildDirectory(lines, root);

    const free_space = 70000000 - root.size;
    return getSmallestDirBiggerThan(root, 30000000 - free_space);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);
        console.log(`Result: ${await benchmark(() => equation_two(input))}`); //404395 ~1.32ms
    })();
}
