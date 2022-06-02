// initializing global variables
var countSec;
var questionCount;
var howLongToWait = 1000;
var allAnswersEl;
var highScoreStorage = [];
var modalCount = 0;

var highScoreDisplayEl = document.querySelector(".high-scores");
var highScoreViewButtonEl = document.querySelector(".view-high-scores");
var formEl = document.querySelector("#submit-form");
var endQuizEl = document.querySelector("#end-quiz");

var startOverButtonEl = document.getElementById("start-over");
var clearHighScoreButtonEl = document.getElementById("clear-scores");
var startQuizButtonEl = document.getElementById("start-quiz");
var frontPageEl = document.getElementById("front-page");
var lastPageEl = document.getElementById("last-page");
var questionDisplayEl = document.getElementById("question-display");

// creates span to be filled with "right" or "wrong" in response to answers
var rightOrWrongEl = document.createElement("span");

// adds timer to the header, currently empty--firstPage function makes it "Time: 0"
var timer = document.createElement("p");
document.querySelector("header").appendChild(timer);

// fills in the high scores
var highScoreListGl = JSON.parse(localStorage.getItem("highscore"));
for (var i = 0; i < JSON.parse(localStorage.getItem("highscore")).length; i++) {
    var highScoreEachEl = document.createElement("li");
    highScoreEachEl.innerText = " " + highScoreListGl[i].initials + " - " + highScoreListGl[i].highScore
    highScoreDisplayEl.appendChild(highScoreEachEl);
}

// timer, with 60 seconds
function finishedTimer() {
    timer.innerText = "Time: " + countSec;
    if (questionCount === questionList.length || countSec <= 0) {
        endQuiz();
        return;
    }
    countSec--;
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

// displays questions, with argument 1 object from questionList array of objects
var displayQuestion = function (questionObj) {
    questionDisplayEl.className = "question-display";
    var questionAskedEl = document.querySelector(".question-asked");
    var possibleAnswersEl = document.querySelector(".possible-answers");

    // while loop that clears out previous answers
    while (possibleAnswersEl.firstChild) {
        possibleAnswersEl.removeChild(possibleAnswersEl.lastChild);
    }

    // create elements that hold the question, and then each answer. 
    questionAskedEl.innerText = questionObj.question;
    var answerKeys = Object.keys(questionObj.answers) // ['a','b','c','d']

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
    // adds event listener to each answer, and checks if they are correct in the called function
    var allAnswersEl = document.querySelector(".possible-answers");
    allAnswersEl.addEventListener("click", answerSelectionHandler);
};

// checks to see which answer is correct
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
    // front-page should be hidden 
    frontPageEl.className = "hidden";
    countSec = 60;
    setTimeout(finishedTimer, howLongToWait);
    displayQuestion(questionList[questionCount]);
};

var endQuiz = function () {
    rightOrWrongEl.innerText = "";
    timer.innerText = "Time's up!";
    document.getElementById("question-display").className = "hidden";
    endQuizEl.className = "end-quiz";
    var finalScoreEl = document.querySelector(".final-score");
    finalScoreEl.innerText = "Your final score is " + countSec + ".";
};

var clearStorage = function () {
    localStorage.clear();
    while (highScoreDisplayEl.firstChild) {
        highScoreDisplayEl.removeChild(highScoreDisplayEl.lastChild);
    }
};

var highScorePage = function () {
    endQuizEl.className = "hidden";
    lastPageEl.className = "last-page";
    
    var highScoreList = JSON.parse(localStorage.getItem("highscore"));
    var latestScore = highScoreList.length - 1;
    var highScoreEachEl = document.createElement("li");
    highScoreEachEl.innerText = " " + highScoreList[latestScore].initials + " - " + highScoreList[latestScore].highScore
    highScoreDisplayEl.appendChild(highScoreEachEl);
}

var setStorage = function (event) {
    event.preventDefault();
    var initialsInput = document.querySelector("input[name='submit-initials']").value;
    document.querySelector("input[name='submit-initials']").value = "";
    if (!initialsInput || initialsInput.length > 4 || !isNaN(initialsInput)) {
        alert("You need to fill out your intials! Please enter 4 letters or less.");
        return;
    }
    initialsInput = initialsInput.toUpperCase();
    var highScoreDataObj = {
        initials: initialsInput,
        highScore: countSec
    };
    highScoreStorage = JSON.parse(localStorage.getItem("highscore")) || [];
    highScoreStorage.push(highScoreDataObj);
    localStorage.setItem("highscore", JSON.stringify(highScoreStorage));
    highScorePage();
};

var frontPage = function () {
    // display front page
    frontPageEl.className = "front-page";
    // hide end quiz page and last page
    lastPageEl.className = "hidden";
    endQuizEl.className = "hidden";
    // timer not yet on, question count not yet started
    timer.innerText = "Time: 0";
    questionCount = 0;

    // front page remains on screen until user clicks startQuizButtonEl
};

var viewHighScorePage = function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var highScoreList = document.querySelector(".modal-content-p");
    var highScoreListStorage = JSON.parse(localStorage.getItem("highscore"));
    for (var i = 0; i < JSON.parse(localStorage.getItem("highscore")).length; i++) {
        var highScoreEachEl = document.createElement("li");
        highScoreEachEl.innerText = " " + highScoreListStorage[i].initials + " - " + highScoreListStorage[i].highScore
        highScoreList.appendChild(highScoreEachEl);
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            while (highScoreList.firstChild) {
                highScoreList.removeChild(highScoreList.lastChild);
            }
        }
    }
}

// start quiz  button
startQuizButtonEl.addEventListener("click", startQuiz);
// submit initials at end of quiz button
formEl.addEventListener("submit", setStorage);
// start quiz over button (return to front page)
startOverButtonEl.addEventListener("click", frontPage);
// clear high score button
clearHighScoreButtonEl.addEventListener("click", clearStorage);
// "view high scores" selection on upper left of screen
highScoreViewButtonEl.addEventListener("click", viewHighScorePage);

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


// var header = $("<header>").addClass("header");
// var timer = $("<p>")
//       .text(countSec);
// header.append(timer);
// $(this).append(header);
// why didn't this work???




