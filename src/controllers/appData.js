export class DataController {
    static getData(req, res, dataInstance) {

        try {
            res.status(200).json(dataInstance?.currentData);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }
}
