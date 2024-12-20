// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// play pause video
function toggleVideoStatus() {
    if(video.paused) {
        video.play()
    }else {
        video.pause()
    }
}

// update play pause icon
function updatePlayPauseIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }

}

// update timestamp and progress
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100

    // get minutes
    let mins = Math.floor(video.currentTime / 60)
    if(mins < 10) {
        mins = '0' + String(mins)
    }

    // get seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
      seconds = "0" + String(seconds);
    }

    timestamp.innerHTML = `${mins}:${seconds}`
}

// stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause()
}

// set progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100
}

video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayPauseIcon)
video.addEventListener('play', updatePlayPauseIcon )
video.addEventListener('timeupdate', updateProgress )

play.addEventListener('click', toggleVideoStatus)
stop.addEventListener('click', stopVideo)
progress.addEventListener('change', setVideoProgress)