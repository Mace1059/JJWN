const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} });
var min = Math.ceil(10000);
var max = Math.floor(65535);
var gamePin = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
var hostid;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/join', (req, res) => {
  res.sendFile(__dirname + '/join/join.html');
});

app.get('/join/join.js', (req, res) => {
    res.sendFile(__dirname + '/join/join.js');
});

app.get('/host', (req, res) => {
    res.sendFile(__dirname + '/host/host.html');
});

app.get('/host/host.js', (req, res) => {
    res.sendFile(__dirname + '/host/host.js');
});


var pin = pad(gamePin, 5)

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

//server.listen(pin, () => {
//  console.log('listening on *:' + pin);
//});

server.listen(3000, () => {
    console.log('listening on *:' + 3000);
  });

io.on('connection', (socket) => {
    socket.on('HOST1', msg => {
        //io.emit('HOST1', msg);
        //Save the socket ID as the host
        hostid = socket.id;
        //socket.join("HOST");
        // socket.join("some room");
        //io.to("some room").emit("some event");
        console.log('host started game.  Host id: ' + socket.id);
      });

      socket.on('JOIN1', msg => {
        //io.to("HOST").emit("HOST1", msg);
        io.emit("HOST1", msg);

        //io.emit('HOST1', msg);
        console.log('New player joined.  Player id: ' + socket.id);
      });      
});


  
