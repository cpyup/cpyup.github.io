let timerElement = document.getElementById("mainTimeDisplay");

timerElement.addEventListener("input", function (e) {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Limit to 8 characters (HH:MM:SS)
    if (value.length >= 6) {
        value = value.slice(0, 6);
    }

    if (value.length > 2 && value.length <= 3) {
        value = value.slice(0, 1) + ":" + value.slice(1, 3);
    } else if (value.length > 3 && value.length <= 4 ) {
        value = value.slice(0, 2) + ":" + value.slice(2, 4);
    } else if (value.length > 4 && value.length <= 5) {
        value = value.slice(0, 1) + ":" + value.slice(1, 3) + ":" + value.slice(3, 6);
    } else if (value.length > 5 && value.length <= 6) {
        value = value.slice(0,2) + ":" + value.slice(2, 4) + ":" + value.slice(4, 6);
    }

    // Add colons to format as HH:MM:SS
    // if (value.length > 2 && value.length <= 4) {
    //     value = value.slice(0, 2) + ":" + value.slice(2, 4);
    // } else if (value.length > 4 && value.length <= 6) {
    //     value = value.slice(0, 2) + ":" + value.slice(2, 4) + ":" + value.slice(4, 6);
    // } else if (value.length > 6) {
    //     value = value.slice(0, 2) + ":" + value.slice(2, 4) + ":" + value.slice(4, 6);
    // }

    

    // Update the input field with the formatted value
    e.target.value = value;
});