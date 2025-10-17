    document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.category-container');
  const slider = document.querySelector('.slider');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const leftArrow = document.querySelector('.slider-arrow-left');
  const rightArrow = document.querySelector('.slider-arrow-right');

  // CATEGORY SCROLLER
  if (container) {
    if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '0');

    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') container.scrollBy({ left: 120, behavior: 'smooth' });
      else if (e.key === 'ArrowLeft') container.scrollBy({ left: -120, behavior: 'smooth' });
    });

    // Convert vertical wheel to horizontal scroll (trackpads often set deltaX)
    container.addEventListener('wheel', (e) => {
      const delta = (e.deltaX !== 0) ? e.deltaX : e.deltaY;
      if (delta !== 0) {
        e.preventDefault();
        container.scrollLeft += delta;
      }
    }, { passive: false });
  } // <-- Important: close the container if-block here

  // SLIDER SCROLLER (separate)
  if (slider) {
    const wheelToHorizontal = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta !== 0) {
        e.preventDefault();
        slider.scrollLeft += delta;
      }
    };


    const slideWidth = () => slider.clientWidth;
    const scrollBySlide = (direction) => slider.scrollBy({ left: direction * slideWidth(), behavior: 'smooth' });

    if (leftArrow) leftArrow.addEventListener('click', () => scrollBySlide(-1));
    if (rightArrow) rightArrow.addEventListener('click', () => scrollBySlide(1));
  }
});
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const slides = slider.querySelectorAll("img");
    const prevBtn = document.querySelector(".slider-arrow-left");
    const nextBtn = document.querySelector(".slider-arrow-right");
    const navDots = document.querySelectorAll(".slider-nav a");

    let currentIndex = 0;

    const updateSlider = () => {
        slider.scrollTo({
            left: slides[currentIndex].offsetLeft,
            behavior: "smooth"
        });

        navDots.forEach((dot, idx) => {
            dot.style.opacity = idx === currentIndex ? "1" : "0.5";
        });
    };

    prevBtn.addEventListener("click", () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Optional: click on nav dots
    navDots.forEach((dot, idx) => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            currentIndex = idx;
            updateSlider();
        });
    });

    // Optional: auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateSlider();
    }, 3000);
});
function toggleLike(button) {
    // Prevent the link from being followed
    event.preventDefault();
    event.stopPropagation();
    
    const isLiked = button.classList.contains('liked');
    button.classList.toggle('liked');
    
    // Get product details
    const productItem = button.closest('.product-item');
    
    // Show feedback message
    if (!isLiked) {
        showWishlistMessage(`Added to Wishlist!`, 'success');
        // Here you can add code to actually add to wishlist/database
        // addToWishlist(productItem.getAttribute('data-name'));
    } else {
        showWishlistMessage(`<i class="bi bi-x-circle"></i>Removed from Wishlist!`, 'info');
        // Here you can add code to remove from wishlist/database
        // removeFromWishlist(productItem.getAttribute('data-name'));
    }
    
    // Animation effect
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function showWishlistMessage(message, type) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = `
        top: 20px; 
        right: 20px; 
        z-index: 9999; 
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-heart me-2"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}