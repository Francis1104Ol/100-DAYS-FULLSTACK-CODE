//streams allows us to process data piece by piece instead of writting the whole data at once 
//it makes data processing efficient 
//in terms of performance and time 
//TYPES INCLUDE 
//Readable STREAM
//There are four fundamental stream types within Node.js:

//Writable: streams to which data can be written (for example, fs.createWriteStream()).
//Readable: streams from which data can be read (for example, fs.createReadStream()).
//Duplex: streams that are both Readable and Writable (for example, net.Socket).
//Transform: Duplex streams that can modify or transform the data as it is written and read (for example, zlib.createDeflate()).
//Streams In Practice 
const http = require('http');
const fs = require('fs');

const server =http.createServer();



server.listen(1000, '127.0.0.1', () =>{
    console.log('Server has started');
})
// solution one without using readble streams
// server.on('request', (request, response) =>{
//     fs.readFile('./Data/large-file.txt',(error, data)=>{
//         if(error){
//             response.end('Something went Wrong')
//             return;
//         }
//         response.end(data)
//     })
// })

// server.on('request', (request, response) =>{
//  let rs =   fs.createReadStream('./Data/large-file.txt')
//  rs.on('data', (chunk) =>{
//     response.write(chunk)
//    // response.end(); don't call it here

//  })
//  // do this instead
//  rs.on('end', () =>{
//     response.end(); // this will only run when  we don't have any chunk
//  })
//  rs.on('error', (error)=>{
//     response.end(error.message)
//  })
// })

//Using Pipe method
//what is back pressure this is when the response can not send the data nearly as fast as when it recieve it from the file you use pipe method instead
server.on('request', (request, response) =>{
    let rs = fs.createReadStream('./Data/large-file.txt');
    rs.pipe(response); // pipe only available on readable stream not on writable stream
})
