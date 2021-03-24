const song = document.getElementById('song');
const video = document.querySelector('.video_conteiner video');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving_outline circle');
const timeDisplay = document.getElementById('time_display');
const timeSelectBtn = document.querySelector('.time_select');
const sounds = document.querySelector('.sound_picker');
const outlineLength = outline.getTotalLength();

let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

function app () {

	play.addEventListener('click', () => {
		checkPlaying();
	});

	// Make btn for style song and video
	function changeStyleSong(e) {
		if (e.target.closest('.sound_btn')) {
			song.src = e.target.parentNode.getAttribute('data-sound');
			video.src = e.target.parentNode.getAttribute('data-video');
			checkPlaying();
		}
	}

	sounds.addEventListener('click', changeStyleSong)

	// Make btn for long time song 

	function setLongTimeSongBtn(e) {
		if (e.target.closest('button')) {
			fakeDuration = e.target.getAttribute('data-time');
			pauseVideo()
			song.currentTime = 0;
			timeDisplay.textContent = getTimeString(0);
		}
	}

	timeSelectBtn.addEventListener('click', setLongTimeSongBtn)

	// Make play btm
	function checkPlaying() {
		if (song.paused) {
			playVideo()
		} else {
			pauseVideo()
		};
	};

	function playVideo() {
		song.play();
		video.play();
		play.src = "./svg/pause.svg";
	}

	function pauseVideo() {
		song.pause();
		video.pause();
		play.src = "./svg/play.svg";
	}

	// Make timer for song and svg 
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;
		let progress = getProgress(currentTime);
		outline.style.strokeDashoffset = progress;
		timeDisplay.textContent = getTimeString(currentTime)
		if (currentTime >= fakeDuration) {
			song.currentTime = 0;
			pauseVideo()
		}
	};

	function getTimeString(currentTime) {
		let elapsedTime = fakeDuration - currentTime;
		let seconds = Math.floor(elapsedTime % 60);
		let minutes = Math.floor(elapsedTime / 60);
		return `${addZero(minutes)}:${addZero(seconds)}`
	}

	function getProgress(currentTime) {
		return outlineLength - (currentTime / fakeDuration) * outlineLength;
	}

	function addZero(n) {
		return (parseInt(n, 10) < 10 ? '0' : '') + n;
	}
};

app()



