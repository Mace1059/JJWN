let questionList = [];
//setting question number @ 1
var questionNumber = 1;
//blank question for comparing
// let blankList = [];
// const blankQuestion = {q:'', a1:'', a2:'', a3:'', a4:'', correct:blankList};


function addQuestion() {
    var ques = document.getElementById("question").value;
    var ans1 = document.getElementById("answer1").value;
    var ans2 = document.getElementById("answer2").value;
    var ans3 = document.getElementById("answer3").value;
    var ans4 = document.getElementById("answer4").value;
    var ans1True = document.getElementById("a1").checked;
    var ans2True = document.getElementById("a2").checked;
    var ans3True = document.getElementById("a3").checked;
    var ans4True = document.getElementById("a4").checked;
    let correctList = [];
    if (ans1True==true){
        correctList.push("a1");
    }
    if (ans2True==true){
        correctList.push("a2");
    }
    if (ans3True==true){
        correctList.push("a3");
    }
    if (ans4True==true){
        correctList.push("a4");
    }
    const fullQuestion = {q:ques, a1:ans1, a2:ans2, a3: ans3, a4:ans4, correct:correctList};
    console.log(fullQuestion);

    questionList[questionNumber - 1] = fullQuestion;
    console.log(questionList);
}

function loadQuestion() {
    if (questionList[questionNumber - 1] == null){
        document.getElementById("question").value = null;
        document.getElementById("answer1").value = null;
        document.getElementById("answer2").value = null;
        document.getElementById("answer3").value = null;
        document.getElementById("answer4").value = null;
        document.getElementById("a1").checked = false;
        document.getElementById("a2").checked = false;
        document.getElementById("a3").checked = false;
        document.getElementById("a4").checked = false;
    } else {
        document.getElementById("question").value = questionList[questionNumber - 1].q;
        document.getElementById("answer1").value = questionList[questionNumber - 1].a1;
        document.getElementById("answer2").value = questionList[questionNumber - 1].a2;
        document.getElementById("answer3").value = questionList[questionNumber - 1].a3;
        document.getElementById("answer4").value = questionList[questionNumber - 1].a4;
        if (questionList[questionNumber - 1].correct.includes("a1")) {
            document.getElementById("a1").checked = true;
        } else {
            document.getElementById("a1").checked = false;
        }
        if (questionList[questionNumber - 1].correct.includes("a2")) {
            document.getElementById("a2").checked = true;
        } else {
            document.getElementById("a2").checked = false;
        }
        if (questionList[questionNumber - 1].correct.includes("a3")) {
            document.getElementById("a3").checked = true;
        } else {
            document.getElementById("a3").checked = false;
        }
        if (questionList[questionNumber - 1].correct.includes("a4")) {
            document.getElementById("a4").checked = true;
        } else {
            document.getElementById("a4").checked = false;
        }
    }
}

function prevQuestion() {
    if (questionNumber > 1) {
        addQuestion();


        questionNumber -= 1;
        document.getElementById("questionNumber").innerHTML = "Question " + questionNumber;

        loadQuestion();
    }
}

function nextQuestion() {

    addQuestion();


    questionNumber += 1;
    document.getElementById("questionNumber").innerHTML = "Question " + questionNumber;

    loadQuestion();
}

function saveList() {
    //add code here to check if any questions are empty before saving
}

//probably want to add functions that add a new blank question and
//remove a question