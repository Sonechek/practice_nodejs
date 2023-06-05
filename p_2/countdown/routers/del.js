const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();

const del_car = (req, res) => { // http://localhost:3000/del/12
    let id = +req.params.id;
    let query_delete = `DELETE FROM cars WHERE id=?`;
    (new sqlite3.Database('./private/cars.db'))
        .run(query_delete, [id], (err) => {
            if (err) return console.error(err);
            res.redirect('/');
        })
        .close();
}

router.get('/:id', del_car);

module.exports = router;
