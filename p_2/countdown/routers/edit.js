const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const htmlParser = express.urlencoded({extended: false});

const render_edit = (req, res) => {
    let id = +req.params.id;
    let query = `SELECT * FROM cars WHERE id = ?`;
    (new sqlite3.Database('./private/cars.db'))
        .all(query, [id], (err, data) => {
            if (err) return console.error(err.message);
            let model = {
                'id': data[0].id,
                'brand': data[0].brand,
                'model': data[0].model,
                'color': data[0].color,
                'price': data[0].price,
                'odometer': data[0].odometer,
                'pic': data[0].pic
            };
            res.render("edit.hbs", model);
        })
        .close();
}

const render_update = (req, res) => {
    let id = +req.params.id
    let brand = req.body.brand
    let model = req.body.model
    let color = req.body.color
    let price = req.body.price
    let odometer = req.body.odometer
    let pic = req.body.pic

    let query_update = `
        UPDATE cars 
        SET brand=?, model=?, color=?, price=?, odometer=?, pic=?
        WHERE id=?`;

    (new sqlite3.Database('./private/cars.db'))
        .run(query_update,[brand,model, color, price, odometer, pic, id],  (err) => {
            if (err) return console.error(err.message);
            res.redirect("/");
        })
        .close();
}

router.get('/:id', render_edit);

router.post('/:id', htmlParser, render_update);

module.exports = router;
