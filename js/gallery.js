// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    
    const imageContainers = document.querySelectorAll('.image-container');
    const totalImages = imageContainers.length;
    let currentImageIndex = 0;
    
    // Set total images count
    totalImagesSpan.textContent = totalImages;
    
    // Add click event listeners to all image containers
    imageContainers.forEach((container, index) => {
        container.addEventListener('click', function() {
            openModal(index);
        });
    });
    
    // Open modal function
    function openModal(index) {
        currentImageIndex = index;
        const img = imageContainers[index].querySelector('.gallery-image');
        const caption = imageContainers[index].querySelector('p');
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = caption.textContent;
        currentImageSpan.textContent = currentImageIndex + 1;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Navigate to previous image
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateModalImage();
    }
    
    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateModalImage();
    }
    
    // Update modal with current image
    function updateModalImage() {
        const img = imageContainers[currentImageIndex].querySelector('.gallery-image');
        const caption = imageContainers[currentImageIndex].querySelector('p');
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = caption.textContent;
        currentImageSpan.textContent = currentImageIndex + 1;
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            switch(event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    
    modalImage.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });
    
    modalImage.addEventListener('touchend', function(event) {
        if (!startX || !startY) return;
        
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    showNextImage(); // Swipe left = next image
                } else {
                    showPreviousImage(); // Swipe right = previous image
                }
            }
        }
        
        startX = 0;
        startY = 0;
    });
});
