var socket = io();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 100;
canvas.height = 600;

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;


// ctx.fillRect(0, 10, 100, 100)
let painting = false;

function startPosition() {
    painting=true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

}
function finishedPosition() {
    painting=false;
}


function draw(e){
    if (!painting) return;
    console.log(e.clientX, e.clientY);
    ctx.lineWidth = 10;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}
canvas.addEventListener('mousedown', startPosition)
canvas.addEventListener('mouseup', finishedPosition)
canvas.addEventListener('mousemove', draw)




console.log("test")




function chooseName(){

  console.log("you have chosen a name")
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
    socket.emit('join', name);
  }
}

//3
socket.on('host-started-game', function(msg) {
  window.location.href = '/game' + "?id=" + socket.id;;
});


