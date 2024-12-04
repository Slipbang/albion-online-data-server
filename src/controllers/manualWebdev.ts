import { Response, Request } from 'express';

export class ManualWebdev {
    static getManual(req: Request, res: Response, path: string) {
        res.sendFile(`${path}/index.html`);
    }
}