import pgPromise from 'pg-promise';
import { PostgresConfig } from '../config';
import { Log, Error } from '../../utils/logger';

const ConnectionURL = `postgres://${PostgresConfig.User}:${PostgresConfig.Pass}@${PostgresConfig.Host}:${PostgresConfig.Port}/${PostgresConfig.Database}`;

interface IExtensions {
    findLink(code: string): Promise<any>;
}

const ConnectionOptions: pgPromise.IInitOptions<IExtensions> = {
    error(err, e) {
        Error('Error in the postgres connection', err, e);
    },
    extend(obj) {
        obj.findLink = (code: string) => {
            return obj.oneOrNone('SELECT code, target, uses FROM links WHERE code = $1', code);
        }
    }
};

const pgp = pgPromise(ConnectionOptions);
export const PostgresClient = pgp(ConnectionURL);

(async () => {
    await PostgresClient.connect();
    Log(`Connected to postgres database [Database: ${PostgresConfig.Database}]`);
})();
