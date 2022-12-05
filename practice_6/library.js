let sorting = function (filename) {

    comparator = (a, b, fs, ds) => { //создаем компаратор(функцию сравнения)
        if ((fs.length > 1) && (a[fs[0]] === b[fs[0]])) { //если длина поля больше 1 и значение первого
            return comparator(a, b, fs.slice(1,), ds.slice(1,)); // равнется значению второго, то возвращаются значения
        }
        let d = {'asc': +1, 'desc': -1}; // для удобства ввода пользователю, присваеваем значения 1 и -1
        return d[ds[0]] * (a[fs[0]] > b[fs[0]] ? +1 : -1); // производим сравнение и возвращаем значение
    }

    const orderBy = (arr, fields, directs) => {
        return arr.sort((a, b) => comparator(a, b, fields, directs)); //вызываем рекурсивную функцию сравнения
    }

    let arr = filename.clients;
    let fields = ['gender', 'age', 'name'];
    let directs = ['desc', 'desc', 'asc'];
    let arr_sorted = orderBy(arr, fields, directs);
    console.log(arr_sorted);
}
let DeepClone = function (filename)
{
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

    let obj = filename.clients[0];

    let obj_n = cloneDeep(obj);
    obj_n["age"] = 666;
    obj_n["address"]["city"] = "Пекин";

    console.log(obj);
}
module.exports = {
    sorting,
    DeepClone
}