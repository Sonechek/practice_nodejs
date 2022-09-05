const { sorting_array } = require('./module')


console.time('time')
console.table(sorting_array(10))
console.timeEnd('time')
