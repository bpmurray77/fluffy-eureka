document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    
    // Apply the flicker-in effect when the page is loaded
    body.classList.add('page-transition-in');
    body.classList.remove('hidden'); // Remove the hidden class to trigger the animation

    // Handle clicks on internal links to apply flicker-out before navigation
    document.querySelectorAll('a').forEach(function (link) {
        // Check if the link is to an internal page
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent immediate navigation
                const href = this.href; // Get the link URL
                
                // Apply the flicker-out effect
                body.classList.add('page-transition-out');
                body.classList.remove('page-transition-in');

                // Wait for the flicker-out animation to finish before navigating
                setTimeout(function () {
                    window.location.href = href; // Navigate to the new page
                }, 1000); // This should match the duration of the flicker-out animation
            });
        }
    });
});