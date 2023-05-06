const sqlite = require('sqlite-sync')

const get_as_num = (count) => {
    sqlite.connect('prods.db')

    let sql_select = `
        SELECT title, CAST(priceDown AS INTEGER) AS price, CAST(capacity AS INTEGER) AS capacity
        FROM prods
        ORDER BY capacity DESC, price
        LIMIT ${count}
    `
    let select = sqlite.run(sql_select)
    sqlite.close()
    return select[0]
}

console.clear()
let count = 20 // сколько брать из таблицы
let res = get_as_num(count) // тут price уже в числовом формате - сортировка корректная
let records = res.values

for (let rec of records) {
    console.log(rec[2] + ' ГБ', rec[1] + '₽', rec[0])
}