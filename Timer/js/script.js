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
let timeZone;

function showTime() {
    //let clock = null; // Specify the time zone
    const clockElement = document.getElementById("headerClock");
    // Ensure the element exists before trying to update it
    if (clockElement) {
        document.addEventListener('click', function(event){
            if(event.target.matches('PST')){ 
                timeZone = TimeZone.PST
            }
            else timeZone = clock.getSystemTimeZone();
        })
        clock = new Clock(timeZone)
        clockElement.textContent = clock.getTimeZone(timeZone);
    }
 
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(showTime, 1000);
    let timerElement = document.getElementById("mainTimeDisplay");

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    if (stopButton && startButton && !timerRunning) {
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
                console.log("Invalid format. Use HHMMSS, MMSS, MSS, or SS.");
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
                countdownManager.startCountdown(timer.getMilliSec(), () => {
                    timerElement.value = "00:00:00"; // Reset to default
                    timerRunning = false;
                });
            }
        });

        stopButton.addEventListener('click', () => {
            if (timerRunning) {
                console.log("Stopping timer...");
                timerRunning = false;

                if (countdownManager) {
                    countdownManager.stopCountdown();
                }

                timerElement.value = ""; // Optionally reset display on stop
            }
        });
    }
});

// Helper function
function calcTotalMilliSec(hours, min, sec) {
    return (hours * 3600 + min * 60 + sec) * 1000;
}
