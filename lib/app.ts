import express, { Request, Response } from 'express';

import './modules/database/postgres';
import { Link, Create } from './routes';
import { PortConfig, RedirectDomain } from './modules/config';

import { Log, Request as RequestLogger } from './utils/logger';

const app = express();

app.use(express.json());
app.use(RequestLogger);

app.use('/', Link);
app.use('/create', Create);

app.get('/', (req: Request, res: Response) => {
    return res.redirect(302, `${RedirectDomain}`);
});

app.use((req: Request, res: Response) => {
    return res.redirect(302, `${RedirectDomain}${req.path}`);
});

app.listen(PortConfig, () => {
    Log(`Server ready on ${PortConfig}`);
});