//modules
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let express = require('express');
let mongo = require("mongodb").MongoClient;

// configs
let config = require('./config');

//my modules
let ProductsHandler = require('./my_modules/productsHandler/ProductHandler').ProductsHandler;
let GetPosthadler = require('./my_modules/getPostHadler/GetPostHandler').GetPostHandle;
let getPostHandler = new GetPosthadler();
//main logic

app.use('/node_modules', express.static(__dirname + '/node_modules/'));

app.listen(config.server.port, function () {
    console.log("server is working")
});

mongo.connect("mongodb://"+config.database.address, function(err, client){

    if (!err){
        console.log('connect to '+config.database.name+' database');
    }

    let db = client.db(config.database.name);
    let productsColl = db.collection(config.database.itemsCollName);

    let productsHandler = new ProductsHandler(productsColl);

    app.get('/findProducts', function (request, response) {
        try{
            let params = getPostHandler.parseGetParams(request);
            productsHandler.find(params, function (data) {
                response.status(200);
                response.send(data);
            })
        }
        catch (e) {

        }
    })

});
