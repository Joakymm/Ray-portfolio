document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    mobileNavToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Set first section as active by default
    sections[0].classList.add('active');
    //scrolling functionality
    
 navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to target section
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update active class
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
    });
});

// Additional code to update active link during scroll
window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.querySelector('.thank-you-message');
    
    // Initially hide thank you message
    thankYouMessage.style.display = 'none';
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            isValid = false;
            highlightError(nameInput);
        } else {
            removeHighlight(nameInput);
        }
        
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            isValid = false;
            highlightError(emailInput);
        } else {
            removeHighlight(emailInput);
        }
        
        if (subjectInput.value.trim() === '') {
            isValid = false;
            highlightError(subjectInput);
        } else {
            removeHighlight(subjectInput);
        }
        
        if (messageInput.value.trim() === '') {
            isValid = false;
            highlightError(messageInput);
        } else {
            removeHighlight(messageInput);
        }
        
        if (isValid) {
            // Hide form and show thank you message
            contactForm.style.display = 'none';
            thankYouMessage.style.display = 'flex';
            
            // You would typically send the form data to a server here
            console.log('Form submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            });
        }
    });
    
    function highlightError(input) {
        input.style.borderColor = 'red';
    }
    
    function removeHighlight(input) {
        input.style.borderColor = '#ddd';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animated number counters
    const factNumbers = document.querySelectorAll('.fact-number');
    
    function animateNumber(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }
    
    // Intersection Observer for number animation
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    factNumbers.forEach(number => {
        observer.observe(number);
    });
    
    // Text animation for hero section
    const heroText = document.querySelector('.hero-text h1');
    const originalText = heroText.innerHTML;
    const nameText = "Raymond";
    const professions = ["Frontend Developer", "UI/UX Designer", "Photographer"];
    let professionIndex = 0;
    
    function animateProfession() {
        const professionElement = document.querySelector('.hero-text h2');
        professionElement.style.opacity = 0;
        
        setTimeout(() => {
            professionElement.textContent = professions[professionIndex];
            professionElement.style.opacity = 1;
            professionIndex = (professionIndex + 1) % professions.length;
        }, 500);
    }
    
    // Start profession animation
    setInterval(animateProfession, 3000);
});