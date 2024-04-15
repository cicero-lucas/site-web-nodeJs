const jwt = require('jsonwebtoken');
const { url } = require('../Helpers/Helpers');
require("dotenv").config();
const secret = process.env.SECRET;

async function verificarLogin(req, res, next) {
    const headerToken = req.cookies['tokenAutorization'];
    const token= (headerToken)
    
    if (!token) {
        req.flash('info', { msg: 'Você precisa fazer login para acessar esta página!', class: "msgErro" });
        return res.redirect(url(`admin`));
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
            req.flash('info', { msg: 'Token inválido! Faça login novamente.', class: "msgErro" });
            return res.redirect(url(`admin/pagina`));

        } else {
            next();
        }
    });

}

module.exports = { verificarLogin };
