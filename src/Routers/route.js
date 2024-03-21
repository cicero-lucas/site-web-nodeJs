const express = require('express');
const siteController = require('../Controllers/Site/siteControllers');
const Helpers= require('../Helpers/Helpers')
const Rotas = express.Router();

try{
    Rotas.get('/',siteController.Home);
    Rotas.get('/nossosprojetos',siteController.Home);
    Rotas.get("*",siteController.erro);

}catch{


}


module.exports=Rotas;