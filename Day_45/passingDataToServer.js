import express, { response } from "express";
import { request } from "node:http";
import { parse } from "node:path";

const app = express();
const PORT = process.env.port || 3000;

const mockUsers = [
    {id:1, username: "John", displayName: "John"},
{id:2, username: "James", displayName: "James"},
{id:3, username: "jack", displayName: "jack"},
{id:4, username: "Jill", displayName: "Jill"},
{id:5, username: "Jane", displayName: "Jane"},
{id:6, username: "Joe", displayName: "Joe"},
{id:7, username: "Jenny", displayName: "Jenny"}
];
const parsedId = parseInt(request.params.id);
console.log(parsedId);
if(isNaN(parsedId))return response.status(400).send({msg:" Bad Request Invalid ID"});
const findUser =mockUsers.find((user) => user.id=== parsedId);
if(!findUser) return response.sendStatus(404);
return response.send(findUser);
app.get('/',(request, response )=>{
    response.status(201).send({msg:"Hello"});
});
app.get('/api/users', (request, response) => {
    console.log(request.query); // to access query parameters
response.send(mockUsers);

//route parameters are used to capture values from the URL and make them available in the request object. They are defined using a colon (:) followed by the parameter name in the route path. For example, in the route '/api/users/:id', ':id' is a route parameter that can capture any value provided in that position of the URL. When a request is made to this route, the captured value can be accessed through 'request.params.id'. This allows you to handle dynamic URLs and perform operations based on the captured parameters.
app.get('api/users/:id', (request, response) => {
    console.log(request.params);
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
});

//Route is a path in the express application that is used to handle a specific HTTP request method (GET, POST, PUT, DELETE, etc.) and a specific URL pattern. It defines how the application should respond to a particular request made by a client.

//query parameters are used to send additional data to the server in the URL. They are defined using a question mark (?) followed by key-value pairs separated by an ampersand (&). For example, in the URL '/api/users?name=John&age=30', 'name' and 'age' are query parameters with their respective values. When a request is made to this URL, the query parameters can be accessed through 'request.query.name' and 'request.query.age'. This allows you to filter or modify the response based on the provided query parameters.
});
