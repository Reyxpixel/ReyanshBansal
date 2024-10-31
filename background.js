// Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Set Camera Position and Angle
camera.position.set(0, -6, 10); // Camera position
camera.rotation.x = THREE.MathUtils.degToRad(30); // Rotate the camera by 30 degrees

// Line Material
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3d108f, opacity: 0.8, transparent: true });
const gridSize = 100;
const amplitude = 1; // Increased amplitude for a more pronounced wave

// Group to hold all lines
const lines = new THREE.Group();

// Create Lines along the X-Axis
for (let x = -gridSize / 2; x <= gridSize / 2; x += 1.7) { // Increase increment to 2 for larger squares
    const points = [];
    for (let y = -gridSize / 2; y <= gridSize / 2; y += 1.7) { // Increase increment to 2 for larger squares
        points.push(new THREE.Vector3(x, y, 0)); // Create a line along y-axis
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);
    lines.add(line);
}

// Create Lines along the Y-Axis (Rotated 90 Degrees)
for (let y = -gridSize / 2; y <= gridSize / 2; y += 1.7) { // Increase increment to 2 for larger squares
    const points = [];
    for (let x = -gridSize / 2; x <= gridSize / 2; x += 1.7) { // Increase increment to 2 for larger squares
        points.push(new THREE.Vector3(x, y, 0)); // Create a line along x-axis
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);
    lines.add(line);
}

scene.add(lines);

// Animate the Wave
function animateWave() {
    const time = Date.now() * 0.001;
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
    renderer.render(scene, camera);
}

animate();

// Adjust Canvas on Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});