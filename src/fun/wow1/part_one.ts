// QuestieDB.questKeys = {
//     ['name'] = 1, -- string
//     ['startedBy'] = 2, -- table
//         --['creatureStart'] = 1, -- table {creature(int),...}
//         --['objectStart'] = 2, -- table {object(int),...}
//         --['itemStart'] = 3, -- table {item(int),...}
//     ['finishedBy'] = 3, -- table
//         --['creatureEnd'] = 1, -- table {creature(int),...}
//         --['objectEnd'] = 2, -- table {object(int),...}
//     ['requiredLevel'] = 4, -- int
//     ['questLevel'] = 5, -- int
//     ['requiredRaces'] = 6, -- bitmask
//     ['requiredClasses'] = 7, -- bitmask
//     ['objectivesText'] = 8, -- table: {string,...}, Description of the quest. Auto-complete if nil.
//     ['triggerEnd'] = 9, -- table: {text, {[zoneID] = {coordPair,...},...}}
//     ['objectives'] = 10, -- table
//         --['creatureObjective'] = 1, -- table {{creature(int), text(string)},...}, If text is nil the default "<Name> slain x/y" is used
//         --['objectObjective'] = 2, -- table {{object(int), text(string)},...}
//         --['itemObjective'] = 3, -- table {{item(int), text(string)},...}
//         --['reputationObjective'] = 4, -- table: {faction(int), value(int)}
//         --['killCreditObjective'] = 5, -- table: {{{creature(int), ...}, baseCreatureID, baseCreatureText}, ...}
//     ['sourceItemId'] = 11, -- int, item provided by quest starter
//     ['preQuestGroup'] = 12, -- table: {quest(int)}
//     ['preQuestSingle'] = 13, -- table: {quest(int)}
//     ['childQuests'] = 14, -- table: {quest(int)}
//     ['inGroupWith'] = 15, -- table: {quest(int)}
//     ['exclusiveTo'] = 16, -- table: {quest(int)}
//     ['zoneOrSort'] = 17, -- int, >0: AreaTable.dbc ID; <0: QuestSort.dbc ID
//     ['requiredSkill'] = 18, -- table: {skill(int), value(int)}
//     ['requiredMinRep'] = 19, -- table: {faction(int), value(int)}
//     ['requiredMaxRep'] = 20, -- table: {faction(int), value(int)}
//     ['requiredSourceItems'] = 21, -- table: {item(int), ...} Items that are not an objective but still needed for the quest.
//     ['nextQuestInChain'] = 22, -- int: if this quest is active/finished, the current quest is not available anymore
//     ['questFlags'] = 23, -- bitmask: see https://github.com/cmangos/issues/wiki/Quest_template#questflags
//     ['specialFlags'] = 24, -- bitmask: 1 = Repeatable, 2 = Needs event, 4 = Monthly reset (req. 1). See https://github.com/cmangos/issues/wiki/Quest_template#specialflags
//     ['parentQuest'] = 25, -- int, the ID of the parent quest that needs to be active for the current one to be available. See also 'childQuests' (field 14)
//     ['rewardReputation'] = 26, --table: {{faction(int), value(int)},...}, a list of reputation rewarded upon quest completion
//     ['extraObjectives'] = 27, -- table: {{spawnlist, iconFile, text, objectiveIndex (optional), {{dbReferenceType, id}, ...} (optional)},...}, a list of hidden special objectives for a quest. Similar to requiredSourceItems
//     ['requiredSpell'] = 28, -- int: quest is only available if character has this spellID
//     ['requiredSpecialization'] = 29, -- int: quest is only available if character meets the spec requirements. Use QuestieProfessions.specializationKeys for having a spec, or QuestieProfessions.professionKeys to indicate having the profession with no spec. See QuestieProfessions.lua for more info.
//     ['requiredMaxLevel'] = 30, -- int: quest is only available up to a certain level
// }

interface Zone {
    id: number;
    coordPair: [number, number][];
}

interface Quest {
    id: number;
    name?: string;
    startedBy?: {
        creatureid?: number[];
        objectid?: number[];
        itemid?: number[];
    };
    finishedBy?: {
        creatureid?: number[];
        objectid?: number[];
    };
    requiredLevel?: number;
    questLevel?: number;
    requiredRaces?: number; //bitmask
    requiredClasses?: number; //bitmask
    objectivesText?: string[]; //Description of the quest. Auto-complete if nil.
    triggerEnd?: {
        text: string;
        zones?: Zone[];
    };
    objectives?: {
        creature?: {id: number; text?: string}[]; // If text is nil the default "<Name> slain x/y" is used
        object?: {id: number; text?: string}[];
        item?: {id: number; text?: string}[];
        reputationObjective?: {factionid: number; value: number}[];
        killCreditObjective?: {creatureid: number[]; baseCreatureID: number; baseCreatureText: string}[];
    };
    sourceItemId?: number; // item provided by quest starter
    preQuestGroup?: {questid: number}[];
    preQuestSingle?: {questid: number}[];
    childQuests?: {questid: number}[];
    inGroupWith?: {questid: number}[];
    exclusiveTo?: {questid: number}[];
    zoneOrSort?: number; //int, >0: AreaTable.dbc ID; <0: QuestSort.dbc ID
    requiredSkill?: {skillid: number; value: number}[];
    requiredMinRep?: {factionid: number; value: number}[];
    requiredMaxRep?: {factionid: number; value: number}[];
    requiredSourceItems?: {itemid: number}[]; //Items that are not an objective but still needed for the quest.
    nextQuestInChain?: number; //if this quest is active/finished, the current quest is not available anymore
    questFlags?: number; //bitmask: see https://github.com/cmangos/issues/wiki/Quest_template#questflags
}

import {benchmark, read_input2, write_output} from 'src/lib';
import {day, year} from './index';

const parse_until_next = (str: string): [string, string] => {
    let brace_count = 0;
    let result = '';
    let len = 0;
    for (const c of str) {
        if (c == '{') brace_count++;
        if (c == '}') brace_count--;
        if (brace_count == 0 && c == ',') break;
        result += c;
        len++;
    }
    //exclude comma
    str = str.slice(len + 1);
    return [result, str];
};

const setStartedBy = (quest: Quest, arr: any[]): void => {
    if ((arr as any) == 'nil' || !arr.length) return;
    quest.startedBy = {};
    if (arr[0] !== 'nil') quest.startedBy.creatureid = arr[0];
    if (arr[1] !== 'nil') quest.startedBy.objectid = arr[1];
    if (arr[2] !== 'nil') quest.startedBy.itemid = arr[2];
};
const setFinishedBy = (quest: Quest, arr: any[]): void => {
    if ((arr as any) == 'nil' || !arr.length) return;
    quest.finishedBy = {};
    if (arr[0] !== 'nil') quest.finishedBy.creatureid = arr[0];
    if (arr[1] !== 'nil') quest.finishedBy.objectid = arr[1];
};

const setTriggerEnd = (quest: Quest, arr: any[]): void => {
    if ((arr as any) == 'nil' || !arr.length) return;
    quest.triggerEnd = {text: arr[0]};
    quest.triggerEnd.zones = [];
    for (let i = 1; i < arr.length; i++) {
        const z: Zone = {id: arr[i][0][0], coordPair: []};
        quest.triggerEnd.zones.push(z);
        for (const pair of arr[i][1]) {
            z.coordPair.push([pair[0], pair[1]]);
        }
    }
};

const setObjectives = (quest: Quest, arr: any[]): void => {
    if ((arr as any) == 'nil' || !arr.length) return;
    quest.objectives = {};
    if (arr[0] !== undefined && arr[0] !== 'nil') {
        quest.objectives.creature = [];
        for (const o of arr[0]) {
            quest.objectives.creature.push({
                id: Number(o[0]),
                text: o[1] ?? undefined,
            });
        }
    }
    if (arr[1] !== undefined && arr[1] !== 'nil') {
        quest.objectives.object = [];
        for (const o of arr[1]) {
            quest.objectives.object.push({
                id: Number(o[0]),
                text: o[1] ?? undefined,
            });
        }
    }
    if (arr[2] !== undefined && arr[2] !== 'nil') {
        quest.objectives.item = [];
        for (const o of arr[2]) {
            quest.objectives.item.push({
                id: Number(o[0]),
                text: o[1] ?? undefined,
            });
        }
    }
};
const setWithQuestID = (quest_data: {questid: number}[], arr: any[]): void => {
    for (const item of arr) {
        quest_data.push({questid: item});
    }
};

const setWithItemID = (quest_data: {itemid: number}[], arr: any[]): void => {
    for (const item of arr) {
        quest_data.push({itemid: item});
    }
};

const setRequiredSkill = (quest: Quest, arr: any[]): void => {
    if ((arr as any) == 'nil' || arr == undefined ) return;
    if(!arr.length) return;
    quest.requiredSkill = [];
    for (const item of arr) {
        quest.requiredSkill.push({skillid: item[0], value: item[1]});
    }
};

const setRequiredMinRep = (quest: Quest, arr: any[]): void => {
    if ((arr as any) == 'nil'  || arr == undefined ) return;
    if(!arr.length) return;
    quest.requiredMinRep = [];
    for (const item of arr) {
        quest.requiredMinRep.push({factionid: item[0], value: item[1]});
    }
};

const setRequiredMaxRep = (quest: Quest, arr: any[]): void => {
    if ((arr as any) == 'nil'  || arr == undefined ) return;
    if(!arr.length) return;
    quest.requiredMaxRep = [];
    for (const item of arr) {
        quest.requiredMaxRep.push({factionid: item[0], value: item[1]});
    }
};

export const equation_one = (input: string): string => {
    let lines = input.split(/\r?\n/);
    let quests_arr: Quest[] = [];

    for (const line of lines) {
        let [temp, rest] = line.split('] = ');
        rest = rest.slice(0, -1);
        rest = rest
            .replace(/[{]/g, '[')
            .replace(/[}]/g, ']')
            .replaceAll('nil,', '"nil",')
            .replaceAll('nil]', '"nil"]')
            .replaceAll(']=[', '],[');
        console.log(rest);
        let json = JSON.parse(rest) as Array<any>;
        json.unshift(0); // to match lua indexing
        let quest_id = Number(temp.replace(/[\[\]']+/g, ''));
        let quest: Quest = {id: quest_id};
        quests_arr.push(quest);

        quest.name = json[1];
        setStartedBy(quest, json[2]);
        setFinishedBy(quest, json[3]);
        quest.requiredLevel = json[4] == 'nil' ? undefined : json[4];
        quest.questLevel = json[5] == 'nil' ? undefined : json[5];
        quest.requiredRaces = json[6] == 'nil' ? undefined : json[6];
        quest.requiredClasses = json[7] == 'nil' ? undefined : json[7];
        quest.objectivesText = json[8] == 'nil' ? undefined : json[8];
        setTriggerEnd(quest, json[9]);
        setObjectives(quest, json[10]);
        quest.sourceItemId = json[11] == 'nil' ? undefined : json[11];
        if (json[12] !== undefined && json[12] !== 'nil') {
            quest.preQuestGroup = [];
            setWithQuestID(quest.preQuestGroup, json[12]);
        }
        if (json[13] !== undefined && json[13] !== 'nil') {
            quest.preQuestSingle = [];
            setWithQuestID(quest.preQuestSingle, json[13]);
        }
        if (json[14] !== undefined && json[14] !== 'nil') {
            quest.childQuests = [];
            setWithQuestID(quest.childQuests, json[14]);
        }
        if (json[15] !== undefined && json[15] !== 'nil') {
            quest.inGroupWith = [];
            setWithQuestID(quest.inGroupWith, json[15]);
        }
        if (json[16] !== undefined && json[16] !== 'nil') {
            quest.exclusiveTo = [];
            setWithQuestID(quest.exclusiveTo, json[16]);
        }
        quest.zoneOrSort = json[17] == 'nil' ? undefined : json[17];
        setRequiredSkill(quest, json[18]);
        setRequiredMinRep(quest, json[19]);
        setRequiredMaxRep(quest, json[20]);
        if (json[21] !== undefined && json[21] !== 'nil') {
            quest.requiredSourceItems = [];
            setWithItemID(quest.requiredSourceItems, json[21]);
        }
        quest.nextQuestInChain = json[22] == 'nil' ? undefined : json[22];
        quest.questFlags = json[23] == 'nil' ? undefined : json[23];
        //console.log(quest_id);
    }

    return JSON.stringify(quests_arr, null, '\t');
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
