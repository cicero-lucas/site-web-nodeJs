require('dotenv').config();
const express = require('express');
const Rotas = require('./Routers/route');
const cors = require('cors');
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const { init: templeteSite } = require("./Helpers/Templete");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(cookieParser());

app.use(flash());

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname))); 


app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'] 
}));

app.use(Rotas);

templeteSite(app);

app.listen(process.env.PORT || 3000)
