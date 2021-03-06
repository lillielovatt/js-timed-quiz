// initializing global variables
var countSec;
var questionCount;
var howLongToWait = 1000;
var allAnswersEl;
var highScoreStorage = [];
var modalCount = 0;

// submitting your initials
var formEl = document.querySelector("#submit-form");

// all page elements -> front page, question page, end quiz page, last page, highscores on last page
var frontPageEl = document.getElementById("front-page");
var questionDisplayEl = document.getElementById("question-display");
var endQuizEl = document.querySelector("#end-quiz");
var lastPageEl = document.getElementById("last-page");
var highScoreDisplayEl = document.querySelector(".high-scores");
// all button elements
var startOverButtonEl = document.getElementById("start-over");
var clearHighScoreButtonEl = document.getElementById("clear-scores");
var startQuizButtonEl = document.getElementById("start-quiz");
var highScoreViewButtonEl = document.querySelector(".view-high-scores");

// creates span to be filled with "right" or "wrong" in response to answers
var rightOrWrongEl = document.createElement("span");

// adds timer to the header, currently empty--firstPage function makes it "Time: 0"
var timer = document.createElement("p");
document.querySelector("header").appendChild(timer);

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

// displays questions, with argument 1 object from questionList array of objects (i.e., cycles through 1 question at a time)
var displayQuestion = function (questionObj) {
    // allows for questions to be displayed, turning off class="hidden"
    questionDisplayEl.className = "question-display";
    // selecting h1 element for question, and ul element for answers
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
        // creates li element, filled with the possible answer
        var answerEl = document.createElement("li");
        answerEl.innerText = answerItem;
        answerEl.className = "answer-choice";
        // assigns data attribute to allow for correct answer matching later
        answerEl.setAttribute("data-question-id", questionCount);
        answerEl.setAttribute("data-answer-id", answerKey);
        // makes sure the li elements appear on the page by appending to ol
        possibleAnswersEl.appendChild(answerEl);
    }
    // adds event listener to each answer, and checks if they are correct in the answerSelectionHandler function
    var allAnswersEl = document.querySelector(".possible-answers");
    allAnswersEl.addEventListener("click", answerSelectionHandler);
};

// checks to see which answer is correct
var answerSelectionHandler = function (event) {
    // shows us EXACTLY where we clicked, retrieves entire HTML for click event
    var targetEl = event.target;
    // gets data attribute, automatically parses name in Camel style
    var questionIndex = targetEl.dataset.questionId; //should be the same as questionCount, number of question ID
    var answerIndex = targetEl.dataset.answerId; //should be correct answer letter.
    // if answer is "right" or "wrong" starts as BLANK
    rightOrWrongEl.innerText = "";
    // if data attribute value for user's answer MATCHES correct answer, display right. Else, wrong and deduct time.
    if (questionList[questionIndex].correctAnswer === answerIndex) {
        rightOrWrongEl.innerText = "Right!";
        questionDisplayEl.appendChild(rightOrWrongEl);
    } else if (questionList[questionIndex].correctAnswer != answerIndex) {
        rightOrWrongEl.innerText = "Wrong!";
        questionDisplayEl.appendChild(rightOrWrongEl);
        countSec -= 5;
    }
    // ensures we move to next question, shows this question has ended
    questionCount++;
    // if we've reached the end of the question list, or time is out, then we end the quiz.
    if (questionCount >= questionList.length || countSec <= 0) {
        endQuiz();
    }
    else {
        displayQuestion(questionList[questionCount]);
    }
};

// called when "start quiz" button is clicked
var startQuiz = function () {
    // front-page should be hidden 
    frontPageEl.className = "hidden";
    // initializes time available, and starts timer, and calls first question.
    countSec = 60;
    setTimeout(finishedTimer, howLongToWait);
    displayQuestion(questionList[questionCount]);
};

// called when timer runs out, or when questions run out
var endQuiz = function () {
    // removes "right" or "wrong", else it'll appear next round
    rightOrWrongEl.innerText = "";
    timer.innerText = "Time's up!";
    // hides the questions element
    document.getElementById("question-display").className = "hidden";
    // makes sure end quiz page is displayed, but changing from class="hidden"
    endQuizEl.className = "end-quiz";
    var finalScoreEl = document.querySelector(".final-score");
    finalScoreEl.innerText = "Your final score is " + countSec + ".";
};

// called when "clear high scores" button is clicked
var clearStorage = function () {
    localStorage.clear();
    // if you choose to clear the storage, then automatically remove all high scores from HTML
    while (highScoreDisplayEl.firstChild) {
        highScoreDisplayEl.removeChild(highScoreDisplayEl.lastChild);
    }
};

// called for last page, after form submit button clicked 
var highScorePage = function () {
    // hiding end quiz page, having last page appear
    endQuizEl.className = "hidden";
    lastPageEl.className = "last-page";
    // clear highScoreDisplay HTML or else the for loop will write it all over again, and again
    while (highScoreDisplayEl.firstChild) {
        highScoreDisplayEl.removeChild(highScoreDisplayEl.lastChild);
    }
    // makes the high score array of objects NOT a string, when getting from local storage
    var highScoreList = JSON.parse(localStorage.getItem("highscore"));
    for (var i = 0; i < highScoreList.length; i++) {
        // creates list element, fills with initials and high scores, and adds to the page
        var highScoreEachEl = document.createElement("li");
        highScoreEachEl.innerText = " " + highScoreList[i].initials + " - " + highScoreList[i].highScore
        highScoreDisplayEl.appendChild(highScoreEachEl);
    }
}

// called after form submit button clicked to capture input for localStorage
var setStorage = function (event) {
    event.preventDefault(); //stop it from refreshing the page
    // takes user input of initials
    var initialsInput = document.querySelector("input[name='submit-initials']").value;
    document.querySelector("input[name='submit-initials']").value = "";
    // validation
    if (!initialsInput || initialsInput.length > 4 || !isNaN(initialsInput)) {
        alert("You need to fill out your intials! Please enter 4 letters or less.");
        return;
    }
    initialsInput = initialsInput.toUpperCase();
    var highScoreDataObj = {
        initials: initialsInput,
        highScore: countSec
    };
    // highScoreStorage takes all items in local storage (or if empty, creates an empty array), adds newest score and initials, sorts it
    highScoreStorage = JSON.parse(localStorage.getItem("highscore")) || [];
    highScoreStorage.push(highScoreDataObj);
    highScoreStorage.sort(function (a, b) {
        return b.highScore - a.highScore;
    });
    // stores sorted initials/high scores objects in an highscorestorage array, and sends to localstorage
    localStorage.setItem("highscore", JSON.stringify(highScoreStorage));
    highScorePage();
};

// called when page first loads, and called again when "start over" button is clicked
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

// creates modal that pops out at any time for viewing high scores
var viewHighScorePage = function () {
    // creates modal on the page, makes sure it's displayed
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    // similiar to highScorePage function, just appends high scores to the modal ol
    var highScoreList = document.querySelector(".modal-content-p");
    var highScoreListStorage = JSON.parse(localStorage.getItem("highscore"));
    for (var i = 0; i < JSON.parse(localStorage.getItem("highscore")).length; i++) {
        var highScoreEachEl = document.createElement("li");
        highScoreEachEl.innerText = " " + highScoreListStorage[i].initials + " - " + highScoreListStorage[i].highScore
        highScoreList.appendChild(highScoreEachEl);
    }
    // when you click out of the modal, it closes
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            // clears out the display so that way when you call it again, it doesn't append over and over again
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