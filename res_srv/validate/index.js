let Ajv = require('ajv')
let ajv = Ajv({ allErrors:true, removeAdditional:'all' })
let newUserSchema = require('./new-user.json')
let oldUserSchema = require('./old-user.json')
let newTransation = require('./new-transation.json')
let oldTransation = require('./old-transation.json')

ajv.addSchema(newUserSchema, 'new-user')
ajv.addSchema(oldUserSchema, 'old-user')
ajv.addSchema(newTransation, 'new-transation')
ajv.addSchema(oldTransation, 'old-transation')


function errorResponse(schemaErrors) {
    let errors = schemaErrors.map((error) => {
        return {
            params: error.params,
            message: error.message
        }
    })
    return {
        status: 'failed',
        errors: errors
    }
}

let validateSchema = (schemaName) => {
    return (req, res, next) => {
        if( req.isAuthenticated() ) {
            let valid = ajv.validate(schemaName, req.body)
            if (!valid) {
                return res.send(errorResponse(ajv.errors)).status(400)
            }
            next()
        }else{
            res.send('{"err":"not authenticated"}').status(400)
        }
    }
}

module.exports = validateSchema