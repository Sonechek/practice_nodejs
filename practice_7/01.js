const http = require("http")

const server = http.createServer()
const port = 3000

const clients = (res) =>{
    let clients = require('./json/clients.json')
    res.write(JSON.stringify(clients.clients, null, 3))

}

const get_files_filter = (ext) => {
    return ["zxc.json", "d12.json"];
}
let callback = (request, response) => {
    let req = request.url
    let args = req.split('/')
    let res = ''
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    response.write(args[1]+'\n')
    switch (args.length){
        case 2:
            response = '!HELP FILE!'
            breakю
        case 3:          // /json
            response.write("-n-o-t-h-i-n-g-\n")
            let files =  get_files_filter(args[1])
            response.write(files.join('\n'))
            response.end()
            break;
        case 4:         // /json/abiturs.csv/?rating=desc&name=asc
            response.write(res)
            response.write(args.join(' / '))
            response.end()
            break
        default:
            response.statusCode = 404
            response.write('Запрос не доехал....')
            break

    }
}

server.on("request", callback)

server.listen(port)
