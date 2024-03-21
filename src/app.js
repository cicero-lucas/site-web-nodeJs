require('dotenv').config();
const express = require('express');
const Rotas = require('./Routers/route');
const {init: templeteSite} = require("./Helpers/Templete");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,"assets")))

app.use(Rotas);

templeteSite(app);

app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT);
})
