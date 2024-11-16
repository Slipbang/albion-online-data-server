export class DateController {
    static getDate(req, res, dataInstance, clients) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const gitHubDate = req.params.date;
        clients.push(res);

        if (gitHubDate === 'none' || gitHubDate !== dataInstance?.currentData?.date) {
            res.write(`UPLOAD_NEW_DATA\n\n`);
        } else {
            res.write('DATA_IS_ACTUAL\n\n');
        }

        req.on('close', () => {
            clients.splice(clients.indexOf(res), 1);
        });
    }
}