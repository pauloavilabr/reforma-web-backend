const bcrypt = require('bcrypt')

module.exports = app => {
    const { validateFieldFormat, validateRowsAffected, formatError, existsOrError} = app.api.validation

    const save = async (req, res) => {

        const categories = { ...req.body }

        try {
            validateFieldFormat(categories.categorie, "categorie")

            const dataFromDB = await app.db('categories')
                .where({ categorie: categories.categorie }).first()

                existsOrError(dataFromDB, 'Categoria já cadastrada')

        } catch(msg) {
            return res.status(400).send(formatError(msg))
        }
  
        categories.createdAt = new Date().toISOString()

        app.db('categories')
            .insert(categories)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    
    }
    const get = (req, res) => {
        app.db('categories')
            .select('idCategorie', 'categorie')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .select('idCategorie', 'categorie')
            .where({idCategorie: req.params.id})
            .first()
            .then(categories => {
                    if(categories){
                        res.json(categories)
                    }else{
                        res.json({})
                    }                   
                }
            )
            .catch(err => res.status(500).send(err))
    }

    const updateById = async (req, res) => {

        const categories = { ...req.body }
        
        try {
           
            const rowsUpdated = await app.db('categories')
                                        .update({categorie: categories.categorie})
                                        .where({idCategorie: req.params.id})
            validateRowsAffected(rowsUpdated, 'Categoria não encontrada')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    const deleteById = async (req, res) => {
         
        try {
           
            const rowsDeleted = await app.db('categories')
                                        .where({idCategorie: req.params.id})
                                        .del()
            validateRowsAffected(rowsDeleted, 'Categoria não encontrada')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    return { save, get, getById, updateById, deleteById }
}