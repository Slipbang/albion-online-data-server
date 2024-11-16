export class DataController {
    static getData(req, res, dataInstance) {
        //res.setHeader('Access-Control-Allow-Origin', '*');

        try {
            res.status(200).json(dataInstance?.currentData);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }
}
