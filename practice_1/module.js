function new_array(number){
    let arr = []
    for ( i = 0; i < number; i++ ) {
        arr.push(Math.round( Math.random() * 100 ))
    }
   console.table(arr)
   return arr
}
function sorting_array(arr) {
for(let i = 1; i < arr.length; i++){
    let j = i
    const tmp = arr[i]
    while(j > 0 && arr[j - 1] > tmp){
        arr[j] = arr[j-1]
        j--
    }
    arr[j] = tmp
    }
    return arr
}



module.exports = {
    
    sorting_array,
    new_array
}


// sorting_array()

