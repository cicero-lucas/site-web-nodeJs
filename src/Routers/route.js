const express = require('express');
const siteController = require('../Controllers/Site/siteControllers');
const adimController = require('../Controllers/Admin/adimControllers');
const middleware = require("../middleware/middllewares")
const Rotas = express.Router();

try{
    Rotas.get('/',siteController.Home);
    Rotas.get('/projetos',siteController.Projetos);
    Rotas.get('/contato',siteController.Contato);
    Rotas.get('/contato',siteController.Contato);

    Rotas.get('/admin',adimController.adimLogin);
    Rotas.post('/admin',adimController.adimLogin);
    Rotas.get('/admin/pagina',adimController.paginaAdimin);
    Rotas.get('/admin/criar/duvidas',adimController.paginaCriarDuvidas);
    Rotas.get('/admin/criar/projeto',adimController.paginaCriarProjeto);
    Rotas.get('/admin/ver/duvidas',adimController.paginaVerDuvida);
    Rotas.get('/admin/ver/projeto',adimController.paginaVerProjeto);
 
    Rotas.post('/logout',middleware.verificarAutenticacao,adimController.logoutAdmin)

    Rotas.get("*",siteController.erro);

}catch{
    console.log('pagina não encontrada !');
}


module.exports=Rotas;