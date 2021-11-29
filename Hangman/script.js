const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalmessage = document.getElementById('final-message')

const figureparts = document.querySelectorAll('.figure-part')

const wordlist = ['kangaroo','basketball','pinch','pillow','elephant','prayer' ,'telephone','hopscotch','scissors','alligator','inchworm','snowman','walkway','wristwatch','youthful','twilight','fisherman','baboon','program', 'computer','interface','programming']


let selectedWord = wordlist[Math.floor(Math.random() * wordlist.length)]

const correctletters = []
const wrongletters = []

function updateWrongLettersEL() {
    wrongLettersEl.innerHTML = `
    ${wrongletters.length > 0 ? '<p>Wrong:</p>' : ''}
    ${wrongletters.map(letter => `<span>${letter}</span>`)}`;

    figureparts.forEach((part, index) => {
        const errors = wrongletters.length
        if(index < errors) {
            part.style.display = 'block'
        }else {
            part.style.display = 'none'
        }
    })

    if(wrongletters.length === figureparts.length) {
        finalmessage.innerText = 'Unfortunately you lost 😞'
        popup.style.display = 'flex'
    }
}

function showNotification() {
    notification.classList.add('show')
    setTimeout(() => {
        notification.classList.remove('show')
    },2000)
}

// show hidden word
function displayWord() {
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map(
            letter =>
            `<span class='letter'>
            ${correctletters.includes(letter) ? letter : ''}
            </span>`
        )
        .join('')}`;

    const innerWord = wordEl.innerText.replace(/\n/g, '')
    console.log(innerWord)
    if(innerWord === selectedWord) {
        // console.log(innerWord, selectedWord)
        finalmessage.innerText = 'Congratulations! You Won! 😃'
        popup.style.display = 'flex'
    }
}

// event for entering letters
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase()
        // console.log(e.key, e.keyCode)
        if(selectedWord.includes(letter)) {
            if(!correctletters.includes(letter)) {
                correctletters.push(letter)
                displayWord()
            }else {
                showNotification()
            }
        }else {
            if(!wrongletters.includes(letter)) {
                wrongletters.push(letter)
                updateWrongLettersEL()
            }else {
                showNotification()
            }
        }
    }
})

// restart again
playAgainBtn.addEventListener('click', () => {
    // empty arrays
    correctletters.splice(0)
    wrongletters.splice(0)

    selectedWord = wordlist[Math.floor(Math.random() * wordlist.length)]
    displayWord()
    updateWrongLettersEL()
    popup.style.display = 'none'
})

displayWord()