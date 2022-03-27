// initialize global variables
const timeStart = 75;
var time = timeStart;
var timer = document.querySelector(".timer");
var interval;
var viewingHS = false;
var highScoreScreen;
var highScores = [];
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
var currentQuestion = 0;
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
    quizMain.classList.add("quiz-in-progress");
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

    // set quiz in progress to true 
    quizInProgress = true;

    //set up first question
    setUpQuestion(0);
    
}

// start the timer
function startTimer() {
    time = timeStart;
    timer.innerHTML = "Time: " + time + "s";
    interval = setInterval(function(){
        time--;
        timer.innerHTML = "Time: " + time + "s";

        // clear interval when time runs out
        if (time <= 0) {
            endQuiz();
            // clearInterval(interval);
        }
        
    }, 1000);
} 

function setUpQuestion(questionNum){
    currentQuestion = questionNum;
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

    // create list eventListener
    list.addEventListener("click", function(event){
        var clickedEl = event.target;
        if (clickedEl.getAttribute("class") === "answer-choice-button"){
            answerSelect = clickedEl.innerHTML;
            handleQuestionAnswering(currentQuestion);
            
            // check if there are any more questions
            if (currentQuestion < questions.length - 1) {
                setUpQuestion(currentQuestion + 1);
            } else {
                endQuiz();
            }
        }
    });

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
        listButton.setAttribute("id", "data-"+ i);
        listButton.innerHTML = currentItem;
        listItem.appendChild(listButton); // append button to list item
        
        list.appendChild(listItem); // append list item to list
    }
}

function handleQuestionAnswering(questionNum){
    var correctAnswer = questions[questionNum].answer;
    var cText = document.createElement("h2"); // h2 element that states if answer is correct or not
    // check if answer is correct or not
    if (answerSelect === correctAnswer){
        cText.innerHTML = "Correct!";
    }else {
        time -= 10;
        cText.innerHTML = "Wrong!";
    }
    // append cText to body
    document.body.appendChild(cText);
    setTimeout(function(){
        document.body.removeChild(cText);
    },1000);

}

function endQuiz(){
    quizMain.classList.remove("quiz-in-progress");
    // set quiz in progress to true 
    quizInProgress = false;
    // stop timer
    clearInterval(interval);
    timer.innerHTML = "Time: " + time + "s";

    //set up the end screen
    setEndScreen();
}

function setEndScreen(){
    // set quiz header text
    quizHeader.innerHTML = "All done!";

    // clear quiz list
    quizMain.removeChild(document.querySelector(".answer-choices"));

    // create end screen items container
    var endScreenItems = document.createElement("div");
    endScreenItems.classList.add("container");
    quizMain.appendChild(endScreenItems);

    // create p text
    var pText = document.createElement("p");
    pText.innerHTML = "Your final score is " + time + ".";
    pText.classList.add("end-screen-para");
    endScreenItems.appendChild(pText);

    // create form
    var endForm = document.createElement("div");
    endForm.classList.add("end-form");
    endScreenItems.appendChild(endForm);

    // create label
    var lInitials = document.createElement("label");
    lInitials.innerHTML = "Enter Initials: ";
    lInitials.setAttribute("for", "initials-input");
    endForm.appendChild(lInitials);

    // create initals input
    var iInitials = document.createElement("input");
    iInitials.setAttribute("type", "text");
    iInitials.setAttribute("id", "initials-input");
    iInitials.setAttribute("placeholder", "Your initials");
    endForm.appendChild(iInitials);

    // create submit button
    var sButton = document.createElement("button");
    sButton.innerHTML = "Submit";
    sButton.classList.add("submit-button");
    endForm.appendChild(sButton);
    sButton.addEventListener("click", function(){
        // check if initials field is filled
        if (iInitials.value) {
            updateHighScores(iInitials.value.toUpperCase(), time);
        }
    })
}

function loadHighScores() {
    // check local storage for highscores
    if (!localStorage.getItem("highscores")){
        // set local storage current highscores if not yet created
        localStorage.setItem("highscores", JSON.stringify(highScores));
    } else {
        // get high scores from local storage if they are there
        highScores = JSON.parse(localStorage.getItem("highscores"));
    }

}

function updateHighScores(nameIn, scoreIn){
    // update highScores with user's info
    highScores.push({name: nameIn, score: scoreIn});
    sortArray(highScores);

    // update local storage
    localStorage.setItem("highscores", JSON.stringify(highScores));

    // reset start screen
    var endScreenContainer = document.querySelector(".container");
    quizMain.removeChild(endScreenContainer);
    resetQuiz();

}

function sortArray(arr) {
    var val1;
    var val2;

    // double for loop for comparing values
    for (var i = 0; i < arr.length - 1; i++) {            
        for (var j = i + 1; j < arr.length; j++) {
            //compare arr[i] and arr[j]
            if (arr[i].score < arr[j].score) {
                 // swap the values;
                val1 = arr[i];
                val2 = arr[j];

                arr[i] = val2;
                arr[j] = val1;
            }
        }
    }
}

function toggleHighScoreScreen() {
    // check if currently viewing highscore screen
    if (viewingHS) {
        // make quizMain visible
        quizMain.classList.remove("hidden");
        if (highScoreScreen){
            document.body.removeChild(highScoreScreen);
        }
    } else {
        // hide quizMain
        quizMain.classList.add("hidden");
        setHSScreen();
    }
    //toggle viewingHS
    viewingHS = !viewingHS;
}

function setHSScreen () {
    highScoreScreen = document.createElement("div");
    highScoreScreen.classList.add("high-scores");
    document.body.appendChild(highScoreScreen);

    // create "high scores" text
    var highScoresTitle = document.createElement("h1");
    highScoresTitle.innerHTML = "High scores";
    highScoreScreen.appendChild(highScoresTitle);

    // create ul 
    var highScoresList = document.createElement("ul");
    highScoresList.classList.add("high-scores-list");
    highScoresList.classList.add("list");
    highScoreScreen.appendChild(highScoresList);

    // populate ul
    printHS(highScoresList);

    // create button container
    var btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    highScoreScreen.appendChild(btnContainer);

    // create "go back" button
    var btnReturn = document.createElement("button");
    btnReturn.classList.add("btn");
    btnReturn.innerHTML = "Go back";
    btnReturn.addEventListener("click", toggleHighScoreScreen);
    btnContainer.appendChild(btnReturn);

    // create "clear high scores button"
    var btnClear = document.createElement("button");
    btnClear.classList.add("btn");
    btnClear.innerHTML = "Clear high scores";
    btnContainer.appendChild(btnClear);
    btnClear.addEventListener("click", function(){
        highScores = [];
        localStorage.setItem("highscores", JSON.stringify(highScores));
        // call toggleHighScoreScreen twice to refresh screen
        toggleHighScoreScreen();
        toggleHighScoreScreen();
    })
}

function printHS(list) {
    var listItem;
    var listText;

    // print top 10 high scores
    for (var i = 0; i < Math.min(10, highScores.length); i++) {
        // create list item
        listItem = document.createElement("li");
        listItem.classList.add("hs-list-item");
        listItem.classList.add("list-item");
        list.appendChild(listItem);

        listText = document.createElement("p");
        listText.classList.add("hs-text");
        listText.innerHTML = (i + 1) + ". " + highScores[i].name + " - " + highScores[i].score;
        listItem.appendChild(listText);
    }
}


// global event listeners
document.querySelector(".high-scores-button").addEventListener("click", toggleHighScoreScreen);

// load highscores from local storage
loadHighScores();

// initial startup
resetQuiz();
