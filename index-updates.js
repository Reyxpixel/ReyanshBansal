// Add this to your existing script.js file

// Load Three.js for the 3D icosphere
document.addEventListener("DOMContentLoaded", () => {
    // Load the Three.js script dynamically
    const threeScript = document.createElement("script")
    threeScript.src = "three-sphere.js"
    threeScript.type = "module"
    document.body.appendChild(threeScript)
  
    // Load the style updates
    const styleUpdates = document.createElement("link")
    styleUpdates.rel = "stylesheet"
    styleUpdates.href = "style-updates.css"
    document.head.appendChild(styleUpdates)
  
    // Add portfolio link to navigation if it doesn't exist
    const navLinks = document.querySelector(".nav-links")
    if (navLinks) {
      const portfolioLink = Array.from(navLinks.querySelectorAll("a")).find(
        (link) => link.textContent.trim().toLowerCase() === "portfolio" || link.href.includes("portfolio.html"),
      )
  
      if (!portfolioLink) {
        const contactLink = navLinks.querySelector('a[href="#contact"]')
        if (contactLink) {
          const newPortfolioLink = document.createElement("a")
          newPortfolioLink.href = "portfolio.html"
          newPortfolioLink.className = "nav-link"
          newPortfolioLink.textContent = "Portfolio"
          navLinks.insertBefore(newPortfolioLink, contactLink)
        }
      }
    }
  })
  
  