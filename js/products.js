/**
 * PRODUCTS.JS - Gestión de productos 3D interactivos (FIXED)
 */

import * as THREE from 'three';
import { addToCart } from './cart.js';
import CONFIG from './config.js';

// ================== GLOBALS ==================
let scene, camera, canvas;
let products = [];
let hitboxes = [];
let raycaster;
let hoveredProduct = null;
let _lastCandidate = null;
let _sameCandidateFrames = 0;
let _leaveHoverFrames = 0;
const HOVER_ENTER_FRAMES = 2;
const HOVER_LEAVE_FRAMES = 10;

// ================== PRODUCT DATA ==================
const PRODUCTS_DATA = CONFIG.products.map(product => ({
    ...product,
    description: product.description || getDefaultDescription(product.name)
}));

function getDefaultDescription(name) {
    const descriptions = {
        'Don Satur': 'Galletitas Don Satur agridulces, clásicas y crujientes. 200g.',
        'Felpita': 'Papel higiénico Felpita Blanquísimo, suave y resistente. 80 metros.',
        'Lucchetti': 'Fideliuskis',
        'Lucchetti': 'Yerba buena',
    };
    const cleanName = name.replace(/[^\w\s]/g, '').trim();
    return descriptions[cleanName] || 'Producto premium seleccionado para vos.';
}

// ================== INIT ==================
export function initProducts(sceneRef, cameraRef, canvasRef) {
    scene = sceneRef;
    camera = cameraRef;
    canvas = canvasRef;

    raycaster = new THREE.Raycaster();
    raycaster.near = 0.05;
    raycaster.far = 30;
 
    createProducts();
    console.log('📦 Productos cargados:', products.length);
}

// ================== CREATE PRODUCTS ==================
function createProducts() {
    PRODUCTS_DATA.forEach((data, index) => {

        // 👉 OPCIONAL: solo productos con imagen
        // if (!data.image) return;

        const product = createProduct(data, index);
        products.push(product);
        scene.add(product);
    });
}

function createProduct(data, index) {
    const group = new THREE.Group();

    const sizeHeights = {
        'muy-chico1':0.4,
        'muy-chico2':0.6,
        'muy-chico3':0.8,
        'chico1':1,
        'chico2':1.2,
        'chico3':1.4,
        'medio1':1.6,
        'medio2':1.8,
        'medio3':2,
        'grande1':2.2,
        'grande2':2.4,
        'grande3':2.6,
        'medium': 1.2
    };
    const targetHeight = sizeHeights[data.size || 'medium'] ?? 1.2;

    // Hitbox con tamaño MÍNIMO para que los objetos chicos sean fáciles de agarrar
    const minHitboxWidth = 0.55;
    const minHitboxHeight = 0.7;
    const hitboxWidth = Math.max(targetHeight * 0.4, minHitboxWidth);
    const hitboxHeight = Math.max(targetHeight, minHitboxHeight);

    // ================= HITBOX =================
    const hitboxGeometry = new THREE.BoxGeometry(
        hitboxWidth,
        hitboxHeight,
        0.05
    );

    const showHitboxes = CONFIG.features.showHitboxes === true;
    const hitboxMaterial = new THREE.MeshBasicMaterial({
        visible: showHitboxes,
        color: 0xff8800,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        side: THREE.DoubleSide
    });

    const displayCount = Math.max(1, data.displayCount || 1);
    const displaySpacing = data.displaySpacing ?? 0.25;
    const displayAxis = (data.displayAxis || 'x').toLowerCase();

    for (let i = 0; i < displayCount; i++) {
        const offset = (i - (displayCount - 1) / 2) * displaySpacing;
        const offsetX = displayAxis === 'x' ? 0 : offset;
        const offsetZ = displayAxis === 'x' ? -0.33 + offset : -0.33;
        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial.clone());
        hitbox.position.set(offsetX, 0, offsetZ);
        hitbox.userData.isHitbox = true;
        group.add(hitbox);
        hitboxes.push(hitbox);
    }

    // ================= IMAGE PRODUCT =================
    if (data.image) {
        const loader = new THREE.TextureLoader();
        loader.load(data.image, texture => {
            texture.colorSpace = THREE.SRGBColorSpace;
            const aspect = texture.image.width / texture.image.height;
            const targetWidth = targetHeight * aspect;
            const geo = new THREE.PlaneGeometry(targetWidth, targetHeight);
            const mat = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                alphaTest: 0.5,
                side: THREE.DoubleSide,
                toneMapped: false
            });

            for (let i = 0; i < displayCount; i++) {
                const offset = (i - (displayCount - 1) / 2) * displaySpacing;
                const offsetX = displayAxis === 'x' ? 0 : offset;
                const offsetZ = displayAxis === 'x' ? -0.33 + offset : -0.33;
                const plane = new THREE.Mesh(geo, mat);
                plane.userData.isBillboard = true;
                plane.position.set(offsetX, 0, offsetZ);
                group.add(plane);
            }

            group.children.filter(c => c.userData.isTemp).forEach(c => group.remove(c));
        });

        const tempGeo = new THREE.PlaneGeometry(targetHeight * 0.7 * displayCount, targetHeight);
        const tempMat = new THREE.MeshBasicMaterial({ color: data.color, opacity: 0.3, transparent: true });
        const tempPlane = new THREE.Mesh(tempGeo, tempMat);
        tempPlane.userData.isTemp = true;
        tempPlane.position.z = -0.33;
        group.add(tempPlane);
    } 
    // ================= FALLBACK BOX =================
    else {
        const geo = new THREE.BoxGeometry(0.6, 0.8, 0.6);
        const mat = new THREE.MeshStandardMaterial({ color: data.color });
        const box = new THREE.Mesh(geo, mat);
        box.position.z = -0.33;
        group.add(box);
    }

    // ================= LABEL =================
    // const label = createLabel(data.emoji, data.name);
    // label.position.y = targetHeight * 0.25;
    // label.position.z = -0.33;
    // group.add(label);

    // Position
    group.position.set(...data.position);

    group.position.y += CONFIG.features.productShelfOffset;

    // Rotar producto para que hitbox/plano miren al pasillo (borde opuesto de la góndola)
    // Izq y Centro (productos a la izquierda de la góndola): miran +X. Derecha: miran -X
    const shelfX = data.position[0];
    group.rotation.y = shelfX < 5 ? Math.PI / 2 : -Math.PI / 2;
    
    // UserData
    group.userData = {
        id: `product_${index}`,
        name: data.name,
        price: data.price,
        emoji: data.emoji,
        description: data.description,
        color: data.color,
        image: data.image || null,
        isProduct: true
    };

    return group;
}


// ================= RAYCAST CLICK =================
export function checkProductInCrosshair() {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

    // Obtener TODOS los objetos de la escena que intersecta el rayo
    const allIntersects = raycaster.intersectObjects(scene.children, true);

    for (const hit of allIntersects) {
        // Si el rayo choca primero con el backpanel, lo bloqueamos
        if (hit.object.userData.isBackPanel) return;

        // Si choca con un hitbox, mostramos el modal
        if (hit.object.userData.isHitbox) {
            showProductModal(hit.object.parent.userData);
            return;
        }
    }
}

// ================= HOVER FIXED =================
export function updateProductHover() {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const allIntersects = raycaster.intersectObjects(scene.children, true);

    let candidate = null;
    for (const hit of allIntersects) {
        if (hit.object.userData.isBackPanel) { candidate = null; break; }
        if (hit.object.userData.isHitbox) { candidate = hit.object.parent; break; }
    }

    // ... resto de la lógica de hover igual que antes ...
    if (candidate === _lastCandidate) _sameCandidateFrames++;
    else { _lastCandidate = candidate; _sameCandidateFrames = 1; }

    if (candidate === hoveredProduct) {
        _leaveHoverFrames = 0;
    } else {
        _leaveHoverFrames++;
        if (_leaveHoverFrames >= HOVER_LEAVE_FRAMES) {
            if (hoveredProduct) hoveredProduct.scale.set(1, 1, 1);
            hoveredProduct = null;
        } else if (candidate !== null && _sameCandidateFrames >= HOVER_ENTER_FRAMES) {
            if (hoveredProduct) hoveredProduct.scale.set(1, 1, 1);
            hoveredProduct = candidate;
            hoveredProduct.scale.set(1.15, 1.15, 1.15);
        }
    }

    updateBillboards();
}

// ================= BILLBOARDS =================
const _cameraWorldPos = new THREE.Vector3();
let _billboardFrame = 0;
function updateBillboards() {
    _billboardFrame++;
    if (_billboardFrame % 2 !== 0) return;
    camera.getWorldPosition(_cameraWorldPos);
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        for (let j = 0; j < p.children.length; j++) {
            const c = p.children[j];
            if (c.userData.isBillboard || c.userData.isHitbox) c.lookAt(_cameraWorldPos);
        }
    }
}

// ================= MODAL =================
function showProductModal(product) {

    let imageHTML;
    if (product.image) {
        imageHTML = `
            <div class="product-modal-image">
                <img src="${product.image}" class="product-real-image">
            </div>
        `;
    } else {
        imageHTML = `
            <div class="product-modal-image">
                <div class="product-emoji">${product.emoji}</div>
            </div>
        `;
    }

    const modal = document.createElement('div');
    modal.className = 'product-modal';

    modal.innerHTML = `
        <div class="product-modal-content">

            <button class="modal-close">×</button>

            ${imageHTML}

            <div class="product-modal-info">
                <h2 class="product-modal-title">${product.name}</h2>

                <div class="product-price-row">
                    <div class="product-modal-price">$${product.price}</div>

                    <div class="qty-selector">
                        <button class="qty-btn" id="qty-minus">−</button>
                        <span id="qty-value">1</span>
                        <button class="qty-btn" id="qty-plus">+</button>
                    </div>
                </div>

                <p class="product-modal-description">${product.description}</p>
            </div>

            <div class="product-modal-actions">
                <button class="btn-back">← Atrás</button>
                <button class="btn-add-cart">Agregar al carrito</button>
            </div>

        </div>
    `;

    document.body.appendChild(modal);

    if (document.pointerLockElement) document.exitPointerLock();
    document.body.style.cursor = 'default';

    const closeModal = () => {
        modal.remove();
        document.dispatchEvent(new CustomEvent('modalClosed'));
    };
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('.btn-back').onclick = closeModal;

    // ===== CONTADOR =====
    let qty = 1;
    const qtySpan = modal.querySelector('#qty-value');

    modal.querySelector('#qty-plus').onclick = () => {
        qty++;
        qtySpan.textContent = qty;
    };

    modal.querySelector('#qty-minus').onclick = () => {
        if (qty > 1) {
            qty--;
            qtySpan.textContent = qty;
        }
    };

    // ===== AGREGAR AL CARRITO =====
    modal.querySelector('.btn-add-cart').onclick = () => {
        addToCart(product, qty); // 👈 PASAMOS CANTIDAD
        closeModal();
    };

    const esc = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', esc);
        }
    };
    document.addEventListener('keydown', esc);

    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
}
