export class DateController {
    static getDate(req, res, dataInstance, clients) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        clients.push(res);

        const versionMeta = {
            githubCommitDate: dataInstance.currentData.githubCommitDate,
            appVersion: dataInstance.currentData.appVersion,
        }

        res.write(`data: ${JSON.stringify(versionMeta)}\n\n`);

        req.on('close', () => {
            clients.splice(clients.indexOf(res), 1);
        });
    }
}