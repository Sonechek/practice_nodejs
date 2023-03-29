const request = require("sync-request");
const cheerio = require("cheerio");


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
    let str = JSON.stringify(results, null, 4);
    require('fs').writeFileSync('./private/links.json', str);
    return results;
}

let model = { // сформируем модель данных
    "title": "Список документов",
    "field": "id",
    "arr": get_data(get_html("https://pcoding.ru/darkNet.php"))
}


module.exports = { model: model};
