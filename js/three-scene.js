// Three.js scene setup
let scene, camera, renderer, object;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2C3E50);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, 400);
    document.getElementById('hero-3d').appendChild(renderer.domElement);

    // Create geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3498DB,
        shininess: 100,
        specular: 0xffffff
    });
    object = new THREE.Mesh(geometry, material);
    scene.add(object);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add mouse interaction
    const container = document.getElementById('hero-3d');
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    // Start animation
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate object
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    const rect = event.target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    object.rotation.x += y * 0.01;
    object.rotation.y += x * 0.01;
}

function onMouseLeave() {
    object.rotation.x = 0;
    object.rotation.y = 0;
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, 400);
}

window.addEventListener('resize', onWindowResize);

// Initialize the scene when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 