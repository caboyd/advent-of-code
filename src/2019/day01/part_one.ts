import {read} from "@lib";

export function runner(input: string): Number {
	return input
	.split(/\r?\n/)
	.map(n => Math.floor(Number(n) / 3) - 2)
	.reduce((sum, item) => sum + item, 0);
}

export async function a(func: (input: string) => Number): Promise<Number> {
	return func(await read(2019, 1));
}

if (require.main === module) {
	(async () => {
		console.log(`Result: ${runner(await read(2019, 1))}`);
		console.log(a(runner));
	})();
}