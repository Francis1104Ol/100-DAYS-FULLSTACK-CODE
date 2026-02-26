// a module is another script file where we can export values 
//core modules
//user define modules i.e the developer create it 
//creating a server in Node JS
const http = require('http');
const url =require('url')
const fs = require('fs');
const replaceHtml = require('./modules/replaceHtml')// custom module that is user define module
const user = require('./modules/user')
const events = require('events') //custom event module
const { json } = require('stream/consumers');
const html = fs.readFileSync('./Data/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./Data/products.json'))
let productListHtml = fs.readFileSync('./products_list.html', 'utf-8');
let productDetailsHtml = fs.readFileSync('./Data/productDetails.html', 'utf-8');
/**function replaceHtml(template, product){
      let output = template.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}',product.name);
    output = output.replace('{{%MODELNAME%}}', product.modelName);
    output =output.replace('{{%MODELNO%}}', product.modelNumber);
    output =output.replace('{{%SIZE%}}', product.size);
    output =output.replace('{{%CAMERA%}}', product.camera);
    output =output.replace('{{%PRICE%}}', product.price);
   output = output.replace('{{%COLOR%}}', product.color);
   output = output.replace('{{%ID%}}', product.id);
   output = output.replace('{{%ROM%}}', product.Rom);
   output = output.replace('{{%DESC%}}', product.description);

    return output
}
    */
/*
let server = http.createServer((request, response) =>{
     let {query, pathname:path} = url.parse(request.url, true)
    //let path = request.url;
    //console.log(x)
  if(path === '/' || path.toLocaleLowerCase() === '/home'){
    response.writeHead(200,{
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    });
    //response.end("You're in the home page" )
    response.end(html.replace('{{%CONTENT%}}', productListHtml));
    
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
  }else if(path.toLocaleLowerCase() === '/products'){
    if(!query.id){
    let productHtmlArray =  products.map((prod) =>{
      return replaceHtml(productListHtml, prod);
      })
   let productResponseHtml= html.replace('{{%CONTENT%}}', productHtmlArray.join(''))
    response.writeHead(200, {'content-type':'text/html'})
    response.end(productResponseHtml)
    }else{
   let prod = products[query.id];
   response.writeHead(200, {'content-type':'text/html'});
     let productDetailsResponseHtml = replaceHtml(productDetailsHtml, prod);
      //response.end('This is a product with ID =' + query.id);
      response.end(html.replace('{{%CONTENT%}}', productDetailsResponseHtml));
    }
  }
  else{
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
    */

//Understanding the event-driven architecture
//event emitter and event listener is called observer pattern
//Three main players The event emmiter, event listener, and event Handler
 const server = http.createServer()
 server.on('request', (request, response) =>{
     let {query, pathname:path} = url.parse(request.url, true)
    //let path = request.url;
    //console.log(x)
  if(path === '/' || path.toLocaleLowerCase() === '/home'){
    response.writeHead(200,{
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    });
    //response.end("You're in the home page" )
    response.end(html.replace('{{%CONTENT%}}', productListHtml));
    
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
  }else if(path.toLocaleLowerCase() === '/products'){
    if(!query.id){
    let productHtmlArray =  products.map((prod) =>{
      return replaceHtml(productListHtml, prod);
      })
   let productResponseHtml= html.replace('{{%CONTENT%}}', productHtmlArray.join(''))
    response.writeHead(200, {'content-type':'text/html'})
    response.end(productResponseHtml)
    }else{
   let prod = products[query.id];
   response.writeHead(200, {'content-type':'text/html'});
     let productDetailsResponseHtml = replaceHtml(productDetailsHtml, prod);
      //response.end('This is a product with ID =' + query.id);
      response.end(html.replace('{{%CONTENT%}}', productDetailsResponseHtml));
    }
  }
  else{
    response.writeHead(404, {
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    })
    response.end("Eror 404 Page not found")
  }

 })
 server.listen(1000, '127.0.0.1', () =>{
    console.log('Server has started');
});
// Emitting Custom events
/**let myEmitter = new events.EventEmitter();
myEmitter.on('userCreated', (id, name) => {
    console.log(`A New User ${name}  with ${id} Is Created!`)
});
myEmitter.on('userCreated', (id, name) => {
    console.log(`A New User ${name}  with ${id} Is added to database!`)
});

myEmitter.emit('userCreated', 101, 'John'); */
let myEmitter = new user();
myEmitter.on('userCreated', (id, name) => {
    console.log(`A New User ${name}  with ${id} Is Created!`)
});
myEmitter.on('userCreated', (id, name) => {
    console.log(`A New User ${name}  with ${id} Is added to database!`)
});

myEmitter.emit('userCreated', 101, 'John');