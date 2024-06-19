//Conexão com o banco de dados 
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'root',
      database : 'apiuser'
    }
  });
//exportando o knex para os outros arquivos e ser utilizado
module.exports = knex