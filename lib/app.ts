import express from 'express';

import { Go } from './routes';
import { App } from './modules/config';

const app = express();

app.use('/g', Go);

app.listen(App.Port, () => {
    console.log(`Server ready on ${App.Port}`);
});