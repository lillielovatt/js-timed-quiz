var countSec = 60;
var howLongToWait = 1000;
localStorage.setItem("initials", "highScore");
var formEl = document.querySelector("#submit-form");
var startQuizEl = document.getElementById("start-quiz");
var frontPageEl= document.querySelector(".front-page");
// querySelector("submit[id='start-quiz']");

// var header = $("<header>").addClass("header");
// var timer = $("<p>")
//       .text(countSec);
// header.append(timer);
// $(this).append(header);
// why didn't this work???

var timer = document.createElement("p");
document.querySelector("header").appendChild(timer);

function finishedTimer() {
    // alert(countSec);
    timer.innerText = "Time: " + countSec;
    countSec--;
    if (countSec < 0) {
        return;
    }
    // if() needs to stop changing countSec when the quiz ends
    setTimeout(finishedTimer, howLongToWait);
}
setTimeout(finishedTimer, howLongToWait);

// currently, can't loop through answers to display,
// because they're a, b, c, d 
// thinking of shifting to answers being an array
//  and correctAnswer being the index of the correct answer
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
// creates an Object, with 3 attributes--question, answers, and correctanswer

var displayQuestion = function (questionObj, questionIndex) {
   var questionAskedEl = document.querySelector(".question-asked"); 
   var possibleAnswersEl = document.querySelector(".possible-answers");
   // INITIALIZE ALL THINGS TO ""
    // then fill up as function runs

    // create elements that hold question, and then
    // each answer. Need to create 5 elements--1 for Q, and 4 for A
    
    questionAskedEl.innerText = questionObj.question;
    var answerKeys = Object.keys(questionObj.answers) // ['a','b','c','d']
    // questionObj['answers']

    // loops through and creates list 
   // for (var i = 0; i < 4; i++) {
    for (var i = 0; i < answerKeys.length; i++) {
        const answerKey = answerKeys[i]; //A, B, C, D
        const answerItem = questionObj.answers[answerKey]; //WORDS
        var answerEl = document.createElement("li");
        answerEl.className = "answer-choice";

        if (answerKey === questionObj.correctAnswer) {
            answerEl.setAttribute("data-question-id", questionIndex)
            answerEl.setAttribute("data-answer-id", answerKey)
            // statusSelectEl.setAttribute("data-task-id", taskId);
            // add another class, class="true" or something
        }
        else {
            // add class that is "false" or something
        }

        // add button too

        possibleAnswersEl.appendChild(answerEl);
    }

    var allAnswersEl = document.querySelector(".answer-choice");
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
    const questionIndex = targetEl.dataset.questionId;
    // do the same for answerId

    // if()

    if (targetEl.matches(".true")) {
        // display "right"
    } else if (targetEl.matches(".false")) {
        // display 'wrong'
        // countSec-=5;
    }
};

// end quiz function. prompts you to save time (score) and name
// then once submitted, displays high scores in order of high to low
// , where you have choice to return to start quiz function
// or also, to clear storage

var startQuiz = function () {
    // class=front-page should be hidden - by adding class hidden
    frontPageEl.className+= " hidden";


    for (var i = 0; i < questionList.length; i++) {
        if (countSec <= 0) {
            endQuiz(false);
            // break for loop instead?
        }
        console.log("check");
        // call function that creates elements and displays answers
        // pass through the first question, and so on--
        displayQuestion(questionList[i], i);
    }
    endQuiz(false);
};



var endQuiz = function (bool) {
    // display class end-quiz
    if (!bool) {
        var finalScoreEl = document.querySelector(".final-score");
        finalScoreEl.innerText = "Your final score is " + countSec + ".";
    }
    else{
        // once setStorage is run, this needs to disappear.
        // call function
    }
};

var clearStorage = function () {
    localStorage.clear();
};

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
    localStorage.setItem("intials", initialsInput);
    localStorage.setItem("highscore", countSec);
    endQuiz(true);
};

startQuizEl.addEventListener("click", startQuiz);
formEl.addEventListener("submit", setStorage);
// add event listener for the option when they choose "reset high scores"
// resetHighScoresEl.addEventListener("submit",clearStorage);


















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






