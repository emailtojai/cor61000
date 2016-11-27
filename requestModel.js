var SchemaObject = require('node-schema-object');

var requestModel = new SchemaObject ({
    clientId: { type: String    },
    clientSecret: { type: String },
    //accessTokenUri: { type: String },
    username: { type: String },
    password: { type: String }
    //scopes: { type: String }
});
module.exports = requestModel;


