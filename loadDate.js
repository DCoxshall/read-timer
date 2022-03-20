//This might honestly have the highest code functionality to code cleanliness
// ratio of anything I have ever written

window.onload = init;

function init() {
	var startButton = document.getElementById("startBtn");
	startButton.addEventListener("click", handle_click);
	var clearButton = document.getElementById("clearBtn");
	clearButton.addEventListener("click", clear_clock);
	var soundButton = document.getElementById("soundBtn");
	soundButton.addEventListener("click", toggle_sound);
	loadSplashText();
}

function clear_clock() {
	let button = document.getElementById("startBtn");
	clearInterval(myInterval);
	button.innerHTML = "START";

	for (let i = 1; i < 7; i++) {
		let clock_field = document.getElementById(`input${i}`);
		clock_field.value = 0;
	}
}

function toggle_sound() {
	if (soundActive == false) {
		soundActive = true;

		document.getElementById("soundIcon").classList.remove("fa-volume-mute");
		document.getElementById("soundIcon").classList.add("fa-volume-up");
		var beep = document.getElementById("beep");
		beep.loop = false;
		beep.volume = 0.2;
		beep.play();
	} else {
		soundActive = false;

		document.getElementById("soundIcon").classList.remove("fa-volume-up");
		document.getElementById("soundIcon").classList.add("fa-volume-mute");
	}
}

var soundActive = false;

var myInterval;

var countdown_date;

function getDateFromInput() {
	let targetDate = new Date();

	let multipliers = [36000000, 3600000, 600000, 60000, 10000, 1000];

	let addedMilliseconds = 0;

	for (let i = 1; i < 7; i++) {
		let current_input = document.getElementById(`input${i}`);
		addedMilliseconds += parseInt(current_input.value) * multipliers[i - 1];
	}

	targetDate = new Date(targetDate.getTime() + addedMilliseconds);

	console.log("added milliseconds = " + addedMilliseconds.toString());

	console.log(new Date());
	console.log(targetDate);

	return targetDate;
}

function handle_click() {
	let button = document.getElementById("startBtn");
	if (button.innerHTML == "START") {
		button.innerHTML = "STOP";
		countdown_date = getDateFromInput();
		myInterval = setInterval(update_clock, 100);
	} else {
		button.innerHTML = "START";
		clearInterval(myInterval);
	}
}

function update_clock() {
	let now = new Date();

	deltams = countdown_date - now;

	if (deltams <= 0) {
		countdown_finished();
		clearInterval(myInterval);
		return;
	}

	/* For some reason I had to take an hour off because JavaScript has an autistic meltdown otherwise
	Programmers aren't good on dates. */
	distance = new Date(deltams - 3600000);

	let hours = distance.getHours().toString();
	let minutes = distance.getMinutes().toString();
	let seconds = distance.getSeconds().toString();

	if (seconds.length == 1) {
		seconds = "0".concat(seconds);
	}
	if (minutes.length == 1) {
		minutes = "0".concat(minutes);
	}
	if (hours.length == 1) {
		hours = "0".concat(hours);
	}

	document.getElementById("input1").value = hours[0];
	document.getElementById("input2").value = hours[1];
	document.getElementById("input3").value = minutes[0];
	document.getElementById("input4").value = minutes[1];
	document.getElementById("input5").value = seconds[0];
	document.getElementById("input6").value = seconds[1];
}

var bodyBackgroundColor = "rgb(37, 37, 37)";
var colorSwapInterval;

function countdown_finished() {
	document.getElementById("startBtn").innerHTML = "START";

	if (soundActive) {
		let finish_sound = document.getElementById("timerEndSound");
		finish_sound.loop = false;
		finish_sound.play();
	}

	toggleBackgroundColor();

	colorSwapInterval = setInterval(() => {
		toggleBackgroundColor();
	}, 500);

	setTimeout(() => {
		clearInterval(colorSwapInterval);
		document.body.style.backgroundColor = "rgb(37, 37, 37)";
	}, 3000);
}

function toggleBackgroundColor() {
	if (bodyBackgroundColor == "rgb(37, 37, 37)") {
		bodyBackgroundColor = "red";
	} else {
		bodyBackgroundColor = "rgb(37, 37, 37)";
	}
	document.body.style.backgroundColor = bodyBackgroundColor;
}

function loadSplashText() {
	let splashText = ["TIMER"];
	let len = splashText.length;
	let randomIndex = Math.floor(Math.random() * len);
	randomElement = splashText[randomIndex];
	document.title = randomElement;
}
