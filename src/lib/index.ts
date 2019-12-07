import {promises} from 'fs';
import {performance} from 'perf_hooks';

export interface Results<T = number, K = T> {
    one: T;
    two: K;
}

export const read_input = async (year: number, day: number, file_name: string = 'input.txt'): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const base_url = `src/${year}/day${day < 10 ? '0' : ''}${day}/resources/`;

    return (await promises.readFile(`${base_url}${file_name}`, {encoding: 'UTF-8'})) as string;
};

export const benchmark = <T>(f: () => T): T => {
    const start = performance.now();
    const result = f();
    console.log(`Time: ${performance.now() - start}`);
    return result;
};
