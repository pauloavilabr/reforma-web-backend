const bcrypt = require('bcrypt')

module.exports = app => {
    const { validateFieldFormat, validateRowsAffected, formatError, existsOrError} = app.api.validation

    const save = async (req, res) => {

        const bag = { ...req.body }

        try {
            validateFieldFormat(bag.idProduct, "idProduct", type = 'number')
            validateFieldFormat(bag.idUser, "idUser", type = 'number')

            const dataFromDB = await app.db('bag')
                .where({ idProduct: bag.idProduct, idUser: bag.idUser }).first()
                existsOrError(dataFromDB, 'Produto já está no carrinho')

        } catch(msg) {
            return res.status(400).send(formatError(msg))
        }
        
        bag.createdAt = new Date().toISOString()

        app.db('bag')
            .insert(bag)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    
    }
    
    const get = (req, res) => {
        app.db('bag')
            .join('products','bag.idProduct', 'products.idProduct')
            .select('products.idProduct', 'products.productName', 'products.productDescription', 'products.price', 'products.image', 'products.activated', 'products.createdAt', 'products.idUserSeller', 'products.idCategorie')
            .where({idUser: req.params.id})
            .then(bag => res.json(bag))
            .catch(err => res.status(500).send(err))
    }

    const deleteById = async (req, res) => {
         
        try {
           
            const rowsDeleted = await app.db('bag')
                                        .where({idProduct: req.params.id})
                                        .del()
            validateRowsAffected(rowsDeleted, 'Carrinho não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    return { save, get, deleteById }
}