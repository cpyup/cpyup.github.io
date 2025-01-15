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
                this.timer.remainingTime = timeInMs;
                mainTimeDisplay.value = this.timer.displayTimer();
            }
        }, 1000);
    }

    startCountUp(timeInMs, timer){

        if (timeInMs < 0) {
            console.log("Invalid time, Stop Watch not started.");
            return;
        }
        // Update the display every second
        if(timeInMs > 0){
    setInterval(() => {
        if(timeInMs <= 0){
            clearInterval(timeInMs);
            console.log("Time's Up");
            timerElement = document.getElementById("mainTimeDisplay");
        }
        console.log(timeInMs)
            timeInMs += 1; // increase by 1 ms
            // Update the UI with the new time
            document.getElementById('mainStopWatch').value = timer.displayStopWatch();
    }, 1)};
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
