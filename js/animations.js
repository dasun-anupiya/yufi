// Function to handle scroll animations
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .team-card, .teacher-card, .article-card');
    const visionMission = document.querySelectorAll('.vision, .mission');
    const developerInfo = document.querySelector('.developer-info');

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // If it's a section, also animate its children
                if (entry.target.tagName === 'SECTION') {
                    const children = entry.target.querySelectorAll('.service-card, .team-card, .teacher-card, .article-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 200); // Stagger the animations
                    });
                }
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before the element comes into view
    });

    // Observe all sections
    sections.forEach(section => {
        section.classList.add('animate-in');
        observer.observe(section);
    });

    // Observe individual cards
    cards.forEach(card => {
        card.classList.add('animate-in');
        observer.observe(card);
    });

    // Observe vision and mission sections
    visionMission.forEach(item => {
        item.classList.add('animate-in');
        observer.observe(item);
    });

    // Observe developer info section
    if (developerInfo) {
        developerInfo.classList.add('animate-in');
        observer.observe(developerInfo);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScrollAnimations); 