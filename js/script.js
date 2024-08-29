/*************** Create Array of Objects of Quizes ****************/

const quizes = [
  {
    question: "What is the full form of js?",
    options: ["javascript", "juniorscript", "javasearch", "jsonscript"],
    answer: "javascript",
  },
  {
    question: "What is the full form of cse?",
    options: [
      "cyber security",
      "computer science engineering",
      "computer serach engine",
      "central searh engine",
    ],
    answer: "computer science",
  },
  {
    question: "What is the full form of html?",
    options: [
      "hyper transform merge language",
      "hyper text markup language",
      "higher typed markup language",
      "hyper text merge language",
    ],
    answer: "hyper text markup language",
  },
  {
    question: "What is the full form of www?",
    options: [
      "world wide web",
      "world web wide",
      "wide wifi worker",
      "web wifi wider",
    ],
    answer: "world wide web",
  },
  {
    question: "What is the full form of it?",
    options: [
      "information technology",
      "iteration techinque",
      "interactive typing",
      "informaton technique",
    ],
    answer: "information technology",
  },
];

/***************** All Global Variables *****************/

let quizNumber = 0,
  lockQuiz = false,
  quizChecked = false,
  totalQues = 0,
  correctQues = 0,
  wrongQues = 0;

const correctAnswerSound = new Audio(
  "../assets/sounds/correct-answer-sound.mp3"
);
const wrongAnswerSound = new Audio("../assets/sounds/wrong-answer-sound.mp3");

// const correctAnswerSound = document.getElementById("correct-sound");
// const wrongAnswerSound = document.getElementById("wrong-sound");

console.log(correctAnswerSound);

/***************** Defining Functions ******************/
const showResult = () => {
  const questionOptionsContainer = document.querySelector(
    ".question-options-container"
  );
  const resultContainer = document.querySelector(".result-container");
  questionOptionsContainer.classList.add("display-none");
  resultContainer.classList.remove("display-none");
  const attemptMessage = document.querySelector(".attempt-message");
  const scoreMessage = document.querySelector(".score-message");
  const correctQuestions = document.querySelector(".correct-questions");
  const wrongQuestions = document.querySelector(".wrong-questions");
  attemptMessage.innerText = `You Attempted total ${totalQues} questions`;
  scoreMessage.innerText = `You scored : ${correctQues}/${totalQues}`;
  correctQuestions.innerText = `Correct : ${correctQues}`;
  wrongQuestions.innerText = `wrong : ${wrongQues}`;
};
const showNextQuiz = () => {
  if (quizNumber === quizes.length) {
    showResult();
  } else {
    if (!quizChecked) {
      quizChecked = true;
      lockQuiz = false;
      const goodBadEmojiContainer = document.querySelector(
        ".good-bad-emoji-container"
      );
      goodBadEmojiContainer.classList.remove("showAnimation");
      let options = document.querySelectorAll(".option");
      for (let option of options) {
        option.style.background = "transparent";
        option.style.color = "#fff";
      }
      if (quizNumber === quizes.length - 1) {
        const nextBtn = document.querySelector(".next-btn");
        nextBtn.innerText = "Submit";
      }

      const question = document.querySelector(".question");
      question.innerHTML = `<span class="question-number">${
        quizNumber + 1
      }</span>. ${quizes[quizNumber].question}`;
      for (let option in options) {
        options[
          option
        ].innerHTML = `<span class="arrow-icon">&#8658;</span><span class="option-value">${quizes[quizNumber].options[option]}</span>`;
      }

      quizNumber++;
    }
  }
};

const checkAnswer = (e) => {
  if (!lockQuiz) {
    totalQues++;
    lockQuiz = true;
    quizChecked = false;
    const selectedAnswer = e.currentTarget.children[1].innerText;
    if (selectedAnswer === quizes[quizNumber - 1].answer.toUpperCase()) {
      const goodBadEmojiContainer = document.querySelector(
        ".good-bad-emoji-container"
      );
      goodBadEmojiContainer.innerText = "👍";
      goodBadEmojiContainer.classList.add("showAnimation");
      correctAnswerSound.play();
      e.currentTarget.style.background = "#2ecc71";
      e.currentTarget.style.color = "#000";
      correctQues++;
    } else {
      const goodBadEmojiContainer = document.querySelector(
        ".good-bad-emoji-container"
      );
      goodBadEmojiContainer.innerText = "👎";
      goodBadEmojiContainer.classList.add("showAnimation");
      wrongQues++;
      wrongAnswerSound.play();
      e.currentTarget.style.background = "#e74c3c";
      e.currentTarget.style.color = "#000";
      let options = document.querySelectorAll(".option");
      for (let option of options) {
        if (
          option.children[1].innerText ===
          quizes[quizNumber - 1].answer.toUpperCase()
        ) {
          option.style.background = "#2ecc71";
          option.style.color = "#000";
        }
      }
    }
  }
};

const restartQuiz = () => {
  quizNumber = 0;
  lockQuiz = false;
  quizChecked = false;
  totalQues = 0;
  correctQues = 0;
  wrongQues = 0;
  showNextQuiz();
  const questionOptionsContainer = document.querySelector(
    ".question-options-container"
  );
  const resultContainer = document.querySelector(".result-container");
  resultContainer.classList.add("display-none");
  questionOptionsContainer.classList.remove("display-none");
};
/***************** Initialy Call to Functions ***************/

showNextQuiz();

/******************* Get Elemeents From DOM  *******************/

const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const endBtn = document.querySelector(".end-btn");
const restartBtn = document.querySelector(".restart-btn");
const options = document.querySelectorAll(".option");

/***************** Set Event Listners On Elements ************/

startBtn.addEventListener("click", function () {
  const introContainer = document.querySelector(".intro-container");
  const questionOptionsContainer = document.querySelector(
    ".question-options-container"
  );
  questionOptionsContainer.classList.remove("display-none");
  introContainer.classList.add("display-none");
});

nextBtn.addEventListener("click", showNextQuiz);

endBtn.addEventListener("click", showResult);

restartBtn.addEventListener("click", restartQuiz);

for (let option of options) {
  option.addEventListener("click", checkAnswer);
}
