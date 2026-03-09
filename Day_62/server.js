const mongoose = require('mongoose');
// const port = 1000
const dotenv= require('dotenv')
dotenv.config({path:'./config.env'})

mongoose.connect(process.env.CONN_STR)
.then(() => {
    console.log('DB connection Success');
})
.catch((err) => {
    console.log('DB connection error:', err);
});
const port = process.env.PORT || 1000;

const app = require('./app')
// console.log(app.get('env'))
//console.log(process.env)
//Create a server 

app.listen(port,()=>{
    console.log('server has started....')
})
