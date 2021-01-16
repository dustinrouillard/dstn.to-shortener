import { Router } from 'express';

import { InternalMiddleware } from '../modules/middlewares/internal';
import { DeleteCode, GetRedirect } from '../modules/handlers/get';
import { GetAll, GetVisitsForCode } from '../modules/handlers/get';

export const route = Router();

route.get('/links', InternalMiddleware, GetAll);
route.get('/:code/visits', InternalMiddleware, GetVisitsForCode);
route.get('/:code', GetRedirect);
route.delete('/:code', InternalMiddleware, DeleteCode);
