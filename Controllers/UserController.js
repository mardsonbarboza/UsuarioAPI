const User = require('../Models/User')
class UserController{
    async index(req, res){
        var users = await User.FindAll();
        res.json(users);
    }
    async create(req, res){
        var {nome, email} = req.body;
        
        if(email == undefined){
            res.status(400);
            res.json({err: "O e-mail é inválido!"})
            return;
        }else{
            var emailExists = await User.FindByEmail(email);

            if(emailExists){
                res.status(406);
                res.json({err: "O e-mail já está cadastrado!"})
                return;
            }else{
                await User.new(nome,email);
            
                res.status(200);
                res.send("Tudo OK!");
            }
    
            
            
        }

       
    }

    async findUser(req, res){
        var id = req.params.id;
        var user =  await User.FindById(id);

        if(user == undefined){
            res.status(404);
            res.json({err: "Usuario não encontrado"})
        }else{
            res.status(200);
            res.json(user); 
        }
    }

    async edit(req,res){

        var {id,nome,email} = req.body;
        var result = await User.Update(id,email,nome);

        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo ok!");
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send("ocorreu um erro no servidor")
        }
        
    }

    async remove(req,res){
        var id = req.params.id;

        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("tudo Ok!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    

}
module.exports = new UserController