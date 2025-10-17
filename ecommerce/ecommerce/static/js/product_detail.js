// Change main image when thumbnail clicked
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.product-image-thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;       // change main image
            thumbs.forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');  // highlight selected thumbnail
        });
    });
// thumbnial zoom
const container = document.querySelector('.position-relative-main');
const image = document.getElementById('mainImage');

container.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = container.getBoundingClientRect();
  const x = ((e.pageX - left - window.scrollX) / width) * 100;
  const y = ((e.pageY - top - window.scrollY) / height) * 100;
  image.style.transformOrigin = `${x}% ${y}%`;
  image.style.transform = "scale(1.5)"; // zoom level
});

container.addEventListener('mouseleave', () => {
  image.style.transformOrigin = "center center";
  image.style.transform = "scale(1)";
});

document.addEventListener('DOMContentLoaded', function() {
  const showBtn = document.getElementById('showNotificationBtn');
  const notification = document.getElementById('notification');
  let isNotificationActive = false; // A flag to track the notification's state

  showBtn.addEventListener('click', function() {
    // Check if a notification is already active
    if (isNotificationActive) {
      // If it is, show the "Already Added" message
      notification.innerText = "Already added!";
      
      // Flash the notification briefly
      notification.style.display = 'block';
      setTimeout(function() {
        notification.style.display = 'none';
      }, 1500); // Hide after 1.5 seconds
      
    } else {
      // If no notification is active, show the original message
      isNotificationActive = true;
      notification.innerText = "This is a notification!";
      notification.style.display = 'block';

      // Set a timer to hide the notification and reset the flag
      setTimeout(function() {
        notification.style.display = 'none';
        isNotificationActive = false; // Reset the flag after the notification is gone
      }, 3000); // 3 seconds
    }
  });
});