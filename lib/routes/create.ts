import { Router } from 'express';

import { InternalMiddleware } from '../modules/middlewares/internal';
import { CreateNewLink } from '../modules/handlers/create';

export const route = Router();

route.post('/', InternalMiddleware, CreateNewLink)