const knex = require("../Database/Connection");


class User{
    async FindAll(){
       try {
        var result = await knex.select("*").table('users')
            return result
            
            
       } catch (error) {
            return []
       }
            
       
    }
    async new(nome,email){
        try {

            await knex.insert({nome:nome,email:email}).table("users");
        } catch (err) {
            console.log(err);
        }
      
    }
    async FindByEmail(email){
        try {
            var result = await knex.select("*").table('users').where({email:email})
            if(result.length > 0){
                return true
            }else{
                return false
            }
            
        } catch (error) {
            console.log(error)
            return error      
         }
    }
    async FindById(id){
        try {
            var result = await knex.select('*').table('users').where({id:id})
            if (result.length > 0) {
                return result[0]
            } else {
                return undefined
            }
        } catch (error) {
            console.log(error)
            return undefined
        }
    }
    async delete(id){
        var user = await this.FindById(id)
        if (user != undefined) {
            try {
                await knex.delete().where({id:id}).table('users')
                return {status: [true,"Deletado com sucesso"]}
            } catch (error) {
                console.log(error)
                return {status:false, error: error}
            }
        } else {
            return {status: false, err: "O usuario não existe, por tanto não pode ser deletado"}
        }
    }
    async Update(id, email, nome){

        var user = await this.FindById(id);
        parseInt(user);
        if(user != undefined){

            var editUser = {};
            if(email != undefined){
                if(email != user.email){
                    var result =  await this.FindEmail(email)
                    if(result == false){
                        editUser.email = email;
                    }else{
                        return {status: false, err: "O email ja esta cadastrado"}
                    }
                }

            }

            if(nome != undefined){
                editUser.nome = nome;
            }

            
            try {  
                await knex.update(editUser).table("users").where({id: id})
                return {status: true}
            } catch (err) {
                return {status: false, err: err}
            }
          
            
        }else{
            return {status: false, err: "O usuario não existe"}

        }

    }
}

module.exports = new User