import { Request } from "express";

export function GetIp(req: Request) {
    let address = '0.0.0.0';
    if (req.headers['CF-Connecting-IP']) address = req.headers['CF-Connecting-IP'].toString();
    if (!req.headers['CF-Connecting-IP'] && req.connection.remoteAddress) address = req.connection.remoteAddress;
    if (address.includes('ffff')) address = address.split('::ffff:')[1];

    return address;
}