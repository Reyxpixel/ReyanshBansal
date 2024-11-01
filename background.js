// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x1e1f22, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Set Camera Position and Angle
camera.position.set(0, -15, 10);
camera.rotation.x = THREE.MathUtils.degToRad(20);

// Line Material
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.8, transparent: true });
const gridSize = 100;
const amplitude = 1;

// Group to hold all lines
const lines = new THREE.Group();

// Create Lines along the X and Y Axes
for (let x = -gridSize / 2; x <= gridSize / 2; x += 1.7) {
    const pointsX = [], pointsY = [];
    for (let y = -gridSize / 2; y <= gridSize / 2; y += 1.7) {
        pointsX.push(new THREE.Vector3(x, y, 0));
        pointsY.push(new THREE.Vector3(y, x, 0));
    }
    const geometryX = new THREE.BufferGeometry().setFromPoints(pointsX);
    const geometryY = new THREE.BufferGeometry().setFromPoints(pointsY);
    lines.add(new THREE.Line(geometryX, lineMaterial));
    lines.add(new THREE.Line(geometryY, lineMaterial));
}

scene.add(lines);

// Variables for Parallax Effect
let targetX = 0, targetY = -15; // Target positions for smooth movement
const parallaxStrength = 1.5; // Overall parallax strength
const easingFactor = 0.05; // Adjust this for slower or faster smoothing

// Event Listener for Mouse Movement
window.addEventListener('mousemove', (event) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate distance from center as a fraction of window size
    const distanceX = (event.clientX - centerX) / centerX;
    const distanceY = (event.clientY - centerY) / centerY;

    // Scaling factor for smooth edge effect
    const scale = 1 - Math.sqrt(distanceX ** 2 + distanceY ** 2) * 0.6;

    // Calculate target camera position
    targetX = distanceX * scale * parallaxStrength;
    targetY = -15 + distanceY * scale * parallaxStrength;
});

// Smoothly Update Camera Position
function updateCameraPosition() {
    camera.position.x += (targetX - camera.position.x) * easingFactor;
    camera.position.y += (targetY - camera.position.y) * easingFactor;
}

// Animate the Wave
function animateWave() {
    const time = Date.now() * 0.0008;
    lines.children.forEach((line) => {
        const positions = line.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            positions[i + 2] = Math.sin(x * 0.25 + time) * amplitude + Math.sin(y * 0.25 + time) * amplitude;
        }
        line.geometry.attributes.position.needsUpdate = true;
    });
}

// Render and Animate the Scene
function animate() {
    requestAnimationFrame(animate);
    animateWave();
    updateCameraPosition(); // Smoothly update the camera's position
    renderer.render(scene, camera);
}

animate();

// Adjust Canvas on Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
