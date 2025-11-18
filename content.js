
(function() {
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'vsc-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '10px';
        overlay.style.left = '10px';
        overlay.style.background = 'rgba(0, 0, 0, 0.3)';
        overlay.style.color = 'white';
        overlay.style.padding = '4px 8px';
        overlay.style.borderRadius = '4px';
        overlay.style.fontSize = '14px';
        overlay.style.fontFamily = 'Arial, sans-serif';
        overlay.style.zIndex = '9999';
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        document.body.appendChild(overlay);
        return overlay;
    }

    function updateOverlay(rate) {
        if (!window._vscOverlay) {
            window._vscOverlay = createOverlay();
        }
        const overlay = window._vscOverlay;
        overlay.textContent = 'Speed: ' + rate.toFixed(2) + 'x';
        overlay.style.opacity = '1';
        clearTimeout(window._vscHideTimeout);
        window._vscHideTimeout = setTimeout(() => {
            overlay.style.opacity = '0';
        }, 2000);
    }

    function changeSpeed(delta) {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            let newRate = Math.max(0.1, Math.min(16, video.playbackRate + delta));
            video.playbackRate = newRate;
            updateOverlay(newRate);
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.code === 'NumpadAdd') {
            changeSpeed(0.25);
        } else if (e.code === 'NumpadSubtract') {
            changeSpeed(-0.25);
        }
    }, true);
})();
