function showTime() {  
    const now = new Date();
    let time = now.toLocaleTimeString('en-US',{timeZone: selectedZone});
    document.getElementById("MyClockDisplay").textContent = time;
    setTimeout(showTime, 100);
}

const audio = new Audio();
let alarm = document.getElementById("alarm");
let warningAlarm = document.getElementById("warningAlarm");
let remainingTime; // Total remaining time in seconds
var timerInterval;
var customMinutes;
var timerRunning = false;
var addMinutes;
const soundIcon = document.getElementById('soundIcon');
const muteIcon = document.getElementById('muteIcon');
let isMuted = false;
let alarmPlaying = false; // Keep track of whether the alarm is allowed to play
var restartTime;

// For Add Time
document.addEventListener('click', function(event) {
    if (event.target.matches('#oneMin')) setTime(60);
    else if (event.target.matches('#thirtySec')) setTime(10); // For debugging and presentation purposes.
    else if (event.target.matches('#fiveMin')) setTime(300);
    else if (event.target.matches('#tenMin')) setTime(600);
    else if (event.target.matches('#thirtyMin')) setTime(1800);
    else if (event.target.matches('#oneHour')) setTime(3600);
    else if (event.target.matches('#customTimer')) customTime();
	else if (event.target.matches('#customTarget')) getTargetTimeInput();
    else if (event.target.matches('#addThirtySec')) addMinutes(.5);
    else if (event.target.matches('#addMin')) addMinutes(1);
    else if (event.target.matches('#addFiveMin')) addMinutes(5);
    else if (event.target.matches('#stop')) stopTimer();
    else if (event.target.matches('#pause')) pauseTimer();
    else if (event.target.matches('#restart')) restartTimer();
    else if (event.target.matches('#start')) {

        if(!timerRunning && remainingTime){startTimer();}
    }
    
});

// Fires when enter key is pressed in input.
timerElement.addEventListener("keyup", function (event) {
    if (event.target.matches('#mainTimeDisplay') && event.key === 'Enter' && timerRunning == false) {
        let targetTime = event.target.value;
        getTargetTimeInput(targetTime);
        startTimer();
    }
});

// Sets time
function setTime(seconds){
    console.log("Time set to: " + seconds);
    remainingTime = seconds;
    lastSetTime = remainingTime;

    setTimeout(() => {
        const timeDisplay = timerElement.value;
        if (timeDisplay) {
            timeDisplay.textContent = formatTime(remainingTime);
        } else {
            const newDisplay = document.createElement("p");
            newDisplay.textContent = formatTime(remainingTime);
            timerElement.appendChild(newDisplay);
        }
        timerElement.textContent = formatTime(remainingTime);
    }, 500);
    
};

function getTargetTimeInput(targetTime) {
    let times = targetTime.split(':');
    times = times.reverse(); // Reversing because the input event listener is weird and backwards!!!!!!
    switch (times.length) {
        case 1 :
            newTime = Number(times[0]);
            setTime(newTime);
            console.log("Seconds: " + " " + newTime);
            break;
        case 2:
            newTime = Number(times[1]) * 60  + Number(times[0]);
            setTime(newTime);
            console.log(" Minutes: " + times[1] + " Seconds " + times[0]);
            console.log("Converted to Seconds: " + newTime);
            break;
        case 3:
            newTime = Number(times[2]) * 3600 + Number(times[1]) * 60 + Number(times[0]);
            setTime(newTime);
            console.log("Hours: " + times[2] + " Minutes: " + times[1] + " Seconds " + times[0]);
            console.log("Converted to Seconds: " + newTime);
            break;
        default:
            console.error("Invalid input");
            return;
    }
}

function pauseTimer() {
    if(timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false
    }
    else {
        startTimer();
        timerRunning = true
    }
}

function restartTimer() {
    stopTimer();

    setTime(lastSetTime);
};

function startTimer() {
    timerRunning = true;
    console.log("timeRunning: " + timerRunning);
    const totalTime = remainingTime;
    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            stopAudio(warningAlarm);
            playAudio(alarm, false);
            stopAudio(alarm);
            alarmPlaying = false;   // Reset the flag
            timerElement.textContent = "Time's Up!";
            timerRunning = false;
        } else {
            if (totalTime >= 30) {
                const last20PercentTime = totalTime * .5;
                if (remainingTime <= last20PercentTime && !alarmPlaying) {
                    playAudio(warningAlarm, false);
                    alarmPlaying = true;
                }
            }
            remainingTime--;
            console.log(remainingTime);
            timerElement.value = formatTime(remainingTime);
        }
    }, 1000);
}  

function addMinutes(minutes){
    
    if(timerRunning){
        stopTimer();
        remainingTime += minutes * 60;
        setTime(remainingTime);
        
        startTimer();
    }
};

function addSeconds(seconds) {
    if (timerRunning) {
        stopTimer();

        remainingTime += seconds;

        setTime(remainingTime);

        startTimer();
    }
}

// Formats the look of the active timer.
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const timeParts = [];
    if (hours > 0) {
        timeParts.push(String(hours).padStart(2, '0'));
    }
    if (minutes > 0 || hours > 0) { // Include minutes if hours are present
        timeParts.push(String(minutes).padStart(2, '0'));
    }
    timeParts.push(String(remainingSeconds).padStart(2, '0'));

    return timeParts.join(':');
}

// Audio Controls

function playAudio(audio, isLoop) {
    audio.loop = isLoop;
    audio.play();
  }

  function stopAudio(audioPath) {
    audio.src = audioPath;
    audio.loop = false;
    audio.pause();
  }