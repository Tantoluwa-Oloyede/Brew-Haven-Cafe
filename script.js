// 5. Advanced JavaScript: Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-element').forEach(el => {
    observer.observe(el);
});


// Smooth scrolling (kept from original, but with a slight improvement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header-nav').offsetHeight; // Account for sticky header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Nav Bar Effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('main-header');
    if (window.scrollY > 100) {
        nav.style.background = 'var(--color-primary-light)'; // Darker on scroll
        nav.style.padding = '0.75rem 0';
    } else {
        nav.style.background = 'var(--color-primary-dark)';
        nav.style.padding = '1rem 0';
    }
});

// 6. Form Submission with Client-Side Validation (for impression)
function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const messageElement = document.getElementById('form-message');
    
    // Basic client-side email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(emailInput.value)) {
        messageElement.textContent = 'Please enter a valid email address.';
        messageElement.style.color = 'red';
        emailInput.focus();
        return;
    }

    // Simulate form submission success
    messageElement.textContent = '✅ Message Sent! Thank you for contacting Brew Haven. We will respond within 24 hours.';
    messageElement.style.color = 'var(--color-accent)';
    form.reset();
    
    // In a real application, you would use the Fetch API here to send data to a backend.
    /*
    fetch('/submit-form-endpoint', {
        method: 'POST',
        body: new FormData(form)
    }).then(response => { ... });
    */
}