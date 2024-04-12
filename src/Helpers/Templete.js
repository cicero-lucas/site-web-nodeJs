const templete = require('express-handlebars');
const { PARTIALS_DIR, LAYOUTS_DIR, VIEWS_DIR } = require('./constantes');
const { url } = require('./Helpers');

exports.init = function(app){
    

    app.engine("html", templete.engine({
        extname: "html",
        partialsDir: PARTIALS_DIR,
        layoutsDir: LAYOUTS_DIR,
        helpers: {
            url:url
        }
    }));

    // Definir o engine de views e o diretório de views
    app.set('view engine', 'html');
    app.set('views', VIEWS_DIR);
}
