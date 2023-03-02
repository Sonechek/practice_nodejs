const { sorting_array, new_array } = require('./module')

arr = new_array(256000)
console.time('time')
sorting_array(arr)
console.timeEnd('time')

