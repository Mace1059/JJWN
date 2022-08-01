var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

function test(){
    console.log("you have received opponents")
    console.log(data)
    matchupBox("mbox1", "blue")
    matchupBox("mbox2", "black")
    $(".mbox1").animate({
    right: '100%'
    });
    $(".mbox2").animate({
    left: '50%'
    });
}
    // matchupBox(pname, "black");

