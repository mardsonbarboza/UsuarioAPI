const express = require('express')
const app = express()

app.get('/teste',(req,res)=>{
    res.send('ola mundo')
})


app.listen(8080, ()=>{
    console.log('Server ligado')
})