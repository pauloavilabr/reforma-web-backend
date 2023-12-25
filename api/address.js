const bcrypt = require('bcrypt')

module.exports = app => {
    const { validateFieldFormat, notExistsOrError, validateRowsAffected, formatError, existsOrError} = app.api.validation

    const save = async (req, res) => {

        const address = { ...req.body }

        try {
            validateFieldFormat(address.typeAddress, "typeAddress")
            validateFieldFormat(address.street, "street")
            validateFieldFormat(address.number, "number")
            validateFieldFormat(address.compliment, "compliment")
            validateFieldFormat(address.district, "district")
            validateFieldFormat(address.zipCode, "zipCode")
            validateFieldFormat(address.city, "city")
            validateFieldFormat(address.uf, "uf")
            validateFieldFormat(address.country, "country")
            validateFieldFormat(address.idUser, "idUser")


            const dataFromDB = await app.db('address')
                .where({ typeAddress: address.typeAddress }).first()

                existsOrError(dataFromDB, 'Tipo de endereço já cadastrado')

        } catch(msg) {
            return res.status(400).send(formatError(msg))
        }
  
        app.db('address')
            .insert(address)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    
    }
    const get = (req, res) => {
        app.db('address')
            .select('idAddress', 'typeAddress', 'street','number','compliment','district','zipCode','city','uf','country', 'idUser')
            .then(address => res.json(address))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('address')
            .select('idAddress', 'typeAddress', 'street','number','compliment','district','zipCode','city','uf','country', 'idUser')
            .where({idAddress: req.params.id})
            .first()
            .then(address => {
                    if(address){
                        res.json(address)
                    }else{
                        res.json({})
                    }                   
                }
            )
            .catch(err => res.status(500).send(err))
    }

    const updateById = async (req, res) => {

        const address = { ...req.body }
        
        try {
           
            const rowsUpdated = await app.db('address')
                                        .update({street: address.street})
                                        .where({idAddress: req.params.id})
            validateRowsAffected(rowsUpdated, 'Endereço não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    const deleteById = async (req, res) => {
         
        try {
           
            const rowsDeleted = await app.db('address')
                                        .where({idAddress: req.params.id})
                                        .del()
            validateRowsAffected(rowsDeleted, 'Endereço não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    return { save, get, getById, updateById, deleteById }
}