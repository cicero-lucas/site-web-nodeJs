const session = require("express-session");
const {MASTEEADIM_DIR, MASTEE_DIR} = require("../../Helpers/constantes");
const siteModules= require("../../models/models");


let emailAdm="matheus@email.com";
let senhaAdm="1";


function getadimLogin(req,res){

    return res.render('admin/adminLogin',{
        layout:MASTEEADIM_DIR,
        title:"Pagina Login",
        menssagem: req.flash('info') 
    });
   
   
}
function postadimLogin(req,res){
    const { email, senha } = req.body;
    if(!email){
        req.flash('info',{msg:'Coloque seu emeil!', class:"msgInfo"});
        res.redirect('../admin');    
    }else if (!senha){
        req.flash('info', {msg:'Coloque a senha!', class:"msgInfo"});
        res.redirect('../admin');
    }else if(emailAdm == email && senhaAdm == senha){
        req.session.login = email;
        req.flash('info', {msg:'Bem vindo!', class:"msgInfo"});
        return res.redirect('../admin/pagina');
    }else{
        req.flash('info', {msg:'emeil ou senha incorretas!', class:"msgErro"});
        res.redirect('../admin');
    }
   
}

function getpaginaAdimin(req,res){
    return res.render('admin/adminPrincipal',{
        layout:MASTEEADIM_DIR,
        title:"Pagina Administrador"
       
    })
    
}

async function getpaginaCriarDuvidas(req, res) {
    return res.render('admin/criarPergunta', {
        layout: MASTEEADIM_DIR,
        title: "Criar Pergunta",
        menssagem: req.flash('info') 
    });

}



async function postpaginaCriarDuvidas(req, res) {
        try {
           
            const { pergunta, resposta } = req.body;

            if(!req.body){
                req.flash('info',{msg:'Por favor, forneça tanto a pergunta quanto a resposta.', class:"msgInfo"});
                res.redirect('../criar/duvidas');
            }else if (!pergunta ) {
                req.flash('info',{msg:'Por favor, forneça  a pergunta !', class:"msgInfo"});
                res.redirect('../criar/duvidas');
            }else if (!resposta ) {
                req.flash('info',{msg:'Por favor, forneça  a resposta!', class:"msgInfo"});
                res.redirect('../criar/duvidas');
            }else {
                await siteModules.criarPergunta(pergunta, resposta);
                req.flash('info',{msg:'pergunta cadastrada com sucesso',class:"msgSucesso"});
                res.redirect('../criar/duvidas');
            }
        } catch (error) {
            req.flash('info',{msg:'Erro ao cadastrar perguntas:!', class:"msgErro"});
            res.redirect('../criar/duvidas');
        }
    
}



async function getPaginaCriarProjeto(req, res) {
    var [tipo, outro] = [null, null];
    
    if (await siteModules.verTipo()) {
        [tipo, outro] = await siteModules.verTipo();
    }
    return res.render('admin/criarProjeto', {
        layout: MASTEEADIM_DIR,
        title: "Criar Projeto",
        tipos: tipo,
        menssagem: req.flash('info')
    });
}

    
async function postpaginaCriarProjeto(req, res) {
    try {
        var [tipo, outro] = [null, null];

        if (await siteModules.verTipo()) {
            [tipo, outro] = await siteModules.verTipo();
        }
        if(!req.body){
            req.flash('info',{msg:'Por favor, forneça tanto a pergunta quanto a resposta.', class:"msgInfo"});
            res.redirect('../criar/projeto');
        }else{
            const {nomeProjeto, desProjeto, ntipo } = req.body;
        if (!nomeProjeto ){
          
            req.flash('info',{msg:'Por favor, forneça  o nome do projeto !', class:"msgInfo"});
            res.redirect('../criar/projeto');
            
        }else if (!desProjeto){
            req.flash('info',{msg:'Por favor, forneça a descrição do projeto!', class:"msgInfo"});  
            res.redirect('../criar/projeto');
        }else if(!ntipo){
            req.flash('info',{msg:'Por favor, forneça um tipo para o projeto!', class:"msgInfo"});  
            res.redirect('../criar/projeto');
        }else{
            const camminhoImg=req.file.path;
            await siteModules.criarprojetos(nomeProjeto,desProjeto,camminhoImg,ntipo);
            res.redirect('../criar/projeto');
            
        }
        
      }
 
    } catch (error) {
        req.flash('info',{msg:'Erro ao cadastrar projeto!', class:"msgInfo"});
    }

   
}

    
async function getpaginaEditarDuvidas(req,res){
try{
    if(!req.params){

    }else{
        const {idDuvida} = req.params;
        if(idDuvida){
            var[dados,m] =  await siteModules.verDuvidaID(idDuvida);
        }
    }
        return res.render('admin/editarPergunta',{
            layout:MASTEEADIM_DIR,
            title:"Edita Projeto",
            pergunta:dados,
            menssagem: req.flash('editarinfo')
        
        
        })
}catch{
    req.flash('info',{msg:'Erro ao cadastrar perguntas:!', class:"msgErro"});
}
    
}
async function postpaginaEditarDuvidas(req,res){
    try {
        const {idDuvida}=req.params;
        const { pergunta, resposta } = req.body;

        if(!req.body){
            req.flash('editarinfo',{msg:'Por favor, forneça tanto a pergunta quanto a resposta.', class:"msgInfo"});
            res.redirect(`../duvidas/${idDuvida}`);
        }else if (!pergunta ) {
            req.flash('editarinfo',{msg:'Por favor, forneça  a pergunta !', class:"msgInfo"});
            res.redirect(`../duvidas/${idDuvida}`);
        }else if (!resposta ) {
            req.flash('editarinfo',{msg:'Por favor, forneça  a resposta!', class:"msgInfo"});
       
            res.redirect(`../duvidas/${idDuvida}`);
        }else {

           await siteModules.editarPergunta(pergunta,resposta,idDuvida);
           req.flash('editarinfo',{msg:'Duvida editada com sucesso!', class:"msgSucesso"});
           
            res.redirect(`../../ver/duvidas`);
        }
    } catch (error) {
        req.flash('editarinfo',{msg:'Erro ao editar perguntas:!', class:"msgErro"});
        res.redirect('../../ver/duvidas');
    }
     
}

function deletarPergunta(req,res){
    const {idDuvida}=req.params;
    if(idDuvida){
        
    }
}


function postpaginaEditarProjeto(req,res){
    return res.render('admin/editarPergunta',{
        layout:MASTEEADIM_DIR,
        title:"criar projeto"
       
    })
    
}

function getpaginaEditarProjeto(req,res){
    return res.render('admin/editarPergunta',{
        layout:MASTEEADIM_DIR,
        title:"Edita Projeto"
       
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
        projetos:projetos,
        menssagem: req.flash('editarinfo')
       
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
    


function getlogoutAdmin(req, res) {
    if (req.body.sair === 1 && req.session.login) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('admin/pagina');
            } else {
                console.log(res.redirect('.admin'))
                return res.redirect('../.././admin');
            }
        });
    } else {
        console.log("a")
    }
}

function postlogoutAdmin(req, res) {
    if (req.body.sair === 1 && req.session.login) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('admin/pagina');
            } else {
                console.log(res.redirect('.admin'))
                return res.redirect('../.././admin');
            }
        });
    } else {
        console.log("a")
    }
}


module.exports={
    getadimLogin,
    postadimLogin,

    getPaginaCriarProjeto,
    postpaginaCriarProjeto,

    getpaginaCriarDuvidas,
    postpaginaCriarDuvidas,

    getpaginaEditarDuvidas,
    postpaginaEditarDuvidas,

    getpaginaEditarProjeto,
    postpaginaEditarProjeto,

    getpaginaAdimin,

    paginaVerProjeto,
    paginaVerDuvida,

    getlogoutAdmin,
    postlogoutAdmin
  
}