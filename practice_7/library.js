class WorkData {    _json; // данные считанные из файла    get json() {        return this._json;    }    constructor(file_name) {        this._json = require(file_name);    }    orderBy(fields, directs) {        this._json.sort((a, b) => comparator(a, b, fields, directs));        return this._json;    }}module.exports = {    WorkData}