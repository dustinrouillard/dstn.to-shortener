import { Router, Request, Response } from 'express';

const route = Router();

// Temporary object of shortend links
const links: any = {
  twitter: "https://twitter.com/dustinrouillard",
  discord: "https://dustin.vc",
  snapchat: "https://snapchat.com/add/dustinrouillard",
  linkedin: "https://linkedin.com/in/dustinrouillard",
};

route.get('/:code', (req: Request, res: Response) => {
    let code: string = req.params.code;

    if (links[code]) {
        console.log(`Go - visit:${code} - link:${links[code]} - ip:${req.headers['CF-Connecting-IP'] || req.connection.remoteAddress}`);
        return res.redirect(302, links[code]);
    }
});

export default route;