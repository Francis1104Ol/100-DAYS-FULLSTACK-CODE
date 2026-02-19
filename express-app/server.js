const express = require('express');
const app = express();
const PORT = 3000;


const mockUsers = [
    {id:1, username: "John", displayName: "John"},
{id:2, username: "James", displayName: "James"},
{id:3, username: "jack", displayName: "jack"},
{id:4, username: "Jill", displayName: "Jill"},
{id:5, username: "Jane", displayName: "Jane"},
{id:6, username: "Joe", displayName: "Joe"},
{id:7, username: "Jenny", displayName: "Jenny"}
];
app.get('/', (req, res) => {
    res.send('Hello, Express.js!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.use((req, res, next) => {
    console.log(`Request received at ${new Date().toISOString()}`);
    next();
});

app.get('/about', (req, res) => {
    res.send('About Us Page');
});

app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

app.get('/api/users', (request, response) => {
    console.log(request.query);
response.send(mockUsers);
const{
    query:{filter, value},
} = request;
//when filter and value are not provided, return all users
if(!filter && !value){return response.send(mockUsers);
if(filter && value)return response.send(
mockUsers.filter((user) => user[filter].includes(value))
);
return response.send(mockUsers);
}});