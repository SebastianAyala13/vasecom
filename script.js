// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const calendarModal = document.getElementById('calendarModal');
const successModal = document.getElementById('successModal');
const meetingForm = document.getElementById('meetingForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect with premium animations
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    // Add background when scrolling
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Advanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animations for grid items
            if (entry.target.classList.contains('service-card') || 
                entry.target.classList.contains('channel-card')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for advanced animations
document.querySelectorAll('.service-card, .channel-card, .stat-card, .contact-method, .feature, .leader-card').forEach(el => {
    el.classList.add('fade-in');
    animationObserver.observe(el);
});

// Counter animation for statistics with easing
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    });
};

// Trigger counter animation when results section is visible
const resultsSection = document.querySelector('.results');
let countersAnimated = false;

const resultsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (resultsSection) {
    resultsObserver.observe(resultsSection);
}

// Enhanced floating cards animation with physics
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    let mouseX = 0;
    let mouseY = 0;
    let cardX = 0;
    let cardY = 0;
    
    // Mouse tracking for interactive movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });
    
    // Smooth animation loop
    const animateCard = () => {
        cardX += (mouseX * 20 - cardX) * 0.1;
        cardY += (mouseY * 20 - cardY) * 0.1;
        
        card.style.transform = `translate(${cardX}px, ${cardY}px)`;
        requestAnimationFrame(animateCard);
    };
    
    animateCard();
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform += ' scale(1.1)';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// Premium hover effects for cards
document.querySelectorAll('.service-card, .channel-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(37, 211, 102, 0.1);
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            width: 20px;
            height: 20px;
            left: 50%;
            top: 50%;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Calendar Modal Functions
function openCalendarModal(serviceType = '') {
    calendarModal.classList.add('show');
    calendarModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Pre-select service if provided
    if (serviceType) {
        const serviceSelect = document.getElementById('service');
        serviceSelect.value = serviceType;
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 300);
}

function closeCalendarModal() {
    calendarModal.classList.remove('show');
    setTimeout(() => {
        calendarModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
    
    // Reset form
    meetingForm.reset();
}

function closeSuccessModal() {
    successModal.classList.remove('show');
    setTimeout(() => {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Enhanced form submission with validation and Google Calendar integration
async function scheduleMeeting(event) {
    event.preventDefault();
    
    const formData = new FormData(meetingForm);
    const data = Object.fromEntries(formData.entries());
    
    // Add loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Programando...';
    submitBtn.disabled = true;
    
    try {
        // Crear fecha y hora para Google Calendar
        const startDateTime = `${data.date}T${data.time}:00`;
        const endDateTime = `${data.date}T${addHour(data.time)}:00`;
        
        // Verificar disponibilidad (si Google Calendar está configurado)
        let isAvailable = true;
        if (typeof checkAvailability === 'function') {
            isAvailable = await checkAvailability(startDateTime, endDateTime);
            if (!isAvailable) {
                throw new Error('La hora seleccionada no está disponible. Por favor elige otro horario.');
            }
        }
        
        // Crear evento en Google Calendar (si está configurado)
        let calendarEvent = null;
        if (typeof createCalendarEvent === 'function') {
            const eventDetails = {
                summary: `Reunión VASECOM - ${getServiceName(data.service)}`,
                description: `
📋 DETALLES DE LA REUNIÓN

👤 Cliente: ${data.name}
🏢 Empresa: ${data.company || 'No especificada'}
📧 Email: ${data.email}
📱 Teléfono: ${data.phone}
🔧 Servicio: ${getServiceName(data.service)}

💬 Mensaje del cliente:
${data.message || 'Sin mensaje adicional'}

---
Generado automáticamente por VASECOM
                `.trim(),
                startDateTime: `${data.date}T${data.time}:00-05:00`,
                endDateTime: `${data.date}T${addHour(data.time)}:00-05:00`,
                attendees: [
                    { email: data.email, displayName: data.name }
                ]
            };
            
            try {
                calendarEvent = await createCalendarEvent(eventDetails);
                console.log('✅ Evento creado en Google Calendar:', calendarEvent);
            } catch (calendarError) {
                console.warn('⚠️ No se pudo crear el evento en Google Calendar:', calendarError);
                // Continuar sin Google Calendar
            }
        }
        
        // Send WhatsApp notification
        const whatsappMessage = `
🗓️ *Nueva Reunión Programada - VASECOM*

👤 *Cliente:* ${data.name}
🏢 *Empresa:* ${data.company || 'No especificada'}
📧 *Email:* ${data.email}
📱 *Teléfono:* ${data.phone}
🔧 *Servicio:* ${getServiceName(data.service)}
📅 *Fecha:* ${formatDate(data.date)}
⏰ *Hora:* ${data.time}

💬 *Mensaje:*
${data.message || 'Sin mensaje adicional'}

${calendarEvent ? '✅ *Evento agregado al calendario*' : '📝 *Agregar manualmente al calendario*'}
        `.trim();
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Close calendar modal and show success
        closeCalendarModal();
        
        setTimeout(() => {
            successModal.classList.add('show');
            successModal.style.display = 'flex';
            
            // Update success message if calendar was created
            if (calendarEvent) {
                const successText = successModal.querySelector('p');
                successText.innerHTML = 'Hemos recibido tu solicitud de reunión y la hemos agregado a nuestro calendario. Te contactaremos pronto para confirmar los detalles.';
            }
        }, 300);
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'meeting_scheduled', {
                event_category: 'engagement',
                event_label: data.service,
                value: 1,
                custom_parameters: {
                    calendar_integration: calendarEvent ? 'success' : 'failed'
                }
            });
        }
        
        // Optional: Open WhatsApp for internal notification
        // const whatsappUrl = `https://wa.me/573107736703?text=${encodeURIComponent(whatsappMessage)}`;
        // window.open(whatsappUrl, '_blank');
        
    } catch (error) {
        console.error('Error scheduling meeting:', error);
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show error message
        alert(`Error al programar la reunión: ${error.message || 'Por favor intenta nuevamente.'}`);
    }
}

// Helper functions
function addHour(time) {
    const [hours, minutes] = time.split(':');
    const newHours = (parseInt(hours) + 1).toString().padStart(2, '0');
    return `${newHours}:${minutes}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getServiceName(serviceCode) {
    const services = {
        'asesoria': 'Asesoría Especializada',
        'mentoria': 'Mentoría Ejecutiva',
        'sociedad': 'Sociedad Estratégica',
        'inversion': 'Búsqueda de Inversionistas',
        'ecommerce': 'Consultoría E-commerce'
    };
    return services[serviceCode] || serviceCode;
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === calendarModal) {
        closeCalendarModal();
    }
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (calendarModal.classList.contains('show')) {
            closeCalendarModal();
        }
        if (successModal.classList.contains('show')) {
            closeSuccessModal();
        }
    }
});

// Typing effect disabled for better UX and performance
// Text shows immediately without animation

// Advanced page loading animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Staggered animations for hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
    
    // Animate floating cards
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 300 + 1000);
    });
});

// WhatsApp button enhanced pulse effect
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    let pulseInterval;
    
    const startPulse = () => {
        pulseInterval = setInterval(() => {
            whatsappBtn.style.animation = 'none';
            setTimeout(() => {
                whatsappBtn.style.animation = 'pulse 2s infinite';
            }, 100);
        }, 8000);
    };
    
    const stopPulse = () => {
        clearInterval(pulseInterval);
    };
    
    // Start pulse animation
    startPulse();
    
    // Pause pulse when hovering
    whatsappBtn.addEventListener('mouseenter', stopPulse);
    whatsappBtn.addEventListener('mouseleave', startPulse);
}

// Enhanced click tracking with detailed analytics
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const linkText = link.textContent.trim();
        const section = link.closest('section')?.id || 'unknown';
        
        console.log('WhatsApp link clicked:', {
            text: linkText,
            section: section,
            url: link.href,
            timestamp: new Date().toISOString()
        });
        
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: `${section}_${linkText}`,
                value: 1
            });
        }
    });
});

// Performance monitoring
const observePerformance = () => {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'navigation') {
                    console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
                }
            });
        });
        
        observer.observe({ entryTypes: ['navigation'] });
    }
};

observePerformance();

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #25D366, #4A90E2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
};

createScrollProgress();

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Advanced form validation with real-time feedback
const addFormValidation = () => {
    const inputs = document.querySelectorAll('#meetingForm input, #meetingForm select, #meetingForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        clearFieldError(e);
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Por favor ingresa un email válido';
        } else if (field.type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Por favor ingresa un teléfono válido';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
    }
    
    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[\+]?[\d\s\-\(\)]{10,}$/.test(phone);
    }
};

// Initialize form validation when DOM is ready
document.addEventListener('DOMContentLoaded', addFormValidation);

// Add custom CSS for form validation
const validationCSS = `
.form-group input.error,
.form-group select.error,
.form-group textarea.error {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}
`;

const validationStyle = document.createElement('style');
validationStyle.textContent = validationCSS;
document.head.appendChild(validationStyle);

// Dynamic particles for leadership section
function createDynamicParticles() {
    const leadershipSection = document.querySelector('.leadership');
    if (!leadershipSection) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'dynamic-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    leadershipSection.appendChild(particlesContainer);

    // Create floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 6 + 4; // 4-10px
        const left = Math.random() * 100; // 0-100%
        const animationDuration = Math.random() * 20 + 15; // 15-35s
        const delay = Math.random() * 10; // 0-10s
        
        const colors = [
            `rgba(52, 152, 219, ${Math.random() * 0.2 + 0.05})`, // Azul
            `rgba(26, 188, 156, ${Math.random() * 0.2 + 0.05})`, // Verde menta
            `rgba(44, 62, 80, ${Math.random() * 0.3 + 0.1})`,    // Gris oscuro
            `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})` // Blanco sutil
        ];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${left}%;
            top: 100%;
            animation: floatUp ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 1.5}px rgba(52, 152, 219, 0.2);
        `;
        
        particlesContainer.appendChild(particle);
    }

    // Add CSS animation for particles
    const particleCSS = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = particleCSS;
    document.head.appendChild(particleStyle);
}

// Modern Interactive Effects
class ModernEffects {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.mouseTrails = [];
        this.init();
    }

    init() {
        this.initCustomCursor();
        this.initMouseTrail();
        this.initMatrixRain();
        this.initFloatingCode();
        this.initNeonEffects();
    }

    // Custom Cursor
    initCustomCursor() {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Ultra-fast cursor movement - like real cursor
        const updateCursor = () => {
            // Instant following - no smoothing for real-time response
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
            
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // Hover effects
        document.querySelectorAll('a, button, .service-card, .leader-card').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }

    // Epic Mouse Trail Effect
    initMouseTrail() {
        let trailCount = 0;
        document.addEventListener('mousemove', (e) => {
            // Create more frequent, cooler trails
            if (Math.random() > 0.6) {
                const trail = document.createElement('div');
                trail.className = 'mouse-trail';
                
                // Random trail variations
                const size = Math.random() * 8 + 4; // 4-12px
                const colors = [
                    '#00ff88',
                    '#1abc9c',
                    '#2ecc71',
                    '#16a085',
                    '#ffffff'
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                trail.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    box-shadow: 0 0 ${size * 2}px ${color};
                    animation: epicTrailFade 1.2s ease-out forwards;
                `;
                
                document.body.appendChild(trail);
                
                // Clean up
                setTimeout(() => trail.remove(), 1200);
                
                // Limit number of trails
                trailCount++;
                if (trailCount > 50) {
                    const oldTrails = document.querySelectorAll('.mouse-trail');
                    if (oldTrails.length > 30) {
                        oldTrails[0].remove();
                    }
                    trailCount = 30;
                }
            }
        });
    }

    // Matrix Rain Effect - Disabled for cleaner text
    initMatrixRain() {
        // Matrix effect disabled to avoid text interference
        return;
    }

    // Floating Code Elements
    initFloatingCode() {
        const codeSnippets = [
            'const vasecom = true;',
            'function innovate() {}',
            'class FullStack {}',
            'npm run success',
            'git push origin future',
            'console.log("🚀");',
            'async transform()',
            'React.createElement()',
            'SELECT * FROM growth',
            'AI.optimize(business)'
        ];

        setInterval(() => {
            if (Math.random() > 0.8) {
                const code = document.createElement('div');
                code.className = 'code-float';
                code.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                code.style.left = Math.random() * 100 + '%';
                document.body.appendChild(code);

                setTimeout(() => code.remove(), 15000);
            }
        }, 4000);
    }

    // Neon Glow Effects
    initNeonEffects() {
        const importantElements = document.querySelectorAll('h1, h2, .btn-primary');
        
        setInterval(() => {
            const element = importantElements[Math.floor(Math.random() * importantElements.length)];
            element.classList.add('neon-glow');
            
            setTimeout(() => {
                element.classList.remove('neon-glow');
            }, 3000);
        }, 10000);
    }
}

// Initialize dynamic particles when page loads
// Modern Booking Modal Functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Track Calendly modal opening
    console.log('📅 Opening Calendly booking modal - 100% FREE');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Calendly integration and event handling
document.addEventListener('DOMContentLoaded', function() {
    // Listen for Calendly events for better UX
    window.addEventListener('message', function(e) {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            console.log('Calendly event:', e.data.event);
            
            // Close modal when event is scheduled
            if (e.data.event === 'calendly.event_scheduled') {
                setTimeout(() => {
                    closeBookingModal();
                    showNotification('✅ ¡Cita agendada exitosamente! Revisa tu email para confirmación.');
                }, 1000);
            }
        }
    });
    
    // Legacy form handling (if needed)
    const bookingForm = document.getElementById('modernBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btnText = document.querySelector('.btn-text');
            const btnLoading = document.querySelector('.btn-loading');
            const bookBtn = document.getElementById('bookNowBtn');
            const messageDiv = document.getElementById('bookingMessage');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            bookBtn.disabled = true;
            messageDiv.style.display = 'none';
            
            const formData = new FormData(bookingForm);
            const bookingData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                date: formData.get('date'),
                startTime: formData.get('time'),
                durationMinutes: parseInt(formData.get('duration')),
                notes: formData.get('notes') || ''
            };
            
            try {
                // Simulate API call (replace with real webhook URL)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success response
                messageDiv.className = 'booking-message success';
                messageDiv.innerHTML = `
                    ✅ <strong>¡Cita agendada exitosamente!</strong><br>
                    Te hemos enviado confirmación por email y WhatsApp.<br>
                    <em>Fecha: ${bookingData.date} a las ${bookingData.startTime}</em>
                `;
                messageDiv.style.display = 'block';
                
                // Reset form after success
                bookingForm.reset();
                
                // Optional: Close modal after 3 seconds
                setTimeout(() => {
                    closeBookingModal();
                }, 3000);
                
            } catch (error) {
                // Error response
                messageDiv.className = 'booking-message error';
                messageDiv.innerHTML = `
                    ❌ <strong>Error al agendar la cita</strong><br>
                    Por favor intenta nuevamente o contacta por WhatsApp.<br>
                    <em>Error: ${error.message || 'Conexión fallida'}</em>
                `;
                messageDiv.style.display = 'block';
            } finally {
                // Reset button state
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                bookBtn.disabled = false;
            }
        });
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeBookingModal();
    }
});

window.addEventListener('load', () => {
    new ModernEffects();
    createDynamicParticles();
    
    // Add Instagram click tracking
    document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Instagram link clicked:', link.href);
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    event_category: 'engagement',
                    event_label: 'instagram',
                    value: 1
                });
            }
        });
    });
});

// Show notification function for Calendly success
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88, #1abc9c);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10001;
        font-weight: 600;
        max-width: 300px;
        text-align: center;
        font-size: 0.9rem;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}