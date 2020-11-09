// Quiz Questions///////////////////////////
var questions = [{
    title: "Which actor is the only one who's appeared in every single Star Wars movie to date?",
    choices: ["Carrie Fisher", "Mark Hamill", "Anthony Daniels", "Warwick Davis"],
    answer: "Anthony Daniels"
  },
  {
    title: "Which stormtrooper wasn't able to complete his mission in Star Wars: The Force Awakens?",
    choices: ["FN-2705", "FN-2187", "FN-1205", "FN-1312"],
    answer: "FN-2187"
  },
  {
    title: "What kind of vehicle did Rey live in?",
    choices: ["AT-ST", "Star Destroyer", "Mon Calimari", "AT-AT"],
    answer: "AT-AT"
  },
  {
    title: "According to Master Yoda, how many Sith are always out there?",
    choices: ["4", "3", "1", "2"],
    answer: "2"
  },
  {
    title: "What happened to Anakin Skywalker during the battle with Count Dooku?",
    choices: ["He lost his left leg", "He lost his right arm", "He lost his right leg", "He lost"],
    answer: "He lost his right arm"
  },
  {
    title: "Who played the part of Commander Cody??",
    choices: ["Jay Laga'aia", "Temuera Morrison", "Ahmed Best", "Joel Edgerton"],
    answer: "Temuera Morrison"
  },
  {
    title: "Who killed Jabba?",
    choices: ["Han Solo", "C-3PO", "Luke Skywalker", "Princess Leia"],
    answer: "Princess Leia"
  },
  {
    title: "Who wiped out all of the information about Kamino from the Jedi Temple archives",
    choices: ["Darth Sidious", "Sifo-Dyas", "Count Dooku", "Yoda"],
    answer: "Count Dooku"
  },
  {
    title: "According to the Emperor, what was Luke Skywalker's weakness?",
    choices: ["His faith in the Light Side of the Force", "His faith in his friends", "His lack of vision", "His resistance to the Dark Side of the Force"],
    answer: "His faith in his friends"
  },
  {
    title: "Where did the Clone Wars begin??",
    choices: ["Tatooine", "Geonosis", "Naboo", "Coruscant"],
    answer: "Geonosis"
},
];
// End of Quiz Questions///////////////////////////

// Main Variables
const initialtimer = 75;
var highScoresArr = [];
var time = initialtimer;
var score = 0;
var qCount = 0;
var timeset;
var clock;
var viewHighSoreEl = document.querySelector("#info");
var timeEl = viewHighSoreEl.querySelector("#time");
var startEl = document.querySelector("#intro button");
var quizholderEl = document.querySelector("#quizHolder");
var questionHolderEl = document.querySelector("#questionHolder");
var highScoreHolder = document.querySelector("#highScoreHolder");
var recordsEl = document.querySelector("#records");
var answers = document.querySelectorAll("#questionHolder button");

// Hight Score Button
var highscorebutton = function (event) {
  var targetEl = event.target;

  if (targetEl.matches("#scores")) {
    event.preventDefault();
    clearInterval(clock);
    timeEl.innerHTML = 0;
    time = initialtimer;
    score = 0;
    qCount = 0;
    displaysection("#highScores");
    resethtmlrecords();
  }
};

// Reset button
var resetbutton = function () {
  time = initialtimer;
  score = 0;
  qCount = 0;
  removequestion();
  displaysection("#intro");
};

// Answer Question
var answerquizbutton = function (e) {
  if (e.target.getAttribute("data-question") === questions[qCount].answer) {
    //CORRECT ANSWER
    score++;
    qCount++;
    time = time + 3;
    updatequiz("Correct Answer");
  } else {
    //INCORRECT ANSWER
    time = time - 15;
    qCount++;
    updatequiz("Wrong Answer");
  }
};

// Quiz Start
var quizstartbutton = function () {
  setquestions();
  displaysection("#quizHolder");
  timeEl.innerHTML = initialtimer;
  clock = setInterval(myTimer, 1000);
};

// Quiz Update
var updatequiz = function (answerCopy) {
  getelement("#scoreIndicator p").innerHTML = answerCopy;
  getelement("#scoreIndicator").classList.remove(
    "invisible",
    scoreIndicator()
  );

  answers = document.querySelectorAll("#questionHolder button");
  //disable all answer buttons
  for (var i = 0; i < answers.length; i++) {
    answers[i].classList.add("disable");
  }
  setTimeout(function () {
    if (qCount === questions.length) {
      displaysection("#finish");
      time = 0;
      getelement("#time").innerHTML = time;
    } else {
      //remove last questions
      removequestion();
      // Updates copy in questions with the net array's question text.
      setquestions();
      // Removed disabled status.
      Array.from(answers).forEach((answer) => {
        answer.classList.remove("disable");
      });
    }
  }, 1000);
};

// Record your Initials
var recordbutton = function (e) {
  if (e.target.type == "submit") {
    var initialsRecord = getelement("#initials").value;
    if (initialsRecord === "") {
      getelement("#errorIndicator p").innerHTML =
        "You need at least 1 character";
      getelement("#errorIndicator").classList.remove(
        "invisible",
        errorIndicator()
      );
    } else if (initialsRecord.length > 5) {
      getelement("#errorIndicator p").innerHTML =
        "Maximum of 5 characters allowed.";
      getelement("#errorIndicator").classList.remove(
        "invisible",
        errorIndicator()
      );
    } else {
      //Sends value to current array for use now.
      highScoresArr.push({
        initials: initialsRecord,
        score: score,
      });
      //Sends value to local storage for later use.
      localStorage.setItem("highScores", JSON.stringify(highScoresArr));
      getelement("#highScores div").innerHTML = "";
      getelement("#score").innerHTML = "";
      displaysection("#highScores");
      resethtmlrecords();
      getelement("#initials").value = "";
    }
  }
};

// Clears highscores
var clearscores = function () {
    highScoresArr = [];
    getelement("#highScores div").innerHTML = "";
    localStorage.removeItem("highScores");
};

// Display section on HTML
var displaysection = function (element) {
  var thisElement = getelement(element);
  hidesection();
  thisElement.classList.remove("hide");
};

// Questions 
var setquestions = function () {
  var questionObj = questions[qCount];

  var qtitle = document.createElement("p");
  qtitle.textContent = questionObj.title;
  questionHolderEl.appendChild(qtitle);

  for (var j = 0; j < questionObj.choices.length; j++) {
    var qbutton = document.createElement("button");
    qbutton.textContent = questionObj.choices[j];
    qbutton.setAttribute("data-questionNum", qCount);
    qbutton.setAttribute("data-question", questionObj.choices[j]);
    questionHolderEl.appendChild(qbutton);
  }
};

// Remove a question
var removequestion = function () {
  var ptitle = questionHolderEl.querySelector("p");
  if (ptitle) {
    var rmtitle = questionHolderEl.removeChild(ptitle);
    answers = document.querySelectorAll("#questionHolder button");
    for (var i = 0; i < answers.length; i++) {
      var throwaway = questionHolderEl.removeChild(answers[i]);
    }
  }

  getelement("#scoreIndicator").classList.add("invisible");
};

// Verify time to continue
var myTimer = function () {
  if (time > 0) {
    time -= 1;
    timeEl.innerHTML = time;
  } else {
    clearInterval(clock);
    getelement("#score").innerHTML = score;
    displaysection("#finish");
  }
};

// Score Indicator
var scoreIndicator = function () {
  clearTimeout(timeset);
  timeset =
    (function () {
      getelement("#scoreIndicator").classList.add("invisible");
    },
    1000);
};

// Get Element Section
function getelement(x) {
  return document.querySelector(x);
}

// Hide HTML Section
function hidesection() {
  var sections = document.querySelectorAll("section");
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.add("hide");
  }
}

// Load Hight Scores
function loadHighScores() {
  var highScores = localStorage.getItem("highScores");
  if (!highScores) {
    highScoresArr = [];
    return false;
  }
  highScoresArr = JSON.parse(highScores);
}

// Reset HTML display for the score
var resethtmlrecords = function () {
  highScoreHolder.innerHTML = "";
  highScoresArr.sort(function (a, b) {
    return b.score - a.score;
  });
  for (var i = 0; i < highScoresArr.length; i++) {
    var scores = document.createElement("div");
    scores.innerHTML =
      i + 1 + ". " + highScoresArr[i].initials + " - " + highScoresArr[i].score;
    highScoreHolder.appendChild(scores);
  }
  answers = document.querySelectorAll("#questionHolder button");
  
  for (var j = 0; j < answers.length; j++) {
    answers[j].classList.remove("disable");
  }
};

// Error Indicator
var errorIndicator = function () {
  clearTimeout(timeset);
  timeset = setTimeout(() => {
    getelement("#errorIndicator").classList.add("invisible");
  }, 3000);
};

/* EVENT LISTENERS */
viewHighSoreEl.addEventListener("click", highscorebutton);
getelement("#reset").addEventListener("click", resetbutton);
startEl.addEventListener("click", quizstartbutton);
quizholderEl.addEventListener("click", answerquizbutton);
recordsEl.addEventListener("click", recordbutton);
getelement("#clearScores").addEventListener("click",clearscores);

loadHighScores();
