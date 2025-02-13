
// Add Time Button Visibility
function showAddButtons() {
    const buttons = document.querySelectorAll('.addTimeButtons');
    buttons.forEach(button => {
        button.style.visibility = 'visible';
    });
}

function hideAddButtons() {
    const buttons = document.querySelectorAll('.addTimeButtons');
     buttons.forEach(button => {
       button.style.visibility = 'hidden';
       console.log("hi")
   });
}

// Makes stop button inactive
function deactivateStopButton() {
    const stopButton = document.getElementById('stop');
    stopButton.disabled = true;
    stopButton.style.opacity = 0.5;
    stopButton.classList.remove('active');
}

deactivateStopButton();