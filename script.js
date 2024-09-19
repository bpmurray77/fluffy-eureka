window.onload = function() {
    const bootupScreen = document.getElementById('bootupScreen');
    const mainContent = document.getElementById('mainContent');

    // Set initial styles
    bootupScreen.style.opacity = '1';
    mainContent.style.opacity = '0';
    mainContent.style.display = 'none';

    // Start the sequence after 3 seconds (adjust if needed)
    setTimeout(() => {
        // Add flicker-out class to bootup screen
        bootupScreen.classList.add('page-transition-out');

        // Wait for bootup screen to flicker out, then switch displays and flicker in main content
        setTimeout(() => {
            bootupScreen.style.display = 'none';
            mainContent.style.display = 'flex';
            
            // Small delay to ensure display change has taken effect
            setTimeout(() => {
                mainContent.classList.add('page-transition-in');
            }, 50);
        }, 1000); // This should match the bootup screen flicker-out duration
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