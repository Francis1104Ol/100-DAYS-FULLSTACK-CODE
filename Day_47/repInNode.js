//RELP in node js :Read Eval Print Loop
// outputing messge from the terminal
console.log("Hello, this message will be output in the trminal")
//Reading input from terminal 
const readLine = require('readLine');
/*eadLine.createInterFace({
    input: process.stdin,
    output: process.stdout
});
readLine.question("Please Enter your name", (name) =>{
    console.log("you entered:", name );
    rl.close(); //to close the interface
})
rl.on('close', () =>{
    console.log("Interface closed");
    process.exit(0)

}) */

//Reading and Writing files synchronously working with file system

const fs = require('fs');

let textIn = fs.readFileSync('./Files/input.txt', 'utf-8');
console.log(textIn)

// Reading synchronously means reading line by line and is a blocking code 
//while asynchronously i.e it does not block the excution of the next line of code
let content = `Data read from input.txt: ${textIn} /n Date created ${new Date()}`
fs.writeFileSync("./Files/output.txt", `content`)
//Recall Javascript is a single thread programming langauage 
//Asynchronous nature of node i.e the excution of next line of code is not blocked
//Thread is responsible for excuting the program code in the machine processor 
fs.readFile('./Files/start.txt', 'utf-8', (error1, data1) =>{
    console.log("data1")
    fs.readFile('./Files/${data1}.txt', 'utf-8',(error2, data2) =>{
        console.log(data2);
        console.log(error2); // this will return null since no error is log 
        fs.readFile('./Files/append.txt', 'utf-8',(error3, data3) =>{
            console.log(data3);
            fs.writeFile('./Files/output.txt', `${data2}\n\n${data3}/n/n Date created${new Date()}`,() => {
                console.log('File written successfully')
                })
        })
    })
})
console.log('Reading File.....');