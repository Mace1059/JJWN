var currentPlayer = "";
var score = 0;
var correct = true;
var answer = null;
const question = {q:'What is 4+3', a1:6, a2:2, a3:5, a4:7, correct: 4};
var playerAmount = 10
var time = 20;


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

  return array;
}

function chooseName(){
    var name = document.getElementById("nameEntryBox").value;
    if (name == ''){
      return
    }
    else {
      // Figure out how to append instead of replacing element
      document.getElementById('nameDisplay').innerHTML = "Name: " + name;
      updateTimer()
    }
    // const para = document.createElement('p');
    // para.textContent = name;
    // document.body.appendChild(para);
    playerAmount += 1
    newPlayer = new Player(name, currentId);
    currentId++;
    playerList.push(newPlayer);

}
  
// Returns true if chosen answer is the correct one, false otherwise
function checkAnswer(chosen, correct) {
  //More efficient way of doing this would be to make the parameters "Question" and "chosen" and then
  //have a global map of questions and their answers so we could compare in this method.
  return (chosen == correct)
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

function Player(name, id)
{
  this.pName = name;
  this.id = id;
  this.score = 0;
  this.rank = 1;
  this.questionsCorrect = 0;
};

function getName(player)
{
  currentPlayer = player.pName;

}



function answerSubmit(int){
  answer = int;
  document.getElementById('answer1').style.visibility = "hidden";
  document.getElementById('answer2').style.visibility = "hidden";
  document.getElementById('answer3').style.visibility = "hidden";
  document.getElementById('answer4').style.visibility = "hidden";
  answerRevealed()

}

function answerRevealed(){

  document.getElementById('message').style.display = 'block';
  if (correct == true){
    document.getElementById('message').innerHTML = "Correct! Nice cock!";
    score += 100
  }
  else {
    document.getElementById('message').innerHTML = "Incorrect! You suck!";
  }
  document.getElementById('message').style.visibility = "visible";
  document.getElementById('nextQuestion').style.visibility = "visible"; 
  document.getElementById('scoreDisplay').innerHTML = "Score: " + score;
 
}

function nextQuestion() {
  var answerList = [question.a1, question.a2, question.a3, question.a4];

  document.getElementById('answer1').style.visibility = "visible";
  document.getElementById('answer2').style.visibility = "visible";
  document.getElementById('answer3').style.visibility = "visible";
  document.getElementById('answer4').style.visibility = "visible";
  document.getElementById('message').style.display = "none";

  var shuffledAnswerList = shuffle(answerList)  

  document.getElementById('questionDisplay').innerHTML = question.q;
  document.getElementById('answer1').innerHTML = shuffledAnswerList[0];
  document.getElementById('answer2').innerHTML = shuffledAnswerList[1];
  document.getElementById('answer3').innerHTML = shuffledAnswerList[2];
  document.getElementById('answer4').innerHTML = shuffledAnswerList[3];
  
}

function updateTimer(){
  time = 20;
  timer = setInterval(function(){
      time -= 1;
      document.getElementById('timerDisplay').textContent = "Time Remaining: " + time;
    
      if(time == 0){
        
      }
  }, 1000);
}


function sortList(){

}


function scoreboard() {
  for (let i = 0; i < playerAmount; i++) {
    document.getElementById('scoreboard').innerHTML += '/n' + i+"th";
    console.log('yuh')
  }
}