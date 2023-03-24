const request = require("sync-request");
const cheerio = require("cheerio");
const get_json = () => { // получить данные из json
    return require('../private/links.json');
}

const get_html = (url) => {
    let ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';
    let res = request('GET', url, { headers: {'user-agent': ua} });
    let html = res.getBody('utf8');
    return html;
}

const get_data = (html) => {
    let $ = cheerio.load(html); // объект для парсинга данных
    let links = $("a.links") // получить все ссылки класса links
    let results = [];

    links
        .each((i, elm) => {
            let obj = {
                "id": i+1,
                "title": $(elm).text(),
                "href": $(elm).attr('href')
            };
            if (obj.href.includes('.pdf')){
                results.push(obj)
            }
        });
    let str = JSON.stringify(arr, null, 4);
    require('fs').writeFile('./private/links_pdf.json', str);
    return results;
}

let model = { // сформируем модель данных
    "title": "Список документов",
    "field": "id",
    "arr": get_data(get_html("https://pcoding.ru/darkNet.php"))
}

let model_sorted = {
    "title": "Список документов",
    "field": "id",
    "arr": get_json()
}

module.exports = { model, model_sorted };
