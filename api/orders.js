const bcrypt = require('bcrypt')

module.exports = app => {
    const { validateFieldFormat, validateRowsAffected, formatError, existsOrError} = app.api.validation

    const save = async (req, res) => {

        const orders = { ...req.body }

        try {

            validateFieldFormat(orders.idBag, "idBag", type = 'number')

            const dataFromDB = await app.db('order')
                .where({ idBag: orders.idBag }).first()

                existsOrError(dataFromDB, 'Pedido já cadastrado')

        } catch(msg) {
            return res.status(400).send(formatError(msg))
        }

        orders.createdAt = "2023-09-18" //Date.now();

        app.db('order')
            .insert(orders)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    
    }
    const get = (req, res) => {
        app.db('order')
            .select('idOrder', 'createdAt', 'idBag')
            .then(orders => res.json(orders))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('order')
            .select('idOrder', 'createdAt', 'idBag')
            .where({idOrder: req.params.id})
            .first()
            .then(orders => {
                    if(orders){
                        res.json(orders)
                    }else{
                        res.json({})
                    }                   
                }
            )
            .catch(err => res.status(500).send(err))
    }

    const updateById = async (req, res) => {

        const orders = { ...req.body }
        
        try {
           
            const rowsUpdated = await app.db('order')
                                        .update({quantity: orders.quantity})
                                        .where({idOrder: req.params.id})
            validateRowsAffected(rowsUpdated, 'Pedido não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    const deleteById = async (req, res) => {
         
        try {
           
            const rowsDeleted = await app.db('order')
                                        .where({idOrder: req.params.id})
                                        .del()
            validateRowsAffected(rowsDeleted, 'Pedido não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    return { save, get, getById, updateById, deleteById }
}