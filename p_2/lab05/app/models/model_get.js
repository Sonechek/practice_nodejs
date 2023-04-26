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
    let links = $("tr") // получить все ссылки класса links
    // console.log($('tr:eq(0)').text())
    // console.log($('tr:eq(-1)').text())
    // console.log($('tr:eq(2)').prev().text())
    console.log($('tr:eq(2)').next().text())
    let results = [];

    links
        .each((i, elm) => {
            let obj = {
                "id": i+1,
                "title": $(elm).text(),
                "games": Math.round(Math.random(30,38) * 100)
            }
            results.push(obj);
        });
    let str = JSON.stringify(results, null, 4);
    str = str.slice(0, 20)
    results = results.slice(0 ,20)
    require('fs').writeFileSync('C:\\Users\\user\\Desktop\\practice_nodejs\\p_2\\lab05\\app\\private\\links.json', str);
    return results;
}

let model = { // сформируем модель данных
    "title": "Список документов",
    "field": "id",
    "arr": get_data(get_html("https://www.championat.com/football/_england/tournament/4013/table/"))
}


module.exports = { model: model};
