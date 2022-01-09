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
const bgopacity = document.getElementById("opacity");
const deletebtn = document.getElementById("delete-card");

// keep track of current card
let currentActivecard = 0

// Store DOM cards
const cardsEl = []

const cardsData = getCardsData()

// creat all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data,index))
}

// update bg value
function updateCardBG(bgvalue) {
    cardsEl.forEach((card) => {
        const innerEl = card.childNodes[1]
        innerEl.style.backgroundColor = `rgba(255, 255, 168, ${bgvalue})`
    })
}

// create single card
function createCard(data, index) {
    const localbgvalue = localStorage.getItem("bgopacity");
    bgopacity.value = localbgvalue;
    const card = document.createElement('div')
    card.classList.add('card')
    
    if(index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="inner-card" style="background-color:rgba(255, 255, 168, ${localbgvalue});">
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
    localStorage.setItem("bgopacity", bgopacity.value);
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

// delete single card
deletebtn.addEventListener('click', () => {
    if(cardsData.length === 0) {
        alert('There is no card to delete!')
        return
    }
    const confirmAns = confirm('Are you sure you want to delete this card?')
    if(confirmAns) {
        const deleteCard = cardsData.splice(currentActivecard, 1);
        cardsEl.innerHTML = "";
        setCardsData(cardsData);
        createCards(cardsData);
    }
})

// get background value using range
bgopacity.addEventListener("change", (e) => {
    localStorage.setItem("bgopacity", e.target.value);
    updateCardBG(e.target.value)
});






