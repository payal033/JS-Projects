const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

const count = document.getElementById('count')
const total = document.getElementById('total')

const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value

showSavedData()

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// function to update seat count and price and save in localStorage
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length 
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

// function to get data from local storage and show in UI
function showSavedData() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

// event for selecting movies
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

// event for selecting seats
container.addEventListener('click', (e) => {

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})

// Initial count and total set
updateSelectedCount()