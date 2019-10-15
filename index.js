const Hapi = require('@hapi/hapi')
const Joi = require("@hapi/joi")

const { secure } = require('./serverSettings')  
const { data } = require("./db")

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: "localhost"
    })

    await server.start(err => {
        if (err)
            throw err
    })

    server.route({
        method: "GET",
        path: "/",
        handler: (req, h) => {
            console.log(secure)
            return "<h3>Hello world!</h3>"
        },
        options: {
            validate: {}
        }
    })

    server.route({
        method: "GET",
        path: "/api/{id}",
        handler: async  (req, h) => {
            let id = req.params.id
            let reqItem = data.find(item => {
                return item.operationId === id
            })

            if (!reqItem) 
                return {"errs": ["Not found!"]}

            if (reqItem.security.api_key.length === 0)
                return {"errs": ["Access is denied"] }
            
            return reqItem
        }
        
    })


    
    console.log(`Server running at ${server.info.uri}`)

}

init()

