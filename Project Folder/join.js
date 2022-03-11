const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} });
var min = Math.ceil(1);
var max = Math.floor(65535);
var gamePin = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive

console.log("hi")
class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  get getScore() {
    return this.score;
  }
  setScore(newscore) {
    this.score = newscore;
  }
}

const playerMap = new Map();
console.log("test")


app.use(express.static(__dirname));
 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/join.html');
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

function chooseName(){
    var name = document.getElementById("nameEntryBox").value;
    if (name == ''){
      return
    }
    else {
      // Figure out how to append instead of replacing element
      // playerMap.set(pname, new Player(pname, 0))
      document.getElementById('nameDisplay').innerHTML = "Name: " + name;
      document.getElementById('playerNameSubmissionDisplay').style.display = 'none';
      document.getElementById('waitingDraw').style.display = '';

      // setTimeout(toGame, 2000)
    }
}

function toGame(){
  location.href = "game.html";
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