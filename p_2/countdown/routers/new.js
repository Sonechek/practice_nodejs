const sqlite3 = require('sqlite3').verbose();
const router = require('express').Router();
const htmlParser = require('express').urlencoded({extended: false});

router.post('/', htmlParser, (req, res) => {
    let brand = req.body.brand; // находим по имени тега в шаблоне
    let model = req.body.model;
    let color = req.body.color; // находим по имени тега в шаблоне
    let price = req.body.price; // находим по имени тега в шаблоне
    let odometer = req.body.odometer;
    let pic = req.body.pic
    let arr_values = [brand,model, color, price, odometer, pic];

    let query_insert = `INSERT INTO cars(brand,model,color,price,odometer,pic) VALUES(?,?,?,?,?,?)`;
    (new sqlite3.Database('./private/cars.db'))
        .run(query_insert, arr_values, (err) => {
            if (err) return console.error(err);
            res.redirect('/');
        })
        .close();
});

module.exports = router;
