class Timer{
    constructor(milliSec){
        this.milliSec = milliSec
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


    // For future stop wathc funciton
    displayStopWatch() {
        const hours = this.getHours();
        const minutes = this.getMinutes();
        const seconds = this.getSeconds();
        const milliseconds = this.getMilliSec();
        return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
    }

    displayTimer(){
        const hours = this.getHours();
        const minutes = this.getMinutes();
        const seconds = this.getSeconds();
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    
    setTime(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        this.milliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000; // Convert to milliseconds
    }

}