const r1 = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }

)

let lines = []

r1
    .on('line', line => lines.push(line))

    .on('close', () =>{
            let res = lines
                .split(" ")
                .map(x => +x)
                .slice(0, 1)
                .sort ((a, b) => a - b)
                .filter(x => x%10 === 3)
                .join(" ")
            console.log(res)
        }
    )