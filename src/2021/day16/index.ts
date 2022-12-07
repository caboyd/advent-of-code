import {Results} from 'src/lib';

export const year = 2021;
export const day = 16;

export const results: Results = {
    one: 895,
    two: 1148595959144,
};

export type Pointer = {
    ptr: number;
};

export type HeaderResult = {
    version: number;
    type: number;
};

export type PacketResult = {
    version_sum: number;
    value: number;
};

export function parseHeader(binary: string, ptr: Pointer): HeaderResult {
    const version = binary.slice(ptr.ptr, (ptr.ptr += 3));
    const type = binary.slice(ptr.ptr, (ptr.ptr += 3));
    return {version: parseInt(version, 2), type: parseInt(type, 2)};
}

export function parseLiteral(binary: string, ptr: Pointer): number {
    let result = '';
    let next;
    do {
        next = binary.slice(ptr.ptr, (ptr.ptr += 5));
        result += next.slice(1);
    } while (next[0] === '1');

    let num = parseInt(result, 2);
    return num;
}

export function parseNumSubPackets(binary: string, ptr: Pointer): PacketResult[] {
    const sub_packets = [];
    const num_sub_packets = parseInt(binary.slice(ptr.ptr, (ptr.ptr += 11)), 2);
    for (let i = 0; i < num_sub_packets; i++) {
        const sub_packet = parsePacket(binary, ptr);
        sub_packets.push(sub_packet);
    }
    return sub_packets;
}

export function parseLengthSubPackets(binary: string, ptr: Pointer): PacketResult[] {
    const sub_packets = [];
    const length_bits = parseInt(binary.slice(ptr.ptr, (ptr.ptr += 15)), 2);
    const end_of_packet = ptr.ptr + length_bits;
    while (ptr.ptr < end_of_packet) {
        const sub_packet = parsePacket(binary, ptr);
        sub_packets.push(sub_packet);
    }
    return sub_packets;
}

export function parsePacket(binary: string, ptr: Pointer): PacketResult {
    const packet_result = {ptr: 0, version_sum: 0, value: 0};

    let header = parseHeader(binary, ptr);
    packet_result.version_sum += header.version;
    let sub_packets: PacketResult[] = [];
    switch (header.type) {
        case 4: {
            packet_result.value = parseLiteral(binary, ptr);
            break;
        }
        //operators
        default: {
            const mode = binary.slice(ptr.ptr, (ptr.ptr += 1));
            if (mode === '1') {
                sub_packets = parseNumSubPackets(binary, ptr);
            } else {
                sub_packets = parseLengthSubPackets(binary, ptr);
            }
        }
    }
    switch (header.type) {
        case 0:
            for (const sub_packet of sub_packets) packet_result.value += sub_packet.value;
            break;
        case 1:
            packet_result.value = 1;
            for (const sub_packet of sub_packets) packet_result.value *= sub_packet.value;
            break;
        case 2:
            packet_result.value = Number.MAX_SAFE_INTEGER;
            for (const sub_packet of sub_packets) packet_result.value = Math.min(sub_packet.value, packet_result.value);
            break;
        case 3:
            packet_result.value = 0;
            for (const sub_packet of sub_packets) packet_result.value = Math.max(sub_packet.value, packet_result.value);
            break;
        case 5:
            packet_result.value = sub_packets[0].value > sub_packets[1].value ? 1 : 0;
            break;
        case 6:
            packet_result.value = sub_packets[0].value < sub_packets[1].value ? 1 : 0;
            break;
        case 7:
            packet_result.value = sub_packets[0].value == sub_packets[1].value ? 1 : 0;
            break;
    }
    for (const sub_packet of sub_packets) packet_result.version_sum += sub_packet.version_sum;
    return packet_result;
}
