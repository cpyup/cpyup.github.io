class CountDownManager {
    constructor(timer) {
        this.timer = timer;
        this.intervalId = null;
    }

    // Start the countdown
     startCountdown(timeInMs, mainTimeDisplay) {
        // Start the interval
        this.intervalId = setInterval(() => {
            if (timeInMs <= 0) {
                this.stopCount(mainTimeDisplay)
            } else {
                timeInMs -= 1000; // Decrease by 1 second (1000 milliseconds)

                // Update the UI with the new time
                this.timer.milliSec = timeInMs;
                mainTimeDisplay.value = this.timer.displayTimer();
            }
        }, 1000);
    }

    startCountUp(timeInMs, mainTimeDisplay){

        this.intervalId = setInterval(() => {
           
                timeInMs += 1;

                // Update the UI with the new time
                this.timer.milliSec = timeInMs;
                mainTimeDisplay.value = this.timer.displayStopWatch();
            
        }, 1);
    }

    // Stop the countdown manually
     stopCount(mainTimeDisplay) {

        clearInterval(this.intervalId); // Stop the interval
        this.intervalId = null; // Reset interval ID

        
        // Reset the display to its original state
        mainTimeDisplay.value = ""; // Reset to default
        console.log("Countdown finished!");
    }
}
