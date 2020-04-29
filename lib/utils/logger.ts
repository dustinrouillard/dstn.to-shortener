import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

import { GetIp } from './ip';
import { GetLink } from '../modules/helpers/link';

import { CustomResponse } from './interface';

export function Log(...optionalParams: any[]) {
    let mainContent = optionalParams[0];
    optionalParams.shift();

    console.log(`${chalk.yellow('L')}: ${chalk.green(mainContent)}`, ...optionalParams);
}

export function Error(...optionalParams: any[]) {
    let mainContent = optionalParams[0];
    optionalParams.shift();

    console.error(`${chalk.red('E')}: ${chalk.redBright(mainContent)}`, ...optionalParams);
}

export async function Request(req: Request, res: CustomResponse, next: NextFunction) {
    let ipAddress = GetIp(req);
    let method = req.method;
    let route = req.path;
    let code = res.statusCode;

    let startHrTime = process.hrtime();
    let elapsedHrTime, elapsedTimeInMs;

    res.on("finish", async () => {
        elapsedHrTime = process.hrtime(startHrTime);
        elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        Log(`${method} - ${route} - ${code} - ${elapsedTimeInMs}ms ${res.currentLink ? `- ${res.currentLink.uses.toLocaleString()} uses `: ''}- IP: ${ipAddress}`);
    });

    return next();
}