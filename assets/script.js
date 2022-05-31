var countSec = 60;
var howLongToWait = 1000;

// var header = $("<header>").addClass("header");
// var timer = $("<p>")
//       .text(countSec);
// header.append(timer);
// $(this).append(header);
// why didn't this work???

var header = document.createElement("header");
var timer = document.createElement("p");
header.appendChild(timer);
document.querySelector("body").appendChild(header);


function finishedTimer() {
    // alert(countSec);
    timer.innerText = countSec;
    countSec--;
    if (countSec < 0) {
        return;
    }
    setTimeout(finishedTimer, howLongToWait);
}
setTimeout(finishedTimer, howLongToWait);



var questionList = [
    {
        "question": "Inside which HTML element do we put the javascript?",
        "PossibleAnswers":
            [{ "text": "<script>", "correct": true },
            { "text": "<head>", "correct": false },
            { "text": "<body>", "correct": false },
            { "text": "<link>", "correct": false }
            ]
    },
    {
        "question": "What would the following javascript declaration evaluate to: isNaN(\"5\")?",
        "PossibleAnswers":
            [{ "text": "true", "correct": false },
            { "text": "false", "correct": true },
            { "text": 5, "correct": false },
            { "text": "5", "correct": false }
            ]
    },
    {
        "question": "Which of the following is NOT a valid type in Javascript?",
        "PossibleAnswers":
            [{ "text": "Boolean", "correct": false },
            { "text": "String", "correct": false },
            { "text": "Function", "correct": true },
            { "text": "Null", "correct": false }
            ]
    },
    {
        "question": "How do you stop an interval timer in Javascript?",
        "PossibleAnswers":
            [{ "text": "clearInterval", "correct": true },
            { "text": "return", "correct": false },
            { "text": "intervalDone", "correct": false },
            { "text": "clearTimer", "correct": false }
            ]
    },
    {
        "question": "Which of the following is not a valid JavaScript variable name?",
        "PossibleAnswers":
            [{ "text": "_here_I_am", "correct": false },
            { "text": "CurtainElf", "correct": false },
            { "text": "money.mind", "correct": true },
            { "text": "vArIaBlE", "correct": false }
            ]
    },
    {
        "question": "Do you need a .js file to run Javascript through HTML?",
        "PossibleAnswers":
            [{ "text": "Yes", "correct": false },
            { "text": "No", "correct": true },
            { "text": "Yes, if you have a .css file", "correct": false },
            { "text": "It depends", "correct": false }
            ]
    },
]
// creates an Object, with 2 attributes--Question, and Possible Answers



var displayQuestion = function(questionArray){
    // display countSec 
    // create elements that hold question, and then
    // each answer. Need to create 5 elements--1 for Q, and 4 for A
    // then, add buttons to each answer. For loop?
    // also add class to it--one for all those that are TRUE, and one for FALSE
    // change colors when clicked, based on class
    // check if element is clicked, and when it is clicked, 
    // display according to class if right and wrong
    // specify on bottom of page
    // if wrong, deduct 5 from countSec
    // immediately "delete" the last question

    // then the displayQuestion function has ended, and you return to 
    // the for loop, which tests to see if your time is up or not
    // if it is up, tells you the time (your score) and takes intials
    // to save as object in local storage

};

for(var i=0; i<questionList.length; i++){
    // if(countSec<=0), then stop, go to end quiz function
    // call function that creates elements and displays answers
    // pass through the first question, and so on--
    displayQuestion(questionList[i]);
}



// need start quiz function

// end quiz function. prompts you to save time (score) and name
// then once submitted, displays high scores in order of high to low
// , where you have choice to return to start quiz function
// or also, to clear storage

// need clear storage function that executes if clicked.


var startQuiz = function(){

};

var endQuiz = function(){

};

var clearStorage = function(){

};

var setStorage = function(){

};


















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






