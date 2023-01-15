const about = (res) => {
    let about = require('./about.json');
    res.write(JSON.stringify(about, null, 4));
}

const get_files_filter = (dir, ext) => {
    const rd = require('fs').readdirSync;
    const st = require('fs').statSync;
    const path = require('path');
    const rec = (dir) => {
        let items = rd(dir, 'utf-8');
        for (let item of items) {
            let path_item = path.join(dir, item.toString());
            if (st(path_item).isDirectory()) {
                rec(path_item, ext); // шаг рекурсии - если директория
            }
            else {
                if (path_item.split('.')[1] === ext)
                name_files.push(path_item);
            }
        }
    }
    let name_files = [];
    rec(dir);
    return name_files;
}

comparator = (a, b, fs, ds) => {
    if ((fs.length > 1) && (a[fs[0]] === b[fs[0]])) {
        return comparator(a, b, fs.slice(1,), ds.slice(1,));
    }
    let d = {'asc': +1, 'desc': -1};
    return d[ds[0]] * (a[fs[0]] > b[fs[0]] ? +1 : -1);
}
const cloneDeep = (obj) => {
    let result = {};
    for (let key in obj) {
        if (typeof(obj[key]) === 'object') {
            result[key] = cloneDeep(obj[key]);
        }
        else result[key] = obj[key];
    }
    return result;
}

module.exports = {
    about,
    get_files_filter,
    comparator,
    cloneDeep
}