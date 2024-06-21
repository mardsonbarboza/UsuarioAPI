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
    async UpdateUser(id,email,nome,cargo){
        var user = await this.FindById(id)
        parseInt(user)
        if (user != undefined) {
            var editUser = {}
            if (email != undefined) {
                if (email != user.email) {
                    var result = await this.FindByEmail(email)
                } else {
                    
                }
            } else {
                
            }
        } else {
            
        }
    }
}
