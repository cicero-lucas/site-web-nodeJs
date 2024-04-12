require('dotenv').config()
const jwt = require('jsonwebtoken');
const {MASTEEADIM_DIR} = require("../../Helpers/constantes");
const siteModules= require("../../models/models");
const url = require("../../Helpers/Helpers")


let emailAdm="matheus@email.com";
let senhaAdm="1";
const secret = process.env.SECRET;

// loguir

function getadimLogin(req,res){
    let btnv = false
    return res.render('admin/adminLogin',{
        layout:MASTEEADIM_DIR,
        title:"Pagina Login",
        menssagem: req.flash('info'),
        btnv:btnv,
        url:url
    });
   
}

async function postadimLogin(req, res) {
    const { email, senha } = req.body;

    if (!email) {
        req.flash('info', { msg: 'Coloque seu email!', class: "msgInfo" });
        return res.redirect(url.url('admin'));
    } else if (!senha) {
        req.flash('info', { msg: 'Coloque a senha!', class: "msgInfo" });
        return res.redirect(url.url('admin'));
    } else if (emailAdm == email && senhaAdm == senha) {
        try {
            const token = jwt.sign({ idusuario: emailAdm }, secret);
            req.flash('info', { msg: 'bem vindo', class: "msgInfo" });
            res.cookie('tokenAutorization', token);
            return res.redirect(url.url('admin/pagina'));
              
            
        } catch (error) {
            req.flash('info', { msg: 'Erro ao fazer login', class: "msgErro" });
            return res.redirect(url.url('admin'));
        }

    } else {
        req.flash('info', { msg: 'Email ou senha incorretos!', class: "msgErro" });
        return res.redirect(url.url('admin'));
    }
}


// loguirpagina

function getpaginaAdimin(req,res){
    let btnv = true
    return res.render('admin/adminPrincipal',{
        layout:MASTEEADIM_DIR,
        title:"Pagina Administrador",
        url:url,
        btnv:btnv,
       
    })
    
}

async function getpaginaCriarDuvidas(req, res) {
    let btnv = true
    return res.render('admin/criarPergunta', {
        layout: MASTEEADIM_DIR,
        title: "Criar Pergunta",
        menssagem: req.flash('info'),
        url:url,
        btnv:btnv,
    });

}

// ceiar Duvidas

async function postpaginaCriarDuvidas(req, res) {
        try {
           
            const { pergunta, resposta } = req.body;

            if(!req.body){
                req.flash('info',{msg:'Por favor, forneça tanto a pergunta quanto a resposta.', class:"msgInfo"});
                res.redirect(url.url('admin/criar/duvidas'));
            }else if (!pergunta ) {
                req.flash('info',{msg:'Por favor, forneça  a pergunta !', class:"msgInfo"});
                res.redirect(url.url('admin/criar/duvidas'));
            }else if (!resposta ) {
                req.flash('info',{msg:'Por favor, forneça  a resposta!', class:"msgInfo"});
                res.redirect(url.url('admin/criar/duvidas'));
            }else {
                await siteModules.criarPergunta(pergunta, resposta);
                req.flash('info',{msg:'pergunta cadastrada com sucesso',class:"msgSucesso"});
                res.redirect(url.url('admin/criar/duvidas'));
            }
        } catch (error) {
            req.flash('info',{msg:'Erro ao cadastrar perguntas:!', class:"msgErro"});
            res.redirect(url.url('admin/criar/duvidas'));
        }
    
}



async function getPaginaCriarProjeto(req, res) {
    let btnv = true
    var [tipo, outro] = [null, null];
    
    if (await siteModules.verTipo()) {
        [tipo, outro] = await siteModules.verTipo();
    }
    return res.render('admin/criarProjeto', {
        layout: MASTEEADIM_DIR,
        title: "Criar Projeto",
        tipos: tipo,
        menssagem: req.flash('info'),
        url:url,
        btnv:btnv
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
            res.redirect(url.url('admin/criar/projeto'));
        }else{
            const {nomeProjeto, desProjeto, ntipo } = req.body;
        if (!nomeProjeto ){
          
            req.flash('info',{msg:'Por favor, forneça  o nome do projeto !', class:"msgInfo"});
            res.redirect(url.url('admin/criar/projeto'));
            
        }else if (!desProjeto){
            req.flash('info',{msg:'Por favor, forneça a descrição do projeto!', class:"msgInfo"});  
            res.redirect(url.url('admin/criar/projeto'));
        }else if(!ntipo){
            req.flash('info',{msg:'Por favor, forneça um tipo para o projeto!', class:"msgInfo"});  
            res.redirect(url.url('admin/criar/projeto'));
        }else{
            const camminhoImg=req.file.path;
            await siteModules.criarprojetos(nomeProjeto,desProjeto,camminhoImg,ntipo);
            res.redirect(url.url('admin/criar/projeto'));
            
        }
      }
 
    } catch (error) {
        req.flash('info',{msg:'Erro ao cadastrar projeto!', class:"msgInfo"});
        res.redirect(url.url('admin/criar/projeto'));
    }

   
}

    
async function getpaginaEditarDuvidas(req,res){
try{
    let btnv = true
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
            menssagem: req.flash('editarinfo'),
            url:url,
            btnv:btnv
        
        
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
            res.redirect(url.url(`editar/duvidas/${idDuvida}`));
        }else if (!pergunta ) {
            req.flash('editarinfo',{msg:'Por favor, forneça  a pergunta !', class:"msgInfo"});
            res.redirect(url.url(`editar/duvidas/${idDuvida}`));
        }else if (!resposta ) {
            req.flash('editarinfo',{msg:'Por favor, forneça  a resposta!', class:"msgInfo"});
            res.redirect(url.url(`editar/duvidas/${idDuvida}`));
        }else {

           await siteModules.editarPergunta(pergunta,resposta,idDuvida);
           req.flash('editarinfo',{msg:'Duvida editada com sucesso!', class:"msgSucesso"});
           
           res.redirect(url.url(`admin/ver/duvidas`));
        }
    } catch (error) {
        req.flash('editarinfo',{msg:'Erro ao editar perguntas:!', class:"msgErro"});
        res.redirect(url.url(`admin/ver/duvidas`));
    }
     
}


async function getdeletarPergunta(req,res){
    const {idDuvida}=req.params;
       if(idDuvida){
            var[dados,m] =  await siteModules.verDuvidaID(idDuvida);
        }
      
        return res.render('admin/deletarPergunta',{
            layout:MASTEEADIM_DIR,
            title:"Edita Projeto",
            pergunta:dados,
            menssagem: req.flash('deletarinfo')
        
        
        })
}

async function postdeletarPergunta(req,res){
    const {idDuvida}=req.params;
    if(idDuvida){
        await siteModules.deletarPergunta(idDuvida);
        res.redirect('../../ver/duvidas');
    }
       
}

async function getpaginaEditarProjeto(req,res){
    const {idProjeto} = req.params;
    if(idProjeto){
        var [projeto,filds]= await siteModules.verProjetoID(idProjeto);

    }
  
    if (await siteModules.verTipo()) {
       var [tipo, outro] = await siteModules.verTipo();
    }
   
    return res.render('admin/editarProjeto', {
        layout: MASTEEADIM_DIR,
        title: "Editar Projeto",
        tipos: tipo,
        projeto:projeto,
        menssagem: req.flash('infoEp')
    });
    
}

async function postpaginaEditarProjeto(req,res){
    try {
        const {idProjeto}=req.params;
        const {nomeProjeto, desProjeto } = req.body;
       
        if (!nomeProjeto ){
            req.flash('infoEP',{msg:'Por favor, forneça  o nome do projeto !', class:"msgInfo"});
            res.redirect(`../projetos/${idProjeto}`);
            
        }else if (!desProjeto){
            req.flash('infoEP',{msg:'Por favor, forneça a descrição do projeto!', class:"msgInfo"});
     
            res.redirect(`../projetos/${idProjeto}`);
        }else if(req.file){
            const camminhoImg=req.file.path.split('src');
            await siteModules.editarProjetoImg(nomeProjeto,desProjeto,camminhoImg[1],idProjeto);
            res.redirect('../../ver/projetos');
        }
        else{
            await siteModules.editarProjeto(nomeProjeto,desProjeto,idProjeto);
            res.redirect('../../ver/projetos');
           
    
        }
        
        
      } catch (error) {
        req.flash('info',{msg:'Erro ao cadastrar projeto!', class:"msgInfo"});
    }

    
}


async function paginaVerProjeto(req,res){
    let btnv =true
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
        menssagem: req.flash('editarinfo'),
        url:url,
        btnv:btnv
       
    })
    
}
async function paginaVerDuvida(req,res){
   let btnv =true;
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
        duvidas:duvidas,
        url:url,
        btnv:btnv
       
    })
    
}

function postlogoutAdmin(req, res) {
    const {sair} =req.body
    if(sair ==1  && req.cookies['tokenAutorization']){
        res.clearCookie('tokenAutorization');
        res.status(200).send('Logout realizado com sucesso');
    }else{
        res.redirect(url.url(`admin`));
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

    getdeletarPergunta,
    postdeletarPergunta,
  

    getpaginaAdimin,

    paginaVerProjeto,
    paginaVerDuvida,

    postlogoutAdmin
  
}






