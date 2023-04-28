const axios = require('axios')
const cheerio = require("cheerio")
const fs = require('fs')
const parse = async () => {
    const getHTML = async (url) => {
        const {data} = await axios.get(url)
        return cheerio.load(data)
    }
    const $ = await getHTML('https://n-katalog.ru/category/ssd-nakopiteli/list?sort=Popular&filterid=5c49f7cf')
    const pageNumber = 5
    let limit = 0
    fs.truncateSync('./result.json')
    for (let i = 1; i <= pageNumber; i++){
        const selector = await getHTML(
            `https://n-katalog.ru/category/ssd-nakopiteli/list?page=${i}&sort=Popular&filterid=5c49f7cf`
        )

        selector('.model-short-block').each((i, element) => {
            const title = selector(element).find('span.u').text()
            const href = selector(element)
                .find('a')
                .attr('href')
            const priceDown = selector(element).find('div.model-price-range').find('span').text().slice(0,4)
            const priceUp = selector(element).find('div.model-price-range').find('span').text().slice(4, )
            let result = []

            let obj = {
                "id": limit + 1,
                "title": title,
                "href": 'https://n-katalog.ru'+href,
                'priceDown': priceDown,
                'priceUp': priceUp

            }
            limit++
            result.push(obj);
            console.log(result)
            fs.appendFileSync('./result.json', JSON.stringify(result,null, 4)+','+'\n' )
            fs.writeFileSync('result.json',fs.readFileSync('result.json', 'utf8').replaceAll('\n' +
                '],\n' +
                '[', ','))
        })


    }
}

parse()


