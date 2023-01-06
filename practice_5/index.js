const { WorkCSV } = require("./library");

let ex_01 = () => {
    console.log(obj._json);

    obj.restore();
    obj.select("nameSt","age","idGr");
    obj.where("age",17);
    obj.orderBy(["idGr","nameSt"],["asc","asc"]);

    console.log(obj._tmp);
    obj.json_to_csv(obj._tmp, "./csv/results.csv");
}

let ex_02 = () => {
    obj.restore();
    obj.filter(["sex","idGr"],[1,1]);
    obj.orderBy("nameSt", "asc");
    console.log(obj._tmp);
}
let ex_03 = () => {
    obj.restore()
    // console.log(obj._tmp)
    obj.insert("Шипулин", 1, 20, 3);
    obj.orderBy("nameSt", "asc");
    console.log(obj._tmp)
    // obj.json_to_csv("./csv/students_.csv");s
}
let ex_04 = () => {
    obj.restore();
    obj.delete("age", 17);
    console.log(obj.tmp);
}

let ex_05 = () => {
    obj.restore();
    console.log(obj.tmp);
    obj.update("age", 17, "age", 18);
    console.log(obj.tmp);
}

let ex_06 = () => {
    obj.restore()
    let student = {
        "nameSt": "Шипулин",
        "sex": "1",
        "age": "24",
        "idGr": "3",
    };
    console.log(obj.tmp)
    obj.insert(student)
    console.log(obj.tmp)
    console.log(obj._currentId)
}



let file_name = "./csv/students.csv";
let obj = new WorkCSV(file_name);
// ex_01();
// ex_02();
ex_03();
// ex_04();
// ex_05();
// ex_06();