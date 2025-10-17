     document.addEventListener('DOMContentLoaded', function() {
            const dropdownItems = document.querySelectorAll('.language-dropdown-item');
            const selectedLanguageSpan = document.getElementById('selectedLanguage');
            const flagIcon = document.querySelector('.dropdown-toggle .flag-icon');

            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const selectedValue = this.getA
  <script>
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', function() {
      const mobileMenu = document.getElementById('mobileMenu');
      const icon = this.querySelector('i');
      
      mobileMenu.classList.toggle('show');
      
      // Toggle icon
      if (mobileMenu.classList.contains('show')) {
        icon.classList.remove('bi-list');
        icon.classList.add('bi-x');
      } else {
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list');
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const mobileMenu = document.getElementById('mobileMenu');
      const toggleButton = document.getElementById('mobileMenuToggle');
      
      if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        mobileMenu.classList.remove('show');
        toggleButton.querySelector('i').classList.remove('bi-x');
        toggleButton.querySelector('i').classList.add('bi-list');
      }
    });

    // Language selection handling
    document.querySelectorAll('.language-dropdown-item, .language-mobile-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const language = this.dataset.value;
        const flag = this.dataset.flag;
        const text = this.textContent.trim();
        
        // Update desktop language selector
        const selectedLanguage = document.getElementById('selectedLanguage');
        const flagIcon = document.querySelector('.language-selector .flag-icon');
        
        if (selectedLanguage) {
          selectedLanguage.textContent = language === 'english' ? 'EN' : 'NP';
        }
        
        if (flagIcon && flag) {
          flagIcon.className = `flag-icon flag-icon-${flag}`;
        }
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('show')) {
          mobileMenu.classList.remove('show');
          document.getElementById('mobileMenuToggle').querySelector('i').classList.remove('bi-x');
          document.getElementById('mobileMenuToggle').querySelector('i').classList.add('bi-list');
        }
      });
    });

    // Cart functionality (demo)
    let cartCount = 0;
    document.querySelectorAll('.cart').forEach(cart => {
      cart.addEventListener('click', function(e) {
        e.preventDefault();
        cartCount++;
        document.querySelectorAll('.cart-count').forEach(counter => {
          counter.textContent = cartCount;
        });
      });
    });

    // Search functionality (demo)
    document.querySelectorAll('.search-button').forEach(button => {
      button.addEventListener('click', function() {
        const searchInput = this.previousElementSibling;
        if (searchInput && searchInput.value.trim()) {
          alert(`Searching for: ${searchInput.value}`);
        }
      });
    });

    // Handle search on Enter key
    document.querySelectorAll('.search-input').forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          if (this.value.trim()) {
            alert(`Searching for: ${this.value}`);
          }
        }
      });
    });

    // Close mobile menu on mobile menu item click
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
      item.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobileMenu');
        const toggleButton = document.getElementById('mobileMenuToggle');
        
        mobileMenu.classList.remove('show');
        toggleButton.querySelector('i').classList.remove('bi-x');
        toggleButton.querySelector('i').classList.add('bi-list');
      });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      const mobileMenu = document.getElementById('mobileMenu');
      const toggleButton = document.getElementById('mobileMenuToggle');
      
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove('show');
        toggleButton.querySelector('i').classList.remove('bi-x');
        toggleButton.querySelector('i').classList.add('bi-list');
      }
    });tribute('data-value');
                    const selectedFlag = this.getAttribute('data-flag');
                    const selectedText = this.textContent.trim();
                    
                    // Update the button text and flag
                    selectedLanguageSpan.textContent = selectedText;
                    flagIcon.className = `flag-icon flag-icon-${selectedFlag} me-2`;
                    
                    // You can add your language change logic here
                    console.log('Selected language:', selectedValue);
                });
            });
        });