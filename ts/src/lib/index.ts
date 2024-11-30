import {promises} from 'fs';
import {performance} from 'perf_hooks';

export interface Results<T = number, K = T> {
    one: T;
    two: K;
}

export const read_input = async (year: number, day: number, file_name: string = 'input.txt'): Promise<string> => {
    const base_url = `src/${year}/day${day < 10 ? '0' : ''}${day}/resources/`;

    return (await promises.readFile(`${base_url}${file_name}`, 'utf-8')) as string;
};


export const read_input2 = async (folder: string, sub_folder: string, file_name: string = 'input.txt'): Promise<string> => {
    const base_url = `src/${folder}/${sub_folder}/resources/`;

    return (await promises.readFile(`${base_url}${file_name}`, 'utf-8')) as string;
};

export const read_input3 = async (folder: string, file_name: string = 'input.txt'): Promise<string> => {
    const base_url = `src/${folder}/`;

    return (await promises.readFile(`${base_url}${file_name}`, 'utf-8')) as string;
};




export const write_output = async (folder: string, sub_folder: string, file_name: string = 'output.txt', data: string): Promise<void> => {
    const base_url = `src/${folder}/${sub_folder}/output/`;

    promises.writeFile(`${base_url}${file_name}`, data, 'utf-8');
};

export const benchmark = async <T>(f: () => T): Promise<T> => {
    const start = performance.now();
    const result = await f();
    console.log(`Time: ${performance.now() - start}`);
    return result;
};
