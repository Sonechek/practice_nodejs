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

            let summa = 0
            let summa_2 = 0
            const d = 1
            let an = 0
            let dlina = res.length + 1
            an = 1 + (1*(100 - 1))
            summa_2 = ((1 + an)*100)/2
            // console.log(summa_2)
                for(let i = 0; i < res.length; i++){
                    summa += res[i]


                }

                console.log(summa - summa_2)
        }
    )
