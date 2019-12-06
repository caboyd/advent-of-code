import {read_input} from "../../lib";
import {day, year} from "./index";

export const equation = (input: string): Array<number> => {
	let data = input.split(/,/).map(n => Number(n));

	let stack_pointer = 0;

	while (data[stack_pointer] !== 99) {
		let [op_code, d1, d2, result] = data.slice(stack_pointer, stack_pointer + 4);

		switch (op_code) {
			case 1: {
				//Add next 2 values and store into 3rd
				let v1 = data[d1];
				let v2 = data[d2];
				data[result] = v1 + v2;
				break;
			}
			case 2: {
				//multiplies next 2 values and store into 3rd
				let v1 = data[d1];
				let v2 = data[d2];
				data[result] = v1 * v2;
				break;
			}

		}
		stack_pointer += 4;
	}

	return data;
}

if (require.main === module) {
	(async () => {
		console.log(`Result: ${equation(await read_input(year, day))}`);
	})();
}
