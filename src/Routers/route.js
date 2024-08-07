const express = require('express');
const siteController = require('../Controllers/Site/siteControllers');
const adimController = require('../Controllers/Admin/adimControllers');
const middleware = require("../middleware/middllewares")
const { uploadImg } = require('../Helpers/UpdateArquivo');
const Rotas = express.Router();

try{
    Rotas.get('/',siteController.Home);
    Rotas.get('/projetos',siteController.Projetos);
    Rotas.get('/contato',siteController.Contato);
    Rotas.get('/contato',siteController.Contato);
    Rotas.get('/duvidas/frequentes',siteController.paginaDuvidasfrequentes)

    Rotas.get('/admin',adimController.getadimLogin);
    Rotas.post('/admin',adimController.postadimLogin);

    Rotas.post('/admin/sair',adimController.postlogoutAdmin);
       

    Rotas.get('/admin/pagina',middleware.verificarLogin,adimController.getpaginaAdimin);

    Rotas.get('/admin/criar/duvidas',middleware.verificarLogin,adimController.getpaginaCriarDuvidas);
    Rotas.post('/admin/criar/duvidas',middleware.verificarLogin,adimController.postpaginaCriarDuvidas);

    Rotas.get('/admin/criar/projeto',middleware.verificarLogin,adimController.getPaginaCriarProjeto);
    Rotas.post('/admin/criar/projeto',middleware.verificarLogin,uploadImg.single('image'),adimController.postpaginaCriarProjeto);

    Rotas.get('/admin/ver/duvidas',middleware.verificarLogin,adimController.paginaVerDuvida);
    Rotas.get('/admin/ver/projetos',middleware.verificarLogin,adimController.paginaVerProjeto);
 
    Rotas.get('/admin/editar/duvida/:idDuvida',middleware.verificarLogin,adimController.getpaginaEditarDuvidas);
    Rotas.post('/admin/editar/duvida/:idDuvida',middleware.verificarLogin,adimController.postpaginaEditarDuvidas);
   

    Rotas.get('/admin/deletar/duvida/:idDuvida',middleware.verificarLogin,adimController.getdeletarPergunta);
    Rotas.post('/admin/deletar/duvida/:idDuvida',middleware.verificarLogin,adimController.postdeletarPergunta);

    Rotas.get('/admin/editar/projeto/:idProjeto',middleware.verificarLogin,adimController.getpaginaEditarProjeto);
    Rotas.post('/admin/editar/projeto/:idProjeto',middleware.verificarLogin,uploadImg.single('image'),adimController.postpaginaEditarProjeto);

    Rotas.get('/admin/deletar/projeto/:idProjeto',middleware.verificarLogin,adimController.getdeletarProjeto);
    Rotas.post('/admin/deletar/projeto/:idProjeto',middleware.verificarLogin,uploadImg.single('image'),adimController.postdeletarProjeto);
    
    Rotas.get("*",siteController.paginaErro);

}catch{
    Rotas.get("*",siteController.paginaErro);z

}


module.exports=Rotas;