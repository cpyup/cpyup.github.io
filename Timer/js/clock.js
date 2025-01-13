const timezones = Object.freeze({
	PACIFIC: 'PST',
	MOUNTAIN: 'MST',
	CENTRAL: 'CST',
	EASTERN: 'EST',
});

let selectedZone = timezones.EASTERN; // Currently selected timezone

function showTime() {  
    const now = new Date();
    let time = now.toLocaleTimeString('en-US',{timeZone: selectedZone});
    document.getElementById("headerClock").textContent = time;
    setTimeout(showTime, 100);
}

showTime();