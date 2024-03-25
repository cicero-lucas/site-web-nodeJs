const express = require('express');
const siteController = require('../Controllers/Site/siteControllers');
const Helpers= require('../Helpers/Helpers')
const Rotas = express.Router();

try{
    Rotas.get('/',siteController.Home);
    Rotas.get('/projetos',siteController.Projetos);
    Rotas.get('/contato',siteController.Contato)
    Rotas.get('/contato',siteController.Contato)
    Rotas.get("*",siteController.erro);

}catch{
    console.log('pagina não encontrada !');
}


module.exports=Rotas;