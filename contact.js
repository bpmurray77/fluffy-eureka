document.addEventListener('DOMContentLoaded', function() {
    const contactContent = document.getElementById('contactContent');
    
    // Fade in the contact content
    setTimeout(() => {
        contactContent.style.opacity = '1';
    }, 100);

    // Handle transition back to home page
    const homeLink = document.querySelector('.nav-item a[href="index.html"]');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            contactContent.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // Adjust this value to match your fade-out duration
        });
    }
});