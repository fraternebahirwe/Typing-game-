const words = [
  "rapide",
  "clavier",
  "code",
  "javascript",
  "ordinateur",
  "développeur",
  "projet",
  "écran",
  "fonction",
  "variable"
];

const phrases = [
  "Je deviens meilleur chaque jour",
  "Le code demande de la pratique",
  "Je tape plus vite maintenant",
  "JavaScript rend les sites interactifs",
  "Fraterne construit de beaux projets"
];

const wordElement = document.getElementById("word");
const input = document.getElementById("input");
const validateBtn = document.getElementById("validateBtn");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const precisionElement = document.getElementById("precision");
const progressBar = document.getElementById("progressBar");
const modeButtons = document.querySelectorAll(".mode");
const shareBtn = document.getElementById("shareBtn");
const gameCard = document.querySelector(".game-card");

let currentMode = "words";
let list = words;
let index = 0;
let score = 0;
let total = 0;

function showText() {
  wordElement.textContent = list[index];

  wordElement.classList.remove("pop");
  void wordElement.offsetWidth;
  wordElement.classList.add("pop");
}

function updateStats() {
  scoreElement.textContent = score;
  totalElement.textContent = total;

  if (total === 0) {
    precisionElement.textContent = "—";
  } else {
    precisionElement.textContent = Math.round((score / total) * 100) + "%";
  }

  const progress = (index / list.length) * 100;
  progressBar.style.width = progress + "%";
}

function restartGame() {
  index = 0;
  score = 0;
  total = 0;
  input.value = "";
  input.disabled = false;
  validateBtn.disabled = false;

  showText();
  updateStats();
  input.focus();
}

function validateAnswer() {
  const userText = input.value.trim().toLowerCase();
  const correctText = list[index].toLowerCase();

  if (userText === "") return;

  total++;

  if (userText === correctText) {
    score++;

    gameCard.classList.remove("correct");
    void gameCard.offsetWidth;
    gameCard.classList.add("correct");
  } else {
    gameCard.classList.remove("wrong");
    void gameCard.offsetWidth;
    gameCard.classList.add("wrong");
  }

  index++;
  input.value = "";

  if (index >= list.length) {
    wordElement.textContent = "🎉 Jeu terminé !";
    progressBar.style.width = "100%";
    input.disabled = true;
    validateBtn.disabled = true;
  } else {
    showText();
  }

  updateStats();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentMode = button.dataset.mode;

    if (currentMode === "words") {
      list = words;
    } else {
      list = phrases;
    }

    restartGame();
  });
});

validateBtn.addEventListener("click", validateAnswer);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    validateAnswer();
  }
});

shareBtn.addEventListener("click", () => {
  const subject = "Mon score Speed Typing Pro";
  const body = `J'ai obtenu ${score}/${total} sur Speed Typing Pro avec une précision de ${precisionElement.textContent}.`;

  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

restartGame();