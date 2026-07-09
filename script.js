let number1;
let number2;
let correctAnswer;
let questionType;

let score = 0;
let total = 0;
let gameStopped = false;

const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const finalResultElement = document.getElementById("finalResult");
const progressBar = document.getElementById("progressBar");
const confettiBox = document.getElementById("confettiBox");

const validateBtn = document.getElementById("validateBtn");
const stopBtn = document.getElementById("stopBtn");
const replayBtn = document.getElementById("replayBtn");

function randomNumber() {
  return Math.floor(Math.random() * 15) + 1;
}

function generateNumbers() {
  number1 = randomNumber();
  number2 = randomNumber();

  while (number1 >= 10 && number2 >= 10) {
    number1 = randomNumber();
    number2 = randomNumber();
  }
}

function newQuestion() {
  if (gameStopped) return;

  generateNumbers();

  questionType = Math.floor(Math.random() * 3);

  if (questionType === 0) {
    correctAnswer = number1 + number2;
    questionElement.textContent = number1 + " + " + number2 + " = ?";
  }

  if (questionType === 1) {
    correctAnswer = number2;
   questionElement.textContent = number1 + " + □ = " + (number1 + number2);
  }

  if (questionType === 2) {
    correctAnswer = number1;
    questionElement.textContent = "□ + " + number2 + " = " + (number1 + number2);
  }

  answerInput.value = "";
  messageElement.textContent = "";
  messageElement.className = "message";
  answerInput.focus();
}

function checkAnswer() {
  if (gameStopped) return;

  const userAnswer = Number(answerInput.value);

  if (answerInput.value === "") {
    messageElement.textContent = "Écris une réponse 🙂";
    messageElement.className = "message bad";
    return;
  }

  total++;

  if (userAnswer === correctAnswer) {
    score++;
    messageElement.textContent = "Bravo ! ✅";
    messageElement.className = "message good";

    questionElement.classList.add("success-pop");
    createConfetti();

    setTimeout(() => {
      questionElement.classList.remove("success-pop");
    }, 350);
  } else {
    messageElement.textContent = "Oups ! C'était " + correctAnswer + " ❌";
    messageElement.className = "message bad";

    questionElement.classList.add("shake");

    setTimeout(() => {
      questionElement.classList.remove("shake");
    }, 300);
  }

  scoreElement.textContent = score;
  totalElement.textContent = total;
  updateProgress();

  setTimeout(newQuestion, 900);
}

function updateProgress() {
  let percentage = 0;

  if (total > 0) {
    percentage = Math.round((score / total) * 100);
  }

  progressBar.style.width = percentage + "%";
}

function stopGame() {
  gameStopped = true;

  questionElement.textContent = "Partie terminée 🎉";
  messageElement.textContent = "";
  answerInput.disabled = true;
  validateBtn.disabled = true;
  stopBtn.disabled = true;

  replayBtn.classList.remove("hidden");

  let percentage = 0;

  if (total > 0) {
    percentage = Math.round((score / total) * 100);
  }

  let medal = "🌱 Continue, tu vas progresser !";

  if (percentage >= 90) {
    medal = "🏆 Incroyable championne !";
  } else if (percentage >= 70) {
    medal = "🥇 Très bon score !";
  } else if (percentage >= 50) {
    medal = "⭐ Bien joué !";
  }

  finalResultElement.innerHTML =
    medal + "<br>" +
    "Résultat final : " + score + " / " + total + "<br>" +
    "Réussite : " + percentage + "%";
}

function replayGame() {
  score = 0;
  total = 0;
  gameStopped = false;

  scoreElement.textContent = score;
  totalElement.textContent = total;
  progressBar.style.width = "0%";

  finalResultElement.innerHTML = "";
  messageElement.textContent = "";
  answerInput.disabled = false;
  validateBtn.disabled = false;
  stopBtn.disabled = false;

  replayBtn.classList.add("hidden");

  newQuestion();
}

function createConfetti() {
  const emojis = ["🌿", "✨", "⭐", "💚", "🎉"];

  for (let i = 0; i < 12; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 1 + Math.random() * 1 + "s";

    confettiBox.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
}

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

newQuestion();