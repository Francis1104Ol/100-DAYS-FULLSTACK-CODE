import express from "express";

const app = express();
const PORT = process.env.port || 3000;
app.get('/',(request, response )=>{
    response.status(201).send({msg:"Hello"});
});
app.get('/api/users', (request, response) => {
response.send([
    {id:1, username: "John", displayName: "John"},
{id:1, username: "James", displayName: "James"},
{id:1, username: "jack", displayName: "jack"}
]);
});
app.get('/api/products', (request, response) => {
response.send([
    {id:1, name: "Laptop", price: 1000},
{id:2, name: "Mouse", price: 25},
{id:3, name: "Keyboard", price: 75}
]);
});
app.listen(PORT,  () => {
    console.log(`Server is running on port ${PORT}`);
});

//Route is a path in the express application that is used to handle a specific HTTP request method (GET, POST, PUT, DELETE, etc.) and a specific URL pattern. It defines how the application should respond to a particular request made by a client.
