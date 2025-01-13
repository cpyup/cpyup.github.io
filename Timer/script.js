// Enum to handle valid timezones, set selectedZone with enum value from UI
const timezones = Object.freeze({
	PACIFIC: 'PST',
	MOUNTAIN: 'MST',
	CENTRAL: 'CST',
	EASTERN: 'EST',
});

function showTime() {  
    const now = new Date();
    let time = now.toLocaleTimeString('en-US',{timeZone: selectedZone});
    document.getElementById("MyClockDisplay").textContent = time;
    setTimeout(showTime, 100);
}

let remainingTime; // Total remaining time in seconds
var timerInterval;
var timerElement;
var customMinutes;
var timerRunning = false;
var addMinutes;
let selectedZone = timezones.EASTERN; // Currently selected timezone
const soundIcon = document.getElementById('soundIcon');
const muteIcon = document.getElementById('muteIcon');
let isMuted = false;
let alarmPlaying = false; // Keep track of whether the alarm is allowed to play
var restartTime;

    // STOPWATCH METHODS
    let usingStopwatch = false; // Determines whether or not the Stopwatch function should start when appropriate buttons are clicked  Automatically false.
    let startTime; // to keep track of the start time
    let stopwatchInterval; // to keep track of the interval (how often the stopwatch updates.)
    let elapsedPausedTime = 0; // to keep track of the elapsed time while stopped
  


  let time = "";
  showTime();

  document.getElementById("customMinButton").addEventListener("click", function() {
    const customMinContainer = document.getElementById("customMinContainer");
    
    // Toggle the hidden class to show/hide the container
    if (customMinContainer.classList.contains("hidden")) {
        customMinContainer.classList.remove("hidden");
        customMinContainer.style.display = "block"; // Ensure it is visible
    } else {
        customMinContainer.classList.add("hidden");
        customMinContainer.style.display = "none"; // Ensure it is hidden
    }
});


document.getElementById("timerBtn").addEventListener("click", function() {
    // Show or hide the button row when the Timer button is clicked
    const buttonRow = document.querySelector('.button-row');
    buttonRow.classList.toggle('hidden');

});
  
  document.addEventListener('click', function(event) {
    if (event.target.matches('#oneMin')) setTime(60);
    else if (event.target.matches('#fiveMin')) setTime(300);
    else if (event.target.matches('#tenMin')) setTime(600);
    else if (event.target.matches('#thirtyMin')) setTime(1800);
    else if (event.target.matches('#oneHour')) setTime(3600);
    else if (event.target.matches('#customTimer')) customTime();
	else if (event.target.matches('#customTarget')) getTargetTimeInput();
    else if (event.target.matches('#addMin')) addMinutes(1);
    else if (event.target.matches('#stop')) stopTimer();
    else if (event.target.matches('#pause')) pauseTimer();
    else if (event.target.matches('#restart')) restartTimer();
    else if (event.target.matches('#start')) 
        if(!timerRunning && !usingStopwatch){startTimer();}
});
// Add event listener for toggling sound/mute
soundIcon.addEventListener('click', toggleAudio());
muteIcon.addEventListener('click', toggleAudio());

function getTargetTimeInput(){
  	// Input will be received as a time HH:mm
    targetTime = prompt("Enter target time as 'HH:mm'");
    let [hours, minutes] = targetTime.split(':').map(Number);
	setTime(calculateTargetTime(hours,minutes));
	startTimer();
  }
  
  function calculateTargetTime(targetHours,targetMinutes){
  	// subtract currentTime from target time
    let targetTime = new Date();
    let tH = targetHours - targetTime.getHours();
    let tM = targetMinutes - targetTime.getMinutes();
	let tS = targetTime.getSeconds();
    return ((tM += tH * 60) * 60)-tS;  
  }

function toggleAudio() {
    // Only allow the alarm to play if the timer is running and time is 5 seconds or less
    if (remainingTime > 5 || !alarmPlaying) return;

    if (isMuted) {
        playAudioLoop("alarm"); // Resume playing the sound
        soundIcon.style.display = "block";
        muteIcon.style.display = "none";
    } else {
        stopAudioLoop("alarm"); // Mute the sound
        soundIcon.style.display = "none";
        muteIcon.style.display = "block";
        !isMuted;
    }
      // Toggle the mute state
}

// 
function setTime(seconds){
    remainingTime = seconds;
    const clockDisplay = document.getElementById("MyClockDisplay");
    lastSetTime = remainingTime;

    clockDisplay.classList.add('shrink', 'fade');

    // Hide the buttons, inputs, etc.
    document.querySelector('.button-container').classList.add('hidden-elements');
    document.getElementById("timerBtn").classList.add('hidden-elements'); // Ensure the Timer button is hidden

    setTimeout(() => {
        timerElement = document.createElement("div");
        timerElement.id = "timerDisplay";
        document.body.appendChild(timerElement);
        timerElement.classList.add('grow');
        timerElement.textContent = formatTime(remainingTime);
    }, 1000);
    
};

function pauseTimer(){
    
    if(timerRunning){
        clearInterval(timerInterval);
        timerRunning = false
    }
    else{
        startTimer();
        timerRunning = true
    }

}

function startTimer() {
    
    timerRunning = true
    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            stopAudioLoop("alarm"); // Stop the audio when time's up
            alarmPlaying = false;   // Reset the flag
            timerElement.textContent = "Time's Up!";
            setTimeout(() => {
                document.body.removeChild(timerElement);
                resetClockDisplay();
            }, 5000);
            timerRunning = false;
        } else {
            if (remainingTime <= 10 && !alarmPlaying) {
                playAudioLoop("alarm"); // Play the alarm in the last 5 seconds
                alarmPlaying = true;    // Allow sound control
            }
            remainingTime--;
            timerElement.textContent = formatTime(remainingTime);
        }
    }, 1000);
    
}  
  function stopTimer() {
    
    clearInterval(timerInterval);
    document.body.removeChild(timerElement);
        resetClockDisplay();
    
    timerRunning = false;
  }
  
function addMinutes(minutes){
    
        if(timerRunning){
            stopTimer();

            remainingTime += minutes * 60;

            setTime(remainingTime);
            
            startTimer();
        }
  };

    function restartTimer() {
        stopTimer();

        setTime(lastSetTime);
    };
    
  function customTime(){
    customMinutes = prompt("Enter time in minutes:");
      if (customMinutes) {
          setTime(parseInt(customMinutes*60));
      }
  };
  
  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  
  function resetClockDisplay() {
      const clockDisplay = document.getElementById("MyClockDisplay");
      clockDisplay.classList.remove('shrink', 'fade');
  }
  
  // Dropdown Menu Toggling
  document.getElementById("menuIcon").addEventListener("click", function () {
      var checkfortimer = document.getElementById('timerDisplay');
      if (checkfortimer) {
          document.body.removeChild(checkfortimer);
          resetClockDisplay();
      } else {
          var dropdownMenu = document.getElementById("dropdownMenu");
          dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
      }
  });
  
  window.onclick = function (event) {
      if (!event.target.matches('#menuIcon')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          for (var i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.style.display === "block") {
                  openDropdown.style.display = "none";
              }
          }
      }
  }
  
  // Fullscreen Button Functionality
  function clickImg(img) {
      if (isDocumentInFullScreenMode()) {
          closeFullscreen();
      } else {
          openFullscreen();
      }
  }
  
  function isDocumentInFullScreenMode() {
      return document.fullscreenElement !== null;
  }
  
  var elem = document.documentElement;
  
  function openFullscreen() {
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
      }
  }
  
  function closeFullscreen() {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
  }
  
  // Hiding UI Icons With Inactivity
  const fullscreenIcon = document.getElementById('fullscreenicon');
  const timerIcon = document.getElementById('menuIcon');
  const dropmenuContent = document.getElementById("dropdownMenu");
  let inactivityTimeout;
  
  function showFullscreenIcon() {
      fullscreenIcon.classList.remove('hidden');
      timerIcon.classList.remove('hidden');
      dropmenuContent.classList.remove('hidden');
  }
  
  function hideFullscreenIcon() {
      fullscreenIcon.classList.add('hidden');
      timerIcon.classList.add('hidden');
      dropmenuContent.classList.add('hidden');
  }
  
  function resetInactivityTimeout() {
      clearTimeout(inactivityTimeout);
      showFullscreenIcon();
      inactivityTimeout = setTimeout(hideFullscreenIcon, 1500);
  }
  
  document.addEventListener('mousemove', resetInactivityTimeout);
  document.addEventListener('keydown', resetInactivityTimeout);
  inactivityTimeout = setTimeout(hideFullscreenIcon, 1500);
  
  // AUDIO CONTROL

  // Plays audio from specified elementID
  // ID for the alarm = "alarm" ID for Warning Alarm = "warningAlarm"
  // Ex. playAudioLoop("alarm") -> plays the audio file alarm.mp3
  // playAudioLoop("warningAlarm") -> plays the audio file warningAlarm.mp3
  function playAudioLoop(audio) {
    audio = document.getElementById(audio);
    audio.loop = true;
    audio.play();
  }

  // Pauses audio from specified elementID and stops the looping.
  // Alarm = "alarm", Warning Alarm = "warningAlarm"
  // Ex. stopAudioLoop("alarm") -> stops the pauses alarm.mp3 and stops looping alarm.mp3
  function stopAudioLoop(audio) {
    audio = document.getElementById(audio);
    audio.loop = false;
    audio.pause();
  }

  function useStopwatch() {
    usingStopwatch = usingStopwatch ? false: true; // Toggles usingStopwatch
    document.getElementById("stopwatchStatus").innerHTML = "Stopwatch Buttons Active: " + usingStopwatch;
    console.log("Stopwatch Active: " + usingStopwatch);
  }

  // Stopwatch Event Listeners: start, pause, restart
  document.addEventListener('click', function(event) {
    if (event.target.matches('#start') && usingStopwatch) startStopwatch();
    else if (event.target.matches('#pause') && usingStopwatch) pauseStopwatch();
    else if (event.target.matches('#restart') && usingStopwatch) restartStopwatch();
});

  // Stopwatch info from: https://www.educative.io/answers/how-to-create-a-stopwatch-in-javascript
  function startStopwatch() {
    console.log("Stopwatch Started")
    if (!stopwatchInterval) { // If stopwatch doesn't have an interval
        startTime = new Date().getTime() - elapsedPausedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10);
    }
  }
  
  function pauseStopwatch(isRestart) {
    if (!isRestart) {console.log("Stopwatch Paused")} 
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval); // stop the interval from updating
        elapsedPausedTime = new Date().getTime() - startTime; // calculate amount of time paused
        stopwatchInterval = null; // reset the interval variable
    }
}

  function restartStopwatch() {
    console.log("Stopwatch Restarted")
    pauseStopwatch(true); // stops the interval, and passes true so that it does not log the "Stopwatch Paused"
    elapsedPausedTime = 0; // reset the elapsed pause time variable
    document.getElementById("stopwatch").innerHTML = "00:00:00.000"; // reset display
  }

  function updateStopwatch() {
    let currentTime = new Date().getTime(); // get current time in milliseconds
    let elapsedTime = currentTime - startTime; // calculate the elapsed time in milliseconds
    let milliseconds = Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, '0'); // show only the first two digits of milliseconds
    let seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    let minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    let hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    let displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) + "." + milliseconds; // format display time
    document.getElementById("stopwatch").innerHTML = displayTime; // update the display
  }

  function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }

