# 🎨 GUÍA DE PERSONALIZACIÓN - SIN SABER PROGRAMAR

Esta guía te enseña a **personalizar el juego** sin necesidad de saber JavaScript profesionalmente.

---

## 📦 **CÓMO AGREGAR NUEVOS PRODUCTOS**

### **Paso a paso**:

1. **Abrir el archivo** `js/products.js`
2. **Buscar** esta sección (aprox. línea 12):

```javascript
const PRODUCTS_DATA = [
    { name: '🥛 Leche', color: 0xffffff, price: 1200, position: [-11, 2, -5], emoji: '🥛' },
    // ... más productos
];
```

3. **Copiar** una de las líneas completas
4. **Pegar** debajo de otra
5. **Modificar** los valores:

```javascript
{ 
    name: '🍕 Pizza',        // Nombre que aparece
    color: 0xff6347,         // Color en formato hexadecimal
    price: 2500,             // Precio del producto
    position: [5, 2, -5],    // Posición [X, Y, Z] en el mundo 3D
    emoji: '🍕'              // Emoji del producto
}
```

### **Ejemplo completo**:

```javascript
const PRODUCTS_DATA = [
    { name: '🥛 Leche', color: 0xffffff, price: 1200, position: [-11, 2, -5], emoji: '🥛' },
    { name: '🍞 Pan', color: 0xf4a460, price: 800, position: [-10, 2, -5], emoji: '🍞' },
    
    // ⬇️ NUEVO PRODUCTO ⬇️
    { name: '🍕 Pizza', color: 0xff6347, price: 2500, position: [5, 2, -5], emoji: '🍕' },
    
    { name: '🍎 Manzanas', color: 0xff0000, price: 600, position: [0, 2, -5], emoji: '🍎' },
];
```

### **Tips importantes**:

- **NO olvidar** la coma al final de cada línea
- **Color**: Ir a [color-hex.com](https://www.color-hex.com/) y copiar el código hex (agregar `0x` adelante)
- **Posición**:
  - **X**: Izquierda/Derecha (negativo = izquierda)
  - **Y**: Altura (recomendado: 2 a 3.5)
  - **Z**: Adelante/Atrás (recomendado: -5 a -10)
- **Emoji**: Copiar desde [emojipedia.com](https://emojipedia.org/)

---

## 💰 **CÓMO CAMBIAR PRECIOS**

1. **Abrir** `js/products.js`
2. **Buscar** el producto que querés modificar
3. **Cambiar** el número en `price`:

```javascript
// ANTES
{ name: '🥛 Leche', color: 0xffffff, price: 1200, ... }

// DESPUÉS
{ name: '🥛 Leche', color: 0xffffff, price: 1500, ... }
```

---

## 📱 **CÓMO CAMBIAR EL NÚMERO DE WHATSAPP**

### **Paso a paso**:

1. **Abrir** el archivo `js/checkout.js`
2. **Buscar** la línea 13:

```javascript
const WHATSAPP_NUMBER = '5491112345678';
```

3. **Cambiar** por TU número en este formato:
   - **Argentina**: `549` + código de área + número (ej: `5491112345678`)
   - **México**: `521` + número (ej: `5215512345678`)
   - **Colombia**: `57` + número (ej: `573001234567`)
   - **España**: `34` + número (ej: `34612345678`)

4. **Guardar** el archivo

### **Formato correcto**:

```
✅ CORRECTO:   5491112345678
❌ INCORRECTO: +54 911 1234 5678
❌ INCORRECTO: 54-911-1234-5678
```

**SIN** espacios, **SIN** guiones, **SIN** el símbolo +

---

## 🎨 **CÓMO CAMBIAR COLORES DEL TEMA**

### **Color del carrito y botones**:

1. **Abrir** `styles.css`
2. **Buscar** estas líneas:

```css
/* Color principal (turquesa) */
#cartHeader h2 {
    color: #4ecdc4;  /* ⬅️ CAMBIAR AQUÍ */
}

/* Fondo del botón principal */
.btn-primary {
    background: linear-gradient(135deg, #4ecdc4, #44a08d);  /* ⬅️ CAMBIAR AQUÍ */
}
```

3. **Reemplazar** con tus colores favoritos

### **Generador de colores**:

- [Coolors.co](https://coolors.co/) - Paletas automáticas
- [Adobe Color](https://color.adobe.com/) - Rueda de color
- [ColorHunt](https://colorhunt.co/) - Paletas populares

### **Color del cielo**:

1. **Abrir** `js/scene.js`
2. **Buscar** la línea 16:

```javascript
scene.background = new THREE.Color(0x87ceeb); // Azul cielo
```

3. **Cambiar** el color:
   - `0x000000` = Negro
   - `0xffffff` = Blanco
   - `0x87ceeb` = Azul cielo
   - `0xff69b4` = Rosa
   - `0x4b0082` = Violeta

---

## 🏪 **CÓMO MODIFICAR EL LETRERO DEL SUPERMERCADO**

1. **Abrir** `js/scene.js`
2. **Buscar** la función `createSign()` (aprox. línea 92)
3. **Buscar** esta línea:

```javascript
ctx.fillText('🛒 SUPERMERCADO 3D', canvas.width / 2, canvas.height / 2);
```

4. **Cambiar** el texto:

```javascript
ctx.fillText('🛒 MI TIENDA VIRTUAL', canvas.width / 2, canvas.height / 2);
```

---

## 🔧 **CÓMO MODIFICAR LOS CONTROLES (Instrucciones)**

1. **Abrir** `index.html`
2. **Buscar** el `<div id="instructions">` (aprox. línea 15)
3. **Modificar** el texto:

```html
<div id="instructions">
    <h3>🎮 Instrucciones</h3>
    <p>🖱️ Hacé click en los productos</p>
    <p>🔄 Arrastrá para mirar alrededor</p>
    <p>🛒 Andá a la CAJA cuando termines</p>
</div>
```

---

## 📏 **CÓMO MOVER LA CÁMARA (Vista Inicial)**

1. **Abrir** `js/scene.js`
2. **Buscar** esta línea (aprox. línea 23):

```javascript
camera.position.set(0, 5, 15);
```

3. **Modificar** los valores:
   - **Primer número (X)**: Izquierda/Derecha
   - **Segundo número (Y)**: Altura
   - **Tercer número (Z)**: Cerca/Lejos

**Ejemplos**:

```javascript
// Vista desde arriba
camera.position.set(0, 20, 0);

// Vista desde la izquierda
camera.position.set(-20, 5, 0);

// Vista más cercana
camera.position.set(0, 5, 10);
```

---

## 🛒 **CÓMO AGREGAR MÁS GÓNDOLAS**

1. **Abrir** `js/scene.js`
2. **Buscar** la función `createShelves()` (aprox. línea 120)
3. **Copiar** estas 3 líneas:

```javascript
const newShelf = createShelf(shelfMaterial);
newShelf.position.set(6, 0, 0);  // ⬅️ CAMBIAR POSICIÓN
scene.add(newShelf);
```

4. **Pegar** dentro de la función
5. **Modificar** la posición `[X, Y, Z]`

**Ejemplo**:

```javascript
function createShelves(scene) {
    const shelfMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8b4513,
        roughness: 0.7 
    });
    
    // Góndola izquierda
    const leftShelf = createShelf(shelfMaterial);
    leftShelf.position.set(-12, 0, -5);
    scene.add(leftShelf);
    
    // ⬇️ NUEVA GÓNDOLA ⬇️
    const newShelf = createShelf(shelfMaterial);
    newShelf.position.set(6, 0, 5);
    scene.add(newShelf);
}
```

---

## 🎵 **CÓMO ACTIVAR/DESACTIVAR SONIDOS**

1. **Abrir** `js/products.js`
2. **Buscar** la función `playSound()` (final del archivo)
3. **Para desactivar**, comentar toda la función:

```javascript
function playSound() {
    // try {
    //     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    //     ... todo el código
    // }
}
```

O simplemente **borrar** la llamada a `playSound()` en la función `handleProductClick()`.

---

## ⚙️ **CÓMO CAMBIAR LA VELOCIDAD DE ROTACIÓN DE LA CÁMARA**

1. **Abrir** `js/scene.js`
2. **Buscar** estas líneas (aprox. línea 27):

```javascript
controls.enableDamping = true;
controls.dampingFactor = 0.05;  // ⬅️ CAMBIAR ESTE NÚMERO
```

3. **Valores**:
   - `0.05` = Suave (por defecto)
   - `0.1` = Más rápido
   - `0.01` = Más lento
   - `1` = Instantáneo (sin suavizado)

---

## 🔢 **CÓMO OCULTAR EL CONTADOR DE FPS**

1. **Abrir** `styles.css`
2. **Buscar** `#fpsCounter` (aprox. línea 211)
3. **Agregar** `display: none;`:

```css
#fpsCounter {
    display: none;  /* ⬅️ AGREGAR ESTA LÍNEA */
    position: fixed;
    bottom: 20px;
    left: 20px;
    /* ... resto del código */
}
```

---

## 📝 **PLANTILLA DE PRODUCTO VACÍO**

Copiá y pegá esto para agregar productos rápidamente:

```javascript
{ 
    name: '😀 Nombre', 
    color: 0xffffff, 
    price: 1000, 
    position: [0, 2, -5], 
    emoji: '😀' 
},
```

**Cambiar**:
- `Nombre` → Nombre del producto
- `0xffffff` → Color (blanco por defecto)
- `1000` → Precio
- `[0, 2, -5]` → Posición
- `😀` → Emoji

---

## 💡 **CONSEJOS GENERALES**

### **Al editar código**:

1. ✅ **Siempre guardar** el archivo (Ctrl + S)
2. ✅ **Refrescar** el navegador (F5)
3. ✅ **Si hay error**, revisar la consola (F12)
4. ✅ **Hacer backup** antes de cambios grandes

### **Si algo se rompe**:

1. **Deshacer** cambios (Ctrl + Z)
2. **Revisar** que no hayas borrado comas o llaves `{}`
3. **Copiar** el error de la consola y buscarlo en Google
4. **Volver** a descargar el proyecto original

### **Mejores prácticas**:

- Hacer **un cambio a la vez**
- **Probar** después de cada cambio
- **Comentar** el código viejo en vez de borrarlo:

```javascript
// const OLD_NUMBER = '5491112345678';  // ⬅️ Código viejo comentado
const WHATSAPP_NUMBER = '5493512345678';  // ⬅️ Código nuevo
```

---

## 🚀 **GUÍA RÁPIDA DE PERSONALIZACIÓN COMPLETA**

### **Para crear tu propia tienda**:

1. **Cambiar** nombre del supermercado (letrero)
2. **Agregar** tus productos en `PRODUCTS_DATA`
3. **Modificar** colores del tema
4. **Configurar** tu número de WhatsApp
5. **Ajustar** vista de cámara inicial
6. **Personalizar** instrucciones
7. **Hacer deploy** a GitHub Pages

**Tiempo estimado**: 30-60 minutos

---

## 📞 **¿NECESITÁS AYUDA?**

Si algo no funciona:

1. **Revisar** esta guía nuevamente
2. **Ver** el archivo `README.md` (más técnico)
3. **Buscar** el error en Google
4. **Crear** un issue en GitHub con:
   - Qué intentaste hacer
   - Qué error te apareció
   - Captura de pantalla de la consola

---

**¡Personalizá tu juego y hacelo tuyo! 🎨🛒**
