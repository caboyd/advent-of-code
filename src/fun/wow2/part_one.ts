
import {benchmark, read_input2, write_output} from 'src/lib';
import {day, year} from './index';


// QuestieDB.npcKeys = {
//     ['name'] = 1, -- string
//     ['minLevelHealth'] = 2, -- int
//     ['maxLevelHealth'] = 3, -- int
//     ['minLevel'] = 4, -- int
//     ['maxLevel'] = 5, -- int
//     ['rank'] = 6, -- int, see https://github.com/cmangos/issues/wiki/creature_template#rank
//     ['spawns'] = 7, -- table {[zoneID(int)] = {coordPair(floatVector2D),...},...}
//     ['waypoints'] = 8, -- table {[zoneID(int)] = {coordPair(floatVector2D),...},...}
//     ['zoneID'] = 9, -- guess as to where this NPC is most common
//     ['questStarts'] = 10, -- table {questID(int),...}
//     ['questEnds'] = 11, -- table {questID(int),...}
//     ['factionID'] = 12, -- int, see https://github.com/cmangos/issues/wiki/FactionTemplate.dbc
//     ['friendlyToFaction'] = 13, -- string, Contains "A" and/or "H" depending on NPC being friendly towards those factions. nil if hostile to both.
//     ['subName'] = 14, -- string, The title or function of the NPC, e.g. "Weapon Vendor"
//     ['npcFlags'] = 15, -- int, Bitmask containing various flags about the NPCs function (Vendor, Trainer, Flight Master, etc.).
//                        -- For flag values see https://github.com/cmangos/mangos-classic/blob/172c005b0a69e342e908f4589b24a6f18246c95e/src/game/Entities/Unit.h#L536
// }

interface WayPoint {
    zoneID: number;
    coordPair: [number, number][];
}

interface NPC {
    id: number;
    name?: string;
    minLevelHealth?: number;
    maxLevelHealth?: number;
    minLevel?: number;
    maxLevel?: number;
    rank?: number;
    spawns?: WayPoint[];
    waypoints?: WayPoint[];
    zoneID?: number;
    questStarts?: {questid: number}[];
    questEnds?: {questid: number}[];
    factionID?: number;
    friendlyToFaction?: string;
    subName?: string;
    npcFlags?: number;
}

const setSpawns = (npc: NPC, arr: any[]): void => {
    if ((arr as any) == 'nil' || !arr.length) return;
    npc.spawns = [];
    for (let i = 0; i < arr.length; i+= 2) {
        const w: WayPoint = {zoneID: arr[i][0], coordPair: []};
        npc.spawns.push(w);
        for (const pair of arr[i+1]) {
            w.coordPair.push([pair[0], pair[1]]);
        }
    }
};

const setWayPoints = (npc: NPC, arr: any[]): void => {
    if ((arr as any) == 'nil' || !arr.length) return;
    npc.waypoints = [];
    for (let i = 0; i < arr.length; i+= 2) {
        const w: WayPoint = {zoneID: arr[i][0], coordPair: []};
        npc.waypoints.push(w);
        for (const pair of arr[i+1]) {
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
    let npc_arr: NPC[] = [];

    for (const line of lines) {
        //console.log(line);
        let [temp, rest] = line.split('] = ');
        rest = rest.slice(0, -1);
        rest = rest
            .replace(/{/g, '[')
            .replace(/}/g, ']')
            .replaceAll('nil,', '"nil",')
            .replaceAll('nil]', '"nil"]')
            .replaceAll(']=[', '],[')
            .replaceAll(`\\'`, '{FIXBACK}')
            .replaceAll(`'`, `"`)
            .replaceAll('{FIXBACK}', "'");
        console.log(temp , rest);
        let json = JSON.parse(rest) as Array<any>;
        json.unshift(0); // to match lua indexing
        let npc_id = Number(temp.replace(/[\[\]']+/g, ''));
        let npc: NPC = {id: npc_id};
        npc_arr.push(npc);

        npc.name = json[1];
        npc.minLevelHealth = json[2] == 'nil' ? undefined : json[2];
        npc.maxLevelHealth = json[3] == 'nil' ? undefined : json[3];
        npc.minLevel = json[4] == 'nil' ? undefined : json[4];
        npc.maxLevel = json[5] == 'nil' ? undefined : json[5];
        npc.rank = json[6] == 'nil' ? undefined : json[6];
        setSpawns(npc, json[7]);
        setWayPoints(npc, json[8]);
        npc.zoneID = json[9] == 'nil' ? undefined : json[9];
        if (json[10] !== undefined && json[10] !== 'nil') {
            npc.questStarts = [];
            setWithQuestID(npc.questStarts, json[10]);
        }
        if (json[11] !== undefined && json[11] !== 'nil') {
            npc.questEnds = [];
            setWithQuestID(npc.questEnds, json[11]);
        }
        npc.factionID = json[12] == 'nil' ? undefined : json[12];
        npc.friendlyToFaction = json[13] == 'nil' ? undefined : json[13];
        npc.subName = json[14] == 'nil' ? undefined : json[14];
        npc.npcFlags = json[15] == 'nil' ? undefined : json[15];
    }

    return JSON.stringify(npc_arr, null, '\t');
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
