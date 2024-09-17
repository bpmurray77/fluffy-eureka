window.onload = function() {
    const bootupScreen = document.getElementById('bootupScreen');
    const mainContent = document.getElementById('mainContent');

    setTimeout(() => {
        bootupScreen.style.opacity = '0';
        setTimeout(() => {
            bootupScreen.style.display = 'none';
            mainContent.style.display = 'flex';
            mainContent.style.opacity = '0';
            requestAnimationFrame(() => {
                mainContent.style.transition = 'opacity 1s ease-in-out';
                mainContent.style.opacity = '1';
            });
        }, 500);
    }, 3000);
};