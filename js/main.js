const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving_outline circle');
const outlineLength = outline.getTotalLength();
const video = document.querySelector('.video_conteiner video');
const sounds = document.querySelectorAll('.sound_picker button');
const timeDisplay = document.querySelector('.time_display');
const timeSelectBtn = document.querySelectorAll('.time_select button');

let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;


const app = () => {

	play.addEventListener('click', () => {
		checkPlaying(song);
	});

	// Make btn for style song 
	sounds.forEach(btn => {
		btn.addEventListener('click', function () {
			song.src = this.getAttribute('data-sound');
			video.src = this.getAttribute('data-video');
			checkPlaying(song);
		});
	});

	// Make btn for long time song 
	timeSelectBtn.forEach(btn => {
		btn.addEventListener('click', function () {
			fakeDuration = this.getAttribute('data-time');
			timeDisplay.textContent = `${addZero(Math.floor(fakeDuration / 60))}:${addZero(Math.floor(fakeDuration % 60))}`
		});
	});

	// Make play btm
	const checkPlaying = (song) => {
		if (song.paused) {
			song.play();
			video.play();
			play.src = "../svg/pause.svg";
		} else {
			song.pause();
			video.pause();
			play.src = '../svg/play.svg';
		};
	};

	// Make timer for song and svg 
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;
		let elapsedTime = fakeDuration - currentTime;
		let seconds = Math.floor(elapsedTime % 60);
		let minutes = Math.floor(elapsedTime / 60);
		let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
		outline.style.strokeDashoffset = progress;
		console.log(outlineLength)
		timeDisplay.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
		if (currentTime >= fakeDuration) {
			song.pause();
			song.currentTime = 0;
			play.src = '../svg/play.svg';
			video.pause();
		}
	};


};
//Add zero to time < 10
function addZero(n) {
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

app()



