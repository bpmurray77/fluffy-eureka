window.onload = function() {
    const bootupScreen = document.getElementById('bootupScreen');
    const mainContent = document.getElementById('mainContent');

    // Set initial styles
    bootupScreen.style.opacity = '1';
    bootupScreen.style.transition = 'opacity 1s ease-in-out';
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 2s ease-in-out'; // Adjust this value to control fade-in speed

    // Start the sequence after 3 seconds (adjust if needed)
    setTimeout(() => {
        // Fade out bootup screen
        bootupScreen.style.opacity = '0';

        // Wait for bootup screen to fade out, then switch displays and fade in main content
        setTimeout(() => {
            bootupScreen.style.display = 'none';
            mainContent.style.display = 'flex';
            
            // Small delay to ensure display change has taken effect
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);
        }, 1000); // This should match the bootup screen fade-out duration
    }, 3000); // Delay before starting the transition
};

document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const persistenceTime = 3000; // 2 seconds, adjust as needed
    let activeSubmenu = null;

    function closeAllSubmenus() {
        navItems.forEach(item => {
            const subMenu = item.querySelector('.sub-menu');
            if (subMenu) {
                subMenu.classList.remove('persist');
            }
        });
    }

    navItems.forEach(item => {
        const subMenu = item.querySelector('.sub-menu');
        let timeoutId;
        
        function showSubMenu() {
            clearTimeout(timeoutId);
            if (activeSubmenu && activeSubmenu !== subMenu) {
                activeSubmenu.classList.remove('persist');
            }
            subMenu.classList.add('persist');
            activeSubmenu = subMenu;
        }

        function hideSubMenu() {
            timeoutId = setTimeout(() => {
                subMenu.classList.remove('persist');
                if (activeSubmenu === subMenu) {
                    activeSubmenu = null;
                }
            }, persistenceTime);
        }

        item.addEventListener('mouseenter', showSubMenu);
        item.addEventListener('mouseleave', hideSubMenu);
        
        if (subMenu) {
            subMenu.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
            });
            subMenu.addEventListener('mouseleave', hideSubMenu);
        }
    });

    // Close all submenus when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-item')) {
            closeAllSubmenus();
            activeSubmenu = null;
        }
    });
});