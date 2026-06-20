const express =require('express')
const bodyParser =  require('body-parser')


const app = express()
const PORT = 3000|| process.env.PORT
app.use(bodyParser.json())
app.post('/webhook',(req, res) =>{
    console.log ('Recieve Webhook', req.body)
    res.sendStatus(200)
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})