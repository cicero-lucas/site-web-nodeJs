const connection = require('../database/dbConexao');

async function verProjeto(){
    try{
        const query="SELECT tbp.nome_projeto,tbp.data_projeto,tbp.c_img,tbp.descricao_projeto,tbtp.tipo_p FROM tb_projetos tbp, tb_tipo_projeto tbtp WHERE tbp.fk_tipo = tbtp.id_tipo;";

        const projeto = await connection.execute(query);
        return projeto;

    }catch{
        console.log("erro!");
    }
}

async function verProjeto(id_projeto){
    try{
        const query="SELECT tbp.nome_projeto,tbp.data_projeto,tbp.c_img,tbp.descricao_projeto,tbtp.tipo_p FROM tb_projetos tbp, tb_tipo_projeto tbtp WHERE tbp.fk_tipo = tbtp.id_tipo;";

        const projeto = await connection.execute(query);
        return projeto;

    }catch{
        console.log("erro!");
    }
}
async function verDuvidaID(id_projeto){
    try{
        const query="SELECT * FROM tb_duvidasfrequentes WHERE id_duvida = ?";

        const duvidaP = await connection.execute(query,[id_projeto]);
    
        return duvidaP;

    }catch{
        console.log("erro!");
    }
}
async function verTipo(){
    try{
        const query="SELECT * FROM tb_tipo_projeto;";

        const tipo = await connection.execute(query);
        return tipo;

    }catch{
        console.log("erro!");
    }
}

async function verDuvidasF(){
    try{
        const query="SELECT * from tb_duvidasfrequentes";

        const duvidasF=connection.execute(query);
        
        return duvidasF;
    }catch{
        console.log('erro!');
    }
}

async function criarprojetos(nomeP,descricoaP,cmImg="",tipoP){
    try{
        const query="INSERT INTO  tb_projetos (nome_projeto,descricao_projeto,c_img,fk_tipo) VALUES(?,?,?,?)";

        const criarP=connection.execute(query,[nomeP,descricoaP,cmImg,tipoP]);
        
    
    }catch{
        console.log('erro!');
    }
}

async function criarPergunta(pergunta,resposta){
    try{
        const query = "INSERT INTO tb_duvidasfrequentes (m_pergunta, m_resposta) VALUES (?, ?)";
        const [rows, fields] = await connection.execute(query, [pergunta, resposta]);
        
    }catch(erro){
        console.log('erro!',erro);
    }
}

module.exports={
    verDuvidasF,
    verProjeto,
    criarPergunta,
    verTipo,
    criarprojetos
}

