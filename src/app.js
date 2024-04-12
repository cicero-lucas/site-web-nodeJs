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

// Configuração de sessão
app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: true,
}));

// Analisa o corpo da requisição
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de cookies
app.use(cookieParser());

// Configuração de mensagens flash
app.use(flash());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname))); // Isso parece redundante, pode ser removido se não for necessário

// Configuração de CORS
app.use(cors({
    origin: '*', // Permite solicitações de qualquer origem
    methods: ['GET', 'POST'], // Permitir apenas métodos GET e POST
    allowedHeaders: ['Content-Type'] // Permitir apenas o cabeçalho Content-Type
}));


// Rotas
app.use(Rotas);

// Inicialização do template do site
templeteSite(app);



const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(` ${PORT}`);
});
