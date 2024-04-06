
async function paginaCriarProjeto(req, res) {
    try {
        console.log(req.file);
        console.log(req.body);
       
    } catch (error) {
        console.error('Erro ao cadastrar projeto:', error);
        return res.status(500).send('Erro ao cadastrar projeto');
    }
}


module.exports={
    paginaCriarProjeto
}