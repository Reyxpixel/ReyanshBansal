document.addEventListener("DOMContentLoaded", () => {
  // Remove 3D effect for hero image - no more perspective effects
  const heroImageWrapper = document.querySelector(".hero-image-wrapper")
  const socialIcons = document.querySelectorAll(".social-icon")
  const orbitLines = document.querySelectorAll(".orbit-line")

  if (heroImageWrapper) {
    //This section is removed as per the update
  }

  // Make social icons clickable with proper links
  if (socialIcons) {
    socialIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const iconType = icon.getAttribute("data-icon")
        let url = "#"

        // Set appropriate URLs for each social icon
        switch (iconType) {
          case "github":
            url = "https://github.com/"
            break
          case "linkedin":
            url = "https://linkedin.com/"
            break
          case "twitter":
            url = "https://twitter.com/"
            break
          case "instagram":
            url = "https://instagram.com/"
            break
          case "dribbble":
            url = "https://dribbble.com/"
            break
        }

        window.open(url, "_blank")
      })
    })
  }

  // Enhanced header effect - fixed header
  const header = document.querySelector("header")
  const mainContent = document.querySelector("main")

  if (header && mainContent) {
    // Add padding to main content to account for fixed header
    mainContent.style.paddingTop = header.offsetHeight + "px"
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY
      const opacity = Math.min(0.3 + scrollY / 1000, 0.8)
      header.style.background = `rgba(30, 30, 35, ${opacity})`
      // Add subtle rotation for 3D effect
      const rotateX = Math.min(scrollY / 1000, 0.5)
      header.style.transform = `perspective(1000px) rotateX(${rotateX}deg)`
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = 0 // No offset needed since header is not fixed
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
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

  // Carousel functionality for skills section
  const carousel = document.querySelector(".carousel")
  const carouselItems = document.querySelectorAll(".carousel-item")
  const prevButton = document.querySelector(".prev-button")
  const nextButton = document.querySelector(".next-button")

  if (carousel && carouselItems.length > 0) {
    let currentIndex = 0
    const itemWidth = 300 + 32 // width + gap
    const containerWidth = document.querySelector(".carousel-wrapper").offsetWidth
    const itemsPerView = Math.floor(containerWidth / itemWidth)
    const maxIndex = Math.max(0, carouselItems.length - itemsPerView)

    // Initialize carousel position
    updateCarouselPosition()

    // Add event listeners to buttons
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          // Animate the transition
          carouselItems.forEach((item, index) => {
            if (index === currentIndex - 1) {
              // Fade in the new leftmost item
              item.style.opacity = "0"
              setTimeout(() => {
                item.style.opacity = "1"
              }, 50)
            } else if (index === currentIndex + itemsPerView - 1) {
              // Fade out the rightmost item
              item.style.opacity = "0"
            }
          })

          currentIndex = Math.max(0, currentIndex - 1)
          updateCarouselPosition()
        }
      })
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
          // Animate the transition
          carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
              // Fade out the leftmost item
              item.style.opacity = "0"
            } else if (index === currentIndex + itemsPerView) {
              // Fade in the new rightmost item
              item.style.opacity = "0"
              setTimeout(() => {
                item.style.opacity = "1"
              }, 50)
            }
          })

          currentIndex = Math.min(maxIndex, currentIndex + 1)
          updateCarouselPosition()
        }
      })
    }

    function updateCarouselPosition() {
      // Center the visible items
      const visibleWidth = itemsPerView * itemWidth - 32 // Subtract the last gap
      const offset = (containerWidth - visibleWidth) / 2
      const translateX = -currentIndex * itemWidth + offset
      carousel.style.transform = `translateX(${translateX}px)`

      // Update button states
      if (prevButton) {
        prevButton.disabled = currentIndex === 0
        prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1"
      }
      if (nextButton) {
        nextButton.disabled = currentIndex >= maxIndex
        nextButton.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
      }

      // Update visibility and opacity of items
      carouselItems.forEach((item, index) => {
        if (index < currentIndex || index >= currentIndex + itemsPerView) {
          item.style.visibility = "hidden"
          item.style.opacity = "0"
        } else {
          item.style.visibility = "visible"
          item.style.opacity = "1"
        }
      })
    }

    // Update on window resize
    window.addEventListener("resize", () => {
      const newContainerWidth = document.querySelector(".carousel-wrapper").offsetWidth
      const newItemsPerView = Math.floor(newContainerWidth / itemWidth)
      const newMaxIndex = Math.max(0, carouselItems.length - newItemsPerView)
      currentIndex = Math.min(currentIndex, newMaxIndex)
      updateCarouselPosition()
    })
  }

  // Carousel functionality for portfolio section
  const portfolioGrid = document.querySelector(".portfolio-grid")
  const portfolioGridItems = document.querySelectorAll(".portfolio-item")
  const prevButtonPortfolio = document.querySelector(".prev-button-portfolio")
  const nextButtonPortfolio = document.querySelector(".next-button-portfolio")

  if (portfolioGrid && portfolioGridItems.length > 0) {
    let currentIndexPortfolio = 0
    const itemWidthPortfolio = 300 + 32 // width + gap
    const containerWidth = document.querySelector(".carousel-wrapper").offsetWidth
    const itemsPerView = Math.floor(containerWidth / itemWidthPortfolio)
    const maxIndexPortfolio = Math.max(0, portfolioGridItems.length - itemsPerView)

    // Initialize carousel position
    updatePortfolioPosition()

    // Add event listeners to buttons
    if (prevButtonPortfolio) {
      prevButtonPortfolio.addEventListener("click", () => {
        if (currentIndexPortfolio > 0) {
          // Animate the transition
          portfolioGridItems.forEach((item, index) => {
            if (index === currentIndexPortfolio - 1) {
              // Fade in the new leftmost item
              item.style.opacity = "0"
              setTimeout(() => {
                item.style.opacity = "1"
              }, 50)
            } else if (index === currentIndexPortfolio + itemsPerView - 1) {
              // Fade out the rightmost item
              item.style.opacity = "0"
            }
          })

          currentIndexPortfolio = Math.max(0, currentIndexPortfolio - 1)
          updatePortfolioPosition()
        }
      })
    }

    if (nextButtonPortfolio) {
      nextButtonPortfolio.addEventListener("click", () => {
        if (currentIndexPortfolio < maxIndexPortfolio) {
          // Animate the transition
          portfolioGridItems.forEach((item, index) => {
            if (index === currentIndexPortfolio) {
              // Fade out the leftmost item
              item.style.opacity = "0"
            } else if (index === currentIndexPortfolio + itemsPerView) {
              // Fade in the new rightmost item
              item.style.opacity = "0"
              setTimeout(() => {
                item.style.opacity = "1"
              }, 50)
            }
          })

          currentIndexPortfolio = Math.min(maxIndexPortfolio, currentIndexPortfolio + 1)
          updatePortfolioPosition()
        }
      })
    }

    function updatePortfolioPosition() {
      // Center the visible items
      const visibleWidth = itemsPerView * itemWidthPortfolio - 32 // Subtract the last gap
      const offset = (containerWidth - visibleWidth) / 2
      const translateX = -currentIndexPortfolio * itemWidthPortfolio + offset
      portfolioGrid.style.transform = `translateX(${translateX}px)`

      // Update button states
      if (prevButtonPortfolio) {
        prevButtonPortfolio.disabled = currentIndexPortfolio === 0
        prevButtonPortfolio.style.opacity = currentIndexPortfolio === 0 ? "0.5" : "1"
      }
      if (nextButtonPortfolio) {
        nextButtonPortfolio.disabled = currentIndexPortfolio >= maxIndexPortfolio
        nextButtonPortfolio.style.opacity = currentIndexPortfolio >= maxIndexPortfolio ? "0.5" : "1"
      }

      // Update visibility and opacity of items
      portfolioGridItems.forEach((item, index) => {
        if (index < currentIndexPortfolio || index >= currentIndexPortfolio + itemsPerView) {
          item.style.visibility = "hidden"
          item.style.opacity = "0"
        } else {
          item.style.visibility = "visible"
          item.style.opacity = "1"
        }
      })
    }

    // Update on window resize
    window.addEventListener("resize", () => {
      const newContainerWidth = document.querySelector(".carousel-wrapper").offsetWidth
      const newItemsPerView = Math.floor(newContainerWidth / itemWidthPortfolio)
      const newMaxIndex = Math.max(0, portfolioGridItems.length - newItemsPerView)
      currentIndexPortfolio = Math.min(currentIndexPortfolio, newMaxIndex)
      updatePortfolioPosition()
    })
  }
})

