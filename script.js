document.addEventListener("DOMContentLoaded", () => {
  // Remove 3D effect for hero image - no more perspective effects
  const heroImageWrapper = document.querySelector(".hero-image-wrapper")
  const socialIcons = document.querySelectorAll(".social-icon")
  const orbitLines = document.querySelectorAll(".orbit-line")

  // Enhanced header effect with animation
  const header = document.querySelector("header")
  const mainContent = document.querySelector("main")

  // Apply styling to the topbar navigation buttons
  const headerNavLinks = document.querySelectorAll("header nav a");
  headerNavLinks.forEach(link => {
    // Check if this is the "Reyansh Bansal" link (usually the first link or brand link)
    const isNameLink = link.textContent.includes("Reyansh") || 
                       link.textContent.includes("Bansal") ||
                       link.classList.contains("brand") ||
                       link.classList.contains("logo");
    
    // Rename "Projects" to "Work" and add arrow
    if (link.textContent.trim().toLowerCase() === 'projects') {
      // Use the exact SVG path from the reference site
      link.innerHTML = 'Work <svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z" fill="currentColor"></path></svg>';
    }
    
    // Add appropriate classes instead of inline styles
    if (!isNameLink) {
      link.classList.add('nav-link');
      
      // Add special class for Contact button
      if (link.textContent.trim().toLowerCase() === 'contact') {
        link.classList.add('contact-button');
      }
      
      // Add work button class if it contains the arrow span
      if (link.querySelector('.arrow')) {
        link.classList.add('work-button');
      }
    }
  });

  // Create and inject CSS styles for navigation
  function injectNavStyles() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* Navigation link styles */
      .nav-link {
        color: #7e7e7e;
        transition: all 0.3s ease;
        position: relative;
        padding: 8px 12px; /* Reduced horizontal padding */
        margin: 0 -2px; /* Negative margin to pull buttons closer */
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
        text-align: center;
        height: 36px;
      }

      /* Navigation container spacing */
      header nav {
        display: flex;
        align-items: center;
        gap: 5px; /* Small gap between nav items */
      }

      .nav-link:hover {
        color: #ffffff;
        transform: translateZ(10px);
        /* Removed text-shadow glow effect */
        background-color: rgba(70, 70, 70, 0.6);
        z-index: 1; /* Ensure hovered item appears above others */
      }
      
      /* Work button with arrow */
      .arrow {
        display: inline-block;
        margin-left: 2px; /* Reduced margin */
        transition: transform 0.3s ease;
        position: relative;
        top: 0;
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
      
      .work-button:hover .arrow {
        transform: rotate(180deg);
      }

      /* Contact button special styling - matching image exactly */
      .contact-button {
        color: #ffffff;
        background-color: #0a0a0a;
        border: 1px solid #242424;
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: normal;
        height: auto;
        display: inline-block;
        line-height: 1.2;
      }

      .contact-button:hover {
        background-color: #1a1a1a;
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateZ(5px);
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Inject the CSS styles
  injectNavStyles();

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

  // Three.js Scene Setup
  const canvas = document.getElementById('heroCanvas');
  canvas.style.zIndex = '2'; // Higher z-index, nothing else changed
  
  const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
  });
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  // Mouse movement tracking
  let mouseX = 0;
  let mouseY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  const randomRotationSpeed = 0.01;
  let randomRotationX = (Math.random() - 0.5) * randomRotationSpeed;
  let randomRotationY = (Math.random() - 0.5) * randomRotationSpeed;

  // Ensure renderer size matches canvas container
  function resizeRenderer() {
      const container = canvas.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      
      if (needResize) {
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
      }
  }

  // Create cube
  const geometry = new THREE.BoxGeometry(2, 2, 2, 1, 1, 1);
  
  // Create multiple cubes with different scales and wireframe materials
  const cubes = [];
  const numLayers = 8;
  
  for (let i = 0; i < numLayers; i++) {
    const scale = (0.85 + (i * 0.13));
    const opacity = 1 - (i * 0.15);
    
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: Math.max(0.2, opacity)
    });
    
    const edges = new THREE.EdgesGeometry(geometry);
    const cube = new THREE.LineSegments(edges, material);
    cube.scale.set(scale, scale, scale);
    scene.add(cube);
    cubes.push(cube);
  }

  // Set background to transparent
  scene.background = null;

  // Position camera
  camera.position.z = 6;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate all cubes with random rotation
    cubes.forEach((cube) => {
        cube.rotation.x += randomRotationX;
        cube.rotation.y += randomRotationY;
    });
    
    // Handle resize
    resizeRenderer();
    
    // Render scene
    renderer.render(scene, camera);
  }

  // Start animation
  animate();

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuButton && navLinks) {
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
  }

  // Interactive Grid with Three.js Cubes
  function initInteractiveGrid() {
    // Get references to hero content
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) {
      console.error('Hero content not found');
      return;
    }
    
    // Create a new canvas specifically for the grid effect
    const gridCanvas = document.createElement('canvas');
    gridCanvas.id = 'gridCanvas';
    gridCanvas.style.position = 'absolute';
    gridCanvas.style.top = '0';
    gridCanvas.style.left = '0';
    gridCanvas.style.width = '100%';
    gridCanvas.style.height = '100%';
    gridCanvas.style.pointerEvents = 'none'; // Allow interactions to pass through
    gridCanvas.style.zIndex = '1'; // Lower z-index, nothing else changed
    
    // Add the new canvas to hero content
    heroContent.style.position = 'relative'; // Ensure position context
    
    // Important: Add the grid canvas BEFORE adding any other elements
    // This ensures it's at the bottom of the stack
    if (heroContent.firstChild) {
      heroContent.insertBefore(gridCanvas, heroContent.firstChild);
    } else {
      heroContent.appendChild(gridCanvas);
    }
    
    // Check if THREE is available
    if (typeof THREE === 'undefined') {
      console.error('THREE.js is not loaded or available');
      return;
    }
    
    // Create a new renderer, scene and camera specifically for the grid
    const gridRenderer = new THREE.WebGLRenderer({
      canvas: gridCanvas,
      antialias: true,
      alpha: true // Transparent background
    });
    
    // Enable shadow mapping
    gridRenderer.shadowMap.enabled = true;
    gridRenderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
    
    const gridScene = new THREE.Scene();
    const gridCamera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    
    // Set background to transparent
    gridScene.background = null;
    
    // Position camera
    gridCamera.position.z = 5;
    
    // Add a directional light for shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    
    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    
    gridScene.add(directionalLight);
    
    // Add ambient light so shadows aren't too dark
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    gridScene.add(ambientLight);
    
    // Ensure renderer size matches canvas container
    function resizeGridRenderer() {
      const width = heroContent.clientWidth;
      const height = heroContent.clientHeight;
      
      gridRenderer.setSize(width, height, false);
      gridCamera.aspect = width / height;
      gridCamera.updateProjectionMatrix();
    }
    
    // Initial sizing
    resizeGridRenderer();
    
    // Store grid areas for mouse detection
    const gridAreas = [];
    
    // Grid dimensions
    const columns = 6; // Back to original 6 columns
    const rows = 3;    // Back to original 3 rows
    
    // Create grid cells
    function setupGridAreas() {
      // Clear existing grid areas
      gridAreas.length = 0;
      
      // Get hero content dimensions and position
      const heroRect = heroContent.getBoundingClientRect();
      
      // Calculate cell dimensions
      const cellWidth = heroRect.width / columns;
      const cellHeight = heroRect.height / rows;
      
      // Create grid areas for mouse detection
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          // Calculate grid cell position
          const x = (col * cellWidth) + (cellWidth / 2);
          const y = (row * cellHeight) + (cellHeight / 2);
          
          gridAreas.push({
            row,
            col,
            left: (col * cellWidth),
            top: (row * cellHeight),
            right: ((col + 1) * cellWidth),
            bottom: ((row + 1) * cellHeight),
            centerX: x,
            centerY: y,
            width: cellWidth,
            height: cellHeight,
            hasCube: false,
            cube: null,
            isAnimating: false
          });
        }
      }
    }
    
    // Setup initial grid
    setupGridAreas();
    
    // Create a simple cube for grid cell
    function createGridCube(gridArea) {
      try {
        // Prevent creating a cube if one is already being animated
        if (gridArea.isAnimating) return null;
        
        // MUCH larger cubes for maximum visibility
        const geometry = new THREE.BoxGeometry(3.5, 3.5, 3.5);
        
        // Solid dark grey material - completely opaque (no transparency)
        const material = new THREE.MeshStandardMaterial({
          color: 0x111111, // Much darker, almost black
          wireframe: false,
          transparent: false, // No transparency
          roughness: 0.8,
          metalness: 0.1
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Enable shadows
        cube.castShadow = true;
        cube.receiveShadow = true;
        
        // Create extreme spacing between cubes by multiplying the normalized positions
        // by much larger values
        
        // Map grid position (0 to 1) to camera view (-1 to 1)
        const relX = (gridArea.col + 0.5) / columns; // 0 to 1
        const relY = 1 - ((gridArea.row + 0.5) / rows); // 1 to 0 (inverted)
        
        // Map to camera space with MUCH wider spacing
        const mappedX = (relX * 2 - 1) * 10.0; // -8 to 8 (extremely wide spread)
        const mappedY = (relY * 2 - 1) * 5.0; // -5 to 5 (much taller spread)
        
        // Set initial position at fixed distance from camera
        const z = -8; // Start even further back to accommodate larger spacing
        
        cube.position.set(mappedX, mappedY, z);
        
        // Add to our grid scene
        gridScene.add(cube);
        
        // Store reference
        gridArea.hasCube = true;
        gridArea.cube = cube;
        gridArea.isAnimating = true;
        
        // Simple pop-up animation with longer travel for larger cubes
        const targetZ = z + 4.0; // Move forward more dramatically
        const duration = 200; // Faster animation
        const startTime = Date.now();
        
        function animateCube() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out
          
          cube.position.z = z + ((targetZ - z) * eased);
          
          if (progress < 1) {
            requestAnimationFrame(animateCube);
          } else {
            gridArea.isAnimating = false;
          }
        }
        
        animateCube();
        
        return cube;
      } catch (error) {
        console.error('Error creating grid cube:', error);
        gridArea.isAnimating = false;
        return null;
      }
    }
    
    // Remove a cube when mouse leaves
    function removeGridCube(gridArea) {
      if (!gridArea.hasCube || !gridArea.cube) return;
      if (gridArea.isAnimating) return;
      
      const cube = gridArea.cube;
      gridArea.isAnimating = true;
      
      const duration = 200; // Faster animation
      const startTime = Date.now();
      const startZ = cube.position.z;
      const targetZ = startZ - 4.0; // Move backward more dramatically to match the forward distance
      
      function animateCubeRemoval() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress; // Linear ease
        
        cube.position.z = startZ + ((targetZ - startZ) * eased);
        
        if (progress < 1) {
          requestAnimationFrame(animateCubeRemoval);
        } else {
          // Ensure cube is properly removed
          if (gridScene.children.includes(cube)) {
            gridScene.remove(cube);
          }
          gridArea.hasCube = false;
          gridArea.cube = null;
          gridArea.isAnimating = false;
        }
      }
      
      animateCubeRemoval();
    }
    
    // Track the current hover state for each cell
    const hoverState = {};
    
    // Mouse move handler with improved tracking
    function handleMouseMove(e) {
      // Get the mouse position relative to the hero content
      const heroRect = heroContent.getBoundingClientRect();
      const mouseX = e.clientX - heroRect.left;
      const mouseY = e.clientY - heroRect.top;
      
      // Reset all hover states first
      for (let i = 0; i < gridAreas.length; i++) {
        const key = `${gridAreas[i].row}-${gridAreas[i].col}`;
        hoverState[key] = false;
      }
      
      // Check which grid area the mouse is in
      for (let i = 0; i < gridAreas.length; i++) {
        const gridArea = gridAreas[i];
        const isInside = mouseX >= gridArea.left && mouseX <= gridArea.right &&
                         mouseY >= gridArea.top && mouseY <= gridArea.bottom;
        
        const key = `${gridArea.row}-${gridArea.col}`;
        hoverState[key] = isInside;
        
        if (isInside && !gridArea.hasCube && !gridArea.isAnimating) {
          createGridCube(gridArea);
        }
      }
      
      // Clean up cubes that are no longer hovered
      for (let i = 0; i < gridAreas.length; i++) {
        const gridArea = gridAreas[i];
        const key = `${gridArea.row}-${gridArea.col}`;
        
        if (!hoverState[key] && gridArea.hasCube && !gridArea.isAnimating) {
          removeGridCube(gridArea);
        }
      }
    }
    
    // Add mouse move event listener
    document.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup all cubes when mouse leaves the hero area
    function handleMouseLeave() {
      for (let i = 0; i < gridAreas.length; i++) {
        const gridArea = gridAreas[i];
        if (gridArea.hasCube && !gridArea.isAnimating) {
          removeGridCube(gridArea);
        }
      }
    }
    
    // Add mouse leave event listener to hero content
    heroContent.addEventListener('mouseleave', handleMouseLeave);
    
    // Handle window resize
    function handleResize() {
      // Resize renderer
      resizeGridRenderer();
      
      // Clean up existing cubes
      gridAreas.forEach(gridArea => {
        if (gridArea.hasCube && gridArea.cube) {
          if (gridScene.children.includes(gridArea.cube)) {
            gridScene.remove(gridArea.cube);
          }
          gridArea.hasCube = false;
          gridArea.cube = null;
          gridArea.isAnimating = false;
        }
      });
      
      // Recalculate grid positions
      setupGridAreas();
    }
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop for the grid
    function animateGrid() {
      requestAnimationFrame(animateGrid);
      gridRenderer.render(gridScene, gridCamera);
    }
    
    // Start the grid animation loop
    animateGrid();
    
    // Force cleanup function to remove stuck cubes
    function forceCleanup() {
      // Safety cleanup every 5 seconds to remove any stuck cubes
      gridAreas.forEach(gridArea => {
        const key = `${gridArea.row}-${gridArea.col}`;
        if (!hoverState[key] && gridArea.hasCube) {
          // Force remove the cube
          if (gridArea.cube && gridScene.children.includes(gridArea.cube)) {
            gridScene.remove(gridArea.cube);
          }
          gridArea.hasCube = false;
          gridArea.cube = null;
          gridArea.isAnimating = false;
        }
      });
    }
    
    // Run cleanup periodically
    setInterval(forceCleanup, 5000);
  }

  // Initialize the interactive grid immediately
  initInteractiveGrid();
})

