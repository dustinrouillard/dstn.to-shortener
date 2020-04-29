import { Request, Response } from 'express';

import { CreateLink } from '../helpers/link';

export async function CreateNewLink(req: Request, res: Response) {
    try {
        // Deconstruct the body
        let { target, code } = req.body;

        // Fail if they don't include a target`
        if (!target) return res.status(400).send({ code: 'missing_target' });

        // Create the link with the code and or target
        let newLink = await CreateLink({ code, target });
        if (!newLink) return res.status(400).send({ code: 'failed_to_create_link' });

        // Return success`
        return res.status(200).send({ success: true, ...newLink });
    } catch (error) {
        return res.status(500).send({ code: 'internal_server_error', error: error.toString() });
    }
}