const get_json = () => { // получить данные из json
    return require('../private/links.json');
}

let model = {
    "title": "Список документов",
    "field": "id",
    "arr": get_json()
}

module.exports = { model: model};
