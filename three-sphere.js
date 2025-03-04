// Three.js implementation for the geodesic icosphere
document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load Three.js from CDN
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js"
    script.onload = initSphere
    document.head.appendChild(script)
  
    function initSphere() {
      // Only initialize if the hero section exists
      const heroImageWrapper = document.querySelector(".hero-image-wrapper")
      if (!heroImageWrapper) return
  
      // Remove the existing image completely
      const existingImage = heroImageWrapper.querySelector(".hero-image")
      if (existingImage) {
        existingImage.remove()
      }
  
      // Create a container for the 3D sphere
      const sphereContainer = document.createElement("div")
      sphereContainer.className = "sphere-container"
      sphereContainer.style.width = "120%" // 20% bigger
      sphereContainer.style.height = "480px" // 20% bigger
      sphereContainer.style.position = "relative"
      sphereContainer.style.marginLeft = "-10%" // Move left
      heroImageWrapper.appendChild(sphereContainer)
  
      // Initialize Three.js scene
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        sphereContainer.clientWidth / sphereContainer.clientHeight,
        0.1,
        1000,
      )
  
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        precision: "highp", // Higher precision for better quality
      })
      renderer.setSize(sphereContainer.clientWidth, sphereContainer.clientHeight)
      renderer.setPixelRatio(window.devicePixelRatio) // For higher resolution
      renderer.setClearColor(0x000000, 0) // Transparent background
      sphereContainer.appendChild(renderer.domElement)
  
      // Create the icosphere geometry with higher detail
      const geometry = new THREE.IcosahedronGeometry(5, 3) // Increased detail level from 2 to 3
  
      // Create a wireframe material
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8, // Slightly increased opacity
        wireframeLinewidth: 1.5, // Thicker lines for better visibility
      })
  
      // Create the mesh
      const sphere = new THREE.Mesh(geometry, material)
      scene.add(sphere)
  
      // Position the camera
      camera.position.z = 15
  
      // Variables for rotation
      let targetRotationX = 0
      let targetRotationY = 0
      let currentRotationX = 0
      let currentRotationY = 0
  
      // Handle mouse movement
      sphereContainer.addEventListener("mousemove", (event) => {
        const rect = sphereContainer.getBoundingClientRect()
        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1
  
        targetRotationX = mouseY * 0.5
        targetRotationY = mouseX * 0.5
      })
  
      // Animation loop
      function animate() {
        requestAnimationFrame(animate)
  
        // Smooth rotation
        currentRotationX += (targetRotationX - currentRotationX) * 0.05
        currentRotationY += (targetRotationY - currentRotationY) * 0.05
  
        // Apply rotation
        sphere.rotation.x = currentRotationX
        sphere.rotation.y = currentRotationY + Date.now() * 0.0001 // Constant rotation + mouse interaction
  
        renderer.render(scene, camera)
      }
  
      // Handle window resize
      window.addEventListener("resize", () => {
        const width = sphereContainer.clientWidth
        const height = sphereContainer.clientHeight
  
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      })
  
      // Start animation
      animate()
    }
  })
  
  