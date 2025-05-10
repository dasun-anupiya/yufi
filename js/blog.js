// Sample blog articles data
const articles = [
    {
        id: 1,
        title: "The Future of Online Education",
        category: "education",
        date: "2024-03-15",
        author: "John Smith",
        image: "assets/blog/1.jpg",
        excerpt: "Exploring how technology is reshaping the landscape of education and what it means for future learners.",
        content: `
            <p>The education sector is undergoing a significant transformation, driven by technological advancements and changing learning preferences.</p>
            <h2>Key Trends in Online Education</h2>
            <ul>
                <li>Personalized Learning Experiences</li>
                <li>Virtual Reality Classrooms</li>
                <li>AI-Powered Learning Assistants</li>
            </ul>
            <iframe width="640" height="360" src="https://www.youtube.com/embed/06LoQ2Zg8Y8" title="Advantages and Disadvantages of Online Learning || Best Tips for Online Learning" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <p>These innovations are creating new opportunities for both educators and students.</p>
        `
    },
    {
        id: 2,
        title: "Top Programming Languages to Learn in 2024",
        category: "technology",
        date: "2024-03-10",
        author: "Sarah Johnson",
        image: "assets/blog/2.jpg",
        excerpt: "A comprehensive guide to the most in-demand programming languages and why you should learn them.",
        content: `
            <p>As technology continues to evolve, certain programming languages are becoming increasingly important for developers.</p>
            <h2>Most In-Demand Languages</h2>
            <ol>
                <li>Python</li>
                <li>JavaScript</li>
                <li>Rust</li>
            </ol>
            <p>Each language offers unique advantages for different types of projects.</p>
        `
    },
    {
        id: 3,
        title: "Innovation in Education Technology",
        category: "innovation",
        date: "2024-03-05",
        author: "Michael Chen",
        image: "assets/blog/3.jpg",
        excerpt: "How innovative technologies are revolutionizing the way we learn and teach.",
        content: `
            <p>Education technology is not just about digitizing traditional learning methods; it's about creating entirely new ways to engage with knowledge.</p>
            <h2>Innovative Solutions</h2>
            <div class="feature-grid">
                <div class="feature">
                    <h3>Interactive Learning</h3>
                    <p>Engaging students through interactive content and real-time feedback.</p>
                </div>
                <div class="feature">
                    <h3>Collaborative Tools</h3>
                    <p>Enabling seamless collaboration between students and teachers.</p>
                </div>
            </div>
        `
    },
    {
        id: 4,
        title: "Building a Successful Tech Career",
        category: "career",
        date: "2024-03-01",
        author: "Emily Davis",
        image: "assets/blog/4.jpg",
        excerpt: "Essential tips and strategies for launching and growing your career in technology.",
        content: `
            <p>The tech industry offers numerous opportunities for growth and advancement, but success requires careful planning and continuous learning.</p>
            <h2>Career Development Tips</h2>
            <div class="tips-container">
                <div class="tip">
                    <h3>Continuous Learning</h3>
                    <p>Stay updated with the latest technologies and industry trends.</p>
                </div>
                <div class="tip">
                    <h3>Networking</h3>
                    <p>Build a strong professional network through industry events and online communities.</p>
                </div>
            </div>
        `
    },
    {
        id: 5,
        title: "The Role of AI in Modern Education",
        category: "technology",
        date: "2024-02-25",
        author: "David Wilson",
        image: "assets/blog/5.jpg",
        excerpt: "Understanding how artificial intelligence is transforming educational experiences.",
        content: `
            <p>Artificial intelligence is not just a buzzword in education; it's becoming an integral part of how we learn and teach.</p>
            <h2>AI Applications in Education</h2>
            <div class="ai-features">
                <div class="feature">
                    <h3>Personalized Learning</h3>
                    <p>AI algorithms adapt to individual learning styles and pace.</p>
                </div>
                <div class="feature">
                    <h3>Automated Assessment</h3>
                    <p>Intelligent systems for grading and providing feedback.</p>
                </div>
            </div>
        `
    }
];

// Function to create article cards
function createArticleCard(article) {
    return `
        <article class="article-card">
            <img src="${article.image}" alt="${article.title}">
            <div class="article-content">
                <span class="category">${article.category}</span>
                <h2>${article.title}</h2>
                <p class="excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span class="author">By ${article.author}</span>
                    <span class="date">${formatDate(article.date)}</span>
                </div>
                <a href="#" class="read-more" data-id="${article.id}">Read More</a>
            </div>
        </article>
    `;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Display articles in the container
function displayArticles(articlesToShow) {
    const articlesContainer = document.getElementById('articles-container');
    if (!articlesContainer) {
        console.error('Articles container not found');
        return;
    }
    
    articlesContainer.innerHTML = articlesToShow.map(article => createArticleCard(article)).join('');
    
    // Add animation class to new articles
    const newArticleCards = articlesContainer.querySelectorAll('.article-card');
    newArticleCards.forEach(card => {
        card.classList.add('animate-in');
    });
}

// Initialize blog functionality
function initializeBlog() {
    const articlesContainer = document.getElementById('articles-container');
    if (!articlesContainer) {
        console.error('Articles container not found');
        return;
    }

    const searchInput = document.querySelector('.search-box input');
    const categoryLinks = document.querySelectorAll('.categories a');

    // Load all articles initially
    displayArticles(articles);

    // Initialize scroll animations
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

    // Observe all article cards
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        observer.observe(card);
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredArticles = articles.filter(article => 
                article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm)
            );
            displayArticles(filteredArticles);
        });
    }

    // Category filtering
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            // Filter articles
            const filteredArticles = category === 'all' 
                ? articles 
                : articles.filter(article => article.category === category);
            
            displayArticles(filteredArticles);
        });
    });

    // Read more functionality
    articlesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more')) {
            e.preventDefault();
            const articleId = parseInt(e.target.dataset.id);
            const article = articles.find(a => a.id === articleId);
            if (article) {
                showArticleModal(article);
            }
        }
    });
}

// Show article modal
function showArticleModal(article) {
    const modal = document.createElement('div');
    modal.className = 'article-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <img src="${article.image}" alt="${article.title}">
            <h1>${article.title}</h1>
            <div class="article-meta">
                <span class="author">By ${article.author}</span>
                <span class="date">${formatDate(article.date)}</span>
            </div>
            <div class="article-body">
                ${article.content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Trigger modal animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlog); 