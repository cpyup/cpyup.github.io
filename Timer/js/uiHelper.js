
// Add Time Button Visibility
function showAddButtons() {
    const ulElement = document.querySelector('.addTimeButtons ul'); // Target the <ul> inside .addTimeButtons
    if (ulElement) {
        ulElement.style.visibility = 'visible'; // Make it visible
    } else {
        console.error('Element .addTimeButtons ul not found.');
    }
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

