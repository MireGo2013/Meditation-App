const app = () => {
	sounds.addEventListener('click', changeStyleSong)

	// Make btn for long time song 

	function setLongTimeSongBtn(e) {
		if (e.target.closest('button')) {
			fakeDuration = e.target.getAttribute('data-time');
			timeDisplay.textContent = getTimeString(0);
		}
	}

	timeSelectBtn.addEventListener('click', setLongTimeSongBtn)

	// Make timer for song and svg 
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;
		let progress = getProgress(currentTime);
		outline.style.strokeDashoffset = progress;
		timeDisplay.textContent = getTimeString(currentTime);
		if (currentTime >= fakeDuration) {
			song.currentTime = 0;
			pause();
		}
	};
};

function getTimeString(currentTime) {
	let elapsedTime = fakeDuration - currentTime;
	let seconds = Math.floor(elapsedTime % 60);
	let minutes = Math.floor(elapsedTime / 60);
	return `${addZero(minutes)}:${addZero(seconds)}`;
}

function getProgress(currentTime) {
	return outlineLength - (currentTime / fakeDuration) * outlineLength;
}

//Add zero to time < 10
function addZero(n) {
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
app()