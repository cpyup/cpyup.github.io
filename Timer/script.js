function showTime() {  
    const now = new Date();
    let time = now.toLocaleTimeString('en-US');
    document.getElementById("MyClockDisplay").textContent = time;
    setTimeout(showTime, 100);
  }
  
  let remainingTime; // Total remaining time in seconds
  let timerInterval;
  let timerElement;
  let customMinutes;
  let newRemainingTime;
  let minToAdd;
  let isPaused = false;

  let time = "";
  showTime();
  
  document.addEventListener('click', function(event) {
    if (event.target.matches('#tenMin')) startTimer(10);
    else if (event.target.matches('#fifteenMin')) startTimer(15);
    else if (event.target.matches('#twentyMin')) startTimer(20);
    else if (event.target.matches('#thirtyMin')) startTimer(30);
    else if (event.target.matches('#oneHour')) startTimer(60);
    else if (event.target.matches('#customTimer')) customTime();
    else if (event.target.matches('#stop')) stopTimer();
    else if (event.target.matches('#restart')) restartTimer();
    else if (event.target.matches('#addMin'))addMinutes(1);
    else if (event.target.matches('#pause'))pauseTimer();
});

  
  function startTimer(minutes) {
      const clockDisplay = document.getElementById("MyClockDisplay");
  
      // Set remainingTime in seconds
      remainingTime = minutes * 60;
  
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
          if (remainingTime <= 0) {
              clearInterval(timerInterval);
              timerElement.textContent = "Time's Up!";
              setTimeout(() => {
                  document.body.removeChild(timerElement);
                  resetClockDisplay();
              }, 5000);
          } else {
              // Update remaining time and display
              remainingTime--;
              timerElement.textContent = formatTime(remainingTime);
          }
      }, 1000); // Update every second
  }
  
  function stopTimer() {
      clearInterval(timerInterval);
      if (timerElement) {
          document.body.removeChild(timerElement);
          timerElement = null;
      }
      resetClockDisplay();
  }
  
  function restartTimer(){
    stopTimer();
    customTime();
    startTimer(customMinutes);
  };



  function customTime(){
    customMinutes = prompt("Enter time in minutes:");
      if (customTime) {
          startTimer(parseInt(customMinutes));
      }
  };

  function pauseTimer() {
    if (isPaused) {
        isPaused = false;
        startTimer(remainingTime / 60); // Resumes with remaining time
    } else {
        isPaused = true;
        clearInterval(timerInterval);
    }
}

function addMinutes(minToAdd){
    
        (remainingTime = ((remainingTime)) + 1) + minToAdd;
    
};


  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }


  
  function resetClockDisplay() {
      const clockDisplay = document.getElementById("MyClockDisplay");
      clockDisplay.classList.remove('shrink', 'fade');
  }
  
  // Dropdown Menu Toggling
  document.getElementById("menuIcon").addEventListener("click", function () {
      var checkfortimer = document.getElementById('timerDisplay');
      if (checkfortimer) {
          document.body.removeChild(checkfortimer);
          resetClockDisplay();
      } else {
          var dropdownMenu = document.getElementById("dropdownMenu");
          dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
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
  