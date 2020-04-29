import dotenv from 'dotenv';
dotenv.config();

export const PortConfig = process.env.PORT || 9090;
export const InternalSecret = process.env.INTERNAL_SECRET || 'internal_secret_totally_secret';

export const PostgresConfig = {
    Host: process.env.POSTGRES_HOST || '127.0.0.1',
    Port: Number(process.env.POSTGRES_PORT) || 5432,
    User: process.env.POSTGRES_USER,
    Pass: process.env.POSTGRES_PASS,
    Database: process.env.POSTGRES_DATABASE
};

export const RedisConfig = {
    Host: process.env.REDIS_HOST || '127.0.0.1',
    Port: Number(process.env.REDIS_PORT) || 6379,
    Cluster: !!process.env.REDIS_CLUSTER
};

export const AppConfig = {
    Port: PortConfig
};