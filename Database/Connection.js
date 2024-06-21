//Conexão com o banco de dados 

require('dotenv').config()
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.HOST,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : 'user'
    }
  });
//exportando o knex para os outros arquivos e ser utilizado
module.exports = knex