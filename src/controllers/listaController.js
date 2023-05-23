const knex = require("../database/knex")

module.exports = {
    async adicionaItem(req,res){
        const {nome, validade} = req.body
        try{
            const item = await knex("lista").select("*").where({nome}).first()

            if(item){
                return res.json({"message": "Já existe um produto com esse nome"})
            }

            await  knex("lista").insert({
                nome,
                validade,
            })

            return res.json({"message" : "Item adicionado"})

        }catch(error){
            return res.json(error)
        }
    },


    async retiraItem(req,res){
        const { id } = req.params

        try{
            const item = await knex("lista").select("*").where({id}).first()
            
            if(!item){
                return res.json({"message" : "O item não existe"})
            }

            await knex("lista").delete().where({id})
            return res.json({"message" : "Item deletado"})
        
        } catch(error){
            return res.json(error)
        }
    },


    async modificarItem(req,res){
        const { id } = req.params
        const itemUpdate = req.body

        try{
            const item = await knex("lista").select("*").where({id}).first()
            if(!item){
                return res.json({"message" : "O item não existe"})
            }

            await knex("lista").update(itemUpdate).where({id})

            return res.json({"message" : "Item atualizado"})
        } catch(error){
            return res.json(error)
        }
    },


    async verItem(req,res){
        const { id } = req.params

        try{
            const item = await knex("lista").select("id","nome","validade").where({id}).first()
            if(!item){
                return res.json({"message" : "O item não existe"})
            }

            return res.json(item)
        }catch(error){
            return res.json(error)
        }
    },

    
    async verTudo(req,res){
        try { 
            const lista = await knex('lista').select("id","nome", "validade")
            return res.json(lista)
        } catch (error) {
            return res.json(error)
        }
    }
}