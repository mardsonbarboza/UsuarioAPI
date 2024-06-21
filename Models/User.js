const knex = require("../Database/Connection");


class User{
    async FindAll(){

        try {
            var result = await knex.select("*").table('users')
            return result
        } catch (error) {
            console.log(error)
            return []
        }
       
    }
    async FindByEmail(email){
        try {
            var result = await knex.select("*").table('users').where({email:email})
            return result
        } catch (error) {
            console.log(error)
            return {status: false, msg:'Email não encontrado, tente novamente'}       
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
    async update(id, email, name){

        var user = await this.findById(id);
        parseInt(user);
        if(user != undefined){

            var editUser = {};
            if(email != undefined){
                if(email != user.email){
                    var result =  await this.findEmail(email)
                    if(result == false){
                        editUser.email = email;
                    }else{
                        return {status: false, err: "O email ja esta cadastrado"}
                    }
                }

            }

            if(name != undefined){
                editUser.name = name;
            }

            if(role != undefined){
                editUser.role = role
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
