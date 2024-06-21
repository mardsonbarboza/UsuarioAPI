
class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users);s
    }
    async create(req, res){
        var {email, name} = req.body;
        
        if(email == undefined){
            res.status(400);
            res.json({err: "O e-mail é inválido!"})
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!"})
            return;
        }

        
        await User.new(email,name);
        
        res.status(200);
        res.send("Tudo OK!");
    }

    async findUser(req, res){
        var id = req.params.id;
        var user =  await User.findById(id);

        if(user == undefined){
            res.status(404);
            res.json({err: "Usuario não encontrado"})
        }else{
            res.status(200);
            res.json(user); 
        }
    }

    async edit(req,res){

        var {id,name,email} = req.body;
        var result = await User.update(id,email,name);

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