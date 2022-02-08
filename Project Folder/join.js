const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/join.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log
});

function chooseName(){
    var name = document.getElementById("nameEntryBox").value;
    if (name == ''){
      return
    }
    else {
      // Figure out how to append instead of replacing element
      document.getElementById('nameDisplay').innerHTML = "Name: " + name;
    }
}

function chooseID(){
    var id = document.getElementById("IDEntryBox").value;
    if (id == ''){
      return
    }
    else {
      // Figure out how to append instead of replacing element
      document.getElementById('IDDisplay').innerHTML = "Game ID: " + id;
    }
}
