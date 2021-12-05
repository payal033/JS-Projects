const msg = document.getElementById('msg')
const random_number = getRandomNumber()
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new window.SpeechRecognition()
// start recognition and speak
recognition.start()

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

function writeMessage(msg1) {
    msg.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg1}</span>
    `
}

function checkNumber(msg1) {
    const num = +msg1
    
    if (Number.isNaN(num)) {
        msg.innerHTML +=  `<div>That is not a valid number</div>`
        return
    }

    if( num > 100 || num < 1) {
        msg.innerHTML += `<div>Number must be between 1 to 100</div>`
        return
    }

    if(num === random_number) {
        document.body.innerHTML = `<h2>Congrats! You have guessed the number! <br><br> It was ${num}</h2>
        <button class='play-again' id='play-again'>Play Again</button>    `
    }else if (num > random_number) {
        msg.innerHTML += '<div>GO LOWER</div>'
    }else {
        msg.innerHTML += '<div>GO HIGHER</div>'
    }
}

function onSpeak(e) {
    const msg1 = e.results[0][0].transcript
    writeMessage(msg1)
    checkNumber(msg1)
}

// speak result
recognition.addEventListener('result', onSpeak)
recognition.addEventListener('end' , () => recognition.start())
document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload()
    }
})