import {benchmark, read_input2, read_input3, write_output} from 'src/lib';
import {day, year, Quest, ObjectWOW, NPC, Zones} from './index';

function findQuestByName(name: string): Quest {
    for (const o of quests) {
        if (o.name && o.name.includes(name)) return o;
    }
    throw 'quest not found';
}
function findNPCByID(id: number) {
    for (const o of npcs) {
        if (o.id == id) return o;
    }
    throw 'npc not found';
}

function ACCEPT(quest_name: string) {
    let quest = findQuestByName(quest_name);
    let zone_id = -1;
    let coord: [number, number] = [-1, -1];
    STEP();
    if (quest.startedBy?.creatureid) {
        let npc = findNPCByID(quest.startedBy.creatureid[0]);
        if (npc.spawns === undefined) throw 'no spawn for creature ' + npc.name;
        coord = npc.spawns[0].coordPair[0];
        zone_id = npc.spawns[0].zoneID;
        GOTO(zone_id, coord);
        TALK(npc);
        ACCEPT2(quest,npc);
    }
}

function TURNIN(quest_name:string){
    let quest = findQuestByName(quest_name);
    let zone_id = -1;
    let coord: [number, number] = [-1, -1];
    STEP();
    if (quest.finishedBy?.creatureid) {
        let npc = findNPCByID(quest.finishedBy.creatureid[0]);
        if (npc.spawns === undefined) throw 'no spawn for creature ' + npc.name;
        coord = npc.spawns[0].coordPair[0];
        zone_id = npc.spawns[0].zoneID;
        GOTO(zone_id, coord);
        TALK(npc);
        TURNIN2(quest,npc);
    }
}

function TURNIN2(quest:Quest, npc:NPC){
    INDENT();
    guide += ".turnin " + quest.id + " >>" + quest.name! + "\n";
    INDENT();
    guide += ".target " + npc.name + "\n";

}



function ACCEPT2(quest:Quest, npc:NPC){
    INDENT();
    guide += ".accept " + quest.id + " >>" + quest.name! + "\n";
    INDENT();
    guide += ".target " + npc.name + "\n";

}
function TALK(npc: NPC) {
    INDENT()
    guide += '>>|Tinterface/worldmap/chatbubble_64grey.blp:20|tTalk to |cRXP_FRIENDLY_';
    guide += npc.name + '|r\n';
}
function INDENT() {
    guide += '    ';
}
function STEP() {
    guide += 'step\n';
}
function GOTO(zoneID: number, coordPair: [number, number]) {
    INDENT();
    guide += '.goto ' + Zones.get('' + zoneID)! + ',' + coordPair[0] + ',' + coordPair[1] + "\n";
}

let quests: Quest[];
let npcs: NPC[];
let objects: ObjectWOW[];
let guide = '';

export const equation_one = async (input: string): Promise<string> => {
    let quest_data = await read_input3('fun/wow1/output', 'output.txt');
    quests = JSON.parse(quest_data) as Quest[];
    let npc_data = await read_input3('fun/wow2/output', 'output.txt');
    npcs = JSON.parse(npc_data) as NPC[];
    let object_data = await read_input3('fun/wow3/output', 'output.txt');
    objects = JSON.parse(object_data) as ObjectWOW[];

    let result = '';
    let lines = input.split(/\r?\n/);
    for (const line of lines) {
        let [action, value] = line.split('');
        switch (action) {
            case 'ACCEPT':
                ACCEPT(value);
                break;
            default:
                throw 'no action';
        }
    }

    return result;
};

if (require.main === module) {
    (async () => {
        const input = await read_input2(year, day);
        let data = '';
        const time = await benchmark(async () => (data = await equation_one(input)));
        //5ms
        write_output(year, day, 'output.txt', data);
    })();
}
