class TimerInput {
    constructor(inputElementId, placeholder = "00:00:00") {
        this.inputElement = document.getElementById(inputElementId);
        this.placeholder = placeholder;

        // Set initial state
        if (this.inputElement) {
            this.inputElement.placeholder = this.placeholder;
        }
    }

    // Parse input into milliseconds
    parseInput() {
        if (!this.inputElement) return 0;

        const timeString = this.inputElement.value.trim();
        let hours = 0,
            minutes = 0,
            seconds = 0;

        // Parse based on the format (HH:MM:SS, MMSS, MSS, SS)
        if (/^\d{0,1}$/.test(timeString)) {
            seconds = parseInt(timeString, 10);
        } else if (/^\d{1,2}$/.test(timeString)) {
            seconds = parseInt(timeString, 10);
        } else if (/^\d{3,4}$/.test(timeString)) {
            seconds = parseInt(timeString.slice(-2), 10);
            minutes = parseInt(timeString.slice(0, -2), 10) || 0;
        } else if (/^\d{6}$/.test(timeString)) {
            seconds = parseInt(timeString.slice(-2), 10);
            minutes = parseInt(timeString.slice(-4, -2), 10);
            hours = parseInt(timeString.slice(0, -4), 10);
        } else {
            console.log("Invalid time format. Use HH:MM:SS, MMSS, MSS, or SS.");
            return 0;
        }

        // Convert to milliseconds
        return (hours * 3600 + minutes * 60 + seconds) * 1000;
    }

    // Reset the input to its placeholder value
    reset() {
        if (this.inputElement) {
            this.inputElement.value = "";
            this.inputElement.placeholder = this.placeholder;
        }
    }

    // Format milliseconds into HH:MM:SS and update the input
    updateDisplay(milliseconds) {
        if (!this.inputElement) return;

        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        this.inputElement.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}
