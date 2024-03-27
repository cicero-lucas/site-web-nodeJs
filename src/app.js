require('dotenv').config();
const express = require('express');
const Rotas = require('./Routers/route');
const session= require("express-session");
const bodyParser= require("body-parser");
const {init: templeteSite} = require("./Helpers/Templete");
const path = require('path');

const app = express();

app.use(session({ secret:process.env.KEYSESSION , resave: true, saveUninitialized: true }));

app.use(express.static(path.join(__dirname,"assets")))

app.use(bodyParser.urlencoded({extended:true}));

app.use(Rotas);

templeteSite(app);

app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT);
})
