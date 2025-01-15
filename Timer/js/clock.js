
class Clock {
    constructor(timeZone = this.getSystemTimeZone()) { // Default to system's time zone
        this.timeZone = timeZone; // Set the timezone
    }
    
    // Method to get the system's time zone
     getSystemTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
     getTimeZone(systemTimeZone){
        const now = new Date(); // Get the current date and time
        return now.toLocaleTimeString('en-US', { timeZone: systemTimeZone});
    }
}



