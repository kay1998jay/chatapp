var express = require("express");
var socket = require("socket.io");
var mysql = require("mysql");

express.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

var port= process.env.PORT || 8080;


//MYSQL setup
/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat_app'
});

connection.connect();

connection.query('SELECT * from users', function(err, rows, fields) {
  if (!err)
  {
    console.log('Connected');
    console.log('The solution is: ', rows);
  }
  else
  {
    console.log('Error while performing Query.');
  }
});

connection.end();
*/
// APP setup
var app= express();
var server = app.listen(port,function(){
  console.log("listening to requests on port 4000");
})


// STatic files
app.use(express.static("public"));

//Socket setup
var io = socket(server);

io.on("connection", function(socket){
  console.log("made socket connection",socket.id);


  socket.on("chat",function(data){
    io.sockets.emit("chat",data);
  });
  socket.on("typing",function(data){
    socket.broadcast.emit("typing",data);
  })
});
