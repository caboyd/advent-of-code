import {Results} from 'src/lib';

export const year = 2020;
export const day = 4;

export const results: Results = {
    one: 254,
    two: 184,
};

export interface Passport {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid: string;
}

export function isPassport(object: any): object is Passport {
    return (
        'byr' in object &&
        'iyr' in object &&
        'eyr' in object &&
        'hgt' in object &&
        'hcl' in object &&
        'ecl' in object &&
        'pid' in object
        //'cid' in object
    );
}

export function isValidPassport(passport: Passport): boolean {
    if (parseInt(passport.byr) < 1920 || parseInt(passport.byr) > 2002) return false;
    if (parseInt(passport.iyr) < 2010 || parseInt(passport.iyr) > 2020) return false;
    if (parseInt(passport.eyr) < 2020 || parseInt(passport.eyr) > 2030) return false;

    //if (passport.hgt === '184') console.log(passport.hgt);

    if (passport.hgt.includes('cm')) {
        if (parseInt(passport.hgt) < 150 || parseInt(passport.hgt) > 193) return false;
    } else if (passport.hgt.includes('in')) {
        if (parseInt(passport.hgt) < 59 || parseInt(passport.hgt) > 76) return false;
    } else {
        return false;
    }
    if (!passport.hcl.match(/^#([a-f0-9]{6})$/)) return false;
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) return false;
    if (!passport.pid.match(/^\d{9}$/)) return false;

    return true;
}
