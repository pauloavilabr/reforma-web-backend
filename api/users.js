const bcrypt = require('bcrypt')

module.exports = app => {
    const { validateFieldFormat, equalsOrError, validateRowsAffected, formatError, existsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        try {
            validateFieldFormat(user.name, "Name")
            validateFieldFormat(user.cpf, "CPF")
            validateFieldFormat(user.email, "Email")
            validateFieldFormat(user.password, "Password")
            validateFieldFormat(user.confirmPassword, "Confirm Password")
            validateFieldFormat(user.situation, "Situation", type = 'boolean')
            
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()

                existsOrError(userFromDB, 'Usuário já cadastrado')

            equalsOrError(user.password, user.confirmPassword, "As senhas não conferem.")

        } catch(msg) {
            return res.status(400).send(formatError(msg))
        }

        user.password = encryptPassword(user.password)
        user.createdAt = new Date().toISOString()
        
        delete user.confirmPassword
  
        app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    
    }
    
    const get = (req, res) => {
        app.db('users')
            .select('idUser', 'name', 'email')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('name', 'lastName', 'email', 'cpf')
            .where({idUser: req.params.id})
            .first()
            .then(user => {
                    if(user){
                        res.json(user)
                    }else{
                        res.json({})
                    }                   
                }
            )
            .catch(err => res.status(500).send(err))
    }

    const updateById = async (req, res) => {

        const user = { ...req.body }
        
        try {
           
            const rowsUpdated = await app.db('users')
                                        .update({name: user.name, lastName: user.lastName, cpf: user.cpf})
                                        .where({idUser: req.params.id})
            validateRowsAffected(rowsUpdated, 'Usuário não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    const deleteById = async (req, res) => {
         
        try {
           
            const rowsDeleted = await app.db('users')
                                        .where({idUser: req.params.id})
                                        .del()
            validateRowsAffected(rowsDeleted, 'Usuário não encontrado')

            res.status(204).send()

        } catch (msg) {

            res.status(400).send(formatError(msg))
        }
    }

    return { save, get, getById, updateById, deleteById }
}