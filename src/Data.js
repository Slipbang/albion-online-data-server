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
}