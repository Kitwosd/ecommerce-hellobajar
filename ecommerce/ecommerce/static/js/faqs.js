 <script>
        const headers = document.querySelectorAll('.accordion-header');

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const currentActive = document.querySelector('.accordion-header.active');

                // If the clicked header is already active, close it
                if (currentActive === header) {
                    header.classList.remove('active');
                } else {
                    // Otherwise, remove 'active' from the currently active one (if any)
                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }
                    // And add 'active' to the clicked header
                    header.classList.add('active');
                }
            });
        });
    </script>