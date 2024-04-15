const { MASTEE_DIR } = require("../../Helpers/constantes");
const siteModules= require("../../models/models");
const url = require("../../Helpers/Helpers");

const Home = (req,res)=>{
    return res.render('home',
    {
        layout:MASTEE_DIR,
        title:"loja",
        url:url
    }
    );
}

const Projetos = async (req,res)=>{
    try{
        var [projetos,outro]=[null,null];
        
        if(await siteModules.verProjeto()){
            var [projetos,outro]= await siteModules.verProjeto();
        }

    return res.render('projeto',
    {
        layout:MASTEE_DIR,
        title:"Nossos Projetos",
        projetos:projetos,
        url:url
    }
    );
    }catch{
        console.log("erro! projeto");
    }
    
}

const Contato = (req,res)=>{
    return res.render('contato',
    {
        layout:MASTEE_DIR,
        title:"M2",
        url:url
    }
    );
}

const paginaErro=(req,res)=>{
    try{
        return res.render('erro',
        {
        layout:MASTEE_DIR,
        title:"pagina não encontrada",
        url:url
        }
    );
    }catch{

    }
    
}

const paginaDuvidasfrequentes = async (req,res)=>{
    try{
        const [duvidas,dados]= await  siteModules.verDuvidasF();
        return res.render('duvidasFrequentes',{
            layout:MASTEE_DIR,
            title:'Duvidas Frequentes',
            duvidas:duvidas,
            url:url
        });
    }catch{

    }
    

}

module.exports={
    Home,
    Contato,
    Projetos,
    paginaErro,
    paginaDuvidasfrequentes
}