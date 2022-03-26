var socket = io();

// var form = document.getElementById('form');
// var input = document.getElementById('input');

// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit('HOST1', input.value);
//     input.value = '';
//   }
// });

function createGame(){
      socket.emit('HOST1', "start");
}



socket.on('HOST1', function(msg) {
    document.getElementById('newName').innerHTML = msg;
    console.log("Host received " + msg)


});