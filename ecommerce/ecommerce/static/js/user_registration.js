 function loginUser(event) {
    event.preventDefault(); // prevents the form from reloading the page
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // Example check (replace with real authentication)
    if (email === "admin@gmail.com" && password === "12345678@") {
      alert("Login successful!");
      // Redirect to Laravel route. Note: The URL helper works in Laravel Blade files, not static HTML.
      window.location.href = "/home"; // Simplified for a generic example
    } else {
      alert("Invalid username or password!");
    }
  }

  function showLogin() {
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
  }

  function showSignup() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
  }

  function showForgotPassword() {
    alert('Forgot password functionality would be implemented here.');
  }