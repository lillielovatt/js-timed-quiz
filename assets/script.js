var countSec = 60;
var howLongToWait = 1000;

// var header = $("<header>").addClass("header");
// var timer = $("<p>")
//       .text(countSec);
// header.append(timer);
// $(this).append(header);

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






