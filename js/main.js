document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            // Toggle the display of the nav menu
            const isMenuOpen = navMenu.style.display === 'block';
            navMenu.style.display = isMenuOpen ? 'none' : 'block';

            // Update ARIA attribute for accessibility
            menuToggle.setAttribute('aria-expanded', !isMenuOpen);
        });
    }
});