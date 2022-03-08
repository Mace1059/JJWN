var pname = null;
var correct = true;
const SPEED_SCORE = 200;
const SCORE = 300;
var timer;
var startScoreTimer;
var startBar;
var startSimulate;
var roundScore = 0;
var totalScore = 0;
var questionScore = 0;
const question = {q:'What is 4+3', a1:6, a2:2, a3:5, a4:7, correct: 4};
var TIME = 5;
var index;
var questionsCorrect = 0;
var questionsAnswered = 0;

var finalRoundScoreLeft = 1;
var finalRoundScoreRight = 1;

var finalRound = false;

//=====================================================================================

// Player class for name/score, used in playerMap with name as key
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

//create 
const playerMap = new Map();
var winnerPlayerMap = new Map();

playerMap.set('name1', new Player('name1', 100));
// playerMap.set('name2', new Player('name2', 200));
// playerMap.set('name3', new Player('name3', 300));
// playerMap.set('name4', new Player('name4', 400));
// playerMap.set('name5', new Player('name5', 500));
// playerMap.set('name6', new Player('name6', 600));
// playerMap.set('name7', new Player('name7', 700));
// playerMap.set('name8', new Player('name8', 100));
// playerMap.set('name9', new Player('name9', 200));
// playerMap.set('name10', new Player('name10', 300));
// playerMap.set('name11', new Player('name11', 400));
// playerMap.set('name12', new Player('name12', 500));
// playerMap.set('name13', new Player('name13', 600));
// playerMap.set('name14', new Player('name14', 600));
// playerMap.set('name15', new Player('name15', 600));


// Sort players still in contention by their score, returns list of names in order by score
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
  
  // even number of players in winnerList
  if (tp % 2 === 0) {
    while(i < j) {
      var matchup = [mlist[i], mlist[j]]

      mbracket.push(matchup);

      // mbracket[i] = new Array(mlist[i], mlist[j]); // make each element an array
      i += 1
      j -= 1
    }
  }
  //odd number of players in winnerList
  else if (tp % 2 === 1) {
    max = j-1
    min = i+1
    oddPlayer = Math.floor(Math.random() * (max - min + 1) + min)
    var matchup = [mlist[i], mlist[oddPlayer], mlist[j]]
    mbracket.push(matchup); // make each element an array
    mlist.splice(oddPlayer, 1)
    i += 1
    j -= 2
    while(i < j){
      mbracket[i] = new Array(mlist[i], mlist[j]); // make each element an array
      i += 1
      j -= 1
    }
  }
  return mbracket
}


//=====================================================================================


// utility function to randomly shuffle array
// used in code to randomize location of 
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];

  }
  //Iterate through list to find which one matches answer
  // Keep track of the "correct" index in the array with index variable
  // See button section for more comments
  for (let i = 0; i < array.length; i++) {
    if (question.correct == 1) {
      if (array[i] == question.a1) {
        index = i;
      }
    } else if (question.correct == 2) {
      if (array[i] == question.a2){
        index = i;
      }
    } else if (question.correct == 3) {
      if (array[i] == question.a3) {
        index = i;
      }
    } else if (question.correct == 4) {
      if (array[i] == question.a4) {
        index = i;
      }
    }
  }
  return array;
}

  
// Returns true if chosen answer is the correct one, false otherwise
function checkAnswer(int, index) {
  return (int == index); // correct is boolean, need index of right answer
}


function speedScoreTimer(){
  speedScore = SPEED_SCORE;
  questionScore = SCORE;
    startScoreTimer = setInterval(function(){
      speedScore = speedScore - 1;
      questionScore = SCORE + speedScore
      if(speedScore <= 0){
        clearInterval(startScoreTimer)   
      }      
    }, 50);
}


function updateTimer(int){
  showQuestion();

  time = int;
  bar(time)
  timer = setInterval(function(){
      time -= 1;
      document.getElementById('timerDisplay').textContent = time;
      if(time <= 0){
        clearInterval(startScoreTimer)
        clearInterval(timer)
        
        if (finalRound){
          finishGame();
        }
        else {
          determineWinner(bracket);
          console.log(winnerPlayerMap)
        }
      }
  }, 1000);
}

function bar(mtime) {
  clearInterval(startBar);
  var width = 1000;
  startBar = setInterval(frame, 10);
  function frame() {
    console.log('test')
    if (width >= 100) {
      console.log('pussy')
      clearInterval(startBar);
    } else {
      width = width + (1/mtime); 
      document.getElementById("timerBar").style.width = width + '%'; 
    }
  }
}

// function checkBar(){
//   if barwidth ? 
// }

function chooseName(){
  pname = document.getElementById("nameEntryBox").value;
  if (pname == ''){
    return
  }
  else {
    playerMap.set(pname, new Player(pname, 0))
    document.getElementById('nameEntryDisplay').style.display = "none";
    // document.getElementById('nameDisplay').innerHTML = "Name: " + pname;
    matchmaking(playerMap);
  }

}

// use bracket to select highest score
function determineWinner(mlist){
  //create empty winnerPlayerMap and fill after every round
  winnerPlayerMap = new Map();

  //iterate through bracket
  for (let i = 0; i < mlist.length; i++) {
    var p1 = mlist[i][0];
    var p2 = mlist[i][1];
    var s1 = playerMap.get(p1).score;
    var s2 = playerMap.get(p2).score;
    if (s1 > s2){
      winnerPlayerMap.set(p1, playerMap.get(p1));
    }
    else {
      winnerPlayerMap.set(p2, playerMap.get(p2));
    }
  }
  console.log(winnerPlayerMap.size)  
  matchmaking(winnerPlayerMap);
}

//change width of rectangle in final bar based on 
function fillRectangleFunction(int){
  var canvas = document.getElementById("finalBar");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FFD700";
  if (int===0){
    middle = canvas.width/2
    barwidth = middle
  }
  else {
    barwidth += int;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, barwidth, canvas.height);
}

function simulateFinalRound(){
  startSimulate = setInterval(function(){
    int = -2
    fillRectangleFunction(int)
  }, 1000);
}

function finishGame(){
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameDisplay').style.display = "none";
}


function matchmaking(pmap){
  //add score of round to total score, reset round score
  totalScore += roundScore;
  roundScore = 0; 

  //create ranked bracket
  var sortedScores = sortPlayersByScore(pmap);
  bracket = bracketGenerator(sortedScores);
  console.log(bracket)



  let name1 = bracket[0][0];
  let name2 = bracket[0][1];

  document.getElementById('matchmakingMessage').innerHTML = name1 + " (" + (sortedScores.indexOf(name1)+1) + ") vs " + name2 + " (" + (sortedScores.indexOf(name2)+1) + ")";
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameDisplay').style.display = "none";
  document.getElementById('matchmakingDisplay').style.display = "block"; 

  var size = pmap.size;
  if (size > 3){
    bar(5)
    setTimeout(function() { updateTimer(TIME); }, 5000)
  }
  else {
    finalRound = true;
    fillRectangleFunction(0)
    document.getElementById('finalBar').style.display = "block"; 
    setTimeout(function() { updateTimer(TIME*2)}, 5000);
    setTimeout(function() { simulateFinalRound()}, 5000);


  }
}

// called by answer buttons
// reveals message and "Next Question" button
function answerSubmit(int){
  clearInterval(startScoreTimer)
  correct = checkAnswer(int - 1, index);

  // test if final round, if so, skip next question screen and show new question
  if (finalRound) {
    if (correct == true) {
      console.log(finalRoundScore)
      fillRectangleFunction(finalRoundScore)
    }
    showQuestion()
  }
  else {
    //Checks to see if answer index matches correct index
    document.getElementById('revealDisplay').style.display = "block";  
    document.getElementById('questionButtons').style.display = "none";
    document.getElementById('message').style.display = 'block';
    document.getElementById('questionDisplay').style.display = "none";

    
    if (correct == true){
      questionsCorrect += 1
      roundScore += questionScore;
    
      document.getElementById('message').innerHTML = "Correct! +" + questionScore;
    } else
      document.getElementById('message').innerHTML = "Incorrect";
    
      questionsAnswered += 1
      playerMap.get(pname).setScore(roundScore)
      document.getElementById('scoreDisplay').innerHTML = roundScore;
      document.getElementById('questionCorrectTotalDisplay').innerHTML = questionsCorrect + "/" + questionsAnswered;
      // " (" + Math.round(questionsCorrect/questionsAnswered * 100) + "%)";
  }
}

// function to show first/next question on "Next Question" button press
function showQuestion() {
  var answerList = [question.a1, question.a2, question.a3, question.a4];
  var shuffledAnswerList = shuffle(answerList)
  
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameDisplay').style.display = "block";
  document.getElementById('questionButtons').style.display = "block";
  document.getElementById('message').style.display = "none";
  document.getElementById('questionDisplay').style.display = "block";

  document.getElementById('scoreDisplay').innerHTML = roundScore;

  //fill question and answer boxes
  document.getElementById('questionDisplay').innerHTML = question.q;
  document.getElementById('answer1').innerHTML = shuffledAnswerList[0];
  document.getElementById('answer2').innerHTML = shuffledAnswerList[1];
  document.getElementById('answer3').innerHTML = shuffledAnswerList[2];
  document.getElementById('answer4').innerHTML = shuffledAnswerList[3];
  
  speedScoreTimer()
}






// random will nonsense
function willFunction() {
  var order = document.getElementById("menuSelection").value;
  let hiddenMenu = ['beeschurger', 'big chungo', 'toes', 'sturdy'];
  if (hiddenMenu.includes(order)) {
    alert('dw bout it dawg we shlanging out some mf ' + order);
  } else {
    alert('mf that is not on the hidden menu');
  }
}
