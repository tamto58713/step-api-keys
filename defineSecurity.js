module.exports = {
    "securityDefinitions": {
        "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header",
            "scopes": {
                "read": "Read access to data",
                "write": "Write access to data",
                "readPublic": "Read only access to publicly visible data",
            }
        }
    }
}