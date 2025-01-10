class CountDownManager {
    constructor(timer) {
        this.timer = timer; // Accept a timer instance
    }

    // Start the countdown
    startCountdown(timeInMs) {
        // Ensure timer is set
        
        if (timeInMs <= 0) {
            console.log("Invalid time, countdown not started.");
            return;
        }

        // Update the display every second
        setInterval(() => {
            if (timeInMs > 0) {
                timeInMs -= 1000; // Decrease by 1 second (1000 milliseconds)
                const timer = new Timer(timeInMs);
                
                // Update the UI with the new time
                document.getElementById('mainTimeDisplay').value = timer.displayTimer();

            }  
        }, 1000);
    }

    startCountUp(timeInMs, timer){

        if (timeInMs < 0) {
            console.log("Invalid time, Stop Watch not started.");
            return;
        }
        // Update the display every second
        setInterval(() => {
        
            console.log(timeInMs)
                timeInMs += 1; // increase by 1 ms
                // Update the UI with the new time
                document.getElementById('mainStopWatch').value = timer.displayStopWatch();
    }, 1);
    }

    // Stop the countdown manually
    stopCount() {
        if (this.intervalId) {
            clearInterval(this.intervalId); // Stop the countdown interval
            this.intervalId = null;
        }
    }
}
