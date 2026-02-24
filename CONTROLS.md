# 🎮 GUÍA DE CONTROLES PRIMERA PERSONA

## 🕹️ **CÓMO JUGAR**

Este juego usa controles **estilo FPS (First Person Shooter)** como Counter-Strike, Call of Duty o Minecraft.

---

## 🚀 **INICIAR EL JUEGO**

1. **Abrí el juego** en tu navegador
2. Verás una **pantalla de inicio** con instrucciones
3. **Hacé click EN CUALQUIER PARTE** de la pantalla
4. El mouse quedará "atrapado" y podrás empezar a jugar

---

## ⌨️ **CONTROLES BÁSICOS**

### **Movimiento:**
```
W o ↑  →  Adelante
S o ↓  →  Atrás
A o ←  →  Izquierda
D o →  →  Derecha
```

### **Vista:**
```
🖱️ Mover el mouse  →  Mirar alrededor (360°)
```

### **Interacción:**
```
Click Izquierdo  →  Agregar producto al carrito
```

### **Salir:**
```
ESC  →  Salir del modo juego (liberar mouse)
```

---

## 📋 **FLUJO COMPLETO**

1. **Click en la pantalla** → Activar controles
2. **WASD** → Caminar por el supermercado
3. **Mouse** → Mirar los productos
4. **Click** → Agregar al carrito
5. **Caminar a la CAJA** (al frente, caja verde)
6. **ESC** → Liberar mouse
7. **Click "Ir a Caja"** → Abrir WhatsApp

---

## 💡 **TIPS Y TRUCOS**

### **Si perdés el control del mouse:**
- Presioná **ESC** para liberar el cursor
- Click nuevamente para volver a jugar

### **Si te perdés:**
- Los estantes están dispuestos en 3 filas:
  - **Izquierda** (-): Lácteos y Pan
  - **Centro** (medio): Frutas y Verduras
  - **Derecha** (+): Bebidas y Snacks
- La **CAJA** está al frente (posición Z positiva)

### **Para ver mejor los productos:**
- Acercate caminando con **W**
- Mirá hacia arriba o abajo moviendo el mouse
- Los productos tienen 4 niveles de altura

### **Si no podés clickear productos:**
- Asegurate de estar **cerca** del producto
- El producto se **agranda** cuando lo mirás (hover)
- Si no se agranda, movete más cerca

---

## 🎯 **UBICACIÓN DE ELEMENTOS**

```
        [PARED TRASERA - LETRERO]
              
   [Lácteos]  [Frutas]  [Bebidas]
   [  Pan  ]  [Verduras] [Snacks ]
      ←          ↑          →
   
         TU POSICIÓN INICIAL
              (aquí)
              
              ↓ ↓ ↓
           [CAJA 💳]
```

---

## ⚙️ **CONFIGURACIÓN AVANZADA**

### **Cambiar velocidad de movimiento:**

Editá `js/config.js` línea 70:

```javascript
camera: {
    moveSpeed: 25.0,  // ⬇️ Más bajo = más lento
                      // ⬆️ Más alto = más rápido
}
```

**Valores recomendados:**
- `15.0` - Lento (paseo relajado)
- `25.0` - Normal (default)
- `40.0` - Rápido (correr)

### **Cambiar altura de la cámara:**

Editá `js/main.js` línea 120:

```javascript
const playerHeight = 1.6; // Altura en metros
```

- `1.4` - Más bajo (niño)
- `1.6` - Normal (adulto promedio)
- `1.8` - Más alto (persona alta)

---

## 🐛 **PROBLEMAS COMUNES**

### **"El mouse no se mueve"**
✅ Hacé click en la pantalla para activar controles
✅ Verificá que no estés en modo ESC

### **"Me muevo muy rápido/lento"**
✅ Ajustá `moveSpeed` en `config.js`

### **"No puedo hacer click en productos"**
✅ Primero presioná **ESC** para liberar el mouse
✅ Luego click en el producto desde el panel del carrito
✅ O acercate más al producto y click

### **"Me caigo del mapa"**
✅ Hay límites invisibles, no podés salir del supermercado
✅ Los límites son de -28 a +28 en X y Z

### **"La pantalla está borrosa"**
✅ Presioná F11 para pantalla completa
✅ Verificá que tu navegador esté actualizado

---

## 🎮 **COMPARACIÓN CON OTROS JUEGOS**

Si jugaste a estos juegos, los controles son **idénticos**:

| Juego | Controles |
|-------|-----------|
| Minecraft | WASD + Mouse |
| Counter-Strike | WASD + Mouse |
| Call of Duty | WASD + Mouse |
| Roblox | WASD + Mouse |
| Fortnite | WASD + Mouse |

---

## 📱 **CONTROLES EN MÓVIL**

⚠️ **Los controles primera persona NO funcionan bien en móvil/tablet**

Para móvil, recomendamos:
- Usar la versión con **OrbitControls** (controles táctiles)
- O esperar una futura versión con joystick virtual

---

## 🔧 **VOLVER A CONTROLES ORBIT (TÁCTILES)**

Si preferís los controles antiguos (arrastrar para rotar):

1. Abrí `js/scene.js`
2. Cambiá línea 2:
   ```javascript
   // DE:
   import { PointerLockControls } from '...';
   
   // A:
   import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
   ```

3. Cambiá la creación de controles (línea 20+)

---

## 🎯 **OBJETIVO DEL JUEGO**

1. **Explorar** el supermercado en primera persona
2. **Recolectar** productos haciendo click
3. **Ir a la caja** (objeto verde brillante al frente)
4. **Finalizar** la compra por WhatsApp

**Tiempo promedio:** 2-5 minutos

---

## 🏆 **DESAFÍOS OPCIONALES**

- ✅ Encontrar todos los 19 productos
- ✅ Completar la compra en menos de 3 minutos
- ✅ Armar un carrito de $10,000 exactos
- ✅ Comprar solo productos del mismo color

---

## 📚 **MÁS INFORMACIÓN**

- **Documentación completa:** `README.md`
- **Personalización:** `CUSTOMIZATION.md`
- **Deployment:** `DEPLOY.md`
- **Configuración:** `js/config.js`

---

**¡Disfrutá el juego! 🛒🎮**
