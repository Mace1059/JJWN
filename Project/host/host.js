var socket = io();


function createGame(){
    console.log(socket.id)

    var pin = Math.floor(1000 + Math.random() * 9000);


    socket.emit('create-game', "create");
    $('.createGameDisplay').hide();

    pinMessage = $('.gamePin').text();
    pinMessage = pinMessage + " " + pin;
    $('.gamePin').text(pinMessage).show();
    $('.loading').text("Waiting for Players");
    $('.startGame').show();
}


$(document).ready(function(){
    console.log("THIS IS WORKING")
});


function startGame(){
    socket.emit('START', '');
    $('header').hide();
    $(".createGameDisplay").remove();
    $(".nameList").remove();

}  


socket.on('name-submit', function(pname) {
    $('.nameList').append('<div class="nameElement">'+ pname +'</div>').show('slow');

    console.log("Host received " + pname)
});

socket.on('leaderboard', function(array) {
    console.log(array);
    $("body").append('<ol class="leaderboard">Leaderboard</ol>')
    for (let i = 0; i < array.length; i++) {
        $(".leaderboard").append('<li><div>class="leaderboardElement">' + array[i] +'</div></li>')
    }
});


  