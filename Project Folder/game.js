// document.addEventListener('DOMContentLoaded', () => {
// const buttons = document.querySelectorAll('button');

// for (const button of buttons) {
//   button.addEventListener('click', chooseName);
// }


let playerList = []
var PlayerCount = 0
var Questions = 0;
var TimeRemaining = 0;
var currentId = 0;
var currentPlayer = "";

function chooseName(){
    var name = document.getElementById("nameEntryBox").value;
    const para = document.createElement('p');
    para.textContent = 'Your name is ' + name;
    document.body.appendChild(para);
    
    newPlayer = new Player(name, currentId);
    currentId++;
    playerList.push(newPlayer);
}

// function createParagraph() {
//     const para = document.createElement('p');
//     para.textContent = 'You clicked the button!';
//     document.body.appendChild(para);
// }


  
function myFunction() {
  alert("let's get sturdy");
} 

// Returns true if chosen answer is the correct one, false otherwise
function checkAnswer(chosen, correct) {
  //More efficient way of doing this would be to make the parameters "Question" and "chosen" and then
  //have a global map of questions and their answers so we could compare in this method.
  return (chosen == correct)
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