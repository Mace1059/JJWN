var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);


var socket = io();






function createGame(){
      socket.emit('HOST1', "create");
      document.getElementById('createGame').style.display = 'none';
      document.getElementById('startGame').style.display = 'block';

}

//1
function startGame(){
    socket.emit('START', "start");
    document.getElementById('startGameDisplay').style.display = 'none';
}  


socket.on('HOST1', function(pname) {
    document.getElementById('newNameList').innerHTML = pname;
    console.log("Host received " + pname)
});