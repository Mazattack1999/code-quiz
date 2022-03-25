// initialize global variables
var time = 75;
var quizInProgress = false; // tell if quiz is in progress
var main = document.querySelector("main"); // store main
var quizHeader = document.querySelector(".header"); // store quiz header text
// questions, their answers, and their answer choices stored in an array of objects
var questions = [{
    question: "The condition in an if/else statement is enclosed with ______.",
    answer: "3. parenthesis",
    answerChoices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"]
},
{
    question: "Arrays in JavaScript can be used to store _______.",
    answer: "4. all of the above",
    answerChoices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"]
},
]

// function definitions
function resetQuiz(){
    // set quizHeader text to start text
    quizHeader.innerHTML = "Coding Quiz Challenge";

    // create paragraph text
    var pText = document.createElement("p");
    pText.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pText.classList.add("description");
    main.appendChild(pText);

    // create start button
    var startBtn = document.createElement("button");
    startBtn.innerHTML = "Start Quiz";
    startBtn.classList.add("start-btn");
    main.appendChild(startBtn);
    startBtn.addEventListener("click", startQuiz()); // startBtn event listener
}


