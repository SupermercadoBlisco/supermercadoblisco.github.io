/**
 * CHECKOUT.JS - Gestión de la caja registradora y checkout
 * Maneja la detección de proximidad, clicks y apertura de WhatsApp
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getCart, getCartTotal } from './cart.js';
import CONFIG from './config.js';

// Variables del módulo
let scene, camera;
let checkoutCounter;
let checkoutSign;
let isNearCheckout = false;
let raycaster;

// Configuración de WhatsApp (importada desde config.js)
const WHATSAPP_NUMBER = CONFIG.whatsapp.phoneNumber;

// ─────────────────────────────────────────────────────────────────────────────
//  POSICIÓN GLOBAL DE LA CAJA — cambiá solo este .set() para mover TODO junto:
//  el modelo 3D, el cartel "CAJA" y la zona de interacción/hitbox.
// ─────────────────────────────────────────────────────────────────────────────
const CHECKOUT_POSITION = new THREE.Vector3(-6, 0, 15);
//  Si querés sobreescribir la posición del config sin tocarlo, reemplazá por:
//  const CHECKOUT_POSITION = new THREE.Vector3(0, 0, 10); // ← x, y, z


/**
 * Inicializar la caja registradora
 */
export function initCheckout(sceneRef, cameraRef) {
    scene = sceneRef;
    camera = cameraRef;

    // Raycaster para detectar clicks en la caja
    raycaster = new THREE.Raycaster();
    raycaster.far = 8; // Distancia máxima de interacción

    // Crear grupo raíz — mover este grupo mueve TODO
    checkoutCounter = new THREE.Group();
    checkoutCounter.position.copy(CHECKOUT_POSITION);
    checkoutCounter.rotation.y = 270 * Math.PI / 180; // 90°
    checkoutCounter.userData.isCheckout = true;
    scene.add(checkoutCounter);

    // Cargar modelo GLB de la caja
    loadCajaModel(checkoutCounter);

    // Agregar cartel "CAJA" al grupo (se mueve junto con todo)
    const sign = createCheckoutSign();
    checkoutSign = sign;
    sign.position.set(0, 4, 0); // relativo al grupo — ajustá Y si el modelo es más alto/bajo
    checkoutCounter.add(sign);

    // Hitbox invisible para raycasting (cubre el área del mostrador)
    // Si el modelo GLB tiene su propio mesh, el raycaster lo detectará directamente.
    // Esta hitbox es un fallback por si el GLB tarda en cargar o tiene geometría compleja.
    const hitboxGeo = new THREE.BoxGeometry(4, 2, 2);
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false }); // invisible
    const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
    hitbox.position.set(0, 1, 0); // centrada en el mostrador
    hitbox.userData.isCheckout = true;
    checkoutCounter.add(hitbox);

    // Event listener para botón de checkout
    const checkoutButton = document.getElementById('goToCheckout');
    checkoutButton.addEventListener('click', openWhatsAppCheckout);

    console.log('💳 Checkout inicializado');
}

/**
 * Crear el mostrador (4 paredes + mesada) alrededor de la caja
 */
function createCheckoutWalls(group) {
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load('./images/walls7.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(2, 0.5);

    const wallMat = new THREE.MeshStandardMaterial({
        map: floorTexture,
        roughness: 0.4,
        metalness: 0.1,
    });

    // Pared izquierda
    const left = new THREE.Mesh(new THREE.BoxGeometry(6, 1.4, 1.3), wallMat);
    left.position.set(.5, 0.80, -0.1); // ← mover acá
    group.add(left);

    // Mesada superior
    const top = new THREE.Mesh(new THREE.BoxGeometry(1, 0.05, 1.1), wallMat);
    top.position.set(2.65, 1.65, -0.1); // ← mover acá
    group.add(top);
}
/**
 * Cargar el modelo GLB de la caja y añadirlo al grupo
 */
function loadCajaModel(group) {
    // Crear paredes del mostrador (aparecen de inmediato, sin esperar el GLB)
    createCheckoutWalls(group);

    const loader = new GLTFLoader();

    loader.setResourcePath('./assets/caja/textures/');
    loader.load(
        './assets/caja/source/caja.glb',
        (gltf) => {
            const model = gltf.scene;

            // Configurar materiales y sombras
            model.traverse(child => {
                if (child.isMesh) {
                    // Reemplazar material con uno propio
                    child.material = new THREE.MeshBasicMaterial({
                        //color: 0x2c3e50,      // color del mostrador (azul oscuro)
                        map: child.material.map, // conservar textura original
                        roughness: 0,
                        metalness: 1,
                    });
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Ajuste de escala y posición RELATIVA al grupo
            // (el grupo ya está en CHECKOUT_POSITION, estos valores son offset internos)
            model.scale.set(3, 2, 2);       // ← ajustá si el modelo es muy grande/chico
            model.position.set(0, 0, 0);    // ← offset interno del modelo si está descentrado
            model.rotation.y = Math.PI; // ← 180 grados
            group.add(model);

            // Log para calibrar escala
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            console.log('✅ Caja cargada');
            console.log('📦 Tamaño:', size.x.toFixed(2), size.y.toFixed(2), size.z.toFixed(2));
        },
        (xhr) => {
            const pct = xhr.total ? (xhr.loaded / xhr.total * 100).toFixed(0) : '?';
            console.log(`Caja: ${pct}% cargada`);
        },
        (err) => console.error('❌ Error cargando caja.glb:', err)
    );
}

/**
 * Verificar si se hizo click en la caja con la cruceta
 */
export function checkCheckoutClick() {
    // Raycast desde el centro de la pantalla (cruceta)
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const intersects = raycaster.intersectObjects([checkoutCounter], true);

    if (intersects.length > 0) {
        openWhatsAppCheckout();
    }
}

/**
 * Crear letrero de la caja (Sprite billboard — siempre mira al jugador)
 */
function createCheckoutSign() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Fondo verde brillante
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borde
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Texto
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🢃 CAJA 🢃', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });

    const sprite = new THREE.Sprite(material);
    sprite.scale.set(4, 2, 1);

    return sprite;
}

/**
 * Verificar proximidad a la caja (llamado cada frame)
 */
export function checkCheckoutProximity() {
    if (!checkoutCounter) return;

    const distance = camera.position.distanceTo(checkoutCounter.position);
    const proximityThreshold = CONFIG.checkout.proximityDistance;

    const wasNear = isNearCheckout;
    isNearCheckout = distance < proximityThreshold;

    // Si entramos en rango
    if (isNearCheckout && !wasNear) {
        showProximityMessage();
    }

    animateCheckout();
}

/**
 * Animación de la caja — el cartel billboard siempre mira al jugador
 */
function animateCheckout() {
    if (!checkoutCounter || !checkoutSign) return;

    // Billboard del letrero: solo gira en Y para mirar al jugador
    const camPos = new THREE.Vector3();
    camera.getWorldPosition(camPos);
    camPos.y = checkoutSign.getWorldPosition(new THREE.Vector3()).y;
    checkoutSign.lookAt(camPos);
}

/**
 * Mostrar mensaje de proximidad
 */
function showProximityMessage() {
    const cart = getCart();
    if (cart.length > 0) {
        showNotification('💳 ¡Estás cerca de la caja! Haz click en "Ir a Caja" para finalizar');
    }
}

/**
 * Abrir WhatsApp con el pedido
 */
function openWhatsAppCheckout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert('⚠️ Tu carrito está vacío. Agrega productos antes de ir a la caja.');
        return;
    }

    const message = buildWhatsAppMessage(cart);
    const encodedMessage = encodeURIComponent(message).replace(/%20/g, '+');
    const whatsappURL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    showNotification('📱 Abriendo WhatsApp...');
    console.log('📱 WhatsApp abierto con pedido');
}

/**
 * Construir mensaje de WhatsApp con el pedido
 */
function buildWhatsAppMessage(cart) {
    let message = '🛒 *PEDIDO DE BLISCO - SUPERMERCADO VIRTUAL 3D*\n\n';

    message += '📦 *Productos:*\n\n';
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantidad: ${item.quantity} × $${item.price} = $${subtotal}\n\n`;
    });

    const total = getCartTotal();
    message += '━━━━━━━━━━━━━━━━━\n';
    message += `*TOTAL: $${total}*\n`;
    message += '━━━━━━━━━━━━━━━━━\n\n';

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    message += `📊 Total de ítems: ${itemCount}\n`;
    message += `📅 Fecha: ${new Date().toLocaleDateString('es-AR')}\n`;
    message += `🕐 Hora: ${new Date().toLocaleTimeString('es-AR')}\n\n`;
    message += 'Enseguida nos comunicaremos contigo. \n¡Gracias por tu compra! 😊';

    return message;
}

/**
 * Mostrar notificación
 */
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

/**
 * Cambiar número de WhatsApp (función helper para desarrolladores)
 */
export function setWhatsAppNumber(newNumber) {
    console.log('📱 Número de WhatsApp actualizado:', newNumber);
}