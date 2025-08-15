/*
  script.js
  JavaScript for Yashraj Rastogi's Portfolio
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Fade-in animation on scroll ---
    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Carousel functionality ---
    function setupCarousel(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        
        const track = carousel.querySelector('.carousel-track');
        const items = Array.from(track.children);
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');
        
        if (!track || items.length === 0 || !nextButton || !prevButton) return;
        
        // Determine number of items to show based on window size and carousel type
        let itemsPerView = window.innerWidth < 768 ? 1 : (carouselId === 'projects-carousel' ? 1 : 3);
        let currentIndex = 0;

        function updateCarousel() {
            const itemWidth = items[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (currentIndex * itemWidth) + 'px)';
        }
        
        function handleResize() {
            itemsPerView = window.innerWidth < 768 ? 1 : (carouselId === 'projects-carousel' ? 1 : 3);
            // Reset index if it's out of bounds after resize
            if (currentIndex > items.length - itemsPerView) {
                currentIndex = Math.max(0, items.length - itemsPerView);
            }
            updateCarousel();
        }

        nextButton.addEventListener('click', () => {
            if (currentIndex < items.length - itemsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = items.length - itemsPerView; // Loop to end
            }
            updateCarousel();
        });
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial setup
    }

    setupCarousel('projects-carousel');
    setupCarousel('certs-carousel');
    
    // --- Active Nav Link on Scroll (Scroll-spying) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
