const _ = require('lodash')

let colors = require('./json/colors.json')
let data = require('./json/data.js')
const {argb} = require("./json/data");

function sortByLengthAndName(){
   _(colors)
       .map(obj => _.toPairs(obj)[0][0])
       .filter(obj => obj.length < 6)
       .sortBy()
       .forEach(obj => console.log(obj))

}

function new_array_in_object(){
   _(colors)
       .map(obj => _.toPairs(obj)[0])
       .map( obj => {
          return{
             color:obj[0],
             rgb:obj[1].slice(0,3)
          }
       })
       .value()
       .forEach(obj => console.log(obj))
}


function two_arrays_in_array(){
console.log(
    _(data.argb)
        .map(elm => '#' + elm.slice(0,3).map(num => num.toString(16)).join(''))
        .zip(data.colors)
        .map(arr => _.zipObject(['hex','color'],arr))
        .sortBy(obj => obj.color)
        .value()
)
}

function south_ball(){
    _
}


module.exports = {
   sortByLengthAndName,
   new_array_in_object,
   two_arrays_in_array
}