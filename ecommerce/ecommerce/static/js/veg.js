const rangeInput = document.querySelectorAll(".range-input input"),
      priceInput = document.querySelectorAll(".price-input input"),
      range = document.querySelector(".slider .progress");

let priceGap = 1000;

// Price input event listeners
priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minPrice = parseInt(priceInput[0].value),
            maxPrice = parseInt(priceInput[1].value);
        
        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
            } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

// Range input event listeners
rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);
        
        if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

// Function to extract price from price string
function extractPrice(priceText) {
    // Remove "Rs." and any commas, then parse as integer
    return parseInt(priceText.replace(/[^\d]/g, ''));
}

// Function to filter products by price range
function filterProductsByPrice(minPrice, maxPrice) {
    const productItems = document.querySelectorAll('.product-item');
    let visibleCount = 0;
    
    productItems.forEach(product => {
        const priceElement = product.querySelector('.best-price');
        if (priceElement) {
            const productPrice = extractPrice(priceElement.textContent);
            
            if (productPrice >= minPrice && productPrice <= maxPrice) {
                product.style.display = 'block';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        }
    });
    
    // Update results count or show message
    updateResultsMessage(visibleCount);
}

// Function to update results message
function updateResultsMessage(count) {
    let messageElement = document.querySelector('.results-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'results-message alert alert-info mb-3';
        document.querySelector('#product-grid').parentNode.insertBefore(
            messageElement, 
            document.querySelector('#product-grid')
        );
    }
    
    if (count === 0) {
        messageElement.innerHTML = '<i class="fas fa-info-circle"></i> No products found in this price range.';
        messageElement.className = 'results-message alert alert-warning mb-3';
    } else {
        messageElement.innerHTML = `<i class="fas fa-check-circle"></i> Showing ${count} product(s) in your price range.`;
        messageElement.className = 'results-message alert alert-info mb-3';
    }
}

// Function to reset filters
function resetFilters() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(product => {
        product.style.display = 'block';
    });
    
    const messageElement = document.querySelector('.results-message');
    if (messageElement) {
        messageElement.remove();
    }
}

// Apply Filter button functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.querySelector('.filter-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const minPrice = parseInt(priceInput[0].value);
            const maxPrice = parseInt(priceInput[1].value);
            
            // Validate price range
            if (minPrice >= maxPrice) {
                alert('Minimum price should be less than maximum price.');
                return;
            }
            
            // Apply the filter
            filterProductsByPrice(minPrice, maxPrice);
            
            // Add visual feedback
            filterBtn.innerHTML = '<i class="fas fa-check"></i> Applied!';
            filterBtn.classList.add('btn-success');
            
            setTimeout(() => {
                filterBtn.innerHTML = 'Apply Filter';
                filterBtn.classList.remove('btn-success');
            }, 2000);
        });
    }
    
    // Add a reset filter button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'filter-btn mt-2 btn-outline-secondary';
    resetBtn.innerHTML = '<i class="fas fa-refresh"></i> Reset Filters';
    resetBtn.addEventListener('click', resetFilters);
    
    const filterBtnContainer = document.querySelector('.text-center.mt-4');
    if (filterBtnContainer) {
        filterBtnContainer.appendChild(resetBtn);
    }
    
    // Optional: Auto-filter as user moves the slider
    let filterTimeout;
    rangeInput.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
                const minPrice = parseInt(priceInput[0].value);
                const maxPrice = parseInt(priceInput[1].value);
                filterProductsByPrice(minPrice, maxPrice);
            }, 500); // Delay to prevent too frequent filtering
        });
    });
});

// Sorting functionality
function sortProducts(criteria) {
    const productGrid = document.querySelector('#product-grid');
    const products = Array.from(document.querySelectorAll('.product-item'));
    
    let sortedProducts;
    
    switch(criteria) {
        case 'Price: Low to High':
            sortedProducts = products.sort((a, b) => {
                const priceA = extractPrice(a.querySelector('.best-price').textContent);
                const priceB = extractPrice(b.querySelector('.best-price').textContent);
                return priceA - priceB;
            });
            break;
            
        case 'Price: High to Low':
            sortedProducts = products.sort((a, b) => {
                const priceA = extractPrice(a.querySelector('.best-price').textContent);
                const priceB = extractPrice(b.querySelector('.best-price').textContent);
                return priceB - priceA;
            });
            break;
            
        case 'Newest First':
            // Sort by products with "new-arrivals" tag first
            sortedProducts = products.sort((a, b) => {
                const tagsA = a.getAttribute('data-tags') || '';
                const tagsB = b.getAttribute('data-tags') || '';
                const isNewA = tagsA.includes('new-arrivals') ? 1 : 0;
                const isNewB = tagsB.includes('new-arrivals') ? 1 : 0;
                return isNewB - isNewA;
            });
            break;
            
        case 'Default sorting':
        default:
            // Reset to original order (you might want to store original order)
            sortedProducts = products.sort((a, b) => {
                // Sort by original DOM position or by product name
                const nameA = a.getAttribute('data-name').toLowerCase();
                const nameB = b.getAttribute('data-name').toLowerCase();
                return nameA.localeCompare(nameB);
            });
            break;
    }
    
    // Clear the grid and re-append sorted products
    productGrid.innerHTML = '';
    sortedProducts.forEach(product => {
        productGrid.appendChild(product);
    });
    
    // Show sorting feedback
    showSortingFeedback(criteria);
}

// Function to show sorting feedback
function showSortingFeedback(criteria) {
    let feedbackElement = document.querySelector('.sorting-feedback');
    
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.className = 'sorting-feedback alert alert-success mb-3';
        document.querySelector('#product-grid').parentNode.insertBefore(
            feedbackElement, 
            document.querySelector('#product-grid')
        );
    }
    
    feedbackElement.innerHTML = `<i class="fas fa-sort"></i> Products sorted by: <strong>${criteria}</strong>`;
    feedbackElement.style.display = 'block';
    
    // Auto-hide feedback after 3 seconds
    setTimeout(() => {
        if (feedbackElement) {
            feedbackElement.style.display = 'none';
        }
    }, 3000);
}

// Initialize the slider visual state and sorting functionality on page load
document.addEventListener('DOMContentLoaded', function() {
    // Slider initialization
    const minVal = parseInt(rangeInput[0].value);
    const maxVal = parseInt(rangeInput[1].value);
    
    range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    
    priceInput[0].value = minVal;
    priceInput[1].value = maxVal;
    
    // Sorting dropdown functionality
    const sortingSelect = document.querySelector('.form-select');
    if (sortingSelect) {
        sortingSelect.addEventListener('change', function(e) {
            const selectedCriteria = e.target.value;
            sortProducts(selectedCriteria);
            
            // Add visual feedback to the select
            sortingSelect.style.borderColor = '#28a745';
            setTimeout(() => {
                sortingSelect.style.borderColor = '';
            }, 1000);
        });
    }
});