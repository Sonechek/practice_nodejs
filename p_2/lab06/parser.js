const sqlite = require('sqlite-sync')
sqlite.connect('prods.db')

const change = str => str.replace(/[\s|P]+ /g, '')

sqlite.create_function(change)

let sql_select =
    SELECT title, change(price)