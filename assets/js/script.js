// initialize global variables
var time = 75;
var timer = document.querySelector(".timer");
var interval;
var quizInProgress = false; // tell if quiz is in progress
var quizMain = document.querySelector("main"); // store main
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
var answerSelect = "";

// function definitions

// bring quiz back to start screen
function resetQuiz(){
    // set quizHeader text to start text
    quizHeader.innerHTML = "Coding Quiz Challenge";

    // create paragraph text
    var pText = document.createElement("p");
    pText.innerHTML = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    pText.classList.add("description");
    quizMain.appendChild(pText);

    // create start button
    var startBtn = document.createElement("button");
    startBtn.innerHTML = "Start Quiz";
    startBtn.classList.add("start-btn");
    quizMain.appendChild(startBtn);
    startBtn.addEventListener("click", startQuiz); // startBtn event listener
}

// moving from start screen into quiz screen
function startQuiz(){
    // save description paragraph
    var para = document.querySelector(".description"); 
    // remove description paragraph
    quizMain.removeChild(para);
    // save start button
    var sBtn = document.querySelector(".start-btn");
    // remove start button
    quizMain.removeChild(sBtn);
    
    // start the timer
    startTimer();

    //handle quiz run functionality
    quizHandling();
}

// start the timer
function startTimer() {
    interval = setInterval(function(){
        time--;
        timer.innerHTML = "Time: " + time + "s";

        // clear interval when time runs out
        if (time <= 0) {
            clearInterval(interval);
        }
        
    }, 1000);
} 

function quizHandling(){
    // set quiz in progress to true
    quizInProgress = true;

    // loop through questions array
    for (var i = 0; i < questions.length; i++){
        setUpQuestion(i);
    }

}

function setUpQuestion(questionNum){
    // set quiz header text to question text
    quizHeader.innerHTML = questions[questionNum].question;

    // create list of answer choices
    createAnswers(questionNum);
}

function createAnswers(questionNum) {
    // checks for previous list and removes it
    var previousList = document.querySelector(".answer-choices");
    if (previousList) {
        quizMain.removeChild(previousList);
    }
    
    // create unorderd list element
    var list = document.createElement("ul");
    list.classList.add("answer-choices");
    quizMain.appendChild(list);

    var listItem;
    var listButton;
    // generate answer choice buttons
    for (var i = 0; i < questions[questionNum].answerChoices.length; i++) {
        // text that will be put inside the current list item button
        var currentItem = questions[questionNum].answerChoices[i];
        listItem = document.createElement("li");
        listItem.classList.add("answer-choice");

        listButton = document.createElement("button");
        listButton.classList.add("answer-choice-button");
        listButton.innerHTML = currentItem;
        listItem.appendChild(listButton); // append button to list item
        
        list.appendChild(listItem); // append list item to list
    }
}


// initial startup
resetQuiz();