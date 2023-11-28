import {benchmark, read_input2, write_output} from 'src/lib';
import {day, year} from './index';

// QuestieDB.objectKeys = {
//     ['name'] = 1, -- string
//     ['questStarts'] = 2, -- table {questID(int),...}
//     ['questEnds'] = 3, -- table {questID(int),...}
//     ['spawns'] = 4, -- table {[zoneID(int)] = {coordPair(floatVector2D),...},...}
//     ['zoneID'] = 5, -- guess as to where this object is most common
//     ['factionID'] = 6, -- faction restriction mask (same as spawndb factionid)
// }

interface WayPoint {
    zoneID: number;
    coordPair: [number, number][];
}

interface ObjectWOW {
    id: number;
    name?: string;
    questStarts?: {questid: number}[];
    questEnds?: {questid: number}[];
    spawns?: WayPoint[];
    zoneID?: string;
    factionID?: number;
}

const setSpawns = (object: ObjectWOW, arr: any[]): void => {
    if ((arr as any) == 'nil' || !arr.length) return;
    object.spawns = [];
    for (let i = 0; i < arr.length; i += 2) {
        const w: WayPoint = {zoneID: arr[i][0], coordPair: []};
        object.spawns.push(w);
        for (const pair of arr[i + 1]) {
            w.coordPair.push([pair[0], pair[1]]);
        }
    }
};

const setWithQuestID = (quest_data: {questid: number}[], arr: any[]): void => {
    for (const item of arr) {
        quest_data.push({questid: item});
    }
};

export const equation_one = (input: string): string => {
    let lines = input.split(/\r?\n/);
    let object_arr: ObjectWOW[] = [];

    for (const line of lines) {
        //console.log(line);
        let [temp, rest] = line.split('] = ');
        rest = rest.slice(0, -1);
        rest = rest
            .replace(/{/g, '[')
            .replace(/}/g, ']')
            .replaceAll('nil,', '"nil",')
            .replaceAll('nil]', '"nil"]')
            .replaceAll(']=[', '],[');

        console.log(temp, rest);
        let json = JSON.parse(rest) as Array<any>;
        json.unshift(0); // to match lua indexing
        let object_id = Number(temp.replace(/[\[\]']+/g, ''));
        let object: ObjectWOW = {id: object_id};
        object_arr.push(object);

        object.name = json[1];
        if (json[2] !== undefined && json[2] !== 'nil') {
            object.questStarts = [];
            setWithQuestID(object.questStarts, json[2]);
        }
        if (json[3] !== undefined && json[3] !== 'nil') {
            object.questEnds = [];
            setWithQuestID(object.questEnds, json[3]);
        }
        setSpawns(object, json[4]);
        object.zoneID = json[5] == 'nil' ? undefined : json[5];
        object.factionID = json[6] == 'nil' ? undefined : json[6];
    }

    return JSON.stringify(object_arr, null, '\t');
};

if (require.main === module) {
    (async () => {
        const input = await read_input2(year, day);
        let data = '';
        const time = await benchmark(() => (data = equation_one(input)));
        //5ms
        write_output(year, day, 'output.txt', data);
    })();
}
