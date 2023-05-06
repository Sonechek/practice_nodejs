const axios = require('axios')
const cheerio = require("cheerio")
const fs = require('fs')
const parse = async () => {
    const getHTML = async (url) => {
        const {data} = await axios.get(url)
        return cheerio.load(data)
    }
    const $ = await getHTML('https://n-katalog.ru/category/ssd-nakopiteli/list?sort=Popular&filterid=48f8bd39')
    const pageNumber = 5
    let limit = 0
    fs.truncateSync('./result.json')
    for (let i = 1; i <= pageNumber; i++){
        const selector = await getHTML(
            `https://n-katalog.ru/category/ssd-nakopiteli/list?page=${i}&sort=Popular&filterid=48f8bd39`
        )

        selector('.model-short-block').each((i, element) => {
            const title = selector(element).find('span.u').text()
            const href = selector(element)
                .find('a')
                .attr('href')
            const price = selector(element).find('div.model-price-range').find('span').text()
            let capacity = selector(element).find('span.ib.current.in-filter').text().slice(0,-3)
            let priceDown = 0
            let priceUp = 0
            if (price.length === 9){
                priceDown = price.slice(0, 4)
                priceUp = price.slice(4,9)
            }
            if (price.length === 8 || price.length === 10){
                let temp = price.length / 2
                priceDown = price.slice(0,temp)
                priceUp = price.slice(temp,)
            }
            if(price.length < 8){
                priceDown = price
            }
            capacity = Math.round(Number(capacity))
            const m = 0
            const n = 3
            if (capacity > m && capacity < n){
                capacity = capacity * 1024
            }

            let result = []

            let obj = {
                "id": limit + 1,
                "title": title,
                "href": 'https://n-katalog.ru'+href,
                'priceDown': priceDown,
                'priceUp': priceUp,
                'capacity': capacity

            }
            limit++
            result.push(obj);
            // console.log(result)
            fs.appendFileSync('./result.json', JSON.stringify(result,null, 4)+','+'\n' )
            fs.writeFileSync('result.json',fs.readFileSync('result.json', 'utf8').replaceAll('\n' +
                '],\n' +
                '[', ','))
        })


    }
}

parse()


