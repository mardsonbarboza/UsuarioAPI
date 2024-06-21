const express = require('express')
const app = express()
var bodyParser = require('body-parser');

//configuração do body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/",router);


app.listen(8080, ()=>{
    console.log('Server ligado')
})