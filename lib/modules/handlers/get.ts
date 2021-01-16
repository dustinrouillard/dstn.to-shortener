import { Request, Response, NextFunction } from 'express';

import { IncrementVisitCount, GetLink, DeleteLink, GetAllLinks } from '../helpers/link';

import { GetIp } from '../../utils/ip';
import { CustomResponse } from '../../utils/interface';

export async function GetRedirect(req: Request, res: CustomResponse, next: NextFunction) {
  let code: string = req.params.code;

  // Check if the link exists
  try {
    let link = await GetLink(code);

    if (link) {
      // Handle incrementing the visit count
      await IncrementVisitCount(link.code, GetIp(req));

      // @ts-ignore
      res.currentLink = link;

      // Finally redirect the user
      return res.redirect(302, link.target);
    }

    return next();
  } catch (error) {
    return next();
  }
}

export async function GetVisitsForCode(req: Request, res: Response, next: NextFunction) {
  let code: string = req.params.code;

  // Check if the link exists
  try {
    let link = await GetLink(code);
    if (!link) return res.status(400).send({ code: 'link_not_found' });

    // Return the link
    return res.status(200).send({ success: true, link });
  } catch (error) {
    return res.status(400).send({ code: 'link_not_found' });
  }
}

export async function DeleteCode(req: Request, res: Response, next: NextFunction) {
  let code: string = req.params.code;

  // Check if the link exists
  try {
    await DeleteLink(code);

    // Return the link
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ code: 'link_not_found' });
  }
}

export async function GetAll(req: Request, res: Response) {
  // Get the links from the database
  let getAll = await GetAllLinks();
  if (!getAll) return res.status(400).send({ code: 'missing_links' });

  // Return the links
  return res.status(200).send({ success: true, links: getAll });
}
