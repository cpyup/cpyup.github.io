class Timer{
    constructor(milliSec){
        this.milliSec = milliSec;
    }
    getMilliSec(){
        return this.milliSec;
    }
    getHours() {
        return Math.floor(this.milliSec / 3600000); // 1 hour = 3600000 milliseconds
    }
    // Method to get the total minutes
    getMinutes() {
        return Math.floor(this.milliSec / 60000); // 1 minute = 60,000 milliseconds
    }

    // Method to get the remaining seconds
    getSeconds() {
        return Math.floor((this.milliSec % 60000) / 1000); // 1 second = 1000 milliseconds
    }

    addTime(timeToAdd){
        this.milliSec = timeInMs + timeToAdd;
        return this.milliSec
    }
    // Format time as HH:MM:SS
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Display timer time
    displayTimer() {
        return this.formatTime(this.remainingTime);
    }

    // Display stopwatch time (future implementation)
    displayStopWatch() {
        return this.formatTime(this.remainingTime);
    }
}