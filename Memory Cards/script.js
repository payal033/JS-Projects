const cardsContainer = document.getElementById('cards-container')
const prevbtn = document.getElementById('prev')
const nextbtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hidebtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardbtn = document.getElementById('add-card')
const clearbtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

// keep track of current card
let currentActivecard = 0

// Store DOM cards
const cardsEl = []

const cardsData = getCardsData()

// Store card data
// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of variable',
//         answer: 'thisISaVaribale'
//     }
// ]

// creat all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data,index))
}

// create single card
function createCard(data, index) {
    const card = document.createElement('div')
    card.classList.add('card')
    
    if(index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'))

    // add to DOM cards 
    cardsEl.push(card)
    cardsContainer.appendChild(card)
    updateCurrentText()
}

// show number of cards
function updateCurrentText() {
    currentEl.innerText = `${ currentActivecard + 1}/${cardsEl.length}`
}

// get cards from local
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

// add card to local
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}

createCards()

// event listeners

// next button
nextbtn.addEventListener('click', () => {
    cardsEl[currentActivecard].className = 'card left'
    currentActivecard = currentActivecard + 1
    
    if(currentActivecard > cardsEl.length -1) {
        currentActivecard = cardsEl.length -1
    }

    cardsEl[currentActivecard].className = 'card active'
    updateCurrentText()
})

// prev button
prevbtn.addEventListener("click", () => {
  cardsEl[currentActivecard].className = "card right";
  currentActivecard = currentActivecard - 1;

  if (currentActivecard < 0) {
    currentActivecard = 0;
  }

  cardsEl[currentActivecard].className = "card active";
  updateCurrentText();
});

// show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'))
// Hide add container
hidebtn.addEventListener("click", () => addContainer.classList.remove("show"));

// add new card
addCardbtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value

    if(question.trim() && answer.trim()) {
        const newCard = { question, answer }
        createCard(newCard)
        questionEl.value = ''
        answerEl.value = ''

        addContainer.classList.remove('show')
        cardsData.push(newCard)
        setCardsData(cardsData)
    }
})

// clear cards
clearbtn.addEventListener('click' , () => {
    localStorage.clear();
    cardsContainer.innerHTML = ''
    window.location.reload()
})