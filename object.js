'use strict'; // used in Valina Javascript. Used to restrict "flexibility" of JS ex)allocate value to not initialized variable


class Bookmark {
    constructor(url, nickname, time, Tags) {
        this.url = url;
        this.nickname = nickname;
        this.time = time;
        this.Tags = Tags;
    }

    get Tags() {
        return this._number;
    }
    set Tags(myVar) {
        if (typeof myVar === 'string' || myVar instanceof String) {
            this._number = number;
        } else {
            throw Error('only positive integers are avaiable.');
        }
    }
}