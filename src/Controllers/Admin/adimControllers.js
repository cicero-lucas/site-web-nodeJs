require('dotenv').config()
const jwt = require('jsonwebtoken');
const {MASTEEADIM_DIR} = require("../../Helpers/constantes");
const siteModules= require("../../models/models");
const url = require("../../Helpers/Helpers")
const imagemD = require('../../Helpers/UpdateArquivo');
const secret = process.env.SECRET;

// pagina login

function getadimLogin(req,res){
    try{
        let btnv = false
        return res.render('admin/adminLogin',{
            layout:MASTEEADIM_DIR,
            title:"Pagina Login",
            menssagem: req.flash('info'),
            btnv:btnv,
            url:url
        });
    }catch{

    }
   
}

async function postadimLogin(req, res) {
   try{
        const { email, senha } = req.body;
        
        if (!email) {
            req.flash('info', { msg: 'Coloque seu email!', class: "msgInfo" });
            return res.redirect(url.url('admin'));
        } else if (!senha) {
            req.flash('info', { msg: 'Coloque a senha!', class: "msgInfo" });
            return res.redirect(url.url('admin'));
        } else {
            try {
            const [usuario,dados]= await siteModules.buscarUsuario(email,senha);
            
            if(usuario=="" || !usuario || usuario==undefined){
                req.flash('info', { msg: 'Erro ao fazer login', class: "msgErro" });
                res.clearCookie('tokenAutorization');
                return res.redirect(url.url('admin'));

            }else{
                const tempoExpiracao = 15 * 60 * 1000; 
                const tempoExpiracaoData = new Date(Date.now() + tempoExpiracao);
                
                const token = jwt.sign({ idusuario: usuario[0].id_user }, secret);
                res.cookie('tokenAutorization', token, {
                    expires: tempoExpiracaoData,
                    httpOnly: true 
                });
                return res.redirect(url.url('admin/pagina'));

            }
                
            } catch (error) {
                req.flash('info', { msg: 'Erro ao fazer Login', class: "msgErro" });
                return res.redirect(url.url('admin'));
            }
            

        }
    }catch{
        req.flash('info', { msg: 'Erro ao fazer Login', class: "msgErro" });
        return res.redirect(url.url('admin'));
    }
}


// loguirpagina

function getpaginaAdimin(req,res){
    try{
        let btnv = true
        return res.render('admin/adminPrincipal',{
            layout:MASTEEADIM_DIR,
            title:"Pagina Administrador",
            url:url,
            btnv:btnv,
        
        })
    }catch{

    }
    
}

async function getpaginaCriarDuvidas(req, res) {

    try{
        let btnv = true
        return res.render('admin/criarPergunta', {
            layout: MASTEEADIM_DIR,
            title: "Criar Duvidas",
            menssagem: req.flash('info'),
            url:url,
            btnv:btnv,
        });
    }catch{

    }

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
    try{ 
        let btnv = true
        const [tipo, outro] = await siteModules.verTipo();
        return res.render('admin/criarProjeto', {
            layout: MASTEEADIM_DIR,
            title: "Criar Projeto",
            tipos: tipo,
            menssagem: req.flash('info'),
            url:url,
            btnv:btnv
        });
    }catch{

    }
}

    
async function postpaginaCriarProjeto(req, res) {
    try {
    
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
            let camminhoImg=""
            
            if(req.file){
                camminhoImg=req.file.path;
            }
            await siteModules.criarprojetos(nomeProjeto,desProjeto,camminhoImg,ntipo);
            req.flash('info',{msg:'projeto cadastrado com sucesso!', class:"msgSucesso"});  
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
            title:"Editar Projeto",
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
try{
    const {idDuvida}=req.params;
       if(idDuvida){
            var[dados,m] =  await siteModules.verDuvidaID(idDuvida);
        }
      
        return res.render('admin/deletarPergunta',{
            layout:MASTEEADIM_DIR,
            title:"Deletar Projeto",
            pergunta:dados,
            url:url,
            menssagem: req.flash('deletarinfo')
        
        
        })
    }catch{

    }
}

async function postdeletarPergunta(req,res){
    try{
        const {idDuvida}=req.params;
        if(idDuvida){
            await siteModules.deletarPergunta(idDuvida);
            res.redirect(url.url(`admin/ver/duvidas`));
        }
    }catch{

    }
       
}

async function getpaginaEditarProjeto(req,res){
    try{
        const btnv=true;
        const {idProjeto} = req.params;
        const [projeto,filds]= await siteModules.verProjetoID(idProjeto);
        const [tipo, outro] = await siteModules.verTipo();
        return res.render('admin/editarProjeto', {
            layout: MASTEEADIM_DIR,
            title: "Editar Projeto",
            tipos: tipo,
            projeto:projeto,
            url:url,
            btnv:btnv,
            menssagem: req.flash('infoEp')
        });
    }catch{

    }
    
}

async function postpaginaEditarProjeto(req,res){
    try {
        const {idProjeto}=req.params;
        const {nomeProjeto, desProjeto } = req.body;
        if (!nomeProjeto ){
            req.flash('infoEP',{msg:'Por favor, forneça  o nome do projeto !', class:"msgInfo"});
            res.redirect(url.url(`editar/projeto/${idProjeto}`));
            
        }else if (!desProjeto){
            req.flash('infoEP',{msg:'Por favor, forneça a descrição do projeto!', class:"msgInfo"});
            res.redirect(url.url(`editar/projeto/${idProjeto}`));
        }else if(req.file){
            const [projeto,filds]= await siteModules.verProjetoID(idProjeto);
            const camminhoImg=req.file.path.split('src');
            imagemD.apagarImagem(projeto[0].c_img);
            await siteModules.editarProjetoImg(nomeProjeto,desProjeto,camminhoImg[1],idProjeto);
            
            res.redirect(url.url(`editar/projeto/${idProjeto}`));
        }
        else{
            await siteModules.editarProjeto(nomeProjeto,desProjeto,idProjeto);
            res.redirect(url.url(`ver/projetos`));
           
    
        }
        
        
      } catch (error) {
        req.flash('info',{msg:'Erro ao cadastrar projeto!', class:"msgInfo"});
    }

    
}


async function getdeletarProjeto(req,res){
    try{
        const btnv=true
        const {idProjeto}=req.params; 
        const[dados,m] =  await siteModules.verProjetoID(idProjeto);
        return res.render('admin/deletarProjeto',{
            layout:MASTEEADIM_DIR,
            title:"Deletar Prjeto",
            projeto:dados,
            url:url,
            menssagem: req.flash('deletarinfo'),
            btnv:btnv
        
        
        })
        }catch{
    
        }
    }
    
    async function postdeletarProjeto(req,res){
        try{
            const {idProjeto}=req.params;
            const[dados,m] =  await siteModules.verProjetoID(idProjeto);
            if(idProjeto){
                imagemD.apagarImagem(dados[0].c_img);
                await siteModules.deletarProjeto(idProjeto)
                res.redirect(url.url(`admin/ver/projetos`));

                
            }
        }catch{
            
        }
           
    }


async function paginaVerProjeto(req,res){
    try{
        let btnv =true
        const [projetos,outro]= await siteModules.verProjeto();

        return res.render('admin/verProjeto',{
            layout:MASTEEADIM_DIR,
            title:"ver projetos",
            projetos:projetos,
            menssagem: req.flash('editarinfo'),
            url:url,
            btnv:btnv
        
        })
    }catch{
        console.log("erro! projeto");
    }
    
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
    try{
        const {sair} =req.body
        if(sair ==1  && req.cookies['tokenAutorization']){
            res.clearCookie('tokenAutorization');
            res.status(200).send('Logout realizado com sucesso');
        }else{
            res.redirect(url.url(`admin`));
        }
    }catch{

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
  
    getdeletarProjeto,
    postdeletarProjeto,

    getpaginaAdimin,

    paginaVerProjeto,
    paginaVerDuvida,

    postlogoutAdmin
  
}






