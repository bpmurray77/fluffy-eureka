window.onload = function() {
    const bootupScreen = document.getElementById('bootupScreen');
    const mainContent = document.getElementById('mainContent');

    // Set a timeout for when the loading is complete (sync with progress bar animation duration)
    setTimeout(() => {
        // Fade out the bootup screen
        bootupScreen.style.opacity = '0';
        // After fade out is complete, hide the bootup screen and show the main content
        setTimeout(() => {
            bootupScreen.style.display = 'none';
            mainContent.style.display = 'flex';
            mainContent.style.opacity = '0';
            // Fade in the main content
            setTimeout(() => {
                mainContent.style.transition = 'opacity 1s ease-in-out';
                mainContent.style.opacity = '1';
            }, 50);
        }, 500); // Wait for the fade out animation to complete
    }, 3000); // 3 seconds delay, which matches the progress bar animation time
};
