let playerList = []
var PlayerCount = 0
var Questions = 0;
var TimeRemaining = 0;
var currentId = 0;
var currentPlayer = "";
var score = 0;
var correct = true;


function chooseName(){
    var name = document.getElementById("nameEntryBox").value;
    if (name == ''){
      return
    }
    else {
      // Figure out how to append instead of replacing element
      document.getElementById('nameDisplay').innerHTML = "Name: " + name;
    }
    // const para = document.createElement('p');
    // para.textContent = name;
    // document.body.appendChild(para);
    
    newPlayer = new Player(name, currentId);
    currentId++;
    playerList.push(newPlayer);
}
  
function myFunction() {
  alert("let's get sturdy");
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
  document.getElementById('answer1').style.visibility = "hidden";
  document.getElementById('answer2').style.visibility = "hidden";
  document.getElementById('answer3').style.visibility = "hidden";
  document.getElementById('answer4').style.visibility = "hidden";
  answerRevealed()
}

function answerRevealed(){
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
  document.getElementById('answer1').style.visibility = "visible";
  document.getElementById('answer2').style.visibility = "visible";
  document.getElementById('answer3').style.visibility = "visible";
  document.getElementById('answer4').style.visibility = "visible";
  document.getElementById('message').style.visibility = "hidden";
}

