var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let express = require('express');
let mongo = require("mongodb").MongoClient;

mongo.connect("mongodb://localhost:27017", function(err, client){

    if(err){
        return console.log(err);
    }
    console.log("connection success");
    // взаимодействие с базой данных
    //client.close();
});


let port =3000;

app.use(express.static(__dirname + '/public'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket) {
    console.log("new user");

    socket.on('greetings',function(){
        io.to(socket.id).emit('test',"welcome to server");
    });
});

http.listen(port, function(){
    console.log('listening on: '+port);
});

