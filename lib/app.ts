import express, { Request, Response } from 'express';

import './modules/database/postgres';
import { Link, Create } from './routes';
import { AppConfig } from './modules/config';

import { Log, Request as RequestLogger } from './utils/logger';

const app = express();

app.use(express.json());
app.use(RequestLogger);

app.use('/', Link);
app.use('/create', Create);

app.get('/', (req: Request, res: Response) => {
    return res.redirect(302, "https://dustin.sh");
});

app.use((req: Request, res: Response) => {
    return res.redirect(302, `https://dustin.sh${req.path}`);
});

app.listen(AppConfig.Port, () => {
    Log(`Server ready on ${AppConfig.Port}`);
});