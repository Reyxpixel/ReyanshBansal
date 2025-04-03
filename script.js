document.addEventListener("DOMContentLoaded", () => {
  // Remove 3D effect for hero image - no more perspective effects
  const heroImageWrapper = document.querySelector(".hero-image-wrapper")
  const socialIcons = document.querySelectorAll(".social-icon")
  const orbitLines = document.querySelectorAll(".orbit-line")

  // Enhanced header effect with animation
  const header = document.querySelector("header")
  const mainContent = document.querySelector("main")

  if (header && mainContent) {
    // Add padding to main content to account for fixed header
    mainContent.style.paddingTop = header.offsetHeight + "px"
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") {
        // Scroll to top when home button is clicked
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
        return
      }

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Initialize marquee duplication
  const marqueeContent = document.querySelector(".marquee-content")
  if (marqueeContent) {
    // Clone the content to create a seamless loop
    marqueeContent.innerHTML += marqueeContent.innerHTML
  }

  // Add animation to portfolio items when they come into view
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  const observePortfolioItems = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    portfolioItems.forEach((item) => {
      item.style.opacity = "0"
      item.style.transform = "translateY(20px)"
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      observer.observe(item)
    })
  }

  if (portfolioItems.length > 0) {
    observePortfolioItems()
  }

  // Update copyright year
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Completely rebuilt carousel functionality
  function initCarousel(carouselSelector, itemSelector, prevBtnSelector, nextBtnSelector) {
    const carousel = document.querySelector(carouselSelector);
    const items = document.querySelectorAll(itemSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    
    if (!carousel || items.length === 0) return;
    
    let currentIndex = 0;
    let itemsPerView = 1;
    
    // Calculate how many items to show based on screen width
    function calculateItemsPerView() {
      if (window.innerWidth >= 992) {
        return 3;
      } else if (window.innerWidth >= 768) {
        return 2;
      } else {
        return 1;
      }
    }
    
    // Update carousel position and visibility
    function updateCarousel() {
      itemsPerView = calculateItemsPerView();
      const maxIndex = Math.max(0, items.length - itemsPerView);
      
      // Ensure current index is valid
      currentIndex = Math.min(currentIndex, maxIndex);
      
      // Update transform
      carousel.style.transform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`;
      
      // Update button states
      prevBtn.disabled = currentIndex === 0;
      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      nextBtn.disabled = currentIndex >= maxIndex;
      nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
      
      // Update item visibility and apply animations
      items.forEach((item, index) => {
        // Reset all items
        item.style.opacity = "0";
        item.style.transform = "scale(0.95)";
        
        // Show visible items
        if (index >= currentIndex && index < currentIndex + itemsPerView) {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50 * (index - currentIndex)); // Staggered animation
        }
      });
    }
    
    // Set up item widths based on items per view
    function setupItemWidths() {
      const viewCount = calculateItemsPerView();
      items.forEach(item => {
        item.style.flex = `0 0 ${100 / viewCount}%`;
      });
    }
    
    // Initialize
    setupItemWidths();
    updateCarousel();
    
    // Event listeners
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextBtn.addEventListener("click", () => {
      const maxIndex = Math.max(0, items.length - itemsPerView);
      
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });    
    
    // Handle window resize
    window.addEventListener("resize", () => {
      setupItemWidths();
      updateCarousel();
    });
  }
  
  // Initialize both carousels
  initCarousel(".carousel", ".carousel-item", ".prev-button", ".next-button");
  initCarousel(".portfolio-grid", ".portfolio-item", ".prev-button-portfolio", ".next-button-portfolio");

  // Add terminal typing animation to section titles when they become visible
  const sectionTitles = document.querySelectorAll(".section-title")

  // Store the original text of each title
  sectionTitles.forEach((title) => {
    title.setAttribute("data-original-text", title.textContent)
    title.textContent = ""

    // Create a span inside the title for the typing animation
    const typingSpan = document.createElement("span")
    typingSpan.classList.add("typing-animation")
    title.appendChild(typingSpan)
  })

  // Create an intersection observer
  const titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const title = entry.target
          const typingSpan = title.querySelector(".typing-animation")
          const titleText = title.getAttribute("data-original-text")

          // Only start animation if it hasn't been animated yet
          if (!typingSpan.textContent) {
            let i = 0
            const typingInterval = setInterval(() => {
              if (i < titleText.length) {
                typingSpan.textContent = titleText.substring(0, i + 1)
                i++
              } else {
                clearInterval(typingInterval)
                typingSpan.classList.remove("typing-animation")
                typingSpan.classList.add("typing-animation-done")
              }
            }, 100) // Adjust typing speed here
          }

          // Unobserve after animation starts
          titleObserver.unobserve(title)
        }
      })
    },
    { threshold: 0.5 },
  ) // Trigger when 50% of the element is visible

  // Observe all section titles
  sectionTitles.forEach((title) => {
    titleObserver.observe(title)
  })

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
})

