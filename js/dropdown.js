document.addEventListener('DOMContentLoaded', function () {
    const dropdownItem = document.querySelector('.dropdown__item');

    if (dropdownItem) {
        dropdownItem.addEventListener('click', function () {
            const dropdownMenu = this.querySelector('.dropdown__menu');
            const isMenuOpen = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isMenuOpen ? 'none' : 'block';
        });
    }
});
