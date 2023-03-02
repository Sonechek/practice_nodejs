const r1 = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }

)

let lines = []

r1
    .on('line', line => lines.push(line))

    .on('close', () =>{

            let res = lines[0]
                .split(" ")
                .map(x => +x)
                .sort ((a, b) => a - b)
            // .slice(0,3)
            // .reduce((a,b)=> a + b)
        let res_1 = 0
            for (let i = 1; i < res.length ; i++){
                if(res[i] != res[i+1] && res[i] != res[i-1]){
                     res_1 = res[i]

                }

            }
            console.log(res_1)
            // console.log(res)
        }
    )
