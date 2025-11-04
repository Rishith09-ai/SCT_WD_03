const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Machine Language"
    ],
    answer: 1
  },
  {
    question: "Which programming language is used for web apps?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style System",
      "Cascading Style Sheets",
      "Computer Style Sheet",
      "Colorful Style Sheet"
    ],
    answer: 1
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  }
];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const timerDisplay = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });

  startTimer();
  updateProgressBar();
}

function resetState() {
  nextButton.style.display = "none";
  optionsContainer.innerHTML = "";
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.textContent = timeLeft;
}

function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].answer;
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  
  buttons.forEach((btn, index) => {
    if (index === correctIndex) btn.classList.add("correct");
    else if (index === selectedIndex) btn.classList.add("wrong");
    btn.disabled = true;
  });

  if (selectedIndex === correctIndex) score++;
  nextButton.style.display = "block";
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startQuiz);

startQuiz();
