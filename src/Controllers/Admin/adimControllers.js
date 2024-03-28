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

function paginaEditarDuvidas(req,res){
    return res.render('admin/criarPergunta',{
        layout:MASTEEADIM_DIR,
        title:"Criar Pergunta"
       
    })
    
}
function paginaEditarProjeto(req,res){
    return res.render('admin/criarProjeto',{
        layout:MASTEEADIM_DIR,
        title:"criar projeto"
       
    })
    
}

function paginaEditarDuvidas(req,res){
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

async function paginaVerProjeto(req,res){
    try{
        var [projetos,outro]=[null,null];
        
        if(await siteModules.verProjeto()){
            var [projetos,outro]= await siteModules.verProjeto();
        }

    
    }catch{
        console.log("erro! projeto");
    }
    return res.render('admin/verProjeto',{
        layout:MASTEEADIM_DIR,
        title:"ver projeto",
        projetos:projetos
       
    })
    
}
async function paginaVerDuvida(req,res){
   
    try{
        var [duvidas,outro]=[null,null];
        
        if(await siteModules.verDuvidasF()){
            var [duvidas,outro]= await siteModules.verDuvidasF();
        }
    
    }catch{
        console.log("erro! projeto");
    }
    return res.render('admin/verPergunta',{
        layout:MASTEEADIM_DIR,
        title:"ver projeto",
        duvidas:duvidas
       
    })
    
}
    


function logoutAdmin(req, res) {
    if (req.body.sair === 1 && req.session.login) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('admin/pagina');
            } else {
                return res.redirect('../admin');
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