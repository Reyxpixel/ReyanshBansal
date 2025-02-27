document.addEventListener("DOMContentLoaded", () => {
    // Remove theme toggle functionality
  
    // Remove the perspective transforms in script.js
    const heroImage = document.querySelector(".hero-image")
    if (heroImage) {
    heroImage.style.transform = "none";
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  
    // Form submission handling
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Get form data
        const name = this.querySelector("#name").value
        const email = this.querySelector("#email").value
        const message = this.querySelector("#message").value
  
        // Simple validation
        if (!name || !email || !message) {
          alert("Please fill in all fields")
          return
        }
  
        // Here you would normally send the data to a server
        // For demo purposes, we'll just show an alert
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`)
        this.reset()
      })
    }
  
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
  })
  
  