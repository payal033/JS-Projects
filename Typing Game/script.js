const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsbtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// Initialize 
let randomWord;
let score = 0;
let time = 10;
var wordsData = []

let difficulty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : "medium"

difficultySelect.value =
  localStorage.getItem("difficulty") != null
    ? localStorage.getItem("difficulty")
    : "medium";

// focus on input box when we load
text.focus()

// List of words for game
async function getWords() {
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=50')
    const data = await res.json()
    if(data) {
        wordsData = data
        addWordDOM()
    }
}

function getRandomWord() {
    return wordsData[Math.floor(Math.random() * wordsData.length)]
}

function addWordDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord
}

function updateScore() {
    score += 1
    scoreEl.innerHTML = score
}

function gameOver() {
    endgameEl.innerHTML = `
        <h2>Time ran out!</h2>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `
    endgameEl.style.display = 'flex'
}

// start timer counting down
const timeInterval = setInterval(updateTime, 1000)

function updateTime() {
    time--
    timeEl.innerHTML = time + 's'

    if(time === 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordDOM();
    updateScore();

    if (difficulty === 'hard') {
        time += 2
    }else if (difficulty === 'medium') {
        time += 3
    }else {
        time += 5
    }
    updateTime()
  }
});

settingsbtn.addEventListener('click', () => settings.classList.toggle('hide'))

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})

getWords()