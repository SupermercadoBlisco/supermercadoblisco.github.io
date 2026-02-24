# 🎯 GUÍA DE REFERENCIA - CRUCETA Y DETECCIÓN

## 📍 UBICACIÓN DE LA CRUCETA

### **Archivo: `js/products.js`**

---

## 🔧 CONFIGURACIÓN DEL RAYCASTER

**Función:** `initProducts()`  
**Líneas:** Aproximadamente 30-50

```javascript
raycaster = new THREE.Raycaster();
raycaster.near = 0.1;      // Distancia mínima (más bajo = detecta más cerca)
raycaster.far = 8;          // Distancia máxima (más alto = detecta más lejos)
raycaster.params.Mesh = { threshold: 0.1 }; // Precisión (más bajo = más preciso)
```

### **Parámetros ajustables:**

- `near`: **0.1** - Qué tan cerca debe estar para detectar
- `far`: **8** - Qué tan lejos puede detectar (en metros)
- `threshold`: **0.1** - Tolerancia de detección

---

## 🎯 DETECCIÓN HOVER (Agrandar producto al apuntar)

**Función:** `updateProductHover()`  
**Líneas:** Aproximadamente 170-200

```javascript
export function updateProductHover() {
    // Raycast desde el centro de la pantalla
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const intersects = raycaster.intersectObjects(products, true);
    
    // Resetear producto anterior
    if (hoveredProduct) {
        hoveredProduct.scale.set(1, 1, 1);
        hoveredProduct = null;
    }
    
    // Agrandar producto apuntado
    if (intersects.length > 0) {
        // Ordenar por distancia
        intersects.sort((a, b) => a.distance - b.distance);
        
        // Buscar primer producto válido
        for (let i = 0; i < intersects.length; i++) {
            let clickedObject = intersects[i].object;
            
            while (clickedObject.parent && !clickedObject.userData.isProduct) {
                clickedObject = clickedObject.parent;
            }
            
            if (clickedObject.userData && clickedObject.userData.isProduct) {
                hoveredProduct = clickedObject;
                clickedObject.scale.set(1.15, 1.15, 1.15); // ← TAMAÑO DEL HOVER
                break;
            }
        }
    }
}
```

### **Parámetros ajustables:**

- `scale.set(1.15, 1.15, 1.15)` → Cambiar **1.15** para agrandar más o menos
  - `1.15` = 15% más grande
  - `1.3` = 30% más grande
  - `1.5` = 50% más grande

---

## 🖱️ DETECCIÓN CLICK (Abrir modal al hacer click)

**Función:** `checkProductInCrosshair()`  
**Líneas:** Aproximadamente 140-170

```javascript
export function checkProductInCrosshair() {
    // Raycast desde el centro de la pantalla
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const intersects = raycaster.intersectObjects(products, true);
    
    if (intersects.length > 0) {
        // Ordenar por distancia (el más cercano primero)
        intersects.sort((a, b) => a.distance - b.distance);
        
        // Buscar el primer producto válido
        for (let i = 0; i < intersects.length; i++) {
            let clickedObject = intersects[i].object;
            
            while (clickedObject.parent && !clickedObject.userData.isProduct) {
                clickedObject = clickedObject.parent;
            }
            
            if (clickedObject.userData && clickedObject.userData.isProduct) {
                showProductModal(clickedObject.userData);
                playSound();
                break;
            }
        }
    }
}
```

---

## 📦 HITBOX DE PRODUCTOS

**Función:** `createProduct()`  
**Líneas:** Aproximadamente 90-130

```javascript
// HITBOX INVISIBLE (más grande que el producto visual)
const hitboxGeometry = new THREE.BoxGeometry(1.2, 1.4, 1.2);
const hitboxMaterial = new THREE.MeshBasicMaterial({ 
    visible: false // Invisible pero detectable
});
const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
group.add(hitbox);
```

### **Parámetros ajustables:**

- `BoxGeometry(1.2, 1.4, 1.2)` → Tamaño del hitbox invisible
  - Primer número: **Ancho** (X)
  - Segundo número: **Alto** (Y)
  - Tercer número: **Profundidad** (Z)

**Aumentar estos números = más fácil hacer click**

---

## 🐛 SI LA CRUCETA NO FUNCIONA BIEN

### **Problema 1: Detecta el producto equivocado**

**Solución:**
1. Aumentar el hitbox invisible (línea ~95)
2. Reducir `raycaster.far` para detectar menos lejos
3. Verificar que los productos estén en la posición correcta

### **Problema 2: No detecta ningún producto**

**Solución:**
1. Aumentar `raycaster.far` (detectar más lejos)
2. Aumentar `raycaster.params.Mesh.threshold` (menos preciso pero detecta más)
3. Aumentar el hitbox invisible

### **Problema 3: Detecta productos detrás de otros**

**Solución:**
1. El código ya ordena por distancia (`intersects.sort`)
2. Verificar que el ordenamiento esté funcionando
3. Reducir el hitbox para que no se solapen

---

## 🎨 VISUALIZAR EL HITBOX (PARA DEBUG)

Si querés VER el hitbox invisible para debuggear:

```javascript
const hitboxMaterial = new THREE.MeshBasicMaterial({ 
    visible: true,      // ← Cambiar a true
    wireframe: true,    // ← Agregar esta línea
    color: 0x00ff00     // ← Agregar esta línea (verde)
});
```

Esto te mostrará el hitbox en verde para que veas exactamente qué área es clickeable.

---

## 🔍 CÓMO FUNCIONA EL SISTEMA

1. **Raycaster** dispara un rayo desde el centro de la pantalla (cruceta)
2. El rayo viaja en línea recta hacia donde mirás
3. **Intersecta** con todos los objetos que toca
4. **Ordena** las intersecciones por distancia (más cercano primero)
5. **Busca** el primer objeto que sea un producto válido
6. **Agranda** ese producto (hover) o **abre modal** (click)

---

## 🎯 VALORES RECOMENDADOS

### **Para detección precisa:**
```javascript
raycaster.far = 6;
raycaster.params.Mesh = { threshold: 0.05 };
hitboxGeometry(1.0, 1.2, 1.0);
```

### **Para detección fácil:**
```javascript
raycaster.far = 10;
raycaster.params.Mesh = { threshold: 0.2 };
hitboxGeometry(1.5, 1.8, 1.5);
```

### **Balance actual (recomendado):**
```javascript
raycaster.far = 8;
raycaster.params.Mesh = { threshold: 0.1 };
hitboxGeometry(1.2, 1.4, 1.2);
```

---

## 🖱️ SENSIBILIDAD DEL MOUSE

**Archivo:** `js/scene.js`  
**Línea:** Aproximadamente 32

```javascript
const mouseSensitivity = 0.4; // ← CAMBIAR ESTE VALOR
```

- `0.2` = Muy lento
- `0.4` = Lento (actual)
- `0.6` = Normal
- `1.0` = Rápido
- `2.0` = Muy rápido

---

## 📝 NOTAS IMPORTANTES

1. **La cruceta siempre apunta al centro de la pantalla** - No se puede mover
2. **El raycaster se ejecuta CADA FRAME** - Muy eficiente
3. **Los productos tienen 2 meshes:** Hitbox invisible + Producto visual
4. **El ordenamiento por distancia es crítico** - Sin esto, puede detectar el producto equivocado
5. **La altura del jugador afecta** - Si estás muy alto/bajo, el ángulo cambia

---

¡Con esta guía podés ajustar la cruceta a tu gusto! 🎯
