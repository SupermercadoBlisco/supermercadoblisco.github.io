/**
 * MAIN.JS - Punto de entrada principal del juego
 * Inicializa el renderer, importa módulos y controla el game loop
 */

import * as THREE from 'three';
import { createScene, animateUrbanCars } from './scene.js';
import { initProducts, checkProductInCrosshair, updateProductHover } from './products.js';
import { initCart } from './cart.js';
import { initCheckout, checkCheckoutProximity, checkCheckoutClick } from './checkout.js';

// Variables globales
let canvas, renderer, scene, camera, controls, urbansGroup, refrigerators = [], frontGlass;
let clock, frameCount = 0, lastTime = performance.now();

// Variables para movimiento WASD
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let isSprinting = false;
let isCrouching = false; // Nueva variable para agacharse

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const normalSpeed = 75.0;
const sprintSpeed = 150.0;
const crouchSpeed = 25.0; // Velocidad al agacharse (más lento)

// Alturas del jugador
const standingHeight = 2.5;  // Altura normal
const crouchingHeight = 1.5; // Altura agachado (1 metro menos)

// Colisiones con góndolas (4 góndolas: 2 pegadas a paredes, 2 equidistantes en el medio)
const shelfBoundingBoxes = [
    // Góndola Izquierda pegada a pared: X -22 a -19.5, Z -10 a 0
    { min: new THREE.Vector3(-22, 0, -10), max: new THREE.Vector3(-19.5, 6, 0) },
    // Góndola Medio Izquierda: X -8.17 a -5.67, Z -10 a 0
    { min: new THREE.Vector3(-8.17, 0, -10), max: new THREE.Vector3(-5.67, 6, 0) },
    // Góndola Medio Derecha: X 5.67 a 8.17, Z -10 a 0
    { min: new THREE.Vector3(5.67, 0, -10), max: new THREE.Vector3(8.17, 6, 0) },
    // Góndola Derecha pegada a pared: X 19.5 a 22, Z -10 a 0
    { min: new THREE.Vector3(19.5, 0, -10), max: new THREE.Vector3(22, 6, 0) },
    
    // Heladeras (scene.js: createRefrigerators en X=-5, 0, 5 y Z=-20.5; ~3 ancho, ~2.85 profundidad)
    // Heladera Izquierda: centro (-5, 0, -20.5)
    { min: new THREE.Vector3(-6.5, 0, -21.93), max: new THREE.Vector3(-3.5, 5, -19.08) },
    // Heladera Centro: centro (0, 0, -20.5)
    { min: new THREE.Vector3(-1.5, 0, -21.93), max: new THREE.Vector3(1.5, 5, -19.08) },
    // Heladera Derecha: centro (5, 0, -20.5)
    { min: new THREE.Vector3(3.5, 0, -21.93), max: new THREE.Vector3(6.5, 5, -19.08) },
    
    // Paredes
    // Pared Trasera: X=0, Z=-22, width=60, height=12
    { min: new THREE.Vector3(-30, 0, -22.5), max: new THREE.Vector3(30, 12, -21.5) },
    // Pared Izquierda: X=-22, Z=0, width=50, height=12
    { min: new THREE.Vector3(-22.5, 0, -25), max: new THREE.Vector3(-21.5, 12, 25) },
    // Pared Derecha: X=22, Z=0, width=50, height=12
    { min: new THREE.Vector3(21.5, 0, -25), max: new THREE.Vector3(22.5, 12, 25) },

    // Vidrio Frontal (Entrada): X=0, Z=21.25, width=60, height=12
    // { min: new THREE.Vector3(-30, 0, 21), max: new THREE.Vector3(30, 12, 21.5) }
];

/**
 * Inicializar el juego
 */
function init() {
    // Canvas
    canvas = document.getElementById('gameCanvas');
    
    // Renderer con mejoras visuales
    renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.localClippingEnabled = true; // sin clippingPlanes globales

    // Crear escena, cámara y controles
    const sceneData = createScene();
    scene = sceneData.scene;
    camera = sceneData.camera;
    controls = sceneData.controls;
    urbansGroup = sceneData.urbansGroup;
    refrigerators = sceneData.refrigerators || [];
    frontGlass = sceneData.frontGlass;
    
    // Inicializar productos
    initProducts(scene, camera, canvas);
    
    // Inicializar carrito
    initCart();
    
    // Inicializar checkout
    initCheckout(scene, camera);
    
    // Clock para animaciones
    clock = new THREE.Clock();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    initKeyboardControls();
    initClickHandler();

    
    initPauseOverlay();

    document.addEventListener('modalClosed', () => {
        controls.lock();
    });
    
    console.log('🎮 Juego inicializado correctamente');
    console.log('💡 Click en la pantalla para activar controles');
    console.log('🎮 Usa WASD para moverte, SHIFT para correr, Mouse para mirar');
}

function initPauseOverlay() {
    const overlay = document.getElementById('pauseOverlay');

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement) {
            overlay.classList.remove('active'); // jugando
        } else {
            overlay.classList.add('active');    // pausado
        }
    });
}

/**
 * Inicializar controles de teclado WASD
 */
function initKeyboardControls() {
    const onKeyDown = function(event) {
        switch(event.code) {
            case 'KeyW':
            case 'ArrowUp':
                moveForward = true;
                break;
            case 'KeyS':
            case 'ArrowDown':
                moveBackward = true;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                moveLeft = true;
                break;
            case 'KeyD':
            case 'ArrowRight':
                moveRight = true;
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                if (!isCrouching) { // No correr mientras está agachado
                    isSprinting = true;
                }
                break;
            case 'KeyC':
                isCrouching = true;
                isSprinting = false; // No correr mientras está agachado
                break;
        }
    };

    const onKeyUp = function(event) {
        switch(event.code) {
            case 'KeyW':
            case 'ArrowUp':
                moveForward = false;
                break;
            case 'KeyS':
            case 'ArrowDown':
                moveBackward = false;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                moveLeft = false;
                break;
            case 'KeyD':
            case 'ArrowRight':
                moveRight = false;
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                isSprinting = false;
                break;
            case 'KeyC':
                isCrouching = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

/**
 * Inicializar handler de clicks
 */
function initClickHandler() {
    document.addEventListener('click', () => {
        if (controls.isLocked) {
            // Primero verificar si hay producto en la cruceta
            checkProductInCrosshair();
            
            // También verificar si se hizo click en la caja
            checkCheckoutClick();
        }
    });
}

/**
 * Game Loop - Animación principal
 */
function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Actualizar movimiento WASD si los controles están activos
    if(controls.isLocked === true) {
        updateMovement(deltaTime);
    }
    
    // Animar autos urbanos
    animateUrbanCars(urbansGroup);
    
    // Actualizar hover sobre productos
    updateProductHover();
    
    // Verificar proximidad a la caja
    checkCheckoutProximity();
    
    // Renderizar escena
    renderer.render(scene, camera);
    
    // Calcular FPS
    updateFPS();
}

/**
 * Actualizar movimiento del jugador
 */
function updateMovement(deltaTime) {
    // Frenado mejorado - se detiene al soltar teclas
    const dampingFactor = 15.0;
    velocity.x -= velocity.x * dampingFactor * deltaTime;
    velocity.z -= velocity.z * dampingFactor * deltaTime;

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    // Velocidad según estado (agachado, normal o corriendo)
    let currentSpeed;
    if (isCrouching) {
        currentSpeed = crouchSpeed; // Lento al agacharse
    } else if (isSprinting) {
        currentSpeed = sprintSpeed; // Rápido al correr
    } else {
        currentSpeed = normalSpeed; // Normal
    }

    if(moveForward || moveBackward) {
        velocity.z -= direction.z * currentSpeed * deltaTime;
    }
    if(moveLeft || moveRight) {
        velocity.x -= direction.x * currentSpeed * deltaTime;
    }

    // Guardar posición anterior para colisiones
    const previousPosition = controls.getObject().position.clone();

    controls.moveRight(-velocity.x * deltaTime);
    controls.moveForward(-velocity.z * deltaTime);

    // Verificar colisiones con góndolas
    const playerPosition = controls.getObject().position;
    const playerRadius = 0.5; // Radio del jugador
    
    let collision = false;
    for (const box of shelfBoundingBoxes) {
        if (
            playerPosition.x + playerRadius > box.min.x &&
            playerPosition.x - playerRadius < box.max.x &&
            playerPosition.z + playerRadius > box.min.z &&
            playerPosition.z - playerRadius < box.max.z
        ) {
            collision = true;
            break;
        }
    }
    
    // Verificar colisiones con heladeras (usando bounding boxes de los objetos)
    let fridgeCollision = false;
    for (const fridge of refrigerators) {
        if (!fridge) continue;
        
        // Verificar colisión con la puerta de vidrio específicamente
        const glassDoor = fridge.userData.glassDoor;
        if (glassDoor) {
            // Obtener posición mundial del vidrio
            const worldPos = new THREE.Vector3();
            glassDoor.getWorldPosition(worldPos);
            
            // Crear bounding box del vidrio
            const glassBox = new THREE.Box3().setFromObject(glassDoor);
            
            // Crear bounding box del jugador
            const playerBox = new THREE.Box3().setFromCenterAndSize(
                playerPosition.clone(), 
                new THREE.Vector3(playerRadius * 2, standingHeight * 2, playerRadius * 2)
            );
            
            // Verificar intersección
            if (glassBox.intersectsBox(playerBox)) {
                fridgeCollision = true;
                break;
            }
        }
        
        // También verificar colisión con el marco de la heladera
        const fridgeBox = new THREE.Box3().setFromObject(fridge);
        const playerBox2 = new THREE.Box3().setFromCenterAndSize(
            playerPosition.clone(), 
            new THREE.Vector3(playerRadius * 2, standingHeight * 2, playerRadius * 2)
        );
        
        if (fridgeBox.intersectsBox(playerBox2)) {
            fridgeCollision = true;
            break;
        }
    }
    

    
    // Si hay colisión con góndola, heladera o vidrio frontal, volver a la posición anterior
    if (collision || fridgeCollision) {
        controls.getObject().position.copy(previousPosition);
    }

    // Altura del jugador (cambia suavemente entre normal y agachado)
    const targetHeight = isCrouching ? crouchingHeight : standingHeight;
    const currentHeight = controls.getObject().position.y;
    
    // Transición suave de altura
    const heightTransitionSpeed = 8.0; // Velocidad de transición
    const newHeight = THREE.MathUtils.lerp(currentHeight, targetHeight, heightTransitionSpeed * deltaTime);
    
    // Aplicar nueva altura
    controls.getObject().position.y = newHeight;
    
    // Límites del mapa
    const mapLimit = 20;
    controls.getObject().position.x = Math.max(-mapLimit, Math.min(mapLimit, controls.getObject().position.x));
    controls.getObject().position.z = Math.max(-mapLimit, Math.min(mapLimit, controls.getObject().position.z));
}

/**
 * Actualizar contador de FPS
 */
function updateFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        document.getElementById('fpsCounter').textContent = `FPS: ${fps}`;
        frameCount = 0;
        lastTime = currentTime;
    }
}

/**
 * Manejar redimensionamiento de ventana
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Iniciar el juego
init();
animate();

// Mensaje de bienvenida en consola
console.log('%c🛒 Bienvenido al Supermercado Virtual 3D', 'font-size: 20px; color: #4ecdc4; font-weight: bold;');
console.log('%c🎮 Click para activar controles, usa WASD para moverte, SHIFT para correr, C para agacharse', 'font-size: 14px; color: #fff;');
console.log('%cApunta a los productos con la cruceta y haz click', 'font-size: 14px; color: #fff;');
