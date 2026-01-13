 
        // Loading screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 800);
        });

        // Cart state
        let cart = [];
        
        // Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    if (entry.target.classList.contains('stat-item')) {
                        const statNumber = entry.target.querySelector('.stat-number');
                        const target = parseInt(statNumber.getAttribute('data-target'));
                        animateNumber(statNumber, target);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-element').forEach(el => {
            observer.observe(el);
        });

        function animateNumber(element, target) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 30);
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header-nav').offsetHeight + 40;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Dynamic navbar
        window.addEventListener('scroll', function() {
            const nav = document.getElementById('main-header');
            const scrollTop = document.getElementById('scrollTop');
            
            if (window.scrollY > 100) {
                nav.style.background = 'var(--color-primary-light)';
                nav.style.padding = '0.75rem 0';
                scrollTop.classList.add('visible');
            } else {
                nav.style.background = 'var(--color-primary-dark)';
                nav.style.padding = '1rem 0';
                scrollTop.classList.remove('visible');
            }
        });

        // Scroll to top
        document.getElementById('scrollTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Mobile menu
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Menu filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                menuItems.forEach(item => {
                    if (filter === 'all') {
                        item.classList.remove('hidden');
                        setTimeout(() => item.classList.add('visible'), 10);
                    } else {
                        if (item.getAttribute('data-category') === filter) {
                            item.classList.remove('hidden');
                            setTimeout(() => item.classList.add('visible'), 10);
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });
            });
        });

        // Shopping cart
        const cartIcon = document.getElementById('cartIcon');
        const cartModal = document.getElementById('cartModal');
        const closeCart = document.getElementById('closeCart');
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const price = parseFloat(btn.getAttribute('data-price'));
                
                addToCart(name, price);
                
                btn.textContent = 'Added!';
                btn.style.background = '#4CAF50';
                setTimeout(() => {
                    btn.textContent = 'Add to Cart';
                    btn.style.background = '';
                }, 1000);
            });
        });

        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            updateCart();
        }

        function updateCart() {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
                cartTotal.textContent = 'Total: $0.00';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div>
                            <strong>${item.name}</strong><br>
                            <small>Qty: ${item.quantity}</small>
                        </div>
                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('');
                
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                cartTotal.textContent = `Total: ${total.toFixed(2)}`;
            }
        }

        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });

        // Testimonials slider
        let currentSlide = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');

        function showSlide(n) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            currentSlide = (n + testimonials.length) % testimonials.length;
            testimonials[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // Newsletter form
        document.getElementById('newsletterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.getElementById('newsletter-message');
            message.textContent = '✅ Thank you for subscribing! Check your email for exclusive offers.';
            message.style.color = '#4CAF50';
            message.style.display = 'block';
            e.target.reset();
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('form-message');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = contactForm.querySelector('input[type="email"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(emailInput.value)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'error';
                emailInput.focus();
                return;
            }

            formMessage.textContent = '✅ Message sent! We\'ll respond within 24 hours.';
            formMessage.className = 'success';
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.className = '';
                formMessage.textContent = '';
            }, 5000);
        });
    
   
   
   
   




        
   
//    // Cart state management
//         let cart = [];
        
//         // Intersection Observer for scroll animations
//         const observerOptions = {
//             root: null,
//             rootMargin: '0px',
//             threshold: 0.2
//         };

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('visible');
                    
//                     // Animate stat numbers
//                     if (entry.target.classList.contains('stat-item')) {
//                         const statNumber = entry.target.querySelector('.stat-number');
//                         const target = parseInt(statNumber.getAttribute('data-target'));
//                         animateNumber(statNumber, target);
//                     }
                    
//                     observer.unobserve(entry.target);
//                 }
//             });
//         }, observerOptions);

//         document.querySelectorAll('.reveal-element').forEach(el => {
//             observer.observe(el);
//         });

//         // Animate numbers
//         function animateNumber(element, target) {
//             let current = 0;
//             const increment = target / 50;
//             const timer = setInterval(() => {
//                 current += increment;
//                 if (current >= target) {
//                     element.textContent = target;
//                     clearInterval(timer);
//                 } else {
//                     element.textContent = Math.floor(current);
//                 }
//             }, 30);
//         }

//         // Smooth scrolling
//         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 const target = document.querySelector(this.getAttribute('href'));
//                 if (target) {
//                     const headerHeight = document.querySelector('.header-nav').offsetHeight;
//                     const elementPosition = target.getBoundingClientRect().top;
//                     const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

//                     window.scrollTo({
//                         top: offsetPosition,
//                         behavior: 'smooth'
//                     });
//                 }
//             });
//         });

//         // Dynamic navbar on scroll
//         window.addEventListener('scroll', function() {
//             const nav = document.getElementById('main-header');
//             if (window.scrollY > 100) {
//                 nav.style.background = 'var(--color-primary-light)';
//                 nav.style.padding = '0.75rem 0';
//             } else {
//                 nav.style.background = 'var(--color-primary-dark)';
//                 nav.style.padding = '1rem 0';
//             }
//         });

//         // Mobile menu toggle
//         const menuToggle = document.getElementById('menuToggle');
//         const navMenu = document.getElementById('navMenu');
        
//         menuToggle.addEventListener('click', () => {
//             navMenu.classList.toggle('active');
//         });

//         // Close mobile menu when clicking a link
//         navMenu.querySelectorAll('a').forEach(link => {
//             link.addEventListener('click', () => {
//                 navMenu.classList.remove('active');
//             });
//         });

//         // Menu filter functionality
//         const filterBtns = document.querySelectorAll('.filter-btn');
//         const menuItems = document.querySelectorAll('.menu-item');

//         filterBtns.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 // Remove active class from all buttons
//                 filterBtns.forEach(b => b.classList.remove('active'));
//                 // Add active class to clicked button
//                 btn.classList.add('active');
                
//                 const filter = btn.getAttribute('data-filter');
                
//                 menuItems.forEach(item => {
//                     if (filter === 'all') {
//                         item.classList.remove('hidden');
//                         setTimeout(() => item.classList.add('visible'), 10);
//                     } else {
//                         if (item.getAttribute('data-category') === filter) {
//                             item.classList.remove('hidden');
//                             setTimeout(() => item.classList.add('visible'), 10);
//                         } else {
//                             item.classList.add('hidden');
//                         }
//                     }
//                 });
//             });
//         });

//         // Shopping cart functionality
//         const cartIcon = document.getElementById('cartIcon');
//         const cartModal = document.getElementById('cartModal');
//         const closeCart = document.getElementById('closeCart');
//         const cartCount = document.getElementById('cartCount');
//         const cartItems = document.getElementById('cartItems');
//         const cartTotal = document.getElementById('cartTotal');

//         // Add to cart buttons
//         document.querySelectorAll('.add-to-cart').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const name = btn.getAttribute('data-name');
//                 const price = parseFloat(btn.getAttribute('data-price'));
                
//                 addToCart(name, price);
                
//                 // Visual feedback
//                 btn.textContent = 'Added!';
//                 btn.style.background = '#4CAF50';
//                 setTimeout(() => {
//                     btn.textContent = 'Add to Cart';
//                     btn.style.background = '';
//                 }, 1000);
//             });
//         });

//         function addToCart(name, price) {
//             const existingItem = cart.find(item => item.name === name);
            
//             if (existingItem) {
//                 existingItem.quantity++;
//             } else {
//                 cart.push({ name, price, quantity: 1 });
//             }
            
//             updateCart();
//         }

//         function updateCart() {
//             cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            
//             if (cart.length === 0) {
//                 cartItems.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
//                 cartTotal.textContent = 'Total: $0.00';
//             } else {
//                 cartItems.innerHTML = cart.map(item => `
//                     <div class="cart-item">
//                         <div>
//                             <strong>${item.name}</strong><br>
//                             <small>Qty: ${item.quantity}</small>
//                         </div>
//                         <div>${(item.price * item.quantity).toFixed(2)}</div>
//                     </div>
//                 `).join('');
                
//                 const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//                 cartTotal.textContent = `Total: ${total.toFixed(2)}`;
//             }
//         }

//         // Open/close cart modal
//         cartIcon.addEventListener('click', () => {
//             cartModal.classList.add('active');
//         });

//         closeCart.addEventListener('click', () => {
//             cartModal.classList.remove('active');
//         });

//         cartModal.addEventListener('click', (e) => {
//             if (e.target === cartModal) {
//                 cartModal.classList.remove('active');
//             }
//         });

//         // Contact form submission
//         const contactForm = document.getElementById('contactForm');
//         const formMessage = document.getElementById('form-message');

//         contactForm.addEventListener('submit', (e) => {
//             e.preventDefault();
            
//             const emailInput = contactForm.querySelector('input[type="email"]');
//             const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
//             if (!emailPattern.test(emailInput.value)) {
//                 formMessage.textContent = 'Please enter a valid email address.';
//                 formMessage.className = 'error';
//                 emailInput.focus();
//                 return;
//             }

//             // Simulate form submission
//             formMessage.textContent = '✅ Message sent! We\'ll respond within 24 hours.';
//             formMessage.className = 'success';
//             contactForm.reset();
            
//             setTimeout(() => {
//                 formMessage.className = '';
//                 formMessage.textContent = '';
//             }, 5000);
//         });


