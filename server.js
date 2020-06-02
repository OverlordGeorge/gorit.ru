//modules
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let express = require('express');
let mongo = require("mongodb").MongoClient;
let cors = require('cors');

// configs
let config = require('./config');

//my modules
let ProductsHandler = require('./my_modules/productsHandler/ProductHandler').ProductsHandler;
let OrderHandler = require('./my_modules/ordersHandler/OrderHandler').OrderHandler;
let GetPosthadler = require('./my_modules/getPostHadler/GetPostHandler').GetPostHandle;
let getPostHandler = new GetPosthadler();
//main logic

let appPath = __dirname+ '/product-app/dist/product-app';

app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/images', express.static(__dirname + '/data/images'));
app.use(express.static(appPath));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.listen(config.server.port, function () {
    console.log("server is working")
});

app.get('/', function(req, res){
    res.sendFile(appPath+'/index.html');
});

app.get('/runtime.js', function(req, res){
    res.sendFile(appPath+'/runtime.js');
});

app.get('/favicon.ico', function(req, res){
    res.sendFile(appPath+'/favicon.ico');
});

app.get('/polyfills.js', function(req, res){
    res.sendFile(appPath+'/polyfills.js');
});

app.get('/styles.js', function(req, res){
    res.sendFile(appPath+'/styles.js');
});

app.get('/vendor.js', function(req, res){
    res.sendFile(appPath+'/styles.js');
});

app.get('/main.js', function(req, res){
    res.sendFile(appPath+'/main.js');
});

mongo.connect("mongodb://"+config.database.address, { useNewUrlParser: true }, function(err, client){

    if (!err){
        console.log('connect to '+config.database.name+' database');
    }
    else{
        console.log('cant connect to database');
        return;
    }

    let db = client.db(config.database.name);
    let productsColl = db.collection(config.database.itemsCollName);
    let ordersColl = db.collection(config.database.ordersCollName);

    let productsHandler = new ProductsHandler(productsColl);
    let orderHandler = new OrderHandler(ordersColl, productsColl);

    app.get('/findProducts',  (request, response) => {
        try{
            let params = getPostHandler.parseGetParams(request);
            productsHandler.find(params, function (data) {
                response.status(200).send(data);
            })
        }
        catch (e) {
            console.log('error in findProducts');
        }
    })

    app.get('/makeOrder', (request, response) => {
        try{
           let params = getPostHandler.parseGetParams(request);
           orderHandler.insertOrder(params, (obj) => {
               response.status(200).send("Спасибо за ваш заказ, наш оператор свяжится с вами в ближайщее время");
           });
        }
        catch (e) {
            console.log('error in findProducts');
            response.status(200).send("Сервер заказов недоступен, попробуйте позже");
        }
    });

});
