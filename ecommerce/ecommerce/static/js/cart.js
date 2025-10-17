  // Product prices
    const prices = { 1: 720, 2: 200 };

    function updateSubtotal(productId) {
      const quantity = parseInt(document.getElementById(`qty${productId}`).value);
      const price = prices[productId];
      const subtotal = (price * quantity).toFixed(2);
      document.getElementById(`subtotal${productId}`).textContent = `Rs ${subtotal}`;
      updateTotal();
    }

    function updateTotal() {
      let total = 0;
      for (let id in prices) {
        const quantity = parseInt(document.getElementById(`qty${id}`).value);
        total += prices[id] * quantity;
      }
      const totalFormatted = total.toFixed(2);
      document.getElementById('cartTotal').textContent = `Rs ${totalFormatted}`;
      document.getElementById('orderSubtotal').textContent = `Rs ${totalFormatted}`;
    }

    function increaseQuantity(productId) {
      const input = document.getElementById(`qty${productId}`);
      input.value = parseInt(input.value) + 1;
      updateSubtotal(productId);
    }

    function decreaseQuantity(productId) {
      const input = document.getElementById(`qty${productId}`);
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        updateSubtotal(productId);
      }
    }

    function removeItem(productId) {
      alert(`Remove item ${productId} from cart`);
    }

    // Add event listeners for manual quantity changes
    document.getElementById('qty1').addEventListener('change', function () {
      if (this.value < 1) this.value = 1;
      updateSubtotal(1);
    });

    document.getElementById('qty2').addEventListener('change', function () {
      if (this.value < 1) this.value = 1;
      updateSubtotal(2);
    });