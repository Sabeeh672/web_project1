// Global variables
let currentCourse = null;
let currentLessonIndex = 0;
let allLessons = [];
let completedLessons = [];

// Initialize Video Player
function loadVideoPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('courseId'));
    const lessonId = parseInt(urlParams.get('lessonId'));
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Get course data
    currentCourse = coursesData.find(c => c.id === courseId);
    
    if (!currentCourse) {
        alert('Course not found!');
        window.location.href = 'courses.html';
        return;
    }
    
    // Check if enrolled
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledCourses.includes(courseId)) {
        alert('Please enroll in this course first!');
        window.location.href = `course-detail.html?id=${courseId}`;
        return;
    }
    
    // Load course info
    document.getElementById('courseTitle').textContent = currentCourse.title;
    document.getElementById('courseInstructor').textContent = currentCourse.instructor;
    
    // Flatten all lessons from modules
    allLessons = [];
    if (currentCourse.modules && currentCourse.modules.length > 0) {
        currentCourse.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                allLessons.push({
                    ...lesson,
                    moduleTitle: module.title
                });
            });
        });
    }
    
    // Load completed lessons
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    completedLessons = courseProgress[courseId]?.completedLessons || [];
    
    // Find lesson index
    currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
    if (currentLessonIndex === -1) currentLessonIndex = 0;
    
    // Load lessons list
    loadLessonsList();
    
    // Load current lesson
    loadLesson(currentLessonIndex);
    
    // Update progress
    updateProgress();
}

// Load Lessons List in Sidebar
function loadLessonsList() {
    const container = document.getElementById('lessonsListContainer');
    
    if (allLessons.length === 0) {
        container.innerHTML = '<p class="text-center text-muted p-3">No lessons available</p>';
        return;
    }
    
    let currentModule = '';
    let html = '';
    
    allLessons.forEach((lesson, index) => {
        // Add module header if new module
        if (lesson.moduleTitle !== currentModule) {
            currentModule = lesson.moduleTitle;
            html += `
                <div class="p-3 bg-white border-bottom">
                    <h6 class="mb-0">${currentModule}</h6>
                </div>
            `;
        }
        
        const isCompleted = completedLessons.includes(lesson.id);
        const isActive = index === currentLessonIndex;
        
        html += `
            <div class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                 onclick="loadLessonByIndex(${index})">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        ${isCompleted 
                            ? '<i class="fas fa-check-circle text-success me-3"></i>' 
                            : '<i class="fas fa-play-circle me-3"></i>'}
                        <div>
                            <div class="fw-medium">${lesson.title}</div>
                            <small class="text-muted">${lesson.duration}</small>
                        </div>
                    </div>
                    ${isActive ? '<i class="fas fa-play text-primary"></i>' : ''}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load Specific Lesson
function loadLesson(index) {
    if (index < 0 || index >= allLessons.length) return;
    
    currentLessonIndex = index;
    const lesson = allLessons[index];
    
    // Update URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('lessonId', lesson.id);
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    
    // Load video - Fixed YouTube embed URL
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = `https://www.youtube.com/embed/${lesson.videoUrl}?rel=0&modestbranding=1`;
    
    // Update lesson info
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonDuration').textContent = lesson.duration;
    
    // Update complete button
    const isCompleted = completedLessons.includes(lesson.id);
    const completeBtn = document.getElementById('completeBtn');
    
    if (isCompleted) {
        completeBtn.innerHTML = '<i class="fas fa-check me-2"></i>Completed';
        completeBtn.classList.remove('btn-success');
        completeBtn.classList.add('btn-secondary');
        completeBtn.disabled = true;
    } else {
        completeBtn.innerHTML = '<i class="fas fa-check me-2"></i>Mark as Complete';
        completeBtn.classList.remove('btn-secondary');
        completeBtn.classList.add('btn-success');
        completeBtn.disabled = false;
    }
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === allLessons.length - 1;
    
    // Reload lessons list to update active state
    loadLessonsList();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Load Lesson by Index
function loadLessonByIndex(index) {
    loadLesson(index);
}

// Navigate to Next/Previous Lesson
function navigateLesson(direction) {
    if (direction === 'next' && currentLessonIndex < allLessons.length - 1) {
        loadLesson(currentLessonIndex + 1);
    } else if (direction === 'prev' && currentLessonIndex > 0) {
        loadLesson(currentLessonIndex - 1);
    }
}

// Mark Lesson as Complete
function markComplete() {
    const currentLesson = allLessons[currentLessonIndex];
    
    if (completedLessons.includes(currentLesson.id)) {
        return;
    }
    
    // Add to completed lessons
    completedLessons.push(currentLesson.id);
    
    // Save to localStorage
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    
    const totalLessons = allLessons.length;
    const completed = completedLessons.length;
    const percentage = Math.round((completed / totalLessons) * 100);
    
    courseProgress[currentCourse.id] = {
        completedLessons: completedLessons,
        percentage: percentage,
        currentLessonId: currentLesson.id,
        lastAccessed: new Date().toISOString()
    };
    
    localStorage.setItem('courseProgress', JSON.stringify(courseProgress));
    
    // Update UI
    updateProgress();
    
    // Show success message
    showToast('Lesson marked as complete!', 'success');
    
    // Reload lesson to update button
    loadLesson(currentLessonIndex);
    
    // Auto navigate to next lesson after 2 seconds
    if (currentLessonIndex < allLessons.length - 1) {
        setTimeout(() => {
            navigateLesson('next');
        }, 2000);
    } else {
        // Course completed
        setTimeout(() => {
            if (confirm('Congratulations! You have completed this course. Return to dashboard?')) {
                window.location.href = 'dashboard.html';
            }
        }, 2000);
    }
}

// Update Progress Display
function updateProgress() {
    const totalLessons = allLessons.length;
    const completed = completedLessons.length;
    const percentage = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
    progressBar.textContent = percentage + '%';
    
    // Update top progress text
    document.getElementById('courseProgress').textContent = `${percentage}% Complete`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadVideoPlayer);