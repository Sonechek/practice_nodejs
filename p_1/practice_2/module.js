let group_id_sorting = function(arr){
    return arr
    .sort(
        (a,b) => b[3] - a[3] 
        )
    .sort(
        (a,b) => b[1].toLowerCase() < a[1].toLowerCase() ? -1:1
    )
    
}


module.exports = {
    group_id_sorting
    
}