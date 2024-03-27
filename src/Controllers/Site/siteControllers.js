const { MASTEE_DIR } = require("../../Helpers/constantes");
const siteModules= require("../../models/models")

const Home = (req,res)=>{
    return res.render('home',
    {
        layout:MASTEE_DIR,
        title:"MAtheus"
    }
    );
}
const Projetos = async (req,res)=>{
    try{
        let [projetos,outro]= await siteModules.verProjeto();
    return res.render('projeto',
    {
        layout:MASTEE_DIR,
        title:"Nossos Projetos",
        projetos:(projetos)?projetos:'{sem dados}'

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
        title:"M2"
    }
    );
}
const erro= (req,res)=>{
    return res.render('erro',
    {
        layout:MASTEE_DIR,
        title:"pagina não encontrada"
    }
    );
}

module.exports={
    Home,
    Contato,
    Projetos,
    erro
}