function showTime() {  
  const now = new Date();
  time = now.toLocaleTimeString('en-US');
  document.getElementById("MyClockDisplay").textContent = time;
  setTimeout(showTime, 100);
}

let remainingTime;
let timerInterval;
let timerElement;

var time = "";
showTime();

document.getElementById("tenMin").addEventListener("click", function() {
    startTimer(10);
});

document.getElementById("fifteenMin").addEventListener("click", function() {
    startTimer(15);
});

document.getElementById("twentyMin").addEventListener("click", function() {
    startTimer(20);
});

document.getElementById("twentyFiveMin").addEventListener("click", function() {
    startTimer(25);
});

document.getElementById("thirtyMin").addEventListener("click", function() {
    startTimer(30);
});

document.getElementById("oneHour").addEventListener("click", function() {
    startTimer(60);
});

document.getElementById("customTimer").addEventListener("click", function() {
    let customTime = prompt("Enter time in minutes:");
    if(customTime) {
        startTimer(parseInt(customTime));
    }
});


document.getElementById("stop").addEventListener("click", function() {
    stopTimer();
});

document.getElementById("addMinutes").addEventListener("click", function() {
    let additionalMinutes = prompt("Enter additional minutes:");
    if (additionalMinutes) {
        addMinutes(parseInt(additionalMinutes));
    }
});

function startTimer(minutes) {

    const clockDisplay = document.getElementById("MyClockDisplay");

    // Calculate the target end time based on the current time and the specified minutes
    let targetTime = new Date().getTime() + minutes * 60 * 1000;

    // Apply transformations to the clock
    clockDisplay.classList.add('shrink', 'fade');

    // Create and show the timer display
    timerElement = document.createElement("div");
    timerElement.id = "timerDisplay";
    document.body.appendChild(timerElement);

    setTimeout(() => {
        timerElement.classList.add('grow');
    }, 0);

    // Start the interval to update the timer every second
    timerInterval = setInterval(() => {
        // Calculate the remaining time
        const currentTime = new Date().getTime();
        remainingTime = targetTime - currentTime;

        // If time is up, stop the timer
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's Up!";
            setTimeout(() => {
                document.body.removeChild(timerElement);
                resetClockDisplay();
            }, 5000);
        } else {
            // Update the timer display with the formatted remaining time
            timerElement.textContent = formatTime(Math.floor(remainingTime / 1000));
        }
    }, 1000); // Update every second
}
function stopTimer() {
    clearInterval(timerInterval); // Stop the timer interval
    if (timerElement) {
        document.body.removeChild(timerElement); // Remove the timer display from the DOM
        timerElement = null; // Clear the reference to the timer element
    }
    resetClockDisplay();
}

function addMinutes(minutes) {
    if (remainingTime > 0 && minutes > 0) {
        remainingTime += minutes * 60; // Add minutes to the remaining time
        timerElement.textContent = formatTime(remainingTime); // Update display with new time
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function resetClockDisplay() {
    const clockDisplay = document.getElementById("MyClockDisplay");
    clockDisplay.classList.remove('shrink', 'fade');
}

// JS ADDED FROM TIMER.HTML
// Dropdown Menu Toggling
document.getElementById("menuIcon").addEventListener("click", function () {
    // Check if the element with ID 'timerDisplay' is present on the page
    var checkfortimer = document.getElementById('timerDisplay');

    if (checkfortimer) {
        document.body.removeChild(checkfortimer);
        resetClockDisplay();
    } else {
        // Toggle the dropdown menu if 'timerDisplay' does not exist
        var dropdownMenu = document.getElementById("dropdownMenu");
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "block";
        }
    }
});

window.onclick = function (event) {
    if (!event.target.matches('#menuIcon')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
}

// Fullscreen Button Functionality
function clickImg(img) {
    if (isDocumentInFullScreenMode()) {
        closeFullscreen();
    } else {
        openFullscreen();
    }
}

function isDocumentInFullScreenMode() {
    return document.fullscreenElement !== null;
}

var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Hiding UI Icons With Inactivity
const fullscreenIcon = document.getElementById('fullscreenicon');
            const timerIcon = document.getElementById('menuIcon');
			const dropmenuContent = document.getElementById("dropdownMenu");
            let inactivityTimeout;

            function showFullscreenIcon() {
                fullscreenIcon.classList.remove('hidden');
                timerIcon.classList.remove('hidden');
				dropmenuContent.classList.remove('hidden');
				
            }

            function hideFullscreenIcon() {
                fullscreenIcon.classList.add('hidden');
                timerIcon.classList.add('hidden');
				dropmenuContent.classList.add('hidden');
            }

            function resetInactivityTimeout() {
                clearTimeout(inactivityTimeout);
                showFullscreenIcon();
                inactivityTimeout = setTimeout(hideFullscreenIcon, 1500);
            }

            document.addEventListener('mousemove', resetInactivityTimeout);
            document.addEventListener('keydown', resetInactivityTimeout);
            inactivityTimeout = setTimeout(hideFullscreenIcon, 1500);