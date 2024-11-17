export class ManualController {
    static getManual(req, res, path) {
        res.sendFile(`${path}/index.html`);
    }
}