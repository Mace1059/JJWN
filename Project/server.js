const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} });
var min = Math.ceil(10000);
var max = Math.floor(65535);
var gamePin = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive


app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/join.html');
});

app.get('/join.js', (req, res) => {
    res.sendFile(__dirname + '/join.js');
});

var pin = pad(gamePin, 5)

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

server.listen(pin, () => {
  console.log('listening on *:' + pin);
});

io.on('connection', (socket) => {
  console.log
});