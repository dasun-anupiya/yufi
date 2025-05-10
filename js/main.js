// Sample data for courses
const courses = [
    {
        title: "Web Development",
        description: "Learn modern web development with HTML, CSS, and JavaScript",
        image: "assets/courses/web-dev.jpg",
        instructor: "John Doe",
        duration: "12 weeks"
    },
    {
        title: "Data Science",
        description: "Master data analysis and machine learning",
        image: "assets/courses/data.jpg",
        instructor: "Jane Smith",
        duration: "16 weeks"
    },
    {
        title: "Mobile App Development",
        description: "Build iOS and Android apps with React Native",
        image: "assets/courses/mobile.avif",
        instructor: "Mike Johnson",
        duration: "14 weeks"
    },
    {
        title: "Spoken English",
        description: "Practice English with native speakers",
        image: "assets/courses/en.jpg",
        instructor: "Mike Johnson",
        duration: "14 weeks"
    }
];

// Sample data for teachers
const teachers = [
    {
        name: "John Doe",
        role: "Web Development Expert",
        image: "assets/teachers/1.webp",
        bio: "10+ years of experience in web development"
    },
    {
        name: "Jane Smith",
        role: "Data Science Specialist",
        image: "assets/teachers/R.jpg",
        bio: "PhD in Computer Science"
    },
    {
        name: "Mike Johnson",
        role: "Mobile App Developer",
        image: "assets/teachers/R(1).jpg",
        bio: "Former Google Developer"
    }
];

// Sample data for testimonials
const testimonials = [
    {
        name: "Sarah Wilson",
        role: "Web Development Student",
        image: "assets/testimonials/1.avif",
        text: "The courses at YUFI transformed my career. The instructors are amazing!"
    },
    {
        name: "David Brown",
        role: "Data Science Graduate",
        image: "assets/testimonials/4.jpg",
        text: "Best decision I made for my professional development. Highly recommended!"
    },
    {
        name: "Emily Chen",
        role: "Mobile App Developer",
        image: "assets/testimonials/3.jpg",
        text: "The practical approach to learning made all the difference."
    }
];

// Initialize sliders
function initializeSliders() {
    // Course slider
    const courseSlider = document.querySelector('.course-cards');
    let currentCourseIndex = 0;

    function updateCourseSlider() {
        const course = courses[currentCourseIndex];
        courseSlider.innerHTML = `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-info">
                    <span>Instructor: ${course.instructor}</span>
                    <span>Duration: ${course.duration}</span>
                </div>
            </div>
        `;
    }

    // Teacher slider
    const teacherSlider = document.querySelector('.teacher-cards');
    
    function updateTeacherSlider() {
        teacherSlider.innerHTML = teachers.map(teacher => `
            <div class="teacher-card">
                <img src="${teacher.image}" alt="${teacher.name}">
                <h3>${teacher.name}</h3>
                <p class="role">${teacher.role}</p>
                <p class="bio">${teacher.bio}</p>
            </div>
        `).join('');
    }

    // Auto-slide functionality for courses only
    setInterval(() => {
        currentCourseIndex = (currentCourseIndex + 1) % courses.length;
        updateCourseSlider();
    }, 2000);

    // Initialize sliders
    updateCourseSlider();
    updateTeacherSlider();

    // Add click handlers for course slider buttons only
    document.querySelectorAll('.course-slider .slider-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('prev')) {
                currentCourseIndex = (currentCourseIndex - 1 + courses.length) % courses.length;
            } else {
                currentCourseIndex = (currentCourseIndex + 1) % courses.length;
            }
            updateCourseSlider();
        });
    });
}

// Initialize testimonials
function initializeTestimonials() {
    const testimonialContainer = document.querySelector('.testimonial-cards');
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <p class="testimonial-text">${testimonial.text}</p>
            <h4>${testimonial.name}</h4>
            <p class="testimonial-role">${testimonial.role}</p>
        `;
        testimonialContainer.appendChild(card);
    });
}

// Handle contact form submission
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize chat functionality
function initializeChat() {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');

    chatButton.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatButton.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatButton.style.display = 'block';
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            const message = chatInput.value.trim();
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                addMessage('Thank you for your message! Our team will get back to you soon.', 'bot');
            }, 1000);
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Scroll Animation Function
function handleScrollAnimation() {
    const elements = document.querySelectorAll('#about-company, .vision, .mission, .team-card, .teacher-card, .developer-info');
    
    // Add initial animation class
    elements.forEach(element => {
        element.classList.add('animate-in');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    initializeTestimonials();
    initializeContactForm();
    initializeChat();
    handleScrollAnimation();
}); 