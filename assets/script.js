var countSec = 60;
var howLongToWait = 1000;
localStorage.setItem("initials", "highScore");
var formEl = document.querySelector("#submit-form");
var startQuizEl = document.getElementById("start-quiz");
var frontPageEl = document.getElementById("front-page");

var questionCount = 0;
var allAnswersEl;
var questionDisplayEl = document.querySelector(".question-display");
var rightOrWrongEl = document.createElement("span");
 
var endQuizEl = document.querySelector("#end-quiz");
endQuizEl.className="hidden";

// var header = $("<header>").addClass("header");
// var timer = $("<p>")
//       .text(countSec);
// header.append(timer);
// $(this).append(header);
// why didn't this work???

var timer = document.createElement("p");
document.querySelector("header").appendChild(timer);

// timer, with 60 seconds
function finishedTimer() {
    // alert(countSec);
    timer.innerText = "Time: " + countSec;
    if (questionCount === questionList.length) {
        return;
    }
    countSec--;
    if (countSec < 0) {
        return;
    }
    // if() needs to stop changing countSec when the quiz ends
    setTimeout(finishedTimer, howLongToWait);
}

// creates an array, with 6 objects and 3 attributes each--question, answers, and correctanswer
var questionList = [
    {
        question: "Inside which HTML element do we put the javascript?",
        answers: {
            a: "<script>",
            b: "<head>",
            c: "<body>",
            d: "<link>"
        },
        correctAnswer: "a"
    },
    {
        question: "What would the following javascript declaration evaluate to: isNaN(\"5\")?",
        answers: {
            a: "true",
            b: "false",
            c: 5,
            d: '"5"'
        },
        correctAnswer: "b"
    },
    {
        question: "Which of the following is NOT a valid type in Javascript?",
        answers: {
            a: "Boolean",
            b: "String",
            c: "Function",
            d: "Null"
        },
        correctAnswer: "c"
    },
    {
        question: "How do you stop an interval timer in Javascript?",
        answers: {
            a: "clearInterval",
            b: "return",
            c: "intervalDone",
            d: "clearTimer"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is not a valid JavaScript variable name?",
        answers: {
            a: "_here_I_am",
            b: "CurtainElf",
            c: "money.mind",
            d: "vArIaBlE"
        },
        correctAnswer: "c"
    },
    {
        question: "Do you need a .js file to run Javascript through HTML?",
        answers: {
            a: "Yes",
            b: "No",
            c: "Yes, if you have a .css file",
            d: "It depends"
        },
        correctAnswer: "b"
    },
]

var displayQuestion = function (questionObj) {
    var questionAskedEl = document.querySelector(".question-asked");
    var possibleAnswersEl = document.querySelector(".possible-answers");

    // while loop that clears out previous answers.
    while (possibleAnswersEl.firstChild) {
        possibleAnswersEl.removeChild(possibleAnswersEl.lastChild);
    }

    // create elements that hold question, and then each answer. 
    questionAskedEl.innerText = questionObj.question;
    var answerKeys = Object.keys(questionObj.answers) // ['a','b','c','d']
    // questionObj['answers']

    // loops through and creates answer elements in HTML 
    for (var i = 0; i < answerKeys.length; i++) {
        const answerKey = answerKeys[i]; //A, B, C, D
        const answerItem = questionObj.answers[answerKey]; //WORDS
        var answerEl = document.createElement("li");
        answerEl.innerText = answerItem;
        answerEl.className = "answer-choice";

        answerEl.setAttribute("data-question-id", questionCount);
        answerEl.setAttribute("data-answer-id", answerKey);

        possibleAnswersEl.appendChild(answerEl);
    }
    var allAnswersEl = document.querySelector(".possible-answers");
    allAnswersEl.addEventListener("click", answerSelectionHandler);

    // then, add buttons to each answer. For loop?
    // also add class to it--one for all those that are TRUE, and one for FALSE

    // check if element is clicked, and when it is clicked, 
    // display according to class if right and wrong
    // specify on bottom of page
    // if wrong, deduct 5 from countSec
    // immediately "delete" the last question
    // ???? how do I do this? In kanban version,
    // you could delete the tasks from the array. 

    // then the displayQuestion function has ended, and you return to 
    // the for loop, which tests to see if your time is up or not
    // if it is up, tells you the time (your score) and takes intials
    // to save as object in local storage
};


var answerSelectionHandler = function (event) {
    var targetEl = event.target;
    var questionIndex = targetEl.dataset.questionId; //should be the same as questionCount, number of question ID
    var answerIndex = targetEl.dataset.answerId; //should be correct answer letter.
    rightOrWrongEl.innerText = "";

    if (questionList[questionIndex].correctAnswer === answerIndex) {
        rightOrWrongEl.innerText = "Right!";
        questionDisplayEl.appendChild(rightOrWrongEl);
    } else if (questionList[questionIndex].correctAnswer != answerIndex) {
        rightOrWrongEl.innerText = "Wrong!";
        questionDisplayEl.appendChild(rightOrWrongEl);
        countSec -= 5;
    }
    questionCount++;
    if (questionCount >= questionList.length || countSec <= 0) {
        endQuiz();
    }
    else {
        displayQuestion(questionList[questionCount]);
    }
};

var startQuiz = function () {
    // class=front-page should be hidden - by adding class hidden
    frontPageEl.className = "hidden";
    setTimeout(finishedTimer, howLongToWait);
    displayQuestion(questionList[questionCount]);
};

// end quiz function. prompts you to save time (score) and name
// then once submitted, displays high scores in order of high to low
// , where you have choice to return to start quiz function
// or also, to clear storage
var endQuiz = function (bool) {
    while (questionDisplayEl.firstChild) {
        questionDisplayEl.removeChild(questionDisplayEl.lastChild);
    }
    endQuizEl.className="end-quiz";
    var finalScoreEl = document.querySelector(".final-score");
    finalScoreEl.innerText = "Your final score is " + countSec + ".";
};

var clearStorage = function () {
    localStorage.clear();
};

var highScorePage=function(){
    endQuizEl.className="hidden";
}

var setStorage = function (event) {
    event.preventDefault();
    var initialsInput = document.querySelector("input[name='submit-initials']").value;
    if (!initialsInput) {
        alert("You need to fill out your intials!");
        return;
    }
    if (initialsInput.length > 4) {
        alert("You need to fill out your intials, not your name!");
        return;
    }
    localStorage.setItem("initials", initialsInput);
    localStorage.setItem("highscore", countSec);
    highScorePage();
};

startQuizEl.addEventListener("click", startQuiz);
formEl.addEventListener("submit", setStorage);
// add event listener for the option when they choose "reset high scores"
// resetHighScoresEl.addEventListener("submit",clearStorage);

var frontPage = function () {
    frontPageEl.className = "front-page";
};
frontPage();
















// var questions = [
//     {
//         "question": "What is the maori translation for: \"Apple\"?",
//         "PossibleAnswers":
//             [{ "text": "Aporo", "correct": true },
//             { "text": "Ako", "correct": false },
//             { "text": "Whanaunga", "correct": false },
//             { "text": "Pene rākau", "correct": false }
//             ]
//     },
//     {
//         "question": "How many fingers on a hand?",
//         "PossibleAnswers":
//             [{ "text": "3", "correct": true },
//             { "text": "5", "correct": false },
//             { "text": "10", "correct": false },
//             { "text": "4 and 1 thumb", "correct": true }
//             ]
//     },
//     {
//         "question": "What is the maori translation for the french word: \"Pomme\"",
//         "PossibleAnswers":
//             [{ "text": "Ako", "correct": false },
//             { "text": "Whanaunga", "correct": false },
//             { "text": "Aporo", "correct": true },
//             { "text": "Pene rākau", "correct": false }
//             ]
//     }
// ]
// based code on structure of above^^






