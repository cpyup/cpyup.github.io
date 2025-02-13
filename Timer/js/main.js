function loadScript(url)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

// Loading individual JS files
loadScript('js/timerInput.js');
loadScript('js/clock.js');
loadScript('js/background.js');
loadScript('js/uiHelper.js');
loadScript('js/script.js');