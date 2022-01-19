// document.addEventListener('DOMContentLoaded', () => {
// const buttons = document.querySelectorAll('button');

// for (const button of buttons) {
//   button.addEventListener('click', chooseName);
// }


let playerList = ['player1', 'player2', 'player3']
var PlayerCount = 0
var Questions = 0;
var TimeRemaining = 0;

function chooseName(){
    var name = document.getElementById("nameEntryBox").value;
    const para = document.createElement('p');
    para.textContent = 'Your name is ' + name;
    document.body.appendChild(para);
}




// function createParagraph() {
//     const para = document.createElement('p');
//     para.textContent = 'You clicked the button!';
//     document.body.appendChild(para);
// }


  
function myFunction() {
  alert("let's get sturdy");
}


});
