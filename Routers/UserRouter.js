var express = require("express");
//colocando a função do express Router() na variavel router
var router = express.Router();
//importação usercontroller
var UserController = require("../Controllers/UserController");

//rota index para selecionar todos os users
router.get("/user",UserController.index);
//rota create para criar um user pelo post
router.post('/user', UserController.create);
//rota get para achar um user por meio de id vindo pela url
router.get("/user/:id",UserController.findUser);
//rota put referente a atualização dos dados de um user
router.put("/user",UserController.edit);
//rota para deletar um usuario
router.delete('/user/:id', UserController.remove);
//rota para recuperar password



//exportar router
module.exports = router; 