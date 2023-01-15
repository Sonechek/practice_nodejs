const http = require("http")
const { about, get_files_filter, cloneDeep} = require('./module')
let { WorkData } = require('./library')
let { WorkCSV } = require('./library')

const server = http.createServer()
const port = 3000

let select_case = (args, response) => {
    try {
        switch (args.length) {
            case 1: // http://localhost:3000
                about(response)
                break

            case 2: // http://localhost:3000/json или http://localhost:3000/csv
                let files =  get_files_filter('./timefall', args[1])
                response.write(files.join('\n'))
                break

            case 3: // http://localhost:3000/json/users.json
                const path = (`./timefall/${args[1]}/${args[2]}`)
                if (args[1] === 'csv'){
                    let wc = new WorkCSV(path)
                    response.write(JSON.stringify(wc._json, null, 4))
                }
                else {
                    let wd = new WorkData(path)
                    response.write(JSON.stringify(wd._json, null, 4))
                }
                break

            case 4: // http://localhost:3000/json/users.json/?rating=desc&name=asc
                const path_1 = (`./timefall/${args[1]}/${args[2]}`)
                let temp = args[3]
                    .toString()
                    .slice(1)
                    .split('&')

                let t = 0
                let fields = ''
                let directs = ''

                while (t < temp.length){
                    fields += temp[t].split('=')[0] + " "
                    directs += temp[t].split('=')[1]+ " "
                    t++
                }

                fields = fields
                    .slice(0, -1)
                    .split(" ")
                directs = directs
                    .slice(0, -1)
                    .split(" ")

                if (args[1] === 'csv'){
                    let wc_sort = new WorkCSV(path_1)
                    wc_sort.orderBy(fields,directs)
                    response.write(JSON.stringify(wc_sort._json, null, 4))
                }
                else{
                    let wj_sort = new WorkData(path_1)
                    wj_sort.orderBy(fields,directs)
                    response.write(JSON.stringify(wj_sort._json, null, 4))
                }
                break
            default:
                response.statusCode = 404
                response.write('Запрос ошибочный...')
                break
        }
    } catch (error) {
        console.error(error)
    }
    response.end()
}

let callback = (request, response) => {
    let args = request.url.split('/')
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    if (args[args.length-1] === '') args.pop()
    select_case(args, response)
}

server.on("request", callback)

server.listen(port, () => console.log(`localhost:${port}`))