document.addEventListener('DOMContentLoaded', () => {
    function createParagraph() {
      const para = document.createElement('p');
      para.textContent = 'You clicked the button!';
      document.body.appendChild(para);
    }

    const buttons = document.querySelectorAll('button');

    for (const button of buttons) {
      button.addEventListener('click', createParagraph);
    }
  
function myFunction() {
  alert("let's get sturdy");
}


});

document.addEventListener('DOMContentLoaded', () => {
  function createParagraph() {
    const para = document.createElement('p');
    para.textContent = 'ayo shawty you clicked the button!';
    document.body.appendChild(para);
  }

  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    button.addEventListener('click', createParagraph);
  }

function willFunction() {
  alert("we out here");
}


});
