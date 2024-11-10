import * as fs from "fs";

export class Data {
    constructor() {

    }

    _currentData = {};

    get currentData() {
        return this._currentData;
    }
    set currentData(data) {
        this._currentData = {...data};
    }

    readCurrentData = (filePath) => new Promise((resolve, reject) => {
        fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        })
    })

    writeNewData(filePath, data, logger) {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) logger.error(`Node JS file writing: ${err}`);
            else logger.info('Data is refreshed/written');
        })
    }
}