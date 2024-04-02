const { storage } = require('../../Helpers/UpdateArquivo');
const multer = require("multer");

async function paginaCriarProjeto(req, res) {
    try {
        // Configuração do multer para processar o upload de um único arquivo com o nome 'file'
        const upload = multer({ storage: storage }).single('file');
        
        // Executa o middleware de upload
        upload(req, res, function (err) {
            if (err) {
                console.error('Erro ao fazer upload do arquivo:', err);
                return res.status(500).send('Erro ao fazer upload do arquivo');
            }
            
            // Verifica se o arquivo foi enviado
            if (!req.file) {
                console.error('Nenhum arquivo foi enviado aaaaaaaa');
                return res.status(400).send('Nenhum arquivo foi enviado');
            }

            console.log('Arquivo enviado:', req.file.filename);

            // Restante do código para processar os dados do projeto...
        });
    } catch (error) {
        console.error('Erro ao cadastrar projeto:', error);
        return res.status(500).send('Erro ao cadastrar projeto');
    }
}


module.exports={
    paginaCriarProjeto
}