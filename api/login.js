const bcrypt = require('bcrypt')

module.exports = app => {
    const { validateFieldFormat, validateRowsAffected, formatError, notExistsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const post = async (req, res) => {
        const user = { ...req.body }
        let msg = ""
  
        try {

            validateFieldFormat(user.email, "Email")
            validateFieldFormat(user.password, "Password")
            
            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()

                notExistsOrError(userFromDB, 'Usuário não cadastrado')

            bcrypt.compare(user.password, userFromDB.password, function(err, result) {

                if(result === true){
                    return res.status(200).send({idUser: userFromDB.idUser, name: userFromDB.name})
                }else{
                    return res.status(400).send(formatError("Senhas não conferem."))
                }

            });
            

        } catch(msg) {
            return res.status(400).send(formatError(msg))
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

    return { post, deleteById }
}