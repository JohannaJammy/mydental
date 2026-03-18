document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MOBILE NAVIGATION =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const icon = this.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const icon = navToggle?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // ===== ACTIVE LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== BACK TO TOP BUTTON =====
  const backTop = document.getElementById('backTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backTop.style.display = 'flex';
    } else {
      backTop.style.display = 'none';
    }
  });

  backTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== FORM SUBMISSION =====
  const appointmentForm = document.getElementById('appointmentForm');
  const formMessage = document.getElementById('formMessage');
  
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const phone = document.getElementById('phone')?.value;
      
      if (!name || !email || !phone) {
        showMessage('Please fill in all required fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }
      
      if (!isValidPhone(phone)) {
        showMessage('Please enter a valid phone number', 'error');
        return;
      }
      
      showMessage('✓ Appointment request sent! We\'ll contact you within 30 minutes.', 'success');
      this.reset();
    });
  }

  // ===== NEWSLETTER =====
  const newsletterBtn = document.getElementById('newsletterBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');
  
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function() {
      const email = newsletterEmail?.value;
      
      if (!email) {
        alert('Please enter your email address');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      alert('✓ Thanks for subscribing! You\'ll receive updates soon.');
      newsletterEmail.value = '';
    });
  }

  // ===== HELPER FUNCTIONS =====
  function showMessage(text, type) {
    if (!formMessage) return;
    
    formMessage.textContent = text;
    formMessage.className = 'form-message';
    formMessage.classList.add(type === 'success' ? 'success-message' : 'error-message');
    
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 5000);
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function isValidPhone(phone) {
    return /^[\d\s\+\-]{10,}$/.test(phone);
  }

  // ===== ANIMATIONS ON SCROLL =====
  const animateElements = document.querySelectorAll('.service-item, .team-card, .action-card');
  
  function checkAnimations() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Set initial styles
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', checkAnimations);
  checkAnimations();

  // ===== STATS COUNTER =====
  const stats = document.querySelectorAll('.hero-feature span');
  let counted = false;
  
  function countStats() {
    if (counted) return;
    
    stats.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/\d+/);
      if (match) {
        const target = parseInt(match[0]);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = text.replace(/\d+/, target);
            clearInterval(timer);
          } else {
            stat.textContent = text.replace(/\d+/, Math.floor(current));
          }
        }, 20);
      }
    });
    
    counted = true;
  }

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countStats();
        }
      });
    });
    
    observer.observe(heroSection);
  }

  console.log('Goregaon Dental Center - Ready!');
});