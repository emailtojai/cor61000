var express = require('express');
var bodyParser = require('body-parser');
var Request = require('./requestModel');
var Client = require('node-rest-client').Client;
var ClientOAuth2 = require('client-oauth2');

 
var app = express();
var port = process.env.port || 8000;

corRouter = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
corRouter.route('/GetBearerToken')

    .post(function (req, res) {

        var request = new Request(req.body);
        var sts = new ClientOAuth2({
            clientId: request.clientid,
            clientSecret: request.clientsecret,
            accessTokenUri: 'http://10.0.1.14:21000/identity/connect/token',
            scopes: ['openid', 'profile', 'offline_access', 'UCALAccess']
        })


        sts.owner.getToken(request.username, request.password)
            .then(function (user) {

                console.log(user);
                res.send(user.data);
                //res.send(JSON.stringify(user));


                //=> { accessToken: '...', tokenType: 'bearer', ... }
            })
            

    })

    .get(function (req, res) {

        var responseJson = { hello: "This is token API" };
        res.json(responseJson);
    });
app.use('/Token', corRouter);

app.get('/', function (req, res) {
    res.send('welcome to sts')
})
app.listen(port, function () {
    console.log('Running on port   ' + port);
})

