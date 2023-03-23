const {model} = require("../models/model");
const render_data = (req, res) => {
    // 1 - получаем данные
    let {model} = require('../models/model.js');

    // 2 - далее настраиваем данные
    const field = req.params.field; // поле для сортировки
    const direct = req.params.direct; // направление для сортировки
        if (direct == 'asc') {
            model.arr
                .sort((a, b) => a[field] > b[field] ? +1 : -1)
            model.field = field
        }
        if (direct == 'desc') {
            model.arr
                .sort((a, b) => a[field] < b[field] ? +1 : -1)
            model.field = field
        }
        res.render('index.hbs', model)
        console.log(model)


}

module.exports = render_data;

/* - что в контроллере:
1) получаем данные из модели
2) настраиваем данные для текущего запроса
3) отправляем данные на рендеринг страницы

примеры запроса - в параметрах поле и направление сортировки: 
  http://localhost:3000/id&asc
  http://localhost:3000/href&desc
может быть запрос без параметров:
  http://localhost:3000/
*/