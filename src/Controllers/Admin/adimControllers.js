const session = require("express-session");
const {MASTEEADIM_DIR, MASTEE_DIR} = require("../../Helpers/constantes");
const siteModules= require("../../models/models");

let emailAdm="matheus@email.com";
let senhaAdm="m#th&#s";


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
        layout:MASTEE_DIR,
        title:"Pagina Administrador"
    })
    
    
}

module.exports={
    adimLogin,
    paginaAdimin
}