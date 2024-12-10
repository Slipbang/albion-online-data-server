import {AppItems} from "../dummyItems.js";

export class ItemStorage {
    protected _currentData: AppItems;

    constructor(initialData: AppItems = {} as AppItems) {
        this._currentData = initialData;
    }

    get currentData() {
        return this._currentData;
    }
    set currentData(data) {
        this._currentData = {...data};
    }
}