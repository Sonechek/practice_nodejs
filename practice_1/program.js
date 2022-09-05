const { sorting_array, new_array } = require('./module')


console.time('time')
console.table(sorting_array(new_array(10)))
console.timeEnd('time')

