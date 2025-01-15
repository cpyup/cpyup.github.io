// Enum to handle valid timezones, set selectedZone with enum value from UI
const TimeZone = {
    EST: "America/New_York",
    PST: "America/Los_Angeles",
    CST: "America/Chicago",
    MST: "America/Denver",
    GMT: "GMT",
    EET: "Europe/Athens"
    // Add other time zones as needed
};

let timerRunning = false; 
let selectedZone;
let stopWatchRunning = false;
function showTime() {
    //let clock = null; // Specify the time zone
    const clockElement = document.getElementById("headerClock");
    // Ensure the element exists before trying to update it
    if (clockElement) {
        document.addEventListener('click', function(event) {
        if (event.target.matches('#EST')) selectedZone = TimeZone.EST
        else if (event.target.matches('#CST')) selectedZone = TimeZone.CST
        else if (event.target.matches('#MST')) selectedZone = TimeZone.MST
        else if (event.target.matches('#PST')) selectedZone = TimeZone.PST
        else if (event.target.matches('#EET')) selectedZone = TimeZone.EET
        else if (event.target.matches('#default')) selectedZone = clock. getSystemTimeZone()
    })
        clock = new Clock()
        clockElement.textContent = clock.getTimeZone(selectedZone);
    }
 
}

document.addEventListener('DOMContentLoaded', () => {
    
    setInterval(showTime, 1);
    let timerElement = document.getElementById("mainTimeDisplay");

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const addMin = document.getElementById('addMin');

    if (stopButton && startButton && !timerRunning && !stopWatchRunning) {
        startButton.addEventListener('click', () => {
            const timeString = timerElement.value.trim();

            let hours = 0, minutes = 0, seconds = 0;
            if (/^\d{0,1}$/.test(timeString)) {
                minutes = parseInt(timeString, 10);
            } else if (/^\d{1,2}$/.test(timeString)) {
                minutes = parseInt(timeString, 10);
            } else if (/^\d{2,3}$/.test(timeString)) {
                seconds = parseInt(timeString.slice(-2), 10);
                minutes = parseInt(timeString.slice(0, -2), 10) || 0;
            } else if (/^\d{3,4}$/.test(timeString)) {
                seconds = parseInt(timeString.slice(-2), 10);
                minutes = parseInt(timeString.slice(0, -2), 10);
            } else if (/^\d{6}$/.test(timeString)) {
                seconds = parseInt(timeString.slice(-2), 10);
                minutes = parseInt(timeString.slice(-4, -2), 10);
                hours = parseInt(timeString.slice(0, -4), 10);
            } else {
                console.log("Invalid format. Use HHMMSS, MMSS, MSS,, or M.");
                return;
            }

            if (
                hours >= 0 && hours < 24 &&
                minutes >= 0 && minutes < 60 &&
                seconds >= 0 && seconds < 60
            ) {
                const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                timerElement.value = formattedTime;

                const timer = new Timer(calcTotalMilliSec(hours, minutes, seconds));
                countdownManager = new CountDownManager(timer, timerElement);

                timerRunning = true;

                // Reset when countdown ends
                countdownManager.startCountdown(timer.getMilliSec(), timerElement, () => {
                    countdownManager.stopCount(timerElement);
                });
            }
        });

        stopButton.addEventListener('click', () => {
            if (timerRunning && !stopWatchRunning) {
                console.log("Stopping timer...");
                timerRunning = false;

                if (countdownManager) {
                    countdownManager.stopCount(timerElement);
                }
            }
        });
    }

    document.getElementById("Stopwatch").addEventListener('click', () =>{
        const stopWatch = new Timer(0);
        countdownManager = new CountDownManager(stopWatch, timerElement);
        if(!timerRunning){
        if(!stopWatchRunning){
            stopWatchRunning = true;
            countdownManager.startCountUp(stopWatch.getMilliSec(), timerElement)
        }
        else if(stopWatchRunning){
            stopWatchRunning = false;
            countdownManager.stopCount(timerElement)
        }
    }
    })

   function toggle(id) {
	const element = document.getElementById(id);

	if (!element)
		return false;

	element.hidden = !element.hidden;

	return !element.hidden;
}

document.getElementById('time-zone-button').addEventListener('click', () => {
	toggle("time-zone-menu");
	
}); 
});

// Helper function
function calcTotalMilliSec(hours, min, sec) {
    return (hours * 3600 + min * 60 + sec) * 1000;
}
