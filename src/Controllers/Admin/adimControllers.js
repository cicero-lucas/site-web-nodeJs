const session = require("express-session");
const {MASTEEADIM_DIR, MASTEE_DIR} = require("../../Helpers/constantes");
const siteModules= require("../../models/models");


let emailAdm="matheus@email.com";
let senhaAdm="1";


function adimLogin(req,res){
    const { email, senha } = req.body;

    if(emailAdm == email && senhaAdm == senha){
        req.session.login = email;
        return res.redirect('admin/pagina');
    }else{
        return res.render('admin/adminLogin',{
            layout:MASTEEADIM_DIR,
            title:"Login",
        });
    }
   
}

function paginaAdimin(req,res){
    return res.render('admin/adminPrincipal',{
        layout:MASTEEADIM_DIR,
        title:"Pagina Administrador"
       
    })
    
}


function paginaCriarDuvidas(req,res){
    return res.render('admin/criarPergunta',{
        layout:MASTEEADIM_DIR,
        title:"Criar Pergunta"
       
    })
    
}
function paginaCriarProjeto(req,res){
    return res.render('admin/criarProjeto',{
        layout:MASTEEADIM_DIR,
        title:"criar projeto"
       
    })
    
}
function paginaVerProjeto(req,res){
    return res.render('admin/verProjeto',{
        layout:MASTEEADIM_DIR,
        title:"ver projeto"
       
    })
    
}
function paginaVerDuvida(req,res){
    return res.render('admin/verPergunta',{
        layout:MASTEEADIM_DIR,
        title:"ver pergunta"
       
    })
    
}

function logoutAdmin(req, res) {
    if (req.body.sair === 1 && req.session.login) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('admin/pagina');
            } else {
                return res.redirect('/admin');
            }
        });
    } else {
        console.log("a")
    }
}


module.exports={
    adimLogin,
    paginaAdimin,
    logoutAdmin,
    paginaCriarDuvidas,
    paginaCriarProjeto,
    paginaVerProjeto,
    paginaVerDuvida
}