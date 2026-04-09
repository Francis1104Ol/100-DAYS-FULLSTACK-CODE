const mongoose = require('mongoose');


process.on('uncaughtException',(err)=>{
    console.log(err.name, err.message)
    console.log('Uncaught Exception Occured! shutting down......')
        process.exit(1)
})
const dotenv= require('dotenv')
dotenv.config({path:'./config.env'})
mongoose.connect(process.env.CONN_STR)
.then(() => {
    console.log('DB connection Successful');
})

const port = process.env.PORT || 1000;
const app = require('./app')


const server =app.listen(port,()=>{
    console.log('server has started....')
})
process.on('unhandledRejection',(err)=>{
    console.log(err.name, err.message)
    console.log('Unhandled Rejection Occured! shutting down')
    server.close(()=>{
        process.exit(1)
    })  
})


