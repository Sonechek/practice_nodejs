const {model} = require("../models/model");
const render_data = (req, res) => {
    let d = req.body.direct;
    if (d < 0) d = 0;
    let f = req.body.field
    let { model } = require('../models/model.js');
    if (f < 0) f = 0

    let field = f == 0? 'id': 'title'; // поле для сортировки
    model.field = field;
    let direct = d==0? +1: -1; // направление для сортировки
    model.arr.sort((a,b)=> direct*(a[field]>b[field]?+1:-1) );

    let count = req.body.count
    if (count < 0) count = 0
    if (count == 0) count = model.arr.length
    // 3 - потом рендерим страницу
    res.render('index.hbs',{
        "title": model.title,
        "field": model.field,
        "arr":model.arr.slice(0, count)});
}


module.exports = render_data;
