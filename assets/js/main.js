document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Init Lenis Smooth Scroll ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Expose lenis globally if needed
  window.lenis = lenis;

  // --- 2. Custom Cursor Follower ---
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot is instant
      gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.05 });
    });

    // Lerp for the outer circle
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(0.7, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    // Cursor Hover States
    const interactiveElements = document.querySelectorAll('a, button, .clickable, .project-item');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        gsap.to(cursorDot, { scale: 2, backgroundColor: '#4338ca', duration: 0.2 });
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        gsap.to(cursorDot, { scale: 1, backgroundColor: '#ffffff', duration: 0.2 });
      });
    });

    // Theme detection for cursor visibility
    // ScrollTrigger will toggle classes if cursor enters a light section
    gsap.registerPlugin(ScrollTrigger);
    
    const lightSections = document.querySelectorAll('.theme-light');
    lightSections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          cursor.classList.add('cursor-dark-theme');
          cursorDot.classList.add('cursor-dark-theme-dot');
        },
        onLeave: () => {
          cursor.classList.remove('cursor-dark-theme');
          cursorDot.classList.remove('cursor-dark-theme-dot');
        },
        onEnterBack: () => {
          cursor.classList.add('cursor-dark-theme');
          cursorDot.classList.add('cursor-dark-theme-dot');
        },
        onLeaveBack: () => {
          cursor.classList.remove('cursor-dark-theme');
          cursorDot.classList.remove('cursor-dark-theme-dot');
        }
      });
    });
  }

  // --- 3. Text Reveal Animations & ScrollTriggers ---
  gsap.registerPlugin(ScrollTrigger);

  // Reveal words on scroll
  const revealTexts = document.querySelectorAll('.reveal-text');
  revealTexts.forEach((textEl) => {
    // Wrap words in span elements
    const words = textEl.textContent.trim().split(/\s+/);
    textEl.innerHTML = words.map(word => `<span class="text-mask"><span class="text-slide-up inline-block">${word}</span></span>`).join(' ');

    const innerSpans = textEl.querySelectorAll('.text-slide-up');
    
    gsap.fromTo(innerSpans, 
      { translateY: '100%' },
      {
        translateY: '0%',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: textEl,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Fade-in reveal elements
  const fadeUpElements = document.querySelectorAll('.fade-up');
  fadeUpElements.forEach((el) => {
    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // --- 4. Project Accordion Switcher ---
  const projectItems = document.querySelectorAll('.project-item');
  const projectImage = document.getElementById('project-featured-image');
  const projectIndexText = document.getElementById('project-index-text');

  if (projectItems.length > 0 && projectImage) {
    projectItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        // Remove active class from all
        projectItems.forEach(i => i.classList.remove('active', 'text-white'));
        projectItems.forEach(i => i.classList.add('text-textMuted'));
        
        // Add active to current
        item.classList.add('active', 'text-white');
        item.classList.remove('text-textMuted');

        const newImg = item.getAttribute('data-image');
        const index = item.getAttribute('data-index');

        // Update Index Text (e.g. 04/08)
        if (projectIndexText) {
          projectIndexText.textContent = `${index}/08`;
        }

        // Animate image switch with a nice glint/scale
        gsap.to(projectImage, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            projectImage.src = newImg;
            gsap.to(projectImage, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        });
      });
    });
  }

  // --- 5. Page curtain transitions ---
  const transitionCurtain = document.querySelector('.page-transition-curtain');
  
  if (transitionCurtain) {
    // Initial reveal
    gsap.to(transitionCurtain, {
      translateY: '-100%',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(transitionCurtain, { translateY: '100%' });
      }
    });

    // Intercept clicks on same-origin navigation links
    const navLinks = document.querySelectorAll('.nav-transition-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetUrl = link.getAttribute('href');
        if (targetUrl && targetUrl !== '#' && !targetUrl.startsWith('http')) {
          e.preventDefault();
          gsap.to(transitionCurtain, {
            translateY: '0%',
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
              window.location.href = targetUrl;
            }
          });
        }
      });
    });
  }

  // --- 6. Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLines = document.querySelectorAll('.menu-line');

  if (menuBtn && mobileMenu) {
    let isOpen = false;

    menuBtn.addEventListener('click', () => {
      isOpen = !isOpen;

      if (isOpen) {
        // Toggle mobile menu panel
        gsap.to(mobileMenu, { x: '0%', duration: 0.5, ease: 'power3.out' });
        
        // Morph menu icon to X
        gsap.to(menuLines[0], { rotate: 45, y: 6, duration: 0.3 });
        gsap.to(menuLines[1], { opacity: 0, duration: 0.2 });
        gsap.to(menuLines[2], { rotate: -45, y: -6, duration: 0.3 });

        lenis.stop(); // Freeze background scrolling
      } else {
        gsap.to(mobileMenu, { x: '100%', duration: 0.5, ease: 'power3.in' });
        
        gsap.to(menuLines[0], { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(menuLines[1], { opacity: 1, duration: 0.2 });
        gsap.to(menuLines[2], { rotate: 0, y: 0, duration: 0.3 });

        lenis.start(); // Resume scroll
      }
    });

    // Close menu when clicking link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        gsap.to(mobileMenu, { x: '100%', duration: 0.4, ease: 'power3.in' });
        gsap.to(menuLines[0], { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(menuLines[1], { opacity: 1, duration: 0.2 });
        gsap.to(menuLines[2], { rotate: 0, y: 0, duration: 0.3 });
        lenis.start();
      });
    });
  }
});
