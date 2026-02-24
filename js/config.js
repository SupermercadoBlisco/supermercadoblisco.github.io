/**
 * CONFIG.JS - Archivo de configuración central
 * Acá podés cambiar todos los parámetros del juego sin tocar el código complejo
 */

export const CONFIG = {
    
    // ========================================
    // 📱 WHATSAPP
    // ========================================
    whatsapp: {
        phoneNumber: '5492212026759'
    },
    
    // ========================================
    // 🎨 COLORES
    // ========================================
    colors: {
        // Color del cielo (fondo de la escena)
        sky: 0x87ceeb,  // Azul cielo
        
        // Color de las paredes del supermercado
        walls: 0xffd700,  // Dorado
        
        // Color del piso
        floor: 0xf0f0f0,  // Gris claro
        
        // Color de las góndolas
        shelves: 0x8b4513  // Marrón
    },
    
    // ========================================
    // 📦 PRODUCTOS
    // ========================================
    products: [
        // Productos con IMÁGENES REALES

        // Góndola Izquierda (pegada a pared X=-22): borde frente al pasillo X=-19.25

        { name: '🦋 Toallitas Calipso', color: 0x228b22, price: 840, position: [-19.25, 4.12, -2], emoji: '🥒', image: 'images/Productos/calipso-plus-toallitas-con-alas-pocket-x-8-removebg-preview.png', size: 'muy-chico2', displayCount: 5, displaySpacing: 0.5, displayAxis: 'z'},
        { name: '⛫💨 Kevin Black', color: 0x228b22, price: 5239, position: [-19.25, 4.3, -4.75], emoji: '🥒', image: 'images/Productos/kevin-black.png', size: 'muy-chico3', displayCount: 7, displaySpacing: 0.3, displayAxis: 'z'},
        { name: '🦷 Dentífrico Colgate', color: 0x228b22, price: 2110, position: [-19.25, 4.12, -7.5], emoji: '🥒', image: 'images/Productos/colgate.png', size: 'muy-chico3', displayCount: 4, displaySpacing: .7, displayAxis: 'z'},
        
        { name: '💈 Gillette', color: 0x0066cc, price: 900, position: [-19.25, 3.15, -2], emoji: '🪒', image: 'images/Productos/gillette-prestobarba-2-ultragrip-x1-169d9a611e27b872c617152645704875-1024-1024-removebg-preview.png', size: 'chico1', displayCount: 6, displaySpacing: 0.4, displayAxis: 'z'},
        { name: '🧼 Jabón Dove', color: 0xff6347, price: 1854, position: [-19.25, 2.8, -5], emoji: '🧼', image: 'images/Productos/116090_jabon-en-barra-dove-original-individual-x-90-g_Imagen-1.jpg-removebg-preview.png', size: 'muy-chico1', displayCount: 7, displaySpacing: 0.4, displayAxis: 'z'},
        { name: '🧴 Head & Shoulders', color: 0xf4a460, price: 8758, position: [-19.25, 3.15, -8], emoji: '🍞', image: 'images/Productos/205168-800-800-removebg-preview.png', size: 'chico3', displayCount: 6, displaySpacing: 0.4, displayAxis: 'z'},
        
        { name: '🧻 Papel Higiénico Felpita', color: 0x0066cc, price: 3300, position: [-19.25, 1.9, -7], emoji: '📄', image: 'images/Productos/felpita.png', size: 'medio1', displayCount: 4, displaySpacing: 1, displayAxis: 'z'},
        { name: '🧻 Papel Higiénico Higienol', color: 0xffffff, price: 4881, position: [-19.25, 2.1, -3], emoji: '🧴', image: 'images/Productos/higienol.png', size: 'chico1', displayCount: 4, displaySpacing: 1, displayAxis: 'z'},


        // Góndola Medio Izquierda: borde frente a la pared X=-5.5
        { name: '🧺 Procenex - Lavanda', color: 0xffe4e1, price: 1687, position: [-7.7, 4.5, -7.5], emoji: '🍦', image: 'images/Productos/635498-800-600-removebg-preview.png', size: 'chico3', displayCount: 10, displaySpacing: .4, displayAxis: 'z'},
        { name: '🧽 Detergente Magistral', color: 0xff0000, price: 1917, position: [-7.7, 4.3, -3], emoji: '🍎', image: 'images/Productos/foto1_14529_0-removebg-preview.png', size: 'chico2', displayCount: 10, displaySpacing: .4, displayAxis: 'z'},
        
        { name: '🧽 Limpiador Cif', color: 0xff8c00, price: 1800, position: [-7.5, 3.2, -7.5], emoji: '🥕', image: 'images/Productos/D_NQ_NP_2X_673155-MLA100188981005_122025-F-removebg-preview.png', size: 'chico1', displayCount: 7, displaySpacing: .4, displayAxis: 'z'},
        { name: '🧴 Lavandina Ayudín', color: 0x8b4513, price: 1040, position: [-7.5, 3.2, -3], emoji: '🍫', image: 'images/Productos/ayduin.png', size: 'chico1', displayCount: 7, displaySpacing: .6, displayAxis: 'z'},
        
        { name: '👕 Jabón de Ropa Zorro', color: 0xdaa520, price: 6999, position: [-7.5, 2.1, -8], emoji: '🧇', image: 'images/Productos/zorro.png', size: 'chico2', displayCount: 3, displaySpacing: .8, displayAxis: 'z'},
        { name: '🧽 Esponja', color: 0xffa500, price: 1386, position: [-7.5, 1.7, -5], emoji: '🍊', image: 'images/Productos/Esponja-Mortimer-Doble-Cuadriculada-1-U-0779325300703-1-removebg-preview.png', size: 'muy-chico1', displayCount: 9, displaySpacing: .35, displayAxis: 'z'},
        { name: '🟠 Off', color: 0xffa500, price: 4320, position: [-7.5, 1.9, -2], emoji: '🍊', image: 'images/Productos/Off-Family-Repelente-Aerosol-X-127-G.png', size: 'muy-chico2', displayCount: 10, displaySpacing: .25, displayAxis: 'z'},
        
        // Góndola Medio Izquierda: borde frente al pasillo X=-5.5
        { name: '👩🏻‍🍳 Rollos de Cocina Celestial', color: 0xfff8dc, price: 1167, position: [-5.5, 4.4, -5], emoji: '🧈', image: 'images/Productos/rollos-removebg-preview.png', size: 'medio1', displayCount: 7, displaySpacing: 1.2, displayAxis: 'z'},
        
        { name: '🌻 Aceite de Girasol Legítimo', color: 0xfff8dc, price: 950, position: [-5.5, 3.1, -5], emoji: '🧈', image: 'images/Productos/aceite-girasol-legitimo-900-cc.png', size: 'chico1', displayCount: 4, displaySpacing: .3, displayAxis: 'z'},
        { name: '🌻 Aceite de Girasol Natura', color: 0xfff8dc, price: 950, position: [-5.5, 3.25, -2.5], emoji: '🧈', image: 'images/Productos/Aceite-de-Girasol-Natura-15-Lt.png', size: 'chico2', displayCount: 7, displaySpacing: .5, displayAxis: 'z'},
        
        // Góndola Medio Derecha: borde frente al pasillo X=-5.5
        { name: '🟡 Mayonesa Natura', color: 0xdaa520, price: 2759, position: [5.5, 4.45, -7.5], emoji: '🥐', image: 'images/Productos/natura-mayonesa-475g.png', size: 'chico2', displayCount: 5, displaySpacing: .7, displayAxis: 'z'},
        { name: '🟤 Mostaza Natura', color: 0xdaa520, price: 690, position: [5.5, 4.35, -4.5], emoji: '🥐', image: 'images/Productos/mostaza-natura-250g.png', size: 'chico1', displayCount: 4, displaySpacing: .5, displayAxis: 'z'},
        { name: '🔴 Ketchup Natura', color: 0xdaa520, price: 960, position: [5.5, 4.35, -2], emoji: '🥐', image: 'images/Productos/Ketchup-Natura-250-Gr.png', size: 'chico1', displayCount: 5, displaySpacing: .5, displayAxis: 'z'},
        
        { name: '🐟 Atún Desmenuzado al Natural Cumaná', color: 0xffff00, price: 1371, position: [5.5, 2.85, -5], emoji: '🍌', image: 'images/Productos/atun-desm-nat-cumana.webp', size: 'muy-chico3', displayCount: 10, displaySpacing: .4, displayAxis: 'z'},
        { name: '🐟 Atún Desmenuzado al Natural Cumaná', color: 0xffff00, price: 1371, position: [5.5, 3.05, -5], emoji: '🍌', image: 'images/Productos/atun-desm-nat-cumana.webp', size: 'muy-chico3', displayCount: 10, displaySpacing: .4, displayAxis: 'z'},

        { name: '🥄 Azúcar Ledesma', color: 0xdaa520, price: 1375, position: [5.5, 1.9, -5], emoji: '🥐', image: 'images/Productos/ledesma.png', size: 'chico1', displayCount: 7, displaySpacing: 1, displayAxis: 'z'},

        // Góndola Medio Derecha: borde frente a la pared X=5.5
        { name: '🥔 Pure de Papas Knorr', color: 0x228b22, price: 2134, position: [7.7, 4.3, -3], emoji: '🥒', image: 'images/Productos/pure-de-papas-knorr.png', size: 'muy-chico3', displayCount: 8, displaySpacing: .5, displayAxis: 'z'},
        { name: '🍋 Jugo de Limón Minerva', color: 0x228b22, price: 1583, position: [7.7, 4.19, -7], emoji: '🥒', image: 'images/Productos/Jugo-de-Limon-Minerva-250.png', size: 'muy-chico2', displayCount: 8, displaySpacing: .3, displayAxis: 'z'},
        
        { name: '💧 Agua Mineral Villa del Sur', color: 0x228b22, price: 1499, position: [7.7, 3.22, -8], emoji: '🥒', image: 'images/Productos/agua.png', size: 'chico2', displayCount: 5, displaySpacing: .5, displayAxis: 'z'},
        { name: '🍊 Clight - Naranja Dulce ', color: 0x228b22, price: 399, position: [7.7, 2.85, -2], emoji: '🥒', image: 'images/Productos/clight.png', size: 'muy-chico1', displayCount: 7, displaySpacing: .4, displayAxis: 'z'},
        
        { name: '🍶 Vinagre de Alcohol Dos anclas', color: 0x228b22, price: 1140, position: [7.7, 2, -5], emoji: '🥒', image: 'images/Productos/vinagre-alcohol-dos-anclas-x500.png', size: 'muy-chico3', displayCount: 5, displaySpacing: .3, displayAxis: 'z'},

        // Góndola Derecha (pegada a pared X=22): borde frente al pasillo X=19.25
        { name: '🍜 Fideos Don Vicente', color: 0xd2b48c, price: 2931, position: [19.25, 5.7, -7], emoji: '🥖', image: 'images/Productos/don vicente.png', size: 'chico2', displayCount: 7, displaySpacing: .6, displayAxis: 'z'},
        
        { name: '🍅 Puré de Tomate Molto', color: 0xff69b4, price: 720, position: [19.25, 4.19, -8], emoji: '🍭', image: 'images/Productos/Pure-De-Tomate-Molto.png', size: 'muy-chico2', displayCount: 7, displaySpacing: 0.3, displayAxis: 'z'},
        { name: '🍜 Fideos Lucchetti', color: 0x0099ff, price: 1188, position: [19.25, 4.44, -5], emoji: '🍝', image: 'images/Productos/lucchetti.png', size: 'chico2', displayCount: 7, displaySpacing: 0.3, displayAxis: 'z'},
        { name: '🧀 Queso Rallado Chico Sancor', color: 0xd2691e, price: 1320, position: [19.25, 4.17, -2], emoji: '🥨', image: 'images/Productos/Queso-Rallado-Sancor-40-Gr.png', size: 'muy-chico2', displayCount: 7, displaySpacing: 0.3, displayAxis: 'z'},
        
        { name: '🧉 Yerba Playadito', color: 0xffeb3b, price: 2147, position: [19.25, 3.25, -8], emoji: '🧉', image: 'images/Productos/playadito.png', size: 'chico2', displayCount: 6, displaySpacing: 0.5, displayAxis: 'z'},
        { name: '🍪 Don Satur', color: 0x0066cc, price: 900, position: [19.25, 2.9, -5], emoji: '🧴', image: 'images/Productos/don-satur.png', size: 'muy-chico2', displayCount: 6, displaySpacing: 0.4, displayAxis: 'z'},
        { name: '🧉 Yerba Nobleza Gaucha', color: 0xffa07a, price: 1597, position: [19.25, 3.25, -2], emoji: '🧉', image: 'images/Productos/nobleza-gaucha.png', size: 'chico2', displayCount: 5, displaySpacing: 0.6, displayAxis: 'z'},
        
        { name: '🍚 Arroz Integral Don Marcos', color: 0xffffff, price: 1200, position: [19.25, 2.1, -7], emoji: '🥛', image: 'images/Productos/00299514-removebg-preview.png', size: 'chico1', displayCount: 6, displaySpacing: 0.6, displayAxis: 'z'},
        { name: '🍚 Arroz Don Marcos', color: 0xffd700, price: 1100, position: [19.25, 2.1, -3], emoji: '🧀', image: 'images/Productos/00614812-removebg-preview.png', size: 'chico1', displayCount: 6, displaySpacing: 0.6, displayAxis: 'z'},


        // HELADERAS!
        
        //Izquierda (pegada a pared X=-22)
        { name: '🥤 Sprite', color: 0xff69b4, price: 3694, position: [-4.7, 3.5, -19], emoji: '🍭', image: 'images/Productos/Gaseosa-Sprite-1.5l.png', size: 'chico2', displayCount: 5, displaySpacing: 0.5, displayAxis: 'x'},
        { name: '🥤 Soda Ivess', color: 0xff69b4, price: 1140, position: [-4.7, 5, -19], emoji: '🍭', image: 'images/Productos/ivess.png', size: 'chico3', displayCount: 5, displaySpacing: 0.5, displayAxis: 'x'},
        { name: '🥤 Monster', color: 0xd2691e, price: 3490, position: [-4, 2, -19], emoji: '🥨', image: 'images/Productos/monster.png', size: 'muy-chico2', displayCount: 5, displaySpacing: 0.2, displayAxis: 'x'},
        { name: '🥤 Monster - Mango Loco', color: 0xd2691e, price: 3490, position: [-5.3, 2, -19], emoji: '🥨', image: 'images/Productos/monster-mango.png', size: 'muy-chico2', displayCount: 5, displaySpacing: 0.2, displayAxis: 'x'},

        //Centro
        { name: '🥤 Coca-Cola', color: 0x0099ff, price: 3298, position: [0.3, 3.5, -19], emoji: '🍝', image: 'images/Productos/CocaCola_1.5.png', size: 'chico3', displayCount: 5, displaySpacing: 0.5, displayAxis: 'x' },
        { name: '🥤 Coca-Cola', color: 0x0099ff, price: 3298, position: [0.3, 5, -19], emoji: '🍝', image: 'images/Productos/CocaCola_1.5.png', size: 'chico3', displayCount: 5, displaySpacing: 0.5, displayAxis: 'x' },

        //Derecha (pegada a pared X=22)
        { name: '🥛 Leche La Serenisima - Protein', color: 0xd2691e, price: 2588, position: [4.99, 4.9, -19], emoji: '🥨', image: 'images/Productos/leche-protein.png', size: 'chico2', displayCount: 5, displaySpacing: 0.4, displayAxis: 'x'},
        { name: '🥛 Leche La Serenisima - Larga Vida', color: 0xd2691e, price: 2364, position: [4.99, 3.4, -19], emoji: '🥨', image: 'images/Productos/leche-larga-vida.png', size: 'chico2', displayCount: 5, displaySpacing: 0.4, displayAxis: 'x'},

    ],
    
    // ========================================
    // 📐 CÁMARA
    // ========================================
    camera: {
        // Posición inicial de la cámara [X, Y, Z] - Primera Persona
        startPosition: [0, 2.5, 15],  // Y = altura de los ojos (2.5m - muy alto)
        
        // Velocidad de movimiento WASD (más alto = más rápido)
        moveSpeed: 40.0,
        
        // No usados en Primera Persona (dejados por compatibilidad)
        rotationSpeed: 0.05,
        minDistance: 5,
        maxDistance: 30
    },
    
    // ========================================
    // 🏪 TEXTOS
    // ========================================
    texts: {
        // Letrero del supermercado
        storeName: '🛒 BLISCO',
        
        // Título del carrito
        cartTitle: '🛒 Mi Carrito',
        
        // Instrucciones
        instructions: {
            title: '🎮 Controles',
            controls: [
                '🖱️ Click en productos para agregarlos',
                '🔄 Arrastra para rotar cámara',
                '🛒 Ve a la CAJA para finalizar'
            ]
        }
    },
    
    // ========================================
    // 🎮 FUNCIONALIDADES
    // ========================================
    features: {
        productShelfOffset: -1.3,

        // Mostrar contador de FPS
        showFPS: true,
        
        // Activar sonidos
        enableSounds: true,
        
        // Activar animaciones de productos (flotante)
        enableProductAnimations: true,
        
        // Activar efecto hover en productos
        enableHoverEffect: true,

        // Mostrar hitboxes de productos (zona de selección) para depuración
        showHitboxes: false
    },
    
    // ========================================
    // 🏗️ GÓNDOLAS
    // ========================================
    shelves: [
        // Pegadas a paredes + dos equidistantes en el medio (depth 2.5 → ±1.25 desde centro)
        { position: [-20.75, 0, -5] },  // Izquierda pegada a pared (X=-22)
        { position: [-6.92, 0, -5] },   // Medio izquierda (equidistante)
        { position: [6.92, 0, -5] },    // Medio derecha (equidistante)
        { position: [20.75, 0, -5] },  // Derecha pegada a pared (X=22)
    ],
    
    // ========================================
    // 💳 CAJA REGISTRADORA
    // ========================================
    checkout: {
        // Posición de la caja [X, Y, Z]
        position: [10, 0, 14],
        
        // Distancia para activar mensaje de proximidad
        proximityDistance: 8
    }
};

// NO MODIFICAR ESTO:
export default CONFIG;
