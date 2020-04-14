import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

// Temporary object of shortend links
const links: any = {
  twitter: "https://twitter.com/dustinrouillard",
  twitch: "https://twitch.tv/dustinrouillard",
  discord: "https://dustin.vc",
  hiven: "https://hiven.house/dustin",
  notify: "https://notify.me/dustin",
  snapchat: "https://snapchat.com/add/dustinrouillard",
  linkedin: "https://linkedin.com/in/dustinrouillard",
  github: "https://github.com/dustinrouillard",
  keybase: "https://keybase.io/dustinrouillard"
};

route.get('/:code', (req: Request, res: Response, next: NextFunction) => {
    let code: string = req.params.code;

    if (links[code]) {
        console.log(`Go - visit:${code} - link:${links[code]} - ip:${req.headers['CF-Connecting-IP'] || req.connection.remoteAddress}`);
        return res.redirect(302, links[code]);
    }

    return next();
});

export default route;