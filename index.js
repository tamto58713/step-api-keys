const Hapi = require('@hapi/hapi')
const Joi = require("@hapi/joi")

const { secure } = require('./serverSettings')  
const { data } = require("./db")
const { securityDefinitions } = require("./defineSecurity")

const init = async () => {
    const server = Hapi.server({
        port: 8080,     
        host: "localhost",
        routes: {
            json: {
                space: 4
            }
        }
    }) // setting server
    
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
    }) // Get root. Print Hello world

    server.route({
        method: "GET",
        path: "/api/{id}",
        handler: async  (req, h) => {
            let id = req.params.id // Id from url
            let reqItem = data.find(item => {
                return item.operationId === id
            }) // Get item has id like id form url

            if (!reqItem) 
                return {"errs": ["Not found!"], "reasons": ["Item is not exist!"]}
            // Case not found item from data

            if (reqItem.security.api_key.length === 0)
                return {"errs": ["Access is denied"], "reasons": ["It is not public for you!"]}
            // Case someone has not access

            secureItem = secure.api_keys.find(key => {
                let itemKey1 = reqItem.security.api_key[0] // Get key is first element in array api_keys
                let itemKey2 = reqItem.security.api_key[1] // // Get key is second element in array api_keys
                return (key.scope[0] === itemKey1 && key.scope[1] === itemKey2) ||
                        (key.scope[0] === itemKey2 && key.scope[1] === itemKey1)
                        // 2 case
            }) // Get name of api key


            return {
                ...reqItem,
                nameAccess: secureItem.name,
                apikey: secureItem.apikey,
                detailAccess: [
                    securityDefinitions.api_key.scopes[secureItem.scope[0]], // detail first access 
                    secureItem.scope[1] ? securityDefinitions.api_key.scopes[secureItem.scope[1]] : null
                    // Detail second access if it's exist
                ]
            }
        }
        
    })


    
    console.log(`Server running at ${server.info.uri}`) // Notification 

}

init() // Call

// Happy Coding
