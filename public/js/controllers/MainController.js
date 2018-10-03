app.controller("MainController", function($scope, socket, $http) {
        socket.emit('greetings',{});
        socket.on('test',function(data){
            console.log(data)
        })
});