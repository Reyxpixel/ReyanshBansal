document.addEventListener("DOMContentLoaded", () => {
    // Portfolio items data
    const portfolioItems = [
      {
        id: 1,
        title: "Discord Bot",
        description:
          "A custom Discord bot built with discord.js that provides moderation, music playback, and utility commands for server management. The bot features a robust command system with permission levels and customizable prefix.",
        image: "Images/Proj0.png",
        category: "Development",
      },
      {
        id: 2,
        title: "Odyssey Posters",
        description:
          "A series of posters designed for the Odyssey event, featuring cosmic themes and vibrant colors. Created using Adobe Photoshop with custom brushes and textures to achieve a unique visual style.",
        image: "Images/Proj2.jpg",
        category: "Design",
      },
      {
        id: 3,
        title: "Design Journal",
        description:
          "A comprehensive design journal documenting the creative process behind various projects. Created in Adobe Illustrator with custom typography and layout design.",
        image: "Images/Proj3.png",
        category: "Design",
      },
      {
        id: 4,
        title: "Mobile App UI",
        description:
          "User interface design for a mobile application focused on productivity and task management. The design emphasizes clean lines, intuitive navigation, and accessibility.",
        image: "https://placehold.co/600x800",
        category: "UI/UX",
      },
      {
        id: 5,
        title: "3D Character Model",
        description:
          "A detailed 3D character model created in Blender for a game project. The model includes rigging for animation and multiple texture maps for realistic rendering.",
        image: "https://placehold.co/800x600",
        category: "3D",
      },
      {
        id: 6,
        title: "Brand Identity",
        description:
          "Complete brand identity package including logo design, color palette, typography, and usage guidelines. Developed for a tech startup focusing on sustainable solutions.",
        image: "https://placehold.co/600x400",
        category: "Branding",
      },
      {
        id: 7,
        title: "Photography Series",
        description:
          "A series of urban landscape photographs exploring the intersection of nature and city architecture. Shot with a DSLR camera and edited in Adobe Lightroom.",
        image: "https://placehold.co/400x600",
        category: "Photography",
      },
      {
        id: 8,
        title: "Web Design Project",
        description:
          "A responsive website design for an e-commerce platform, featuring modern aesthetics and optimized user experience. Implemented with HTML, CSS, and JavaScript.",
        image: "https://placehold.co/800x500",
        category: "Web",
      },
      {
        id: 9,
        title: "Illustration Collection",
        description:
          "A collection of digital illustrations created for a children's book. The illustrations feature vibrant colors and whimsical characters to engage young readers.",
        image: "https://placehold.co/500x700",
        category: "Illustration",
      },
      {
        id: 10,
        title: "Motion Graphics",
        description:
          "A series of motion graphics created for social media campaigns. The animations feature dynamic transitions and engaging visual effects to capture viewer attention.",
        image: "https://placehold.co/600x600",
        category: "Animation",
      },
    ]
  
    // Get the masonry container
    const masonryContainer = document.querySelector(".portfolio-masonry")
  
    // Get the modal elements
    const modal = document.getElementById("portfolioModal")
    const modalImage = document.getElementById("modalImage")
    const modalTitle = document.getElementById("modalTitle")
    const modalDescription = document.getElementById("modalDescription")
    const modalClose = document.getElementById("modalClose")
  
    // Populate the masonry grid
    function populatePortfolio() {
      if (!masonryContainer) return
  
      // Clear existing items
      masonryContainer.innerHTML = ""
  
      // Maximum width for the container
      const maxContainerWidth = 1200
      const containerPadding = 40 // 20px on each side
      const availableWidth = Math.min(maxContainerWidth, window.innerWidth - containerPadding)
  
      // Track the current row
      const currentRowItems = []
      const currentRowWidth = 0
      const targetRowHeight = 250 // Target height for rows
      const gap = 20 // Gap between items
  
      // Process each portfolio item
      portfolioItems.forEach((item, index) => {
        // Create a temporary image to get the natural dimensions
        const tempImg = new Image()
  
        tempImg.onload = function () {
          const aspectRatio = this.naturalWidth / this.naturalHeight
          const itemWidth = Math.round(targetRowHeight * aspectRatio)
  
          // Create the masonry item
          const masonryItem = document.createElement("div")
          masonryItem.className = "masonry-item"
          masonryItem.dataset.id = item.id
  
          // Set initial dimensions
          masonryItem.style.width = `${itemWidth}px`
          masonryItem.style.height = `${targetRowHeight}px`
  
          // Create the item content
          masonryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="masonry-item-overlay">
              <h3>${item.title}</h3>
              <p>${item.category}</p>
            </div>
          `
  
          // Add click event to open modal
          masonryItem.addEventListener("click", () => {
            openModal(item)
          })
  
          // Add to the container
          masonryContainer.appendChild(masonryItem)
        }
  
        tempImg.src = item.image
      })
    }
  
    // Open modal with item details
    function openModal(item) {
      if (!modal || !modalImage || !modalTitle || !modalDescription) return
  
      modalImage.src = item.image
      modalImage.alt = item.title
      modalTitle.textContent = item.title
      modalDescription.textContent = item.description
  
      // Create a temporary image to get the natural dimensions for modal sizing
      const tempImg = new Image()
      tempImg.onload = function () {
        const aspectRatio = this.naturalWidth / this.naturalHeight
  
        // Adjust modal content based on image dimensions
        const modalContent = document.querySelector(".modal-content")
        if (modalContent) {
          if (window.innerWidth >= 768) {
            // For desktop: side-by-side layout
            const imageContainer = document.querySelector(".modal-image-container")
            const detailsContainer = document.querySelector(".modal-details")
  
            if (aspectRatio < 1) {
              // Portrait image
              imageContainer.style.width = "auto"
              detailsContainer.style.width = "400px"
            } else if (aspectRatio > 1.5) {
              // Wide landscape image
              imageContainer.style.width = "auto"
              detailsContainer.style.width = "400px"
            } else {
              // Standard landscape image
              imageContainer.style.width = "auto"
              detailsContainer.style.width = "400px"
            }
  
            // Set the image width based on aspect ratio
            modalImage.style.width = "auto"
            modalImage.style.maxWidth = "100%"
          }
        }
  
        modal.classList.add("active")
        document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
      }
  
      tempImg.src = item.image
    }
  
    // Close modal
    function closeModal() {
      if (!modal) return
  
      modal.classList.remove("active")
      document.body.style.overflow = "" // Restore scrolling
    }
  
    // Event listeners
    if (modalClose) {
      modalClose.addEventListener("click", closeModal)
    }
  
    // Close modal when clicking outside the content
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal()
        }
      })
    }
  
    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal()
      }
    })
  
    // Handle window resize
    window.addEventListener("resize", () => {
      populatePortfolio()
    })
  
    // Initialize the portfolio
    populatePortfolio()
  })
  
  