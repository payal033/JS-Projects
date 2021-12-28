// Web Speech API - Speech Synthesis

const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textarea = document.getElementById('text')
const readbtn = document.getElementById('read')
const togglebtn = document.getElementById('toggle')
const closebtn = document.getElementById('close')

const data = [
  {
    image: "./imgs/drink.png",
    text: "I'm Thirsty",
  },
  {
    image: "./imgs/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./imgs/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./imgs/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./imgs/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./imgs/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./imgs/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./imgs/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./imgs/outside.jpg",
    text: "I Want To Go to Park",
  },
  {
    image: "./imgs/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./imgs/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./imgs/grand.jpg",
    text: "I Want To Go To Grandma's House",
  },
];

data.forEach(createBox)

function createBox(item) {
    const box = document.createElement('div')
    const { image, text } = item
    box.classList.add('box')
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `
    // speak event
    box.addEventListener('click', () => {
      setTextMessage(text)
      speakText()
      // Add active effect
      box.classList.add('active')
      setTimeout(() => box.classList.remove('active'), 800)
    })
    main.appendChild(box)
}

// Init speech synth
const message = new SpeechSynthesisUtterance()

// Store voices
let voices = []

function getVoices() {
  voices = speechSynthesis.getVoices()
  voices.forEach(voice => {
    const option = document.createElement('option')
    option.value = voice.name
    option.innerText = `${voice.name} ${voice.lang}`
    voicesSelect.appendChild(option)
  })
}

// set text
function setTextMessage(text) {
  message.text = text
}

// Speak text
function speakText() {
  speechSynthesis.speak(message)
}

// set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name == e.target.value)
}

// voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

// Toggle text box
togglebtn.addEventListener('click', () => document.getElementById('textbox').classList.toggle('show'))

// close textbox
closebtn.addEventListener('click', () => document.getElementById('textbox').classList.remove('show'))

// Change voice
voicesSelect.addEventListener('change', setVoice)

// read text button
readbtn.addEventListener('click', () => {
  setTextMessage(textarea.value)
  speakText()
})

getVoices()