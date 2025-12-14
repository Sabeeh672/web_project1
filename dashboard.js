// Load Dashboard Data
function loadDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set user name
    document.getElementById('userName').textContent = user.name;
    document.getElementById('navUserName').textContent = user.name;
    
    // Load stats
    loadDashboardStats();
    
    // Load enrolled courses
    loadEnrolledCourses();
    
    // Load continue learning
    loadContinueLearning();
}

// Load Dashboard Statistics
function loadDashboardStats() {
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
    
    document.getElementById('enrolledCount').textContent = enrolledCourses.length;
    document.getElementById('completedCount').textContent = completedCount;
    document.getElementById('inProgressCount').textContent = inProgressCount;
}

// Load Enrolled Courses
function loadEnrolledCourses() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const container = document.getElementById('myCoursesContainer');
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="card text-center py-5">
                    <div class="card-body">
                        <i class="fas fa-book-open fa-4x text-muted mb-3"></i>
                        <h4>No Courses Yet</h4>
                        <p class="text-muted">Start learning by enrolling in courses</p>
                        <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    const courses = enrolledCourses.map(id => coursesData.find(c => c.id === id)).filter(c => c);
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    
    container.innerHTML = courses.map(course => {
        const progress = courseProgress[course.id] || { percentage: 0, completedLessons: 0 };
        
        return `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="${course.thumbnail}" class="card-img-top" alt="${course.title}" style="height: 180px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="text-muted small">
                            <i class="fas fa-user"></i> ${course.instructor}
                        </p>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="small">Progress</span>
                                <span class="small">${progress.percentage}%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${progress.percentage}%" 
                                     aria-valuenow="${progress.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <a href="video-player.html?courseId=${course.id}&lessonId=1" class="btn btn-primary w-100">
                            ${progress.percentage > 0 ? 'Continue Learning' : 'Start Learning'}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Continue Learning Section
function loadContinueLearning() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const container = document.getElementById('continueLearningSec');
    
    // Find courses in progress
    const inProgressCourses = enrolledCourses
        .map(id => coursesData.find(c => c.id === id))
        .filter(c => c && courseProgress[c.id] && courseProgress[c.id].percentage > 0 && courseProgress[c.id].percentage < 100);
    
    if (inProgressCourses.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <p class="text-muted">No courses in progress. <a href="courses.html">Browse courses</a> to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = inProgressCourses.slice(0, 3).map(course => {
        const progress = courseProgress[course.id];
        
        return `
            <div class="col-md-6 col-lg-4">
                <div class="card dashboard-card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="text-muted small mb-3">
                            <i class="fas fa-user"></i> ${course.instructor}
                        </p>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="small">Progress</span>
                                <span class="small">${progress.percentage}%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${progress.percentage}%"></div>
                            </div>
                            <p class="small text-muted mt-2">${progress.completedLessons} of ${course.lessons} lessons completed</p>
                        </div>
                        <a href="video-player.html?courseId=${course.id}&lessonId=${progress.currentLessonId || 1}" class="btn btn-primary btn-sm">
                            Continue Learning <i class="fas fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Progress Details
function loadProgressDetails() {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const container = document.getElementById('progressContainer');
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="card text-center py-5">
                <div class="card-body">
                    <i class="fas fa-chart-line fa-4x text-muted mb-3"></i>
                    <h4>No Progress Yet</h4>
                    <p class="text-muted">Enroll in courses to track your progress</p>
                    <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                </div>
            </div>
        `;
        return;
    }
    
    const courses = enrolledCourses.map(id => coursesData.find(c => c.id === id)).filter(c => c);
    
    container.innerHTML = courses.map(course => {
        const progress = courseProgress[course.id] || { percentage: 0, completedLessons: 0 };
        const status = progress.percentage === 100 ? 'completed' : progress.percentage > 0 ? 'in-progress' : 'not-started';
        const statusBadge = progress.percentage === 100 
            ? '<span class="badge bg-success">Completed</span>' 
            : progress.percentage > 0 
                ? '<span class="badge bg-warning">In Progress</span>' 
                : '<span class="badge bg-secondary">Not Started</span>';
        
        return `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${course.thumbnail}" class="img-fluid rounded" alt="${course.title}">
                        </div>
                        <div class="col-md-7">
                            <h5 class="mb-1">${course.title}</h5>
                            <p class="text-muted mb-2">
                                <i class="fas fa-user"></i> ${course.instructor}
                            </p>
                            <div class="progress mb-2">
                                <div class="progress-bar" role="progressbar" style="width: ${progress.percentage}%" 
                                     aria-valuenow="${progress.percentage}" aria-valuemin="0" aria-valuemax="100">
                                    ${progress.percentage}%
                                </div>
                            </div>
                            <small class="text-muted">${progress.completedLessons} of ${course.lessons} lessons completed</small>
                        </div>
                        <div class="col-md-3 text-center">
                            ${statusBadge}
                            <br>
                            <a href="video-player.html?courseId=${course.id}&lessonId=${progress.currentLessonId || 1}" 
                               class="btn btn-sm btn-primary mt-2">
                                ${progress.percentage > 0 ? 'Continue' : 'Start'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Show Different Sections
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.dashboard-sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    if (section === 'overview') {
        document.getElementById('overviewSection').style.display = 'block';
        loadContinueLearning();
    } else if (section === 'mycourses') {
        document.getElementById('mycoursesSection').style.display = 'block';
        loadEnrolledCourses();
    } else if (section === 'progress') {
        document.getElementById('progressSection').style.display = 'block';
        loadProgressDetails();
    }
    
    // Add active class to clicked nav link
    event.target.classList.add('active');
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', loadDashboard);