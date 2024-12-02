export class DataController {
    static getData(req, res, itemStorage) {

        try {
            res.status(200).json(itemStorage?.currentData);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }
}
