import {IAppItems} from "../dummyItems.js";

export class ItemStorage {
    protected _currentData: IAppItems;

    constructor(initialData: IAppItems = {} as IAppItems) {
        this._currentData = initialData;
    }

    get currentData() {
        return this._currentData;
    }
    set currentData(data) {
        this._currentData = {...data};
    }
}