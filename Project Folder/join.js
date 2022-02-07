function chooseName(){
    var name = document.getElementById("nameEntryBox").value;
    if (name == ''){
      return
    }
    else {
      // Figure out how to append instead of replacing element
      document.getElementById('nameDisplay').innerHTML = "Name: " + name;
    }
}

function chooseID(){
    var id = document.getElementById("IDEntryBox").value;
    if (id == ''){
      return
    }
    else {
      // Figure out how to append instead of replacing element
      document.getElementById('IDDisplay').innerHTML = "ID: " + id;
    }
}
