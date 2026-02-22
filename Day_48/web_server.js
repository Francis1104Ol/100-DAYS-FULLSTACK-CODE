//creating a server in Node JS
const http = require('http');

let server = http.createServer((request, response) =>{
   response.end('Hello From The server')
//console.log('A new request Recieved')
//console.log(response)
});
server.listen(1000, '127.0.0.1', () =>{
    console.log('Server has started');
})

//how the web works understanding the request and response model i.e client-server architecture
//understanding DNS and tcp/ip
//understanding http request 
//what is routing is the way which client requests are handled by the application endpoint 
