const express = require('express');
const siteController = require('../Controllers/Site/siteControllers');
const adimController = require('../Controllers/Admin/adimControllers');
const middleware = require("../middleware/middllewares")
const Rotas = express.Router();
const uploads = require('../Helpers/UpdateArquivo');
const up = require("../Controllers/Admin/up")

try{
    Rotas.get('/',siteController.Home);
    Rotas.get('/projetos',siteController.Projetos);
    Rotas.get('/contato',siteController.Contato);
    Rotas.get('/contato',siteController.Contato);

    Rotas.get('/admin',adimController.getadimLogin);
    Rotas.post('/admin',adimController.postadimLogin);

    Rotas.get('/admin/pagina',middleware.verificarAutenticacao,adimController.getpaginaAdimin);

    Rotas.get('/admin/criar/duvidas',adimController.getpaginaCriarDuvidas);
    Rotas.post('/admin/criar/duvidas',adimController.postpaginaCriarDuvidas);

    Rotas.get('/admin/criar/projeto',adimController.getPaginaCriarProjeto);
    Rotas.post('/admin/criar/projeto',uploads.single('image'),adimController.postpaginaCriarProjeto);

    Rotas.get('/admin/ver/duvidas',adimController.paginaVerDuvida);
    Rotas.get('/admin/ver/projetos',adimController.paginaVerProjeto);
 
    Rotas.get('/admin/editar/duvidas/idDuvida',adimController.getpaginaEditarDuvidas);
    Rotas.post('/admin/editar/duvidas/idDuvida',adimController.postpaginaEditarDuvidas);

    Rotas.get('/admin/editar/projetos/:id',adimController.getpaginaEditarProjeto);
    Rotas.post('/admin/editar/projetos/:id',adimController.postpaginaEditarProjeto);
 
    Rotas.post('/admin/logout',adimController.getlogoutAdmin)
    
    Rotas.get("*",siteController.erro);

}catch{
    console.log('pagina não encontrada !');
}


module.exports=Rotas;