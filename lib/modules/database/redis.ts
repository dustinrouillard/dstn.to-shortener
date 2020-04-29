import Redis, { RedisOptions, ClusterNode } from 'ioredis';

import { RedisConfig } from '../config';

import { Log, Error } from '../../utils/logger';

let RedisConstructor;
if (RedisConfig.Cluster) RedisConstructor = Redis.Cluster;
else RedisConstructor = Redis;

let RedisHost = { host: RedisConfig.Host, port: RedisConfig.Port };
let RedisOptions: RedisOptions = { lazyConnect: true, db: RedisConfig.Database };

let ClusterHost: ClusterNode[] = [RedisHost];
if (!RedisConfig.Cluster) RedisOptions = { ...RedisHost, ...RedisOptions };

let HostOrOptions = RedisConfig.Cluster ? ClusterHost : RedisOptions as ClusterNode[];
let ConfigOrNone = RedisConfig.Cluster ? RedisOptions : undefined;

export const RedisClient = new RedisConstructor(HostOrOptions, ConfigOrNone);

(async () => {
    try {
        await RedisClient.connect(() => {});
        Log(`Connection opened to redis ${RedisConfig.Cluster ? 'cluster' : 'server'} [Database ${RedisConfig.Database}]`);
    } catch (error) {
        Error('Error with the redis database connection', error);
    }
})();