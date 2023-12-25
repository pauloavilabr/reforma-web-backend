// const bcrypt = require('bcrypt')

module.exports = app => {
    const { validateFieldFormat, validateRowsAffected, formatError, existsOrError} = app.api.validation

    const save = async (req, res) => {

        const product = { ...req.body }

        try {
            validateFieldFormat(product.productName, "productName")
            validateFieldFormat(product.productDescription, "productDescription")
            validateFieldFormat(product.price, "price")
            validateFieldFormat(product.idUserSeller, "idUserSeller", type = 'number')
            validateFieldFormat(product.idCategorie, "idCategorie", type = 'number')

        } catch(msg) {
            return res.status(400).send(formatError(msg))
        }

        product.activated = true;
        product.createdAt = new Date().toISOString()
  
        app.db('products')
            .insert(product)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    
    }
    const get = (req, res) => {
        app.db('products')
            .select('idProduct', 'productName', 'productDescription', 'price','image', 'activated', 'createdAt', 'idUserSeller', 'idCategorie')
            //.raw("idProduct, productName, productDescription, price, encode(image, 'base64'), activated, createdAt, idUserSeller, idCategorie")
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err))
    }

    const getByIdSeller = (req, res) => {
        app.db('products')
            .select('idProduct', 'productName', 'productDescription', 'price', 'image', 'activated', 'createdAt', 'idUserSeller', 'idCategorie')
            .where({idUserSeller: req.params.id})
            .then(products => {
                    if(products){
                        res.json(products)
                    }else{
                        res.json({})
                    }                   
                }
            )
            .catch(err => res.status(500).send(err))
    }

    const getByName = (req, res) => {

        app.db('products')
            .select('idProduct', 'productName', 'productDescription', 'price', 'image', 'activated', 'createdAt', 'idUserSeller', 'idCategorie')
            .where('productName', 'like', `%${req.query.productName}%`) //%${req.query.productName}%`)
            .then(products => {
                    if(products){

                        res.json(products)
                    }else{
                        res.json({})
                    }                   
                }
            )
            .catch(err => res.status(500).send(err))
    }

    const updateByProductId = async (req, res) => {

        const products = { ...req.body }
        
        try {
           
            const rowsUpdated = await app.db('products')
                                        .update({produtoDescription: products.productDescription})
                                        .where({idProduct: req.params.id})
            validateRowsAffected(rowsUpdated, 'Produto não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    const deleteByProductId = async (req, res) => {
         
        try {

            const dataFromDB = await app.db('bag')
                .where({ idProduct: req.params.id }).first()

                if(dataFromDB){
                    await app.db('bag')
                    .where({idProduct: req.params.id})
                    .del()
                }

            const rowsDeletedProducts = await app.db('products')
                                        .where({idProduct: req.params.id})
                                        .del()
            validateRowsAffected(rowsDeletedProducts, 'Produto não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    return { save, get, getByIdSeller, getByName, updateByProductId, deleteByProductId }
}