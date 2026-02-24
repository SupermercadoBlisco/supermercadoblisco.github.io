/**
 * CART.JS - Gestión del carrito de compras
 * Maneja localStorage, UI del carrito y operaciones CRUD
 */

// Carrito en memoria
let cart = [];

// Estado del carrito minimizado
let isCartMinimized = true;
let autoMinimizeTimer = null;

// Referencias DOM
let cartItemsContainer, itemCountElement, clearCartButton, goToCheckoutButton, cartPanel, minimizeButton;

/**
 * Inicializar el carrito
 */
export function initCart() {
    // Obtener referencias DOM
    cartPanel = document.getElementById('cartPanel');
    cartItemsContainer = document.getElementById('cartItems');
    itemCountElement = document.getElementById('itemCount');
    clearCartButton = document.getElementById('clearCart');
    goToCheckoutButton = document.getElementById('goToCheckout');
    
    // Crear botón de minimizar si no existe
    if (!document.getElementById('minimizeCart')) {
        const cartHeader = document.getElementById('cartHeader');
        const minimizeButtonHTML = `<button id="minimizeCart" class="minimize-cart-btn" title="Minimizar carrito">−</button>`;
        cartHeader.insertAdjacentHTML('beforeend', minimizeButtonHTML);
        minimizeButton = document.getElementById('minimizeCart');
    } else {
        minimizeButton = document.getElementById('minimizeCart');
    }
    
    // Cargar carrito desde localStorage
    loadCart();
    
    // Event listeners
    clearCartButton.addEventListener('click', clearCart);
    minimizeButton.addEventListener('click', toggleCartMinimize);
    
    // Renderizar carrito inicial (minimizado)
    renderCart();
    
    console.log('🛒 Carrito inicializado (minimizado)');
}

/**
 * Agregar producto al carrito
 */
export function addToCart(product, qty = 1) {

    // Buscar si el producto ya existe
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += qty;
    } else {
        // NUEVO: agregar al inicio (unshift) para que aparezca arriba
        cart.unshift({ ...product, quantity: qty });
    }
    
    saveCart();
    renderCart();
    
    // Auto-expandir carrito cuando se agrega producto
    expandCartTemporarily();
    
    console.log('➕ Producto agregado:', product.name);
}

/**
 * Remover producto del carrito
 */
export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    
    console.log('➖ Producto removido:', productId);
}

/**
 * Vaciar carrito completamente
 */
export function clearCart() {
    if (cart.length === 0) return;
    
    const confirmClear = confirm('¿Estás seguro de que deseas vaciar el carrito?');
    if (confirmClear) {
        cart = [];
        saveCart();
        renderCart();
        
        showNotification('🗑️ Carrito vaciado');
        console.log('🗑️ Carrito vaciado');
    }
}

/**
 * Obtener el carrito actual
 */
export function getCart() {
    return cart;
}

/**
 * Renderizar UI del carrito
 */
function renderCart() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    itemCountElement.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    
    // Vaciar contenedor
    cartItemsContainer.innerHTML = '';
    
    // Aplicar clase minimizada
    if (isCartMinimized) {
        cartPanel.classList.add('cart-minimized');
    } else {
        cartPanel.classList.remove('cart-minimized');
    }
    
    if (cart.length === 0) {
        // Carrito vacío
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Tu carrito está vacío</p>
                <p style="font-size: 12px; margin-top: 10px;">Haz click en los productos para agregarlos</p>
            </div>
        `;
        goToCheckoutButton.disabled = true;
    } else {
        // Renderizar items
        cart.forEach(item => {
            const itemElement = createCartItemElement(item);
            cartItemsContainer.appendChild(itemElement);
        });
        goToCheckoutButton.disabled = false;
    }
}

/**
 * Crear elemento HTML de un item del carrito
 */
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    const total = item.price * item.quantity;
    
    div.innerHTML = `
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-quantity">
                Cantidad: ${item.quantity} × $${item.price} = $${total}
            </div>
        </div>
        <button class="remove-item" data-id="${item.id}">🗑️</button>
    `;
    
    // Event listener para remover
    const removeButton = div.querySelector('.remove-item');
    removeButton.addEventListener('click', () => {
        removeFromCart(item.id);
        showNotification(`${item.name} removido del carrito`);
    });
    
    return div;
}

/**
 * Toggle minimizar/expandir carrito
 */
function toggleCartMinimize() {
    isCartMinimized = !isCartMinimized;
    
    // Cancelar auto-minimización si el usuario interactúa
    if (autoMinimizeTimer) {
        clearTimeout(autoMinimizeTimer);
        autoMinimizeTimer = null;
    }
    
    renderCart();
}

/**
 * Expandir carrito temporalmente y minimizar después de unos segundos
 */
function expandCartTemporarily() {
    // Cancelar timer anterior si existe
    if (autoMinimizeTimer) {
        clearTimeout(autoMinimizeTimer);
    }
    
    // Expandir
    isCartMinimized = false;
    renderCart();
    
    // Auto-minimizar después de 3 segundos
    autoMinimizeTimer = setTimeout(() => {
        isCartMinimized = true;
        renderCart();
        autoMinimizeTimer = null;
    }, 3000);
}

/**
 * Guardar carrito en localStorage
 */
function saveCart() {
    try {
        localStorage.setItem('supermarket_cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error al guardar carrito:', e);
    }
}

/**
 * Cargar carrito desde localStorage
 */
function loadCart() {
    try {
        const saved = localStorage.getItem('supermarket_cart');
        if (saved) {
            cart = JSON.parse(saved);
            console.log('💾 Carrito cargado desde localStorage');
        }
    } catch (e) {
        console.error('Error al cargar carrito:', e);
        cart = [];
    }
}

/**
 * Mostrar notificación
 */
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

/**
 * Obtener total del carrito
 */
export function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Obtener cantidad de items
 */
export function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}
