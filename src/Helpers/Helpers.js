const bcrypt = require('bcrypt');
require('dotenv').config();


async function cripografarsenha($senha){
    const salt= await bcrypt.genSalt(12);
    const passowordHash= await bcrypt.hash($senha,salt)
return passowordHash;
}
async function verificarSenha($senha,$senhabanco){
    const salt= await bcrypt.genSalt(12);
    const passowordHash= await bcrypt.compare($senha,$senhabanco);
    if(passowordHash){
        return true
    }else{
        return false;
    }
}

function url(path="") {
    const baseUrl = 'http://localhost:3000/'; 
    return `${baseUrl}${path}`;
}
module.exports={
    url
};

