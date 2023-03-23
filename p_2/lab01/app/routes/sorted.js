const router = require('express').Router();
let { model } = require('../models/abiturs.js');
const _ = require('lodash')

router.get('/', (req, res) => { // без параметров
    // тут всегда сортируем данные по рейтингу по убыванию
    model.abiturs
        .sort((a,b) => +b.rating - +a.rating

        )

    // самостоятельно - вывести всех по рейтингу по убыванию
    //

    res.render('index.hbs', model); // рендерим страницу
});

router.get('/count/:count', (req, res) => { // с ограничением
    const count = parseInt(req.params.count); // получим кол-во
    console.log(count); // это просто для контроля
    // тут сортируем данные по рейтингу по убыванию - по умолчанию
    // и берём ограниченное количество count
    // самостоятельно - вывести первых count по рейтингу
    // формат запроса: http://localhost:3000/sorted/count/5
    model.abiturs
        .sort((a,b) => +b.rating - +a.rating

        )
    model.abiturs = model.abiturs.splice(0, count)


    res.render('index.hbs', model); // рендерим страницу
});

router.get('/:field&:direct', (req, res) => { // с параметрами
    const field = req.params.field; // получим поле для сортировки
    const direct = req.params.direct; // получим направление для сортировки
    console.log(field, direct); // это просто для контроля
    // тут сортируем данные по указанным полю и направлению
    // самостоятельно - вывести всех отсортированно по полю и по направлентю
    // формат запроса: http://localhost:3000/sorted/lastName&asc
    //
    // _.orderBy(model.abiturs, [field], [direct])
    if (direct != 'undefined') {
        if (direct == 'asc') {
            model.abiturs
                .sort((a, b) => a[field] > b[field] ? +1 : -1)
        }
        if (direct == 'desc')
            model.abiturs
                .sort((a, b) => a[field] < b[field] ? +1 : -1)

        res.render('index.hbs', model);
    }
    res.render('index.hbs', model); // рендерим страницу
});

module.exports = router;

// при переходе к новому запросу - все данные должны использоваться
// не должно быть такого, что после вывода ограниченного кол-ва 
// абитуриентов при следующем запросе "вывести всех"
// выводилось опять ограниченное кол-во
