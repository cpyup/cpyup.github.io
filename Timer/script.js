
function showTime() {  
    const now = new Date();
    let time = now.toLocaleTimeString('en-US');
    document.getElementById("MyClockDisplay").textContent = time;
    setTimeout(showTime, 100);
  }

  var remainingTime; // Total remaining time in seconds
var timerInterval;
var timerElement;
var customMinutes;


  let time = "";
  showTime();
  
  document.addEventListener('click', function(event) {

    if (event.target.matches('#oneMin')) setTime(1);
    else if (event.target.matches('#fiveMin')) setTime(5);
    else if (event.target.matches('#tenMin')) setTime(10);
    else if (event.target.matches('#thirtyMin')) setTime(30);
    else if (event.target.matches('#oneHour')) setTime(60);
    else if (event.target.matches('#customTimer')) customTime();
	else if (event.target.matches('#customTarget')) getTargetTimeInput();
    else if (event.target.matches('#stop')) stopTimer();
    else if (event.target.matches('#restart')) restartTimer();
    else if (event.target.matches('#pause')) pauseTimer();
    else if (event.target.matches('#start')) startTimer();
    

});


function setTime(minutes){
    const clockDisplay = document.getElementById("MyClockDisplay");
  
    // Set remainingTime in seconds
    remainingTime = minutes * 60;

    // Apply transformations to the clock
    clockDisplay.classList.add('shrink', 'fade');

    // Create and show the timer display
    

    setTimeout(() => {
        timerElement = document.createElement("div");
        timerElement.id = "timerDisplay";
        document.body.appendChild(timerElement);
        timerElement.classList.add('grow');
        timerElement.textContent = formatTime(remainingTime);
    }, 1000);
    
};

function getTargetTimeInput(){
  	// Input will be received as a time HH:mm
    targetTime = prompt("Enter target time as 'HH:mm'");
    let [hours, minutes] = targetTime.split(':').map(Number);
	setTime(calculateTargetTime(hours,minutes));
	startTimer();
  }
  
  function calculateTargetTime(targetHours,targetMinutes){
  	// subtract currentTime from target time
    // should likely move time calculations to seconds rather than minutes, for more accurate setting
    let targetTime = new Date();
    let tH = targetHours - targetTime.getHours();
    let tM = targetMinutes - targetTime.getMinutes();
    return tM += tH * 60;    
  }


    
  
function pauseTimer(minutes){
    remainingTime = minutes;
    remainingTime -= now - timerInterval();
    
    timerElement.textContent = formatTime();

}
  function startTimer() {
  
      // Start the interval to update the timer every second
      setInterval(() => {
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

     /* timerInterval = setInterval(() => {
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
    }, 1000);*/
      resetClockDisplay();
      location.reload();
  }
  
  function restartTimer(){
    stopTimer();
    customTime();
    startTimer(customMinutes);
  };



  function customTime(){
    customMinutes = prompt("Enter time in minutes:");
      if (customTime) {
          setTime(parseInt(customMinutes));
      }
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
  