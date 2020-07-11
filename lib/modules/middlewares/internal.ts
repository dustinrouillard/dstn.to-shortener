import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { InternalSecret } from '../config';

export async function InternalMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        let header = req.headers.authorization;
        if (!header) return res.status(403).send({ code: 'missing_authentication' });

        let token = header.replace(new RegExp('bearer'), '').replace(/[ ]/g, '');
        if (!token) return res.status(403).send({ code: 'missing_authentication' });

        let verifyJwt = await verify(token, InternalSecret, { issuer: 'dustin.click' });
        if (!verifyJwt) return res.status(403).send({ code: 'invalid_authentication' });

        return next();
    } catch (error) {
        return res.status(400).send({ code: 'unable_to_validate' });
    }
}