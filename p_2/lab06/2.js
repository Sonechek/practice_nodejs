const sqlite = require('sqlite-sync')

sqlite.connect('./prods.db')

sql_create = `
    CREATE TABLE IF NOT EXISTS prods(
        id INTEGER UNIQUE,
        title TEXT,
        href TEXT,
        priceDown INTEGER,
        priceUp INTEGER,
        capacity INTEGER,
        PRIMARY KEY (id AUTOINCREMENT)
    );
`

sqlite.run(sql_create, (res) => {
    if (res.error) throw res.error;
})
let prods = require('./result.json')

for (let prod of prods) {
    sqlite.insert('prods', prod)
}


sqlite.close()