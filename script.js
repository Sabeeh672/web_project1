// Courses Data
const coursesData = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        category: "Web Development",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
        description: "Learn HTML, CSS, JavaScript, Bootstrap and build real-world projects",
        instructor: "Ali Ahmed",
        duration: "40 hours",
        lessons: 45,
        rating: 4.8,
        students: 1250,
        price: "Free",
        modules: [
            {
                id: 1,
                title: "HTML Fundamentals",
                lessons: [
                    { id: 1, title: "Introduction to HTML", videoUrl: "UB1O30fR-EE", duration: "15 min", completed: false },
                    { id: 2, title: "HTML Tags and Elements", videoUrl: "qz0aGYrrlhU", duration: "20 min", completed: false },
                    { id: 3, title: "Forms and Inputs", videoUrl: "fNcJuPIZ2WE", duration: "25 min", completed: false }
                ]
            },
            {
                id: 2,
                title: "CSS Styling",
                lessons: [
                    { id: 4, title: "CSS Basics", videoUrl: "1Rs2ND1ryYc", duration: "18 min", completed: false },
                    { id: 5, title: "Flexbox Layout", videoUrl: "JJSoEo8JSnc", duration: "22 min", completed: false }
                ]
            },
            {
                id: 3,
                title: "JavaScript Fundamentals",
                lessons: [
                    { id: 6, title: "JavaScript Introduction", videoUrl: "W6NZfCO5SIk", duration: "30 min", completed: false },
                    { id: 7, title: "Variables and Data Types", videoUrl: "hdI2bqOjy3c", duration: "25 min", completed: false }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Python for Beginners",
        category: "Python",
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
        description: "Master Python programming from basics to advanced concepts",
        instructor: "Sara Khan",
        duration: "35 hours",
        lessons: 38,
        rating: 4.9,
        students: 980,
        price: "Free",
        modules: [
            {
                id: 1,
                title: "Python Basics",
                lessons: [
                    { id: 1, title: "Python Installation & Setup", videoUrl: "YYXdXT2l-Gg", duration: "10 min", completed: false },
                    { id: 2, title: "Variables and Data Types", videoUrl: "LCCCd5C7OaY", duration: "20 min", completed: false },
                    { id: 3, title: "Python Operators", videoUrl: "v5MR5JnKcZI", duration: "18 min", completed: false }
                ]
            },
            {
                id: 2,
                title: "Control Flow",
                lessons: [
                    { id: 4, title: "If-Else Statements", videoUrl: "DZwmZ8Usvnk", duration: "22 min", completed: false },
                    { id: 5, title: "Loops in Python", videoUrl: "94UHCEmprCY", duration: "25 min", completed: false }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Machine Learning A-Z",
        category: "Machine Learning",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
        description: "Complete guide to Machine Learning with Python and real projects",
        instructor: "Dr. Hassan",
        duration: "50 hours",
        lessons: 60,
        rating: 4.7,
        students: 750,
        price: "Free",
        modules: [
            {
                id: 1,
                title: "Introduction to ML",
                lessons: [
                    { id: 1, title: "What is Machine Learning?", videoUrl: "ukzFI9rgwfU", duration: "15 min", completed: false },
                    { id: 2, title: "Types of Machine Learning", videoUrl: "8S0xV_s6Kko", duration: "20 min", completed: false }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Freelancing Masterclass",
        category: "Freelancing",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
        description: "Learn how to start and grow your freelancing career",
        instructor: "Ahmed Raza",
        duration: "25 hours",
        lessons: 30,
        rating: 4.6,
        students: 1100,
        price: "Free",
        modules: [
            {
                id: 1,
                title: "Getting Started",
                lessons: [
                    { id: 1, title: "Introduction to Freelancing", videoUrl: "5vZvN1HBXMU", duration: "15 min", completed: false },
                    { id: 2, title: "Building Your Portfolio", videoUrl: "r_MpUP6aKiQ", duration: "25 min", completed: false }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "JavaScript Advanced Concepts",
        category: "Web Development",
        thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
        description: "Deep dive into JavaScript ES6+, async programming, and more",
        instructor: "Bilal Shah",
        duration: "30 hours",
        lessons: 35,
        rating: 4.8,
        students: 890,
        price: "Free",
        modules: [
            {
                id: 1,
                title: "ES6 Features",
                lessons: [
                    { id: 1, title: "Arrow Functions", videoUrl: "h33Srr5J9nY", duration: "18 min", completed: false },
                    { id: 2, title: "Destructuring", videoUrl: "NIq3qLaHCIs", duration: "20 min", completed: false }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Data Science with Python",
        category: "Python",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        description: "Learn data analysis, visualization, and machine learning basics",
        instructor: "Fatima Ali",
        duration: "45 hours",
        lessons: 50,
        rating: 4.9,
        students: 670,
        price: "Free",
        modules: [
            {
                id: 1,
                title: "Data Analysis Basics",
                lessons: [
                    { id: 1, title: "Introduction to NumPy", videoUrl: "QUT1VHiLmmI", duration: "22 min", completed: false },
                    { id: 2, title: "Pandas Fundamentals", videoUrl: "vmEHCJofslg", duration: "28 min", completed: false }
                ]
            }
        ]
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuth();
    
    // Load popular courses on homepage
    if (document.getElementById('popularCourses')) {
        loadPopularCourses();
    }
    
    // Load all courses on courses page
    if (document.getElementById('coursesContainer')) {
        loadAllCourses();
        setupFilters();
        setupSearch();
    }
    
    // Load course details
    if (document.getElementById('courseDetailContainer')) {
        loadCourseDetail();
    }
    
    // Load video player
    if (document.getElementById('videoPlayerContainer')) {
        loadVideoPlayer();
    }
    
    // Load dashboard
    if (document.getElementById('dashboardContainer')) {
        loadDashboard();
    }
});

// Check Authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authLinks = document.querySelectorAll('.auth-required');
    
    if (user) {
        // User is logged in
        authLinks.forEach(link => {
            link.style.display = 'block';
        });
    }
}

// Load Popular Courses (Homepage)
function loadPopularCourses() {
    const container = document.getElementById('popularCourses');
    const popularCourses = coursesData.slice(0, 3);
    
    container.innerHTML = popularCourses.map(course => createCourseCard(course)).join('');
}

// Load All Courses
function loadAllCourses(filter = 'all', searchTerm = '') {
    const container = document.getElementById('coursesContainer');
    let filtered = coursesData;
    
    // Apply category filter
    if (filter !== 'all') {
        filtered = filtered.filter(course => course.category === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(course => 
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted">No courses found.</p></div>';
        return;
    }
    
    container.innerHTML = filtered.map(course => createCourseCard(course)).join('');
}

// Create Course Card HTML
function createCourseCard(course) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="card course-card shadow-sm h-100">
                <div class="position-relative">
                    <img src="${course.thumbnail}" class="card-img-top" alt="${course.title}">
                    <span class="course-badge">${course.category}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text course-instructor">
                        <i class="fas fa-user"></i> ${course.instructor}
                    </p>
                    <p class="card-text">${course.description.substring(0, 80)}...</p>
                    <div class="course-stats mb-3">
                        <span><i class="fas fa-star text-warning"></i> ${course.rating}</span>
                        <span><i class="fas fa-users"></i> ${course.students}</span>
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-success">${course.price}</span>
                        <a href="course-detail.html?id=${course.id}" class="btn btn-primary">View Course</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup Category Filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            const searchTerm = document.getElementById('searchInput')?.value || '';
            loadAllCourses(category, searchTerm);
        });
    });
}

// Setup Search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
            loadAllCourses(category, this.value);
        });
    }
}

// Load Course Detail
function loadCourseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    const course = coursesData.find(c => c.id === courseId);
    
    if (!course) {
        document.getElementById('courseDetailContainer').innerHTML = '<p>Course not found.</p>';
        return;
    }
    
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseInstructor').textContent = course.instructor;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseLessons').textContent = `${course.lessons} Lessons`;
    document.getElementById('courseRating').textContent = course.rating;
    document.getElementById('courseStudents').textContent = `${course.students} Students`;
    document.getElementById('courseDescription').textContent = course.description;
    
    // Load course modules
    const modulesContainer = document.getElementById('courseModules');
    if (course.modules && course.modules.length > 0) {
        modulesContainer.innerHTML = course.modules.map((module, idx) => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${idx === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#module${module.id}">
                        ${module.title} (${module.lessons.length} lessons)
                    </button>
                </h2>
                <div id="module${module.id}" class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}">
                    <div class="accordion-body p-0">
                        ${module.lessons.map(lesson => `
                            <div class="lesson-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-play-circle text-primary me-2"></i>
                                    ${lesson.title}
                                </div>
                                <span class="text-muted">${lesson.duration}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Enroll in Course
function enrollCourse(courseId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }
    
    let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    
    if (!enrolledCourses.includes(courseId)) {
        enrolledCourses.push(courseId);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        alert('Successfully enrolled!');
        window.location.href = `video-player.html?courseId=${courseId}&lessonId=1`;
    } else {
        alert('Already enrolled!');
        window.location.href = `video-player.html?courseId=${courseId}&lessonId=1`;
    }
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} toast-custom`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}