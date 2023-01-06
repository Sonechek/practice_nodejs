const http = require("http")
const { about, get_files_filter, cloneDeep} = require('./module')
let { WorkData } = require('./library')



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
                let wd = new WorkData(`./timefall/${args[1]}/${args[2]}`)
                console.log(wd)
                response.write(JSON.stringify(wd.json, null, 4))
                break

            case 4: // http://localhost:3000/json/users.json/?rating=desc&name=asc
                let wd_sort = new WorkData(`./timefall/${args[1]}/${args[2]}`)
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
                let tempo_sort = cloneDeep(wd_sort)
                // console.log(tempo_sort)
                wd_sort.orderBy(fields,directs)
                response.write(JSON.stringify(wd_sort.json, null, 4))
                break
            default:
                console.log('404')
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