require('dotenv').config();
const bcrypt = require('bcrypt');

async function criptografarSenha(senha) {
    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);
        return passwordHash;
    } catch (error) {
        console.error("Erro ao criptografar senha:", error);
        throw error;
    }
}

async function verificarSenha(senha, senhaBanco) {
    try {
        const match = await bcrypt.compare(senha, senhaBanco);
        return match;
    } catch (error) {
        console.error("Erro ao verificar senha:", error);
        throw error;
    }
}


function url(path="") {
    const baseUrl = 'http://localhost:3000/'; 
    return `${baseUrl}${path}`;
}
module.exports={
    url,
    verificarSenha,
    criptografarSenha
};

