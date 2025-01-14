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


function showTime() {

    //let clock = null; // Specify the time zone
    const clockElement = document.getElementById("headerClock");
    // Ensure the element exists before trying to update it
    if (clockElement) {

        clock = new Clock(TimeZone.EST)

        clockElement.textContent = clock.getTimeZone(TimeZone.EST);
    }

}
let timerElement = document.getElementById("mainTimeDisplay");

document.addEventListener('DOMContentLoaded', () => {
   
    // Initialize the clock and update every second
    showTime();
    setInterval(showTime, 1000);

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    if (startButton && !timerRunning) {
        startButton.addEventListener('click', () => {
            const timeString = document.getElementById('mainTimeDisplay').value.trim();

            // Determine the format and extract time components
            let hours = 0, minutes = 0, seconds = 0;
            if (/^\d{0,1}$/.test(timeString)) {
                // Format: M
                minutes = parseInt(timeString, 10);
            } 
            if (/^\d{1,2}$/.test(timeString)) {
                // Format: MM
                minutes = parseInt(timeString, 10);
            } else if (/^\d{2,3}$/.test(timeString)) {
                // Format: MSS
                seconds = parseInt(timeString.slice(-2), 10);
                minutes = parseInt(timeString.slice(0, -2), 10) || 0;
            } else if (/^\d{3,4}$/.test(timeString)) {
                // Format: MMSS
                seconds = parseInt(timeString.slice(-2), 10);
                minutes = parseInt(timeString.slice(0, -2), 10);
            } else if (/^\d{6}$/.test(timeString)) {
                // Format: HHMMSS
                seconds = parseInt(timeString.slice(-2), 10);
                minutes = parseInt(timeString.slice(-4, -2), 10);
                hours = parseInt(timeString.slice(0, -4), 10);
            } else {
                console.log("Invalid format. Use HHMMSS, MMSS, MSS, or SS.");
                return;
            }

            // Validate range for hours, minutes, and seconds
            if (
                hours >= 0 && hours < 24 &&
                minutes >= 0 && minutes < 60 &&
                seconds >= 0 && seconds < 60
            ) {
                // Convert to HH:MM:SS format and pass it to setTime
                const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                document.getElementById('mainTimeDisplay').value = formattedTime;
                const timer = new Timer(calcTotalMilliSec(hours, minutes, seconds))
                const countdownManager = new CountDownManager(timer);
            
                timerRunning;
                console.log(timer)
                countdownManager.startCountdown(timer.getMilliSec());
                
                
            }
        });
    }
    if(stopButton && timerRunning){
        stopButton.addEventListener('click', ()=>{

        countdownManager.stopCount()
        !timerRunning
        console.log(countdownManager)
        console.log("Click")
        });
    }
  
});

function calcTotalMilliSec(hours, min, sec){
    return (hours * 3600 + min * 60 + sec) * 1000
};





