class WorkCSV {
    _json;
    _tmp;

    constructor(file_name, del) {
        this.fs = require("fs");
        this._ = require("lodash");
        this.csvjson = require("csvjson");
        this.fastcsv = require("fast-csv");
        this._json = this.csv_to_json(file_name, del)
            .map(x => { return {"id": +x.id,"nameSt": x.nameSt, "sex": +x.sex, "age": +x.age, "idGr": +x.idGr   }});
        this._tmp = this.restore();
    }
    restore() {
        this._tmp = this._.clone(this._json);
    }
    csv_to_json(nameFile, del=',') {
        let textCSV = this.fs.readFileSync(nameFile, 'utf-8');
        return this.csvjson.toObject(textCSV, { delimiter: del });
    }
    json_to_csv(nameFile) { // переписать в writeFileSync()
        let fw = this.fs.createWriteStream(nameFile);
        this.fastcsv
            .write({headers:true})
            .pipe(fw);
    }
    select(...fields) {
        this._tmp = JSON.parse(JSON.stringify(this._tmp, fields));
        return this._tmp;
    }
    where(field, value) {
        this._tmp = this._tmp.filter(obj => obj[field] === value.toString());
        return this._tmp;
    }
    orderBy(fields, directs) {
        this._tmp = this._.orderBy(this._tmp, fields, directs);
        return this._tmp;
    }
    insert(nameSt, sex, age, idGr) {
        let new_id = +this._.maxBy(this._tmp, 'id').id + 1;
        let new_st = {id: new_id, nameSt: nameSt, sex: sex, age: age, idGr: idGr}
        this._tmp.push(new_st);

    }
    update(field, value, updateField, updateValue) {
        this._tmp.forEach(obj => {
            if (obj[field] === value.toString()) {
                obj[updateField] = updateValue.toString();
            }
        });
        return this._tmp;
    }

    delete(field, value) {
        this._tmp = this._tmp.filter(obj => obj[field] !== value.toString());
        return this._tmp;
    }
    filter(fields, values) {
        values = values.map(elm => elm.toString());
        let arr_fltr = this._.zip(fields, values);
        let obj_fltr = this._.fromPairs(arr_fltr);
        this._tmp = this._.filter(this._tmp, obj_fltr);
        return this._tmp;
    }
}

module.exports = {
    WorkCSV
}