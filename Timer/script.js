let timerRunning = false; 

function showTime() {
    let timeZone;
    
    let clock = null; // Specify the time zone
    const clockElement = document.getElementById("headerClock");

    document.addEventListener('click', function(event){
        if(event.target.matches('PST')) {
            timeZone = TimeZone.PST
            console.log("Click")
        }else{
            timeZone = TimeZone.EST
        }
    });
    // Ensure the element exists before trying to update it
    if (clockElement) {

        clock = new Clock(timeZone)

        clockElement.textContent = clock.getTimeZone(timeZone);

        //Switches Time Zone when on click
      /*  document.addEventListener('click', function(event) {
            if (event.target.matches('EST')) clockElement.textContent = clock.getTimeZone(TimeZone.EST);
            else if (event.target.matches('CST'))clockElement.textContent =clock.getTimeZone(TimeZone.CST);
            else if (event.target.matches('MST'))clockElement.textContent = clock.getTimeZone(TimeZone.MST);
            else if (event.target.matches("PST")) {  
                clock = new Clock(TimeZone.PST);
                clockElement.textContent = clock.getTimeZone(TimeZone.PST);
            }
            else if (event.target.matches('EET'))clockElement.textContent = clock.getTimeZone(TimeZone.EET); 
            else{clockElement.textContent = clock.getTimeZone(clock.getSystemTimeZone());}
        }); */

        
    }

}
let timerElement = document.getElementById("mainTimeDisplay");




document.addEventListener('DOMContentLoaded', () => {
    const stopWatch = new Timer(0); 
    // Initialize the clock and update every second
    showTime();
    setInterval(showTime, 1000);

    // Add event listener for setTimeButton
    const countdownManager = null;
    const timer = null;
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
                if(timer === null){
                    console.log("Timer is null")
                }
                const countdownManager = new CountDownManager(timer);
                if(countdownManager === null){
                    console.log("CountDown is null")
                }
                timerRunning;
                
                countdownManager.startCountdown(timer.getMilliSec());
                
            } else {
                console.log("Invalid time value. Ensure 00 <= HH < 24, 00 <= MM < 60, 00 <= SS < 60.");
            }
        });
    } 
    if (stopButton && timerRunning) {
        stopButton.addEventListener('click', () => {
            console.log("Click stop")
            countdownManager.stopCount();
            !timerRunning;
        });
    }  
});

function calcTotalMilliSec(hours, min, sec){
    return (hours * 3600 + min * 60 + sec) * 1000
};





