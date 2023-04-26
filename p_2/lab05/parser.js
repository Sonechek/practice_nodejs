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
    let names = $("span.table-item__name")
    let results = [];
    console.log($('tr:eq(2)').next().text())
    let stre = JSON.stringify($('tr:eq(2)').text())
    require('fs').writeFileSync('temp.json', stre)
    names
        .each((i, elm) => {
            let obj = {
                "id": i+1,
                "title": $(elm).text(),
                "href": $(elm).attr('href')
            }
            results.push(obj);
            results = results.slice(0, 20)
        });
    return results;
}

let url = "https://www.championat.com/football/_england/tournament/4013/table/";
let html = get_html(url);
let arr = get_data(html);
let str = JSON.stringify(arr, null, 4);
require('fs').writeFileSync('results.json', str);