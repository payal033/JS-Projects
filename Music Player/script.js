const musicContainer = document.getElementById('music-container')
const playbtn = document.getElementById('play')
const prevbtn = document.getElementById('prev')
const nextbtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')

// song titles
const songs = ['Title 1', 'Title 2', 'Title 3']
// keep song track
let songIndex = 2;

// initially load song details into DOM

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song;
    audio.src = `${song}.mp3`
    // cover.src = `${song}.jpg`
    cover.src = 'music.jpg'
}

function playSong() {
    musicContainer.classList.add('play')
    playbtn.querySelector('i.fas').classList.remove('fa-play')
    playbtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove("play");
    playbtn.querySelector("i.fas").classList.remove("fa-pause");
    playbtn.querySelector("i.fas").classList.add("fa-play");
    audio.pause();
}

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    // console.log(duration ,currentTime)
    const progressPercent = (currentTime/duration) * 100
    // console.log(progressPercent)
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    // console.log(width)
    const clickX = e.offsetX;
    // console.log(clickX)
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}


playbtn.addEventListener('click',() => {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    }else {
        playSong()
    }
})

prevbtn.addEventListener('click',prevSong)
nextbtn.addEventListener('click',nextSong)
// song time update
audio.addEventListener('timeupdate', updateProgress)
// click progress bar
progressContainer.addEventListener('click',setProgress)

// song ends
audio.addEventListener('ended',nextSong)
