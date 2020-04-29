import { RedisClient, PostgresClient } from '../database';
import { RandomString } from '../../utils/string';

export async function CreateLink({ code, target }: { code?: string, target: string }): Promise<{ code: string, target: string }> {
    // Generate a code if there is not a code yet
    if (!code) code = await RandomString(8, { chars: false, lower: false });

    // Check if the code currently exists
    let checkExists = await PostgresClient.any('SELECT code, target FROM links WHERE code = $1', code);
    if (checkExists.length > 0) throw 'code_already_exists';

    // Create the link in the database
    await PostgresClient.none('INSERT INTO links(code, target) VALUES ($1, $2)', [code, target]);

    // Return the code and target
    return { code, target };
}

export async function GetLink(code: string): Promise<{ code: string, target: string, uses: number }> {
    // Check if the code currently exists
    let checkExists = await PostgresClient.findLink(code);
    if (checkExists.length <= 0) throw 'code_missing';

    // Return the code
    return checkExists;
}

export async function GetAllLinks(): Promise<{ code: string, target: string, uses: number }[]> {
    // Get the links from the database
    let checkExists: { code: string, target: string, uses: number }[] = await PostgresClient.many('SELECT code, target, uses FROM links');
    if (checkExists.length < 0) throw 'no_links_avaiable';

    return checkExists;
}

export async function IncrementVisitCount(code: string, ipAddress: string): Promise<number> {
    // Get the current visit count
    let currentVisitCount: number = Number(await RedisClient.get(`route/${code}/visits`));
    if (!currentVisitCount) currentVisitCount = 0;

    // Store their ip in temporary cache and ignore if already exists
    let getIPFromRedis = await RedisClient.get(`ip/${ipAddress}/${code}`);
    if (!getIPFromRedis) {
        // Increment current visit count and update redis along with the database
        await RedisClient.set(`ip/${ipAddress}/${code}`, Date.now(), 'ex', 3600);
        currentVisitCount++;

        // Post to the redis and postgres database
        await RedisClient.set(`route/${code}/visits`, currentVisitCount);
        await PostgresClient.none('UPDATE links SET uses = $1 WHERE code = $2', [currentVisitCount, code]);
    }

    return currentVisitCount;
}