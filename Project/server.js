const { match } = require('assert');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"} });

var allClients = [];
var allRooms = [];

var hostid;


var min = Math.ceil(10000);
var max = Math.floor(65535);
var gamePin = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
const ROUND_TIME = 20;
var totalPlayers = 1;
var readyPlayers = 0;

winnerPlayerMap = new Map();
var finalRoundScores = new Map();





app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/join', (req, res) => {
  res.sendFile(__dirname + '/join/join.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/Game/game.html');
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

server.listen(3000, () => {
    console.log('listening on *:' + 3000);
});


class Player {
  constructor(name, roundScore, score, opponent, teamLeader) {
    this.name = name;
    this.roundScore = roundScore;
    this.score = score;
    this.opponent = opponent;
    this.teamLeader = teamLeader;
  }
  get getRoundScore() {
    return this.roundScore;
  }
  get getScore() {
    return this.score;
  }
  setRoundScore(int) {
    this.roundScore = int;
  }
  sumScore(){
    this.score = this.score + this.roundScore;
  }
  setOpponent(mlist){
    this.opponent = mlist;
  }
  setLeader(id){
    this.teamLeader = id;
  }
}

var winnerPlayerMap = new Map();
var playerMap = new Map();

playerMap.set('name1', new Player('name1', 200, 100, null, null));
playerMap.set('name2', new Player('name2', 300, 200, null, null));
// playerMap.set('name3', new Player('name3', 400, 300, null, null));
// playerMap.set('name4', new Player('name4', 400, 300, null, null));
// playerMap.set('name5', new Player('name5', 400, 300, null, null));
// playerMap.set('name6', new Player('name6', 400, 300, null, null));


io.on('connection', (socket) => {
    socket.on('create-game', msg => {
        //Save the socket ID as the host
        hostid = socket.id;
        console.log('host started game.  Host id: ' + socket.id);
    });

    socket.on('join', pname => {
      playerMap.set(socket.id, new Player(pname, 0, 0, null, null));
      io.to(hostid).emit("name-submit", pname)
      console.log('New player joined.  Player id: ' + socket.id);    
    });
    
    //2
    socket.on('START', msg => {
      socket.broadcast.emit("host-started-game", msg);
    });

    socket.on('gameLoaded', msg => {
      console.log('Game loaded'); 
    });

    socket.on('player-join-game', (id) => {
      readyPlayers ++
      console.log("new socket id:" + socket.id)
      socket.id = id
      console.log("updated-socket-id:" + socket.id)
      if(readyPlayers == totalPlayers){
        matchmaking(playerMap)
      }
    });

    socket.on('update-score', (roundScoreData) => {
      playerMap.get(socket.id).setRoundScore(roundScoreData);
    });

    socket.on('update-final-score', (data) => {
      console.log("socket.id:" + socket.id);
      sumFinalScores(socket.id, data);
    });

    // console.log("connection detected")
});

// socket.on('disconnect', function () {
//   readyPlayers --
// });



function updateTimer(int){
  io.emit("update-timer", int)
  time = int;
  timer = setInterval(function(){
      time -= 1;
      if(time <= 0){
        clearInterval(timer)
        io.emit("timer-end")
        console.log(playerMap)
        determineWinner(bracket);
      }
  }, 1000);
}


function idToName(mlist){
  let nameList = [];
  for (let i = 0; i < mlist.length; i++) {
    if (playerMap.has(mlist[i])){
      nameList.push(playerMap.get(mlist[i]).name)
    }else{
      nameList.push(mlist[i])
    }
  }
  console.log("nameList")
  console.log(nameList)
  return nameList
}

function matchmaking(pmap){
  
  //add score of round to total score, reset round score
  //test to enter deathmatch

  var sortedScores = sortPlayersByScore(pmap);
  bracket = bracketGenerator(sortedScores);

  if (pmap.size > 2){ 
    
    let nameList = idToName(sortedScores)
    io.to(hostid).emit('leaderboard', nameList)

    io.emit('opponents-ready', "yay");      
    
    for (let [key, value] of playerMap) {
      playerMap.get(key).setRoundScore(0);
    }
    setTimeout(function(){updateTimer(ROUND_TIME)}, 5000);
  }
  else{
    for (let [key, value] of playerMap) {
      playerMap.get(key).setRoundScore(0);
    }
    console.log("deathmatch")
    finalRound();
  }
  console.log("bracket:")
  console.log(bracket)

}


function sortPlayersByScore(pMap) {
    var points = [];
    for (let [key, value] of pMap) {
        tempscore = pMap.get(key).score
        points.push({pname: key, score: tempscore});
    }
    points.sort(function(a, b){return b.score - a.score});
    // now points[0] contains the highest value
    // and points[points.length-1] contains the lowest value
  
    // Now that the 2 dimensional object array is sorted
    var sortedNames = [];
    for (let i = 0; i < points.length; i++) {
      sortedNames.push(points[i].pname);
      // console.log(points[i].pname + ':' + points[i].score);
    }
    return sortedNames; 
  }
  
  // tp = total players, winnerlist = list of players still in contention 
  // generates bracket based on rankings
  // in case of odd number, randomize between 2 and n-1 and add to 1 v n matchup
function bracketGenerator(mlist){
  
  tp = mlist.length;
  let mbracket = new Array(); // create an empty array of length tp

  // i and j are moving indices for matchmaking
  i = 0;
  j = mlist.length-1;
  
  if (tp % 2 === 1) {
    max = j-1
    min = i+1
    oddPlayer = Math.floor(Math.random() * (max - min + 1) + min)
    var matchup = [mlist[i], mlist[oddPlayer], mlist[j]]
    for (var p = 0; p < matchup.length; p++){
      var opponentList = [...matchup]
      var pmatch = opponentList.splice(p, 1)
      playerMap.get(pmatch[0]).setOpponent(opponentList);
    }
    mbracket.push(matchup); // make each element an array
    mlist.splice(oddPlayer, 1)
    i += 1
    j -= 2
    

  }

  while(i < j){
    mbracket[i] = new Array(mlist[i], mlist[j]); // make each element an array
    playerMap.get(mlist[i]).setOpponent(mlist[j])
    playerMap.get(mlist[j]).setOpponent(mlist[i])

    i += 1
    j -= 1
  }

  return mbracket
}

// use bracket to select highest score
function determineWinner(mlist){
  //create empty winnerPlayerMap and fill after every round
  winnerPlayerMap.clear();
  
  playerMap.forEach((value, key) => {
    value.sumScore();
  });


  //iterate through bracket
  for (let i = 0; i < mlist.length; i++) {
    let sortedList = sortBracket(mlist[i]);
    var winner = sortedList.shift();
    //losers of the matchup (not including teammates)
    for (let player of sortedList) {
      playerMap.get(player).setLeader(winner);
      winnerPlayerMap.set(winner, playerMap.get(winner));
      
      for (let [key, value] of playerMap){
        if (playerMap.get(key).teamLeader == player){
          playerMap.get(key).setLeader(winner)
        }
      }

    }
  }
  console.log(playerMap)
  
  matchmaking(winnerPlayerMap);
}

//input each individual matchup
function sortBracket(mlist) {
  mlist.sort(function(a, b){return playerMap.get(b).roundScore - playerMap.get(a).roundScore});
  return mlist; 
}

function finalRound(){
  io.emit("deathmatch", "");
  finalRoundScores.set(bracket[0][0], 0);
  finalRoundScores.set(bracket[0][1], 0);
}

function sumFinalScores(id, score){
  let barScore = 0; 
  let teamLeader = playerMap.get(id).teamLeader; 
  if (teamLeader !== null){
    let tempscore = finalRoundScores.get(teamLeader);
    tempscore = tempscore + score;
    finalRoundScores.set(teamLeader, tempscore)
  }
  else{
    let tempscore = finalRoundScores.get(id)
    tempscore = tempscore + score;
    finalRoundScores.set(id, tempscore)
  }
  barScore = finalRoundScores.get(bracket[0][0]) - finalRoundScores.get(bracket[0][1]); 
  // if (barScore <= -500){
  // }
  console.log("barscore:" + barScore); 
  io.emit("update-bar", barScore);
  
}

