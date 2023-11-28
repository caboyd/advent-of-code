import {benchmark, read_input2, read_input3, write_output} from 'src/lib';
import {day, year} from './index';
import {Quest} from '../wow4';

let quests: Quest[];

function findQuestByName(name: string): number {
    for (const o of quests) {
        if (o.name && o.name.includes(name)) return o.id;
    }
    name = name.toUpperCase();
    if (name == 'SARKOTH #1') return 790;
    if (name == 'SARKOTH #2') return 804;
    if (name == "The Admiral's Orders #1".toUpperCase()) return 830;
    if (name == "The Admiral's Orders #2".toUpperCase()) return 831;
    if (name == 'Hidden Enemies #1'.toUpperCase()) return 5726;
    if (name == 'Hidden Enemies #2'.toUpperCase()) return 5728;
    if (name == 'Hidden Enemies #3'.toUpperCase()) return 5729;
    if (name == 'Hidden Enemies #4'.toUpperCase()) return 5730;
    if (name == "Chen's Empty Keg #1".toUpperCase()) return 819;
    if (name == "Chen's Empty Keg #2".toUpperCase()) return 821;
    if (name == "Chen's Empty Keg #3".toUpperCase()) return 822;
    if (name == "Chen's Empty Keg #4".toUpperCase()) return 822;
    if (name == 'A Recipe for Death #1'.toUpperCase()) return 447;
    if (name == "Arugal's Folly #1".toUpperCase()) return 422;
    if (name == "Arugal's Folly #2".toUpperCase()) return 423;
    if (name == "Arugal's Folly #3".toUpperCase()) return 424;
    if (name == "Arugal's Folly #4".toUpperCase()) return 99;
    if (name == 'Samophlange #1'.toUpperCase()) return 894;
    if (name == 'Samophlange #2'.toUpperCase()) return 900;
    if (name == 'Samophlange #3'.toUpperCase()) return 901;
    if (name == 'Samophlange #4'.toUpperCase()) return 902;
    if (name == 'The Missing Shipment #1'.toUpperCase()) return 890;
    if (name == 'The Missing Shipment #2'.toUpperCase()) return 892;
    if (name == 'Further Instructions #1'.toUpperCase()) return 1094;
    if (name == 'Further Instructions #2'.toUpperCase()) return 1095;
    if (name == 'Elixir of Suffering #1'.toUpperCase()) return 496;
    if (name == 'Elixir of Suffering #2'.toUpperCase()) return 499;
    if (name == 'Betrayal from Within #1'.toUpperCase()) return 879;
    if (name == 'Betrayal from Within #2'.toUpperCase()) return 906;
    if (name == 'The Ashenvale Hunt #1'.toUpperCase()) return 6382;
    if (name == 'The Ashenvale Hunt #2'.toUpperCase()) return 6383;
    if (name == "Gerenzo's Orders #1".toUpperCase()) return 1090;
    if (name == "Gerenzo's Orders #2".toUpperCase()) return 1092;
    if (name == 'The Sacred Flame #1'.toUpperCase()) return 1195;
    if (name == 'The Sacred Flame #2'.toUpperCase()) return 1196;
    if (name == 'The Sacred Flame #3'.toUpperCase()) return 1197;
    if (name == 'Revenge of Gann #1'.toUpperCase()) return 846;
    if (name == 'Revenge of Gann #2'.toUpperCase()) return 849;


    if (name == 'Elixir of Agony #1'.toUpperCase()) return 879;
    if (name == 'Elixir of Agony #2'.toUpperCase()) return 906;
    if (name == 'Elixir of Agony #3'.toUpperCase()) return 906;
    if (name == 'Elixir of Pain #1'.toUpperCase()) return 879;
    if (name == 'Elixir of Pain #2'.toUpperCase()) return 906;
    if (name == 'Elixir of Suffering #1'.toUpperCase()) return 879;
    if (name == 'Elixir of Suffering #2'.toUpperCase()) return 906;
    if (name == 'Battle for Hillsbrad #1'.toUpperCase()) return 879;
    if (name == 'Battle for Hillsbrad #2'.toUpperCase()) return 906;
    if (name == 'Battle for Hillsbrad #3'.toUpperCase()) return 879;
    if (name == 'Battle for Hillsbrad #4'.toUpperCase()) return 879;
    if (name == 'Battle for Hillsbrad #5'.toUpperCase()) return 879;
    if (name == 'Battle for Hillsbrad #6'.toUpperCase()) return 879;
    if (name == 'Battle for Hillsbrad #7'.toUpperCase()) return 879;
    if (name == 'The Black Shield #1'.toUpperCase()) return 906;
    if (name == 'The Black Shield #2'.toUpperCase()) return 879;
    if (name == 'The Black Shield #3'.toUpperCase()) return 906;


    if (name == 'The Swarm Grows #1'.toUpperCase()) return 906;
    if (name == 'The Swarm Grows #2'.toUpperCase()) return 906;
    if (name == 'Alliance Relations #1'.toUpperCase()) return 906;
    if (name == 'Alliance Relations #2'.toUpperCase()) return 906;

    
    return -1;
}

export const equation_one = async (input: string): Promise<string> => {
    let lines = input.split(/\r?\n/);
    let quest_data = await read_input3('fun/wow1/output', 'output.txt');
    quests = JSON.parse(quest_data) as Quest[];
    let result = '';
    for (const line of lines) {
        let [action, value] = line.split(',');
        switch (action) {
            case 'ACCEPT':
            case 'TURN IN':
            case 'PROGRESS':
            case 'COMPLETE':
                result += line + ',' + findQuestByName(value) + '\n';
                break;
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
