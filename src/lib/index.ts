import {promises} from "fs";

export async function read (year:Number, day:Number, file_name:string = 'input.txt'): Promise <string> {
	const base_url = `src/${year}/day${ day < 10 ? '0':''}${day}/resources`;

	return await promises.readFile(`${base_url}${file_name}`, {encoding: 'UTF-8'}) as string;
}