import {benchmark, read_input} from 'src/lib';
import {buildDirectory, day, Directory, getSumOfDirSizeLessThanSize, updateSize, year} from './index';

export const equation_one = (input: string): number => {
    const lines = input.split(/\r?\n/);
    const root: Directory = {name: '/', dirs: [], files: [], size: 0};

    //build directory tree
    buildDirectory(lines, root);

    return getSumOfDirSizeLessThanSize(root, 100000);
};

if (require.main === module) {
    (async () => {
        const input = await read_input(year, day);

        console.log(`Result: ${await benchmark(() => equation_one(input))}`); //1444896 ~1.297ms
    })();
}
