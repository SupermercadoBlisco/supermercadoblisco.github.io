/**
 * SCENE.JS - Creación de la escena 3D del supermercado
 * Contiene: piso, paredes, góndolas, luces, cámara y controles
 */

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import CONFIG from './config.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; /*asets 3d*/

/**
 * Crear la escena completa del supermercado
 */
export function createScene() {
    // Escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Cielo azul
    // Niebla que empieza a los 80 y es total a los 150, color gris claro para simular distancia urbana, ejemplo: 0xcccccc
    // scene.fog = new THREE.Fog(0xcccccc, 120, 200); // ← agregar esto

    // Cámara (Primera Persona)
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(...CONFIG.camera.startPosition);
    
    // Controles PointerLockControls para Primera Persona
    const controls = new PointerLockControls(camera, document.body);
    
    // REDUCIR SENSIBILIDAD DEL MOUSE
    const mouseSensitivity = 0; // 0.4 = 40% de la sensibilidad original (más bajo = más lento)
    
    // Override del movimiento del mouse para reducir sensibilidad
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    const PI_2 = Math.PI / 2;
    
    document.addEventListener('mousemove', (event) => {
        if (controls.isLocked === true) {
            const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            
            euler.setFromQuaternion(camera.quaternion);
            
            // Aplicar sensibilidad reducida
            euler.y -= movementX * 0.002 * mouseSensitivity;
            euler.x -= movementY * 0.002 * mouseSensitivity;
            
            euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x));
            
            camera.quaternion.setFromEuler(euler);
        }
    });
    
    // Activar controles al hacer click en el canvas
    const canvas = document.getElementById('gameCanvas');
    canvas.addEventListener('click', function() {
        if (!document.pointerLockElement) {
            controls.lock();
        }
    });
    
    scene.add(controls.getObject());
    
    // Luces
    createLights(scene);
    
    // Piso
    createFloor(scene);
    
    // Paredes
    createWalls(scene);
    
    // Ventanal frontal con escena urbana
    const urbansGroup = createStorefront(scene);
    // Ventanal/entrada estética en la pared delantera
    createEntranceWindow(scene);
    
    // Techo con iluminación LED
    createCeiling(scene);
    
    // Góndolas
    createShelves(scene);

    // Heladeras (refrigeradores comerciales)
    const refrigerators = createRefrigerators(scene);
    

    return { scene, camera, controls, urbansGroup, refrigerators };
}

/**
 * Crear un ventanal/entrada estética en la pared delantera
 */
function createEntranceWindow(scene) {
    const group = new THREE.Group();

    // Materials
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, roughness: 0.25, metalness: 0.9 });

    // Border frames: left, right, top and bottom
    const borderDepth = 0.5;
    const leftBorder = new THREE.Mesh(new THREE.BoxGeometry(0.4, 12 + 0.6, borderDepth), frameMat);
    leftBorder.position.set(-60 / 2, 12 / 2, 21.3 - borderDepth / 2);
    group.add(leftBorder);

    const rightBorder = leftBorder.clone();
    rightBorder.position.x = 60 / 2;
    group.add(rightBorder);

    const topBorder = new THREE.Mesh(new THREE.BoxGeometry(60 + 0.8, 0.6, borderDepth), frameMat);
    topBorder.position.set(0, 12 + 0.15, 21.3 - borderDepth / 2);
    group.add(topBorder);

    const bottomBorder = new THREE.Mesh(new THREE.BoxGeometry(60 + 0.8, 0.6, borderDepth), frameMat);
    bottomBorder.position.set(0, -0.15, 21.3 - borderDepth / 2);
    group.add(bottomBorder);

    // Vertical mullions (no extra glass, only frames) every 8 units to break the large pane visually
    for (let x = -60 / 2 + 8; x < 60 / 2; x += 8) {
        const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.2, 12, borderDepth), frameMat);
        mullion.position.set(x-6, 12 / 2, 21.3 - borderDepth / 2);
        group.add(mullion);
    }

    // Welcome mat centered in front
    const matGeo = new THREE.PlaneGeometry(8, 2.8);
    const matMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.95 });
    const welcomeMat = new THREE.Mesh(matGeo, matMat);
    welcomeMat.rotation.x = -Math.PI / 2;
    welcomeMat.position.set(0, 0.01, 19.5);
    group.add(welcomeMat);

    // Sign 'ENTRADA' above the large window
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#003366';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 96px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ENTRADA', canvas.width / 2, canvas.height / 2);
    const txt = new THREE.CanvasTexture(canvas);
    const signMat = new THREE.MeshStandardMaterial({ map: txt, emissive: new THREE.Color(0x123456), emissiveIntensity: 1.2, roughness: 0.8 });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(10, 1.8), signMat);
    sign.position.set(0, 12 + 1.2, 21.25 - 0.1);
    group.add(sign);

    // Decorative rim light
    const rimLight = new THREE.PointLight(0xfff6e6, 0.9, 20);
    rimLight.position.set(0, 12 - 1.5, 21);
    group.add(rimLight);

    scene.add(group);
}

/**
 * Crear sistema de iluminación profesional y acogedora
 */
function createLights(scene) {
    // Luz ambiental para iluminación base (cálida)
    const ambientLight = new THREE.AmbientLight(0xffe8c6, 0.5);
    scene.add(ambientLight);
    
    // Hemisferio light para iluminación natural (cálida)
    const hemiLight = new THREE.HemisphereLight(0xffe8c6, 0xd4a574, 0.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    
    // Luz direccional principal (cálida)
    const directionalLight = new THREE.DirectionalLight(0xffcd7a, 0.5);
    directionalLight.position.set(15, 25, 15);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -35;
    directionalLight.shadow.camera.right = 35;
    directionalLight.shadow.camera.top = 35;
    directionalLight.shadow.camera.bottom = -35;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);
    
    // Point lights con colores LED cálidos encima de cada góndola
    
    // Point lights (sin helpers en producción para mejor FPS)
    const pointLight1 = new THREE.PointLight(0xffd700, 1.2, 12);
    pointLight1.position.set(-15, 7, 0);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffa500, 1.2, 12);
    pointLight2.position.set(0, 7, 0);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xffb347, 1.2, 12);
    pointLight3.position.set(15, 7, 0);
    scene.add(pointLight3);

}

/**
 * Crear piso del supermercado
 */
function createFloor(scene) {
    const floorGeometry = new THREE.PlaneGeometry(50, 44);

    // Cargar textura del piso
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load('./images/floor.jpg');
    
    // Configurar repetición de la textura
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(80 / 5.75, 80 / 6); // Escalar según dimensiones 575x600
    floorTexture.magFilter = THREE.LinearFilter;
    floorTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const floorMaterial = new THREE.MeshStandardMaterial({
        map: floorTexture,
        roughness: 0.35,
        metalness: 0.0
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Zona de entrada (entre el vidrio frontal y la calle)
    // El vidrio está en Z=21.25, la calle comienza alrededor de Z=28-30
    // Creamos una franja de entrada de aproximadamente 8 unidades de profundidad
    const entranceZoneGeometry = new THREE.PlaneGeometry(50, 10);
    
    // Cargar textura de vereda para la zona de entrada
    const veredaTexture = textureLoader.load('./images/vereda2.jpg');
    veredaTexture.wrapS = THREE.RepeatWrapping;
    veredaTexture.wrapT = THREE.RepeatWrapping;
    veredaTexture.repeat.set(120 / 5.75, 16 / 6);
    veredaTexture.magFilter = THREE.LinearFilter;
    veredaTexture.minFilter = THREE.LinearMipmapLinearFilter;
    
    const entranceZoneMaterial = new THREE.MeshBasicMaterial ({
            map: veredaTexture,
            color: 0xaaaaaa, // un poco de color para que no se vea tan plano
    });
    const entranceZone = new THREE.Mesh(entranceZoneGeometry, entranceZoneMaterial);
    entranceZone.rotation.x = -Math.PI / 2;
    entranceZone.position.set(0, 0.01, 26); // Ligeramente elevado para evitar z-fighting
    entranceZone.receiveShadow = true;
    scene.add(entranceZone);



    // Cargar textura de pasto
    const pastoZoneGeometry = new THREE.PlaneGeometry(25, 10);
    const pastoTexture = textureLoader.load('./images/pasto.jpg');
    pastoTexture.wrapS = THREE.RepeatWrapping;
    pastoTexture.wrapT = THREE.RepeatWrapping;
    pastoTexture.repeat.set(4, 1);
    pastoTexture.magFilter = THREE.LinearFilter;
    pastoTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const pastoZoneMaterial = new THREE.MeshBasicMaterial({
        map: pastoTexture,
        color: 0x88aa55
    });

    // Pasto izquierdo
    const pastoZoneLeft = new THREE.Mesh(pastoZoneGeometry, pastoZoneMaterial);
    pastoZoneLeft.rotation.x = -Math.PI / 2;
    pastoZoneLeft.position.set(-16, 0.02, 26); // desplazado a la izquierda
    pastoZoneLeft.receiveShadow = true;
    scene.add(pastoZoneLeft);

    // Pasto derecho
    const pastoZoneRight = new THREE.Mesh(pastoZoneGeometry, pastoZoneMaterial);
    pastoZoneRight.rotation.x = -Math.PI / 2;
    pastoZoneRight.position.set(16, 0.02, 26); // desplazado a la derecha
    pastoZoneRight.receiveShadow = true;
    scene.add(pastoZoneRight);


}


/**
 * Crear paredes del supermercado - con textura del piso
 */
function createWalls(scene) {
    // Cargar la misma textura del piso
    const textureLoader = new THREE.TextureLoader();
    const wallTexture = textureLoader.load('./images/walls.jpg');
    
    // Configurar repetición de la textura
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(6, 1);//5 1
    wallTexture.magFilter = THREE.LinearFilter;
    wallTexture.minFilter = THREE.LinearMipmapLinearFilter;
    
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        map: wallTexture,
        roughness: 1,
        metalness: 0,
        /*emissive: 0xffffff,*/
        emissiveIntensity: 0.3
    });

    
    // Pared trasera
    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(60, 12, 0.5),
        wallMaterial
    );
    backWall.position.set(0, 6, -22);
    backWall.receiveShadow = true;
    scene.add(backWall);
    
    // Pared izquierda
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 12, 50),
        wallMaterial
    );
    leftWall.position.set(-22, 6, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);
    
    // Pared derecha
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 12, 50),
        wallMaterial
    );
    rightWall.position.set(22, 6, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);
    
    // Letrero "SUPERMERCADO" en la pared trasera
    createSign(scene);
}


/**
 * Crear cartel publicitario urbano estilo billboard
 */
function createSign(parent) {
    const group = new THREE.Group();


    // Panel del cartel con canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Fondo degradado azul oscuro a azul
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#001a33');
    gradient.addColorStop(0.5, '#003366');
    gradient.addColorStop(1, '#001a33');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Línea decorativa superior e inferior
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 8, canvas.width, 6);
    ctx.fillRect(0, canvas.height - 14, canvas.width, 6);

    // Texto "BLISCO"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 260px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BLISCO', canvas.width / 2, canvas.height / 2 - 30);

    // Subtexto
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 80px Arial';
    ctx.fillText('TU SUPERMERCADO DE CONFIANZA', canvas.width / 2, canvas.height - 80);

    const texture = new THREE.CanvasTexture(canvas);
    const panelMat = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(0x112244),
        emissiveIntensity: 0.6,
        roughness: 0.8
    });
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(19.5, 6), panelMat);
    panel.position.set(0, 8.5, -21.5);
    group.add(panel);

    parent.add(group);
}


/**
 * Crear ventanal frontal con escena urbana en 3D
 */
function createStorefront(scene) {
    // Grupo para la escena urbana
    const urbansGroup = new THREE.Group();
    urbansGroup.position.z = 50;
    urbansGroup.rotation.y = Math.PI; // Rotar 180 grados para mirar hacia el otro lado
    
    // Calle
    //createRoad(urbansGroup);
    
    // Ciudad
    createCityModel(urbansGroup, scene);
    
    // Autos que se mueven
    createMovingCars(urbansGroup);
    
    // Fondo urbano con skyline panorámico
    //createCityBackground(urbansGroup);
    
    // ── CARTEL BLISCO para tapar el borde del mapa ──
    // createBillboardSign(urbansGroup);
    // Posicionarlo sobre la zona problemática (borde derecho visto desde adentro)
    // Como el grupo está rotado 180°, ajustamos X e Z según lo que se ve
    // const billboard = urbansGroup.children[urbansGroup.children.length - 1];
    // billboard.position.set(20, -11, 18); // ajustá X/Z según donde aparece el borde
    // billboard.rotation.y = -Math.PI / 4

    scene.add(urbansGroup);
    
    return urbansGroup;
}



function createCityModel(parent, scene) {
    const loader = new GLTFLoader();
    loader.load('./assets/beautiful-city/source/untitled2.glb', (gltf) => {
        const city = gltf.scene;

        city.scale.set(20, 20, 20);
        city.position.set(-10, 9.6, 65); // en el centro de la escena
        city.rotation.y = Math.PI; // rotar 180 grados para que mire hacia el supermercado
        city.traverse(child => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;

                const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -26.5);
                const oldMat = child.material;

                // Reemplazar por BasicMaterial que no recibe luz
                child.material = new THREE.MeshBasicMaterial({
                    map: oldMat.map || null,
                    color: oldMat.color || new THREE.Color(0xffffff),
                    clippingPlanes: [clipPlane],
                    transparent: oldMat.transparent || false,
                    opacity: oldMat.opacity || 1,
                    side: THREE.DoubleSide,  // 👈 esto soluciona el problema
                    alphaTest: 0.1,           // 👈 esto ayuda con las hojas de los árboles (texturas con transparencia
                });
            }
        });

        scene.add(city); // 👈 directo a la escena, no al grupo

        console.log('✅ Ciudad cargada');
        const box = new THREE.Box3().setFromObject(city);
        console.log('📦 Tamaño:', box.getSize(new THREE.Vector3()));
        console.log('📍 Centro:', box.getCenter(new THREE.Vector3()));
    },
    (xhr) => console.log(`Ciudad: ${(xhr.loaded / xhr.total * 100).toFixed(0)}% cargada`),
    (err) => console.error('❌ Error:', err)
    );
}

/**
 * Crear autos que se mueven (usando modelo GLB)
 */
function createMovingCars(parent) {
    const loader = new GLTFLoader();

    // Función helper para convertir a MeshBasicMaterial
    function setupCar(car) {
        car.traverse(child => {
            if (child.isMesh) {
                const oldMat = child.material;
                child.material = new THREE.MeshBasicMaterial({
                    map: oldMat.map || null,
                    color: oldMat.color || new THREE.Color(0xffffff),
                    transparent: oldMat.transparent || false,
                    opacity: oldMat.opacity || 1,
                });
            }
        });
    }

    // Auto 1
    loader.load('./assets/auto1.glb', (gltf) => {
        const redCar = gltf.scene;
        redCar.scale.set(1.8, 1.8, 1.8);
        redCar.userData.speed = 0.15;
        redCar.userData.direction = 1;
        redCar.userData.lane = 10;
        redCar.position.set(-50, 0, 35);
        setupCar(redCar);
        parent.add(redCar);
        parent.userData.redCar = redCar;
        console.log('✅ Auto 1 cargado');
    });

    // Auto 2 (modelo propio, sin setupCar para respetar sus colores originales)
    loader.load('./assets/auto2.glb', (gltf) => {
        const blueCar = gltf.scene;
        blueCar.scale.set(1.8, 1.8, 1.8);
        blueCar.userData.speed = 0.14;
        blueCar.userData.direction = -1;
        blueCar.userData.lane = -1.5;
        blueCar.position.set(50, 0, -1.5);
        blueCar.rotation.y = Math.PI;
        setupCar(blueCar); // ← mantenelo si también se ve oscuro, sacalo si los colores ya son correctos
        parent.add(blueCar);
        parent.userData.blueCar = blueCar;
        console.log('✅ Auto 2 cargado');
    });
}


/**
 * Animar los autos cada frame (se debe llamar en el loop de animación)
 */
export function animateUrbanCars(urbansGroup) {
    if (!urbansGroup) return;
    
    const cars = [urbansGroup.userData.redCar, urbansGroup.userData.blueCar, urbansGroup.userData.whiteCar];
    
    cars.forEach(car => {
        if (car) {
            car.position.x += car.userData.speed * car.userData.direction;
            car.position.z = car.userData.lane;
            
            // Hacer que los autos se repitan en el horizonte
            if (car.userData.direction > 0 && car.position.x > 100) {
                car.position.x = -100;
            } else if (car.userData.direction < 0 && car.position.x < -100) {
                car.position.x = 100;
            }
        }
    });
}

/**
 * Crear techo con iluminación LED estética
 */
function createCeiling(scene) {
    const textureLoader = new THREE.TextureLoader();
    const ceilingTexture = textureLoader.load('./images/techo.jpg'); // ← tu imagen
    ceilingTexture.wrapS = THREE.RepeatWrapping;
    ceilingTexture.wrapT = THREE.RepeatWrapping;
    ceilingTexture.repeat.set(8, 4); // ← ajustá el tiling

    const ceilingGeometry = new THREE.PlaneGeometry(60, 55);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        map: ceilingTexture,
        roughness: 0.9,
        metalness: 0.0
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.set(0, 12, 0);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.receiveShadow = true;
    scene.add(ceiling);

    // ── Lámparas GLB reales ──────────────────────────────────────────
    createRealLamps(scene);
}


function createRealLamps(scene) {
    const loader = new GLTFLoader();

    /**
     * Carga un modelo GLB y llama a onLoad(gltf.scene) cuando está listo.
     * Maneja materiales para que se vean bien con iluminación existente.
     */
    function loadLamp(path, onLoad) {
        loader.load(
            path,
            (gltf) => {
                const lamp = gltf.scene;
                    lamp.traverse(child => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;

                            // Forzar escritura de profundidad aunque sea transparente
                            child.material.depthWrite = true;
                            child.material.depthTest = true;

                            // Si tiene transparencia, usar alphaTest en lugar de blending suave
                            if (child.material.transparent) {
                                child.material.alphaTest = 0.1;  // descarta píxeles casi invisibles
                                child.material.transparent = false; // desactivar blending suave
                            }
                        }
                    });
                onLoad(lamp);
            },
            undefined,
            (err) => console.error(`❌ Error cargando lámpara: ${path}`, err)
        );
    }

    // ── 1. LÁMPARAS LINEALES sobre las tres góndolas principales ─────────
    //    Reemplazan a: createLongLEDLine(scene, -20, ...) / (0,...) / (20,...)
    const linealPositions = [
        { x:   0, y: 10, z: 0 },
        // Extras para cubrir mejor el largo del pasillo
        { x:   0, y: 10, z: -10 },
        { x:  0, y: 10, z: 5 },

        { x:  -10, y: 10, z: 15 },
        { x:  10, y: 10, z: 15 }
    ];

    linealPositions.forEach(({ x, y, z }) => {
        loadLamp('./assets/lamps/lampara_lineal.glb', (lamp) => {
            lamp.position.set(x, y, z);
            // Las lámparas lineales suelen orientarse a lo largo del pasillo (eje Z)
            lamp.rotation.y = Math.PI / 2;
            // Escala: ajustá si el modelo es muy grande o muy chico
            lamp.scale.set(3, 3, 3);
            scene.add(lamp);
        });
    });

    // ── 2. LÁMPARAS CIRCULARES decorativas ───────────────────────────────
    //    Reemplazan a: createCircularLED(scene, -15, ...) / (5,...) / (18,...)
    const circularPositions = [
        { x: -10, y: 10, z: 10 },
        { x:   10, y: 10, z:  -3 },
        { x:  10, y: 8, z:   8 },
        { x:  -14, y: 10, z: -14 },  // zona trasera derecha
    ];

    circularPositions.forEach(({ x, y, z }) => {
        loadLamp('./assets/lamps/lampara_circular.glb', (lamp) => {
            lamp.position.set(x, y, z);
            // Las circulares no necesitan rotación especial (simétricas)
            lamp.scale.set(3, 3, 3);
            scene.add(lamp);
        });
    });

    // ── 3. LÁMPARA CUADRADA en zona central / caja ────────────────────────
    //    Reemplaza a: createSpiralLED(scene, 0, ...) y el SpotLight de la caja
    const cuadradaPositions = [
        { x:  0, y: 9, z: 14 },   // zona de la caja / entrada
        { x: -14, y: 8, z: 0 },  // zona trasera izquierda
        { x:  14, y: 10, z: -14 },  // zona trasera derecha
    ];

    cuadradaPositions.forEach(({ x, y, z }) => {
        loadLamp('./assets/lamps/lampara_cuadrada.glb', (lamp) => {
            lamp.position.set(x, y, z);
            lamp.scale.set(3, 3, 3);
            scene.add(lamp);
        });
    });

    console.log('💡 Lámparas GLB iniciando carga...');
}

/**
 * Crear góndolas del supermercado - con textura del piso
 */
function createShelves(scene) {
    // Cargar textura del piso para los estantes
    const textureLoader = new THREE.TextureLoader();
    const shelfTexture = textureLoader.load('./images/estantes.jpg');
    
    shelfTexture.wrapS = THREE.RepeatWrapping;
    shelfTexture.wrapT = THREE.RepeatWrapping;
    shelfTexture.repeat.set(4, 4);
    shelfTexture.magFilter = THREE.LinearFilter;
    shelfTexture.minFilter = THREE.LinearMipmapLinearFilter;
    
    const shelfMaterial = new THREE.MeshStandardMaterial({ 
        map: shelfTexture,
        roughness: 0.2,
        metalness: 0.05
    });
    
    // Material negro para los soportes
    const supportMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,  // Negro
        roughness: 0.8,
        metalness: 0.0
    });
    
    // divisor
    const backPanelMaterial = new THREE.MeshStandardMaterial({
        map: shelfTexture,   // misma textura, distinto color multiplicador
        color: 0x3a3a5c,     // 👈 cambiá este valor a gusto
        roughness: 0.4,
        metalness: 0.1
    });

    // Cargar textura propia para el divisor
    const backpanelTexture = textureLoader.load('./images/backpanel.jpg');
    backpanelTexture.wrapS = THREE.RepeatWrapping;
    backpanelTexture.wrapT = THREE.RepeatWrapping;
    backpanelTexture.repeat.set(3, 1); // ajustá según cómo se vea
    backpanelTexture.magFilter = THREE.LinearFilter;
    backpanelTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const backpanelPanelMaterial = new THREE.MeshStandardMaterial({
        map: backpanelTexture,   // 👈 tu imagen en lugar de shelfTexture
        color: 0xffffff,       // blanco para no teñir la textura
        roughness: 0.4,
        metalness: 0.1
    });
    
    // Crear góndolas desde la configuración
    CONFIG.shelves.forEach((shelfConfig, index) => {
        const shelf = createShelf(shelfMaterial, supportMaterial, backpanelPanelMaterial);
        shelf.position.set(...shelfConfig.position);
        scene.add(shelf);
    });
}

/**
 * Crear una góndola individual (COMPACTA - menos profundidad)
 */
function createShelf(material, supportMaterial, backPanelMaterial) {
    const shelf = new THREE.Group();
    
    // Base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.3, 2.5),
        material
    );
    base.position.y = 0.15;
    base.castShadow = false;
    shelf.add(base);
    
    //divisor trasero - con su propio material para diferenciarlo visualmente
    const backPanel = new THREE.Mesh(
        new THREE.BoxGeometry(9, 4.2, 0.08),
        backPanelMaterial  // 👈 usa su propio material
    );
    backPanel.position.set(0, 1.8, 0);
    backPanel.userData.isBackPanel = true; 
    backPanel.castShadow = false;
    backPanel.receiveShadow = true;
    shelf.add(backPanel);

    // Estantes (3 niveles)
    for (let i = 1; i <= 3; i++) {
        const level = new THREE.Mesh(
            new THREE.BoxGeometry(10, 0.1, 2.5),
            material
        );
        level.position.y = i * 1.3;
        level.castShadow = true;
        shelf.add(level);
    }


    // Soportes verticales
    const supportGeometry = new THREE.BoxGeometry(0.5, 4.2, 0.5);
    
    const support1 = new THREE.Mesh(supportGeometry, supportMaterial);
    support1.position.set(-4.75, 2.1, -1.5);
    support1.castShadow = false;
    shelf.add(support1);
    
    const support2 = support1.clone();
    support2.position.set(4.75, 2.1, -1.5);
    shelf.add(support2);
    
    const support3 = support1.clone();
    support3.position.set(-4.75, 2.1, 1.5);
    shelf.add(support3);
    
    const support4 = support1.clone();
    support4.position.set(4.75, 2.1, 1.5);
    shelf.add(support4);
    
    shelf.rotation.y = Math.PI / 2;
    
    return shelf;
}

/**
 * Crear heladeras/refrigeradores comerciales para el supermercado
 */
function createRefrigerators(scene) {
    // Posiciones para 3 heladeras (alineadas con las góndolas)
    const refrigerators = [];
    refrigerators.push(createRefrigerator(scene, -5, 0, -20.5));
    refrigerators.push(createRefrigerator(scene, 0, 0, -20.5));
    refrigerators.push(createRefrigerator(scene, 5, 0, -20.5));

    return refrigerators;
}

/**
 * Crear una heladera individual con cristal realista y luz LED blanca
 */
function createRefrigerator(scene, x, y, z) {
    const fridge = new THREE.Group();
    fridge.position.set(x, y, z);
    
    // Material marco negro/metálico
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x1A1A1A,
        roughness: 0.3,
        metalness: 0.8
    });
    
    // Material cristal azulado (MeshStandard para mejor FPS)
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x8BC4F0,
        transparent: true,
        opacity: 0.5,
        roughness: 0.05,
        metalness: 0,
        side: THREE.FrontSide
    });
    
    // Puerta frontal de cristal azulado
    const doorGeometry = new THREE.BoxGeometry(2.85, 4.8, 0.15);
    const door = new THREE.Mesh(doorGeometry, glassMaterial);
    door.position.set(0, 2.5, 0.7);  // Posicionada al frente (separada más)
    door.castShadow = false;
    fridge.add(door);
    
    // Marco metálico de la puerta (arriba)
    const topFrameGeometry = new THREE.BoxGeometry(3, 0.18, 2.65);
    const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
    topFrame.position.set(0, 4.95, 0.35);
    topFrame.castShadow = false;
    fridge.add(topFrame);
    
    // Marco metálico de la puerta (abajo)
    const bottomFrameGeometry = new THREE.BoxGeometry(3, 0.15, 2.65);
    const bottomFrame = new THREE.Mesh(bottomFrameGeometry, frameMaterial);
    bottomFrame.position.set(0, 0.1, 0.35);
    bottomFrame.castShadow = false;
    fridge.add(bottomFrame);
    
    // Marco metálico de los lados (separados más hacia el frente)
    const sideFrameGeometry = new THREE.BoxGeometry(0.15, 4.8, 2.65);
    const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
    leftFrame.position.set(-1.5, 2.5, 0.35);
    leftFrame.castShadow = false;
    fridge.add(leftFrame);
    
    const rightFrame = leftFrame.clone();
    rightFrame.position.x = 1.5;
    fridge.add(rightFrame);
    
    // Estantes de vidrio internos (5 estantes)
    const shelfGeometry = new THREE.BoxGeometry(2.7, 0.08, 2.35);
    const shelfMaterial = new THREE.MeshStandardMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1,
        metalness: 0.2,
        side: THREE.FrontSide
    });
    
    const shelfPositions = [0.3, 1.5, 3, 4.5];//posiciones verticales de los estantes
    shelfPositions.forEach(shelfY => {
        const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf.position.y = shelfY;
        shelf.position.z = 0.5;
        fridge.add(shelf);
    });
    
    // Luz LED blanca POTENTE dentro de la heladera - TUBO FLUORESCENTE SUPERIOR
    const ledLightGeometry = new THREE.BoxGeometry(2.7, 0.05, 2.35);
    const ledMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 1.2,
        roughness: 0.2,
        metalness: 0.7
    });
    const ledLight = new THREE.Mesh(ledLightGeometry, ledMaterial);
    ledLight.position.set(0, 4.8, 0.8);  // Luz en la parte superior
    fridge.add(ledLight);
    
    // Tubo fluorescente trasero (por las paredes laterales)
    const backLedGeometry = new THREE.BoxGeometry(2.8, 4.5, 0.1);
    const backLedMaterial = new THREE.MeshStandardMaterial({
        color: 0xE8F4FF,
        emissive: 0xE8F4FF,
        emissiveIntensity: 0.9,
        roughness: 0.3,
        metalness: 0.4
    });
    const backLed = new THREE.Mesh(backLedGeometry, backLedMaterial);
    backLed.position.set(0, 2.5, 0.5);  // Detrás, iluminando desde atrás
    fridge.add(backLed);
    
    // Point light principal - luz blanca potente
    const mainLight = new THREE.PointLight(0xFFFFFF, 3.0, 20);
    mainLight.position.set(0, 2.5, 0.5);
    fridge.add(mainLight);
    
    // Point light secundaria en la parte superior (más cálida)
    const topLight = new THREE.PointLight(0xFFFAF0, 1.5, 12);
    topLight.position.set(0, 4.5, 0.8);
    fridge.add(topLight);
    
    // Asa / mango de la puerta (metálica)
    const handleGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.12);
    const handle = new THREE.Mesh(handleGeometry, frameMaterial);
    handle.position.set(1.2, 2.5, 1.7);
    handle.castShadow = false;
    fridge.add(handle);
    
    // Base metálica inferior
    const baseGeometry = new THREE.BoxGeometry(3.2, 0.3, 2.85);
    const base = new THREE.Mesh(baseGeometry, frameMaterial);
    base.position.set(0, 0.15, 0.35);
    base.castShadow = false;
    fridge.add(base);
    
    fridge.castShadow = false;
    scene.add(fridge);
    
    return fridge;
}