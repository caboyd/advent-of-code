import {Results} from 'src/lib';

export const year = "fun";
export const day = "wow4";

export const results: Results = {
    one: 0,
    two: 0,
};

export interface Zone {
    id: number;
    coordPair: [number, number][];
}

export interface Quest {
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

export interface WayPoint {
    zoneID: number;
    coordPair: [number, number][];
}

export interface NPC {
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


export interface ObjectWOW {
    id: number;
    name?: string;
    questStarts?: {questid: number}[];
    questEnds?: {questid: number}[];
    spawns?: WayPoint[];
    zoneID?: string;
    factionID?: number;
}

export const Zones = new Map(Object.entries({
     14: "Durotar",
     215: "Mulgore",
     17: "The Barrens",
     36: "Alterac Mountains",
     45: "Arathi Highlands",
     3: "Badlands",
     4: "Blasted Lands",
     85: "Tirisfal Glades",
     130: "Silverpine Forest",
     28: "Western Plaguelands",
     139: "Eastern Plaguelands",
     267: "Hillsbrad Foothills",
     47: "The Hinterlands",
     1: "Dun Morogh",
     51: "Searing Gorge",
     46: "Burning Steppes",
     12: "Elwynn Forest",
     41: "Deadwind Pass",
     10: "Duskwood",
     38: "Loch Modan",
     44: "Redridge Mountains",
     33: "Stranglethorn Vale",
     8: "Swamp of Sorrows",
     40: "Westfall",
     11: "Wetlands",
     141: "Teldrassil",
     148: "Darkshore",
     331: "Ashenvale",
     400: "Thousand Needles",
     406: "Stonetalon Mountains",
     405: "Desolace",
     357: "Feralas",
     15: "Dustwallow Marsh",
     440: "Tanaris",
     16: "Azshara",
     361: "Felwood",
     490: "Un'Goro Crater",
     493: "Moonglade",
     1377: "Silithus",
     618: "Winterspring",
     1519: "Stormwind City",
     1637: "Orgrimmar",
     1537: "Ironforge",
     1638: "Thunder Bluff",
     1657: "Darnassus",
     1497: "Undercity",
     2597: "Alterac Valley",
}))
