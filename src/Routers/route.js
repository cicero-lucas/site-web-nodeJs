const express = require('express');
const siteController = require('../Controllers/Site/siteControllers');
const adimController = require('../Controllers/Admin/adimControllers');
const middleware = require("../middleware/middllewares")
const Rotas = express.Router();
const { storage } = require('../Helpers/UpdateArquivo');
const multer = require("multer");
const upload = multer({ storage: storage });

const up = require("../Controllers/Admin/up")

try{
    Rotas.get('/',siteController.Home);
    Rotas.get('/projetos',siteController.Projetos);
    Rotas.get('/contato',siteController.Contato);
    Rotas.get('/contato',siteController.Contato);

    Rotas.get('/admin',adimController.adimLogin);
    Rotas.post('/admin',adimController.adimLogin);

    Rotas.get('/admin/pagina',middleware.verificarAutenticacao,adimController.paginaAdimin);
    Rotas.get('/admin/criar/duvidas',adimController.paginaCriarDuvidas);
    Rotas.get('/admin/criar/projeto',adimController.paginaCriarProjeto);
    Rotas.post('/admin/criar/duvidas',adimController.paginaCriarDuvidas);
    Rotas.post('/admin/criar/projeto',upload.single('file'),up.paginaCriarProjeto);

    Rotas.get('/admin/ver/duvidas',adimController.paginaVerDuvida);
    Rotas.get('/admin/ver/projetos',adimController.paginaVerProjeto);
 
    Rotas.get('/admin/editar/duvidas:id',adimController.paginaVerDuvida);
    Rotas.get('/admin/editar/projetos:id',adimController.paginaVerProjeto);
    Rotas.post('/admin/editar/duvidas:id',adimController.paginaVerDuvida);
    Rotas.post('/admin/editar/projetos:id',adimController.paginaVerProjeto);
 
    Rotas.post('/admin/logout',adimController.logoutAdmin)

    Rotas.get("*",siteController.erro);

}catch{
    console.log('pagina não encontrada !');
}


module.exports=Rotas;