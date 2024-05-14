require("dotenv").config()
const conexao=require('mysql2/promise');

const connection = conexao.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_SENHA,
    database:process.env.DB_NAMEBANCO,
    port:process.env.DB_PORTA
})

module.exports=connection;



