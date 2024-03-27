function verificarAutenticacao(req, res, next) {
    if (req.session.login) {
        next(); 
    } else {
        return res.redirect('/admin'); 
    }
}

module.exports={
    verificarAutenticacao
}