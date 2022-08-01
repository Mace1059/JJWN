var socket = io();


var pname = null;
var correct = true;
const SPEED_SCORE = 200;
const SCORE = 300;
var timer;
var startScoreTimer;
var roundScore = 0;
var totalScore = 0;
var questionScore = 0;
const question = {q:'What is 4+3', a1:6, a2:2, a3:5, a4:7, correct: 4};
var TIME = 20;
var time;
var index;
var questionsCorrect = 0;
var questionsAnswered = 0;
var streak = 0;
var STREAKING_BONUS = 300;


var finalRoundScoreLeft = 1;
var finalRoundScoreRight = 1;

var finalRound = false;
const FINAL_ROUND_BASE_SCORE = 20; 


const myURL = new URL(window.location.href);

var id = myURL.searchParams.get('id'); // =  8Dyu81KnunhEnDUUAAAB in this example
console.log("id=" + id)

//===============================================================








//4
socket.on('connect', function() {
  console.log("id2=" + id)
  socket.emit('player-join-game', id)
});

socket.on('opponents-ready', function(data) {
  // matchupBox("mbox1", "blue")
  // matchupBox("mbox2", "black")
  $(".mbox").show();
  
  $(".mbox1").css({backgroundColor: "green"}).text("JV SMELLS LIKE");
  $(".mbox2").css({backgroundColor: "red"}).text("SHIT OMFG");
  
  $(".mbox1").animate({left: '+=60%'}, 500, "swing");
  $(".vs").delay(500).show();

  $(".mbox2").delay(1000).animate({left: '-=60%'}, 500, "swing");
  
});

socket.on('update-timer', function(data) {
  $(".mbox1").hide();
  $(".vs").hide();
  $(".mbox2").hide();
  updateTimer(data);
});

socket.on('timer-end', function(data) {
  clearInterval(timer);
  console.log("TIMER ENDED")
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameBox').style.display = "none";
});



socket.on('deathmatch', function(data) {
  finalRound = true;
  $(":header").animate({"background-color": "maroon"});
  $('#finalBar').show().css({animation: ""}).css({animation: 'scale 1s forwards'});
  fillRectangleFunction(0);
  setTimeout(function() { updateTimer(TIME*2)}, 5000);
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



//=====================================================================================


// utility function to randomly shuffle array
// used in code to randomize location of 
function shuffleQ(array) {
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

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
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


function updateTimer(mtime){
  console.log("time:" + mtime);
  barTime = mtime * 1000;
  $('.timerBar').animate({width: '0%', backgroundColor: "red"}, barTime, "linear", function () { $(this).removeAttr('style'); });
  showQuestion();
  timer = setInterval(function(){
      mtime -= 1;
      time = mtime;
      $('#timerDisplay').text(mtime)
      if(mtime <= 0){
        clearInterval(startScoreTimer)
        clearInterval(timer)
      }
  }, 1000);
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


function finishGame(){
  document.getElementById('revealDisplay').style.display = "none";  
  document.getElementById('gameBox').style.display = "none";
}


// Returns true if chosen answer is the correct one, false otherwise
function checkAnswer(int, index) {
  return (int == index); // correct is boolean, need index of right answer
}

// called by answer buttons
// reveals message and "Next Question" button
function answerSubmit(int){

  var audio = new Audio('../Audio/pop2.wav');
  audio.volume = 0.5;
  audio.play();

  clearInterval(startScoreTimer)
  correct = checkAnswer(int - 1, index);

  // test if final round, if so, skip next question screen and show new question
  if (finalRound) {
    if (correct) {
      socket.emit("update-final-score", FINAL_ROUND_BASE_SCORE)
    }
    showQuestion()
  }
  else {
    document.getElementById('revealDisplay').style.display = "block";  
    document.getElementById('gameBox').style.display = "none";

  //Checks to see if answer index matches correct index    
  if (correct == true){
    streak += 1;
    //check if streaking
    if (streak >= 3){
      questionScore += STREAKING_BONUS;
      $('.answerButton').addClass("streakBorder");  
      $('#scoreDisplay').html(roundScore + ' <i class="fa fa-fire fire"></i>')

    } else{
      $('.answerButton').removeClass("streakBorder");  
      $('#scoreDisplay').text(roundScore);
    }



    questionsCorrect += 1;
    roundScore += questionScore;
    

    socket.emit('update-score', roundScore);
    $(".answerMessage").text("Correct!" + "+" + questionScore);

  } else {
    $('.answerButton').removeClass("streakBorder");  
    $('#scoreDisplay').text(roundScore);
    streak = 0;
    $(".answerMessage").text("Incorrect!");    
  }


  
  questionsAnswered += 1  
  document.getElementById('questionCorrectTotalDisplay').innerHTML = questionsCorrect + "/" + questionsAnswered;
}
}

// function to show first/next question on "Next Question" button press
function showQuestion() {


  var answerList = [question.a1, question.a2, question.a3, question.a4];
  var shuffledAnswerList = shuffleQ(answerList)
  
  // document.getElementById('revealDisplay').style.display = "none";  
  // document.getElementById('gameBox').style.display = "block";
  $('#revealDisplay').hide();
  $('#gameBox').show();

  // document.getElementById('scoreDisplay').innerHTML = roundScore;

  //fill question and answer boxes


  $(".questionDisplay").text(question.q);
  $(".questionDisplay").stop(true, true).css({fontSize:'1px'}).animate({fontSize: '+=40px'}, 400, "swing").animate({fontSize: '-=10%'}, 200, "swing");

  colorList = ["orangered", "gold", "deepskyblue", "rebeccapurple"];
  shuffledColorList = shuffle(colorList);

  $('.a1').css({backgroundColor: shuffledColorList[0]})
  $('.a2').css({backgroundColor: shuffledColorList[0]})
  $('.a3').css({backgroundColor: shuffledColorList[0]})
  $('.a4').css({backgroundColor: shuffledColorList[0]})


  $('.a1').css({backgroundColor: shuffledColorList[0]}).text(shuffledAnswerList[0]);
  $('.a2').css({backgroundColor: shuffledColorList[1]}).text(shuffledAnswerList[1]);
  $('.a3').css({backgroundColor: shuffledColorList[2]}).text(shuffledAnswerList[2]);
  $('.a4').css({backgroundColor: shuffledColorList[3]}).text(shuffledAnswerList[3]);

  // $('.answerButton').effect("scale",{},3000);
  
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
