window.onload = init;

function init() {
	var startButton = document.getElementById("startBtn");
	startButton.addEventListener("click", handle_click);
}

var myInterval;

var countdown_date;

function getDateFromInput() {
	let targetDate = new Date();

	let hours_tens = document.getElementById("input1").value;
	let hours_ones = document.getElementById("input2").value;
	let minutes_tens = document.getElementById("input3").value;
	let minutes_ones = document.getElementById("input4").value;
	let seconds_tens = document.getElementById("input5").value;
	let seconds_ones = document.getElementById("input6").value;

	let addedMilliseconds = 0;
	addedMilliseconds += parseInt(seconds_ones) * 1000;
	addedMilliseconds += parseInt(seconds_tens) * 1000 * 10;
	addedMilliseconds += parseInt(minutes_ones) * 1000 * 60;
	addedMilliseconds += parseInt(minutes_tens) * 1000 * 600;
	addedMilliseconds += parseInt(hours_ones) * 1000 * 3600;
	addedMilliseconds += parseInt(hours_tens) * 1000 * 36000;

	targetDate = new Date(targetDate.getTime() + addedMilliseconds);

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

function countdown_finished() {
	let finish_sound = document.getElementById("timerEndSound");
	finish_sound.loop = false;
	finish_sound.play();

	document.body.style.backgroundColor = "red";

	setTimeout(() => {
		document.body.style.backgroundColor = "rgb(37, 37, 37)";
	}, 500);

	setTimeout(() => {
		document.body.style.backgroundColor = "red";
	}, 1000);

	setTimeout(() => {
		document.body.style.backgroundColor = "rgb(37, 37, 37)";
	}, 1500);

	setTimeout(() => {
		document.body.style.backgroundColor = "red";
	}, 2000);

	setTimeout(() => {
		document.body.style.backgroundColor = "rgb(37, 37, 37)";
	}, 2500);
}
