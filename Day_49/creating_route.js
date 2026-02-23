//creating a server in Node JS
const http = require('http');

let server = http.createServer((request, response) =>{
  let path = request.url;
 
  if(path === '/' || path.toLocaleLowerCase() === '/home'){
    response.writeHead(200,{
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    })
    response.end("You're in the home page" )
  }else if(path.toLocaleLowerCase() === '/about'){
    response.writeHead(200, {
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    });
    response.end("You're in the about page")
  }else if(path.toLocaleLowerCase() === '/contact'){
    response.writeHead(200, {
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    });
    response.end("You're in the contact page")
  }else{
    response.writeHead(404, {
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    })
    response.end("Eror 404 Page not found")
  }

});
server.listen(1000, '127.0.0.1', () =>{
    console.log('Server has started');
})
// you can add file instead of words in your response.end
//static files don't work in node eg styles.css for now you can simply use internal css instead
//working with json data