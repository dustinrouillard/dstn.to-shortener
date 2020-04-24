import express from 'express';

import { Go } from './routes';
import { App } from './modules/config';

const app = express();

app.use('/', Go);

app.get('/', (req: express.Request, res: express.Response) => {
    console.log(`Base - visit:base  - ip:${req.headers['CF-Connecting-IP'] || req.connection.remoteAddress}`);
    return res.redirect(302, "https://dustin.sh");
});

app.use((req: express.Request, res: express.Response) => {
    return res.redirect(302, `https://dustin.sh${req.path}`);
});

app.listen(App.Port, () => {
    console.log(`Server ready on ${App.Port}`);
});