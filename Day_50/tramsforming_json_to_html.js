//creating a server in Node JS
const http = require('http');
const fs = require('fs');
const { json } = require('stream/consumers');
const html = fs.readFileSync('./Data/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./Data/products.json'))
let productListHtml = fs.readFileSync('./products_list.html', 'utf-8');
let productHtmlArray =  products.map((prod) =>{
    let output = productListHtml.replace('{{%IMAGE%}}', prod.productImage);
    output = output.replace('{{%IMAGE%}}', prod.name);
    output = output.replace('{{%MODELNAME%}}', prod.modelname);
    output =output.replace('{{%MODELNO%}}', prod.modelNumber);
    output =output.replace('{{%SIZE%}}', prod.size);
    output =output.replace('{{%CAMERA%}}', prod.camera);
    output =output.replace('{{%PRICE%}}', prod.price);
   output = output.replace('{{%COLOR%}}', prod.color);

    return output
});



let server = http.createServer((request, response) =>{
  let path = request.url;
 
  if(path === '/' || path.toLocaleLowerCase() === '/home'){
    response.writeHead(200,{
        "content-type":'text/html',
        'my-header': 'Hello, World' //custom header
    });
    response.end("You're in the home page" )
    response.end(html.replace(productListHtml));
    
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
   let productResponseHtml= html.replace('{{%CONTENT%}}', productHtmlArray.join(','))
    response.writeHead(200, {'content-type':'text/html'})
    response.end(productResponseHtml)
 
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
// you can add file instead of words in your response.end
//static files don't work in node eg styles.css for now you can simply use internal css instead
//working with json data