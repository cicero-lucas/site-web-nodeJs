const { MASTEE_DIR } = require("../../Helpers/constantes");

const Home = (req,res)=>{
    return res.render('home',
    {
        layout:MASTEE_DIR,
        title:"MAtheus"
    }
    );
}
const Projetos = (req,res)=>{
    return res.render('projeto',
    {
        layout:MASTEE_DIR,
        title:"M2"
    }
    );
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