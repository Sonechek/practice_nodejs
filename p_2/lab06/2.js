const sqlite = require('sqlite-sync')

sqlite.connect('./prods.db')

sql_create = `
    CREATE TABLE IF NOT EXISTS prods(
        id INTEGER UNIQUE,
        title TEXT,
        href TEXT,
        priceDown INTEGER,
        priceUp INTEGER,
        PRIMARY KEY (id AUTOINCREMENT)
    );
`

sqlite.run(sql_create, (res) => {
    if (res.error) throw res.error;
})
let prods = require('./result.json')

let recs = prods
    .map(p => `('${p.id}','${p.title}','${p.href}','${p.priceDown}','${p.priceUp}')`)

let sql_insert = `INSERT INTO prods VALUES ${recs.join(',')}`

console.log(sql_insert)
sqlite.run(sql_insert, (res) => {
    if (res.error) throw res.error;
})

sqlite.close()