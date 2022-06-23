var socket = io();

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
const FINAL_ROUND_BASE_SCORE = 20; 


const myURL = new URL(window.location.href);

var id = myURL.searchParams.get('id'); // =  8Dyu81KnunhEnDUUAAAB in this example
console.log("id=" + id)



//4
socket.on('connect', function() {
  removeMatchupBox = true;
  // matchupBox('JV is', "black");
  // matchupBox('small', "blue");
  // newElement('div', 'vs', 'vs', 'vs');
  console.log("id2=" + id)
  socket.emit('player-join-game', id)
});


socket.on('update-timer', function(data) {
  updateTimer(data);
});

socket.on('timer-end', function(data) {
  clearInterval(timer);
  console.log("TIMER ENDED")
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameBox').style.display = "none";
});

socket.on('opponents-ready', function(data) {
  console.log("you have received opponents")
  console.log(data)
  // matchupBox(pname, "black");
});

socket.on('deathmatch', function(data) {
  finalRound = true;
  fillRectangleFunction(0)
  document.getElementById('finalBar').style.display = "block"; 
  setTimeout(function() { updateTimer(TIME*2)}, 5000);
  setTimeout(function() { simulateFinalRound()}, 5000);
});

socket.on('update-bar', function(data) {
  fillRectangleFunction(data);
});


  //temporary

  // document.getElementById('mb').remove();  
  // document.getElementById('mb').remove();  
  // document.getElementById('vs').remove(); 

  // setTimeout(function() { showQuestion()}, 2000);






//=====================================================================================


function newElement(type, mclass, mid, mcontent) {
  var e = document.createElement('div');
  document.body.appendChild(e);
  e.textContent = mcontent;
  e.setAttribute('class', mclass);
  e.setAttribute("id", mid);
  console.log(e)
  console.log(type, mclass, mid, mcontent)

  return e;
}


function matchupBox(name, color){
  e = newElement('div', 'matchupBox', 'mb', name)
  e.addEventListener("animationend", listener, false);
  e.style.background = color;
}

function listener(event) {
  switch(event.type) {
    case "animationstart":
      break;
    case "animationend":
      console.log("an animation ended")
      break;
    case "animationiteration":
      break;
  }
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
      clearInterval(startBar);
    } else {
      width = width + (1/mtime); 
      document.getElementById("timerBar").style.width = width + '%'; 
    }
  }
}



//change width of rectangle in final bar based on 
function fillRectangleFunction(int){
  var canvas = document.getElementById("finalBar");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FFD700";
  
  middle = canvas.width/2
  barwidth = middle + int;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, barwidth, canvas.height);
}

// function simulateFinalRound(){
//   startSimulate = setInterval(function(){
//     int = -2
//     fillRectangleFunction(int)
//   }, 1000);
// }

function finishGame(){
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameBox').style.display = "none";
}


// if (size > 3){
  //   bar(5)
  //   setTimeout(function() { updateTimer(TIME); }, 5000)
  // }
  // else {
  //   finalRound = true;
  //   fillRectangleFunction(0)
  //   document.getElementById('finalBar').style.display = "block"; 
  //   setTimeout(function() { updateTimer(TIME*2)}, 5000);
  //   setTimeout(function() { simulateFinalRound()}, 5000);



// Returns true if chosen answer is the correct one, false otherwise
function checkAnswer(int, index) {
  return (int == index); // correct is boolean, need index of right answer
}

// called by answer buttons
// reveals message and "Next Question" button
function answerSubmit(int){
  clearInterval(startScoreTimer)
  correct = checkAnswer(int - 1, index);

  // test if final round, if so, skip next question screen and show new question
  if (finalRound) {
    if (correct == true) {
      socket.emit("update-final-score", FINAL_ROUND_BASE_SCORE)
    }
    showQuestion()
  }
  else {
    document.getElementById('revealDisplay').style.display = "block";  
    document.getElementById('gameBox').style.display = "none";

    //Checks to see if answer index matches correct index    
    if (correct == true){
      questionsCorrect += 1
      roundScore += questionScore;
      socket.emit('update-score', roundScore)

      document.getElementById('message').innerHTML = "Correct! +" + questionScore;
    } else
      document.getElementById('message').innerHTML = "Incorrect";
    
      questionsAnswered += 1
      document.getElementById('scoreDisplay').innerHTML = roundScore;
      document.getElementById('questionCorrectTotalDisplay').innerHTML = questionsCorrect + "/" + questionsAnswered;
      // " (" + Math.round(questionsCorrect/questionsAnswered * 100) + "%)";
  }
}

// function to show first/next question on "Next Question" button press
function showQuestion() {
  // remove elements here!!!!
  // if (removeMatchupBox) {
  //   document.getElementById('mb').remove();  
  //   document.getElementById('mb').remove();  
  //   document.getElementById('vs').remove();
  //   removeMatchupBox = false;
  // }
  

  var answerList = [question.a1, question.a2, question.a3, question.a4];
  var shuffledAnswerList = shuffle(answerList)
  
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameBox').style.display = "block";

  // document.getElementById('questionButtons').style.display = "block";


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
