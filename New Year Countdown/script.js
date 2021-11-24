const days = document.getElementById('days')
const hours = document.getElementById('hours')
const mins = document.getElementById("mins");
const seconds = document.getElementById("secs");
const countdown = document.getElementById('countdown')
const year = document.getElementById('year')
const loading = document.getElementById('loading')

const currentYear = new Date().getFullYear()

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`)

// set bg year
year.innerText = currentYear + 1;

function updateCountdown() {
    const currentTime = new Date()
    // we get diff in milliseconds
    const diff = newYearTime - currentTime

    const d = Math.floor(diff / 1000 / 60 / 60 / 24) 
    const h = Math.floor(diff / 1000 / 60 / 60) % 24
    const m = Math.floor(diff / 1000 / 60 ) % 60
    const s = Math.floor(diff / 1000 ) % 60
    
    days.innerHTML = d
    hours.innerHTML = h < 10 ? '0' + h : h
    mins.innerHTML = m < 10 ? '0' + m : m
    seconds.innerHTML = s < 10 ? '0' + s : s
}

// show spinner before countdown
setTimeout(() => {
    loading.remove()
    countdown.style.display = 'flex'
}, 1000)

setInterval(updateCountdown, 1000)