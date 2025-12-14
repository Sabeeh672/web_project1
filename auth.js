// Toggle between Login and Signup forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save current user
        localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email,
            joinDate: user.joinDate
        }));
        
        // Show success message
        showAlert('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showAlert('Invalid email or password!', 'danger');
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showAlert('Passwords do not match!', 'danger');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showAlert('Email already registered!', 'danger');
        return;
    }
    
    // Create new user
    const newUser = {
        name: name,
        email: email,
        password: password,
        joinDate: new Date().toISOString()
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('currentUser', JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        joinDate: newUser.joinDate
    }));
    
    showAlert('Account created successfully! Redirecting...', 'success');
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Show Alert Message
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-message`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at top of card body
    const cardBody = document.querySelector('.card-body');
    cardBody.insertBefore(alert, cardBody.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    
    // If on login page and already logged in, redirect to dashboard
    if (currentUser && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
    
    // If on dashboard/protected page and not logged in, redirect to login
    const protectedPages = ['dashboard.html', 'profile.html', 'video-player.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'login.html';
    }
});