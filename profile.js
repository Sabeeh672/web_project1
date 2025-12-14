// Load Profile Data
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display profile info
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('fullName').value = user.name;
    document.getElementById('email').value = user.email;
    
    // Format and display join date
    const joinDate = new Date(user.joinDate);
    document.getElementById('joinDate').textContent = joinDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Load stats
    loadProfileStats();
    
    // Load certificates
    loadCertificates();
});

// Load Profile Statistics
function loadProfileStats() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    
    let completedCount = 0;
    let inProgressCount = 0;
    
    enrolledCourses.forEach(courseId => {
        const progress = courseProgress[courseId];
        if (progress && progress.percentage === 100) {
            completedCount++;
        } else if (progress && progress.percentage > 0) {
            inProgressCount++;
        }
    });
    
    document.getElementById('statsEnrolled').textContent = enrolledCourses.length;
    document.getElementById('statsCompleted').textContent = completedCount;
    document.getElementById('statsInProgress').textContent = inProgressCount;
}

// Update Profile
function updateProfile(event) {
    event.preventDefault();
    
    const newName = document.getElementById('fullName').value;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Update current user
    user.name = newName;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update in users array
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex].name = newName;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Update display
    document.getElementById('profileName').textContent = newName;
    
    showProfileAlert('Profile updated successfully!', 'success');
}

// Change Password
function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user in users array
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex === -1) {
        showProfileAlert('User not found!', 'danger');
        return;
    }
    
    // Verify current password
    if (users[userIndex].password !== currentPassword) {
        showProfileAlert('Current password is incorrect!', 'danger');
        return;
    }
    
    // Verify new passwords match
    if (newPassword !== confirmNewPassword) {
        showProfileAlert('New passwords do not match!', 'danger');
        return;
    }
    
    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clear form
    document.getElementById('passwordForm').reset();
    
    showProfileAlert('Password updated successfully!', 'success');
}

// Load Certificates
function loadCertificates() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const container = document.getElementById('certificatesContainer');
    
    // Find completed courses
    const completedCourses = enrolledCourses
        .map(id => coursesData.find(c => c.id === id))
        .filter(course => course && courseProgress[course.id]?.percentage === 100);
    
    if (completedCourses.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-certificate fa-3x text-muted mb-3"></i>
                <p class="text-muted">No certificates yet. Complete courses to earn certificates!</p>
                <a href="courses.html" class="btn btn-primary btn-sm">Browse Courses</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = completedCourses.map(course => {
        const completionDate = new Date(courseProgress[course.id].lastAccessed);
        
        return `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2 text-center">
                            <i class="fas fa-certificate fa-3x text-warning"></i>
                        </div>
                        <div class="col-md-7">
                            <h6 class="mb-1">${course.title}</h6>
                            <p class="text-muted small mb-1">
                                <i class="fas fa-user"></i> ${course.instructor}
                            </p>
                            <p class="text-muted small mb-0">
                                <i class="fas fa-calendar"></i> Completed on ${completionDate.toLocaleDateString()}
                            </p>
                        </div>
                        <div class="col-md-3 text-center">
                            <button class="btn btn-sm btn-success w-100" onclick="downloadCertificate('${course.title}', '${course.instructor}')">
                                <i class="fas fa-download me-2"></i>Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Download Certificate (Simple Implementation)
function downloadCertificate(courseTitle, instructor) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const date = new Date().toLocaleDateString();
    
    alert(`Certificate of Completion

Student: ${user.name}
Course: ${courseTitle}
Instructor: ${instructor}
Date: ${date}

This is a demo certificate. In a real application, this would generate a downloadable PDF certificate.`);
}

// Show Profile Alert
function showProfileAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.profile-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show profile-alert position-fixed`;
    alert.style.top = '80px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}