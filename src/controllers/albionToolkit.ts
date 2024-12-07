import { Response, Request } from 'express';

export class AlbionToolkit {
    static getAlbionToolkit(req: Request, res: Response, path: string) {
        res.sendFile(`${path}/index.html`);
    }
}