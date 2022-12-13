class WorkData {
    _json; // данные считанные из файла
    get json() {
        return this._json;
    }
    constructor(file_name) {
        this._json = require(file_name);
    }
    comparator = (a, b, fs, ds) => {
        if ((fs.length > 1) && (a[fs[0]] === b[fs[0]])) {
            return comparator(a, b, fs.slice(1,), ds.slice(1,));
        }
        let d = {'asc': +1, 'desc': -1};
        return d[ds[0]] * (a[fs[0]] > b[fs[0]] ? +1 : -1);
    }
    orderBy(fields, directs) {
        this._json.sort((a, b) => comparator(a, b, fields, directs));
        return this._json;
    }
}

module.exports = {
    WorkData
}