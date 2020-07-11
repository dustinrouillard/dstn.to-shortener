import { Request } from "express";

export function GetIp(req: Request) {
    let address = '0.0.0.0';
    if (req.headers['cf-connecting-ip']) address = req.headers['cf-connecting-ip'].toString();
    if (!req.headers['cf-connecting-ip'] && req.connection.remoteAddress) address = req.connection.remoteAddress;
    if (address.includes('ffff')) address = address.split('::ffff:')[1];

    return address;
}