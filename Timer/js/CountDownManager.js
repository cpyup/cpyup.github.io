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

        setInterval(() => {
            mainTimeDisplay.value = "Time's Up!"
        }, 1);
        setTimeout(() => {
            location.reload();
        }, 1000)
        mainTimeDisplay.value = ""; // Reset to defaul
    }
}
