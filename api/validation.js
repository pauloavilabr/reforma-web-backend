module.exports = app => {
    function validateFieldFormat(value, nomeDoCampo, type='string', max=1) {
        let msg = ""

        if(value === undefined ){

            msg = `O campo ${nomeDoCampo} não foi informado.`
            throw msg
        }

        if(type == 'string'){

            if(typeof value != 'string') {
                msg = `O campo ${nomeDoCampo} deve ser do tipo String.`
                throw msg
            }

            if(typeof value === 'string' && !value.trim()) {
                msg = `O valor do campo ${nomeDoCampo} não foi informado.`
                throw msg
            }            

        }

        if(type == 'number'){

            if(isNaN(value)) throw `O campo ${nomeDoCampo} deve ser do tipo Number.`

        }

        if(type == 'boolean'){

            if(typeof value != 'boolean') {
                msg = `O valor do campo ${nomeDoCampo}  deve ser do tipo boolean.`
                throw msg
            }
        }

        if(type == 'object'){


            if(Object.keys(value).length === 0) {
                msg = `Nenhum parâmetro informado. Informe ${nomeDoCampo}.`
                throw msg
            }
            
            if(Object.keys(value).length > max) {
                msg = `Excedeu a quantidade máxima de parâmetros (${max}). Informe ${nomeDoCampo}`
                throw msg
            }

            if(Object.keys(value).length === 0) {
                msg = `Nenhum parâmetro informado. Informe ${nomeDoCampo}.`
                throw msg
            }

        }

        if(type == 'array'){
            if(Array.isArray(value) && value.length === 0) {
                msg = `O valor do campo ${nomeDoCampo} não foi informado.`
                throw msg
            }
        }        
    }
    
    function notExistsOrError(value, msg) {

        if(!value) throw msg

    
    }
    function existsOrError(value, msg) {

        if(value) throw msg

    }

    function validateRowsAffected(value, msg) {

        if(value === 0) throw msg

    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function formatError(msg) {

        jsonResponse = {'Error': msg}
        return jsonResponse

    }

    return { validateFieldFormat, notExistsOrError, equalsOrError, validateRowsAffected, formatError, existsOrError }
}