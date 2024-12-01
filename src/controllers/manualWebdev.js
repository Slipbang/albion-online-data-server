export class ManualWebdev {
    static getManual(req, res, path) {
        res.sendFile(`${path}/index.html`);
    }
}