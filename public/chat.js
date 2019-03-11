//Make connection
var socket = io.connect("http://localhost:4000");


//Query DOM
// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
  feedback = document.getElementById('feedback');
//emit Events
btn.addEventListener("click",function(){
  var d= new Date();
  socket.emit("chat",{
    message:message.value,
    handle:handle.value,
    time:d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
  });
  message.value="";

});

message.addEventListener("click",function(){
  socket.emit("typing",{
    handle:handle.value
  });
});

//Listen for Events
socket.on("chat",function(data){
  output.innerHTML+="<p>"+data.time+" <strong>"+data.handle+":</strong>"+data.message+"</p>";
  feedback.innerHTML="";
});

socket.on("typing",function(data){
  feedback.innerHTML+="<p>"+data.handle+" is typing</p>";
});
