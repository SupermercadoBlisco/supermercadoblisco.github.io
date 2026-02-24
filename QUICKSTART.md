# 🚀 INICIO RÁPIDO - 5 MINUTOS

## ⚡ **Opción 1: Probar LOCAL (más rápido)**

### Con VS Code (RECOMENDADO):

1. **Descargar** todos los archivos del proyecto
2. **Abrir VS Code**
3. **Instalar** la extensión "Live Server"
4. **Abrir** la carpeta del proyecto
5. **Click derecho** en `index.html` → "Open with Live Server"
6. **¡Listo!** Se abre en `http://127.0.0.1:5500`

### Con Python:

```bash
# En la carpeta del proyecto
python -m http.server 8000

# Abrir: http://localhost:8000
```

---

## 🌐 **Opción 2: Subir a GITHUB PAGES (gratis, online)**

### Método sin Git (fácil):

1. Crear cuenta en [github.com](https://github.com)
2. Crear nuevo repositorio público: `supermercado-3d`
3. Arrastrá todos los archivos a GitHub
4. Settings → Pages → Branch: `main` → Save
5. Esperar 2-3 minutos
6. **¡Tu juego está online!** `https://TU_USUARIO.github.io/supermercado-3d`

**Ver guía completa:** `DEPLOY.md`

---

## ✏️ **PERSONALIZACIÓN RÁPIDA**

### 📱 Cambiar número de WhatsApp:

```javascript
// js/config.js - Línea 17
phoneNumber: '5491112345678'  // ⬅️ TU NÚMERO AQUÍ
```

### 📦 Agregar productos:

```javascript
// js/config.js - Sección products (aprox. línea 50)
{ 
    name: '🍕 Pizza', 
    color: 0xff6347, 
    price: 2500, 
    position: [5, 2, 0], 
    emoji: '🍕' 
},
```

### 🎨 Cambiar colores:

```javascript
// js/config.js - Sección colors (aprox. línea 26)
sky: 0x87ceeb,      // Color del cielo
walls: 0xffd700,    // Color de paredes
```

**Ver guía completa:** `CUSTOMIZATION.md`

---

## 📁 **ESTRUCTURA DE ARCHIVOS**

```
📂 supermercado-3d/
│
├── 📄 index.html           ← Página principal
├── 📄 styles.css           ← Estilos visuales
│
├── 📂 js/
│   ├── 📄 config.js        ← ⭐ CONFIGURACIÓN (editar acá)
│   ├── 📄 main.js          ← Inicialización
│   ├── 📄 scene.js         ← Escena 3D
│   ├── 📄 products.js      ← Productos
│   ├── 📄 cart.js          ← Carrito
│   └── 📄 checkout.js      ← WhatsApp
│
├── 📄 README.md            ← Documentación técnica
├── 📄 DEPLOY.md            ← Guía de deployment
└── 📄 CUSTOMIZATION.md     ← Guía de personalización
```

---

## 🎯 **CHECKLIST DE CONFIGURACIÓN**

Antes de hacer deploy, verificá:

- [ ] Cambié el número de WhatsApp en `js/config.js`
- [ ] Probé el juego localmente
- [ ] Agregué/modifiqué los productos que quiero
- [ ] Ajusté los colores a mi gusto (opcional)
- [ ] Cambié el nombre del supermercado (opcional)

---

## 🛠️ **SOLUCIÓN RÁPIDA DE PROBLEMAS**

### El juego no carga:
1. Verificar que estés usando un servidor (no abrir `index.html` directamente)
2. Abrir consola del navegador (F12) y ver errores
3. Verificar conexión a internet (Three.js se carga por CDN)

### WhatsApp no abre:
1. Verificar formato del número: `5491112345678` (sin +, sin espacios)
2. Verificar que el carrito tenga productos

### Los productos no aparecen:
1. Verificar que `js/config.js` tenga productos en el array
2. Revisar las coordenadas de posición

---

## 📚 **RECURSOS ADICIONALES**

- **Documentación completa:** `README.md`
- **Deployment paso a paso:** `DEPLOY.md`
- **Personalización sin código:** `CUSTOMIZATION.md`
- **Archivo de configuración:** `js/config.js` ⭐

---

## 🎮 **CONTROLES DEL JUEGO**

| Acción | Control |
|--------|---------|
| Activar controles | Click en pantalla |
| Moverse | W A S D |
| Mirar | Mover mouse |
| Agregar producto | Click en producto |
| Salir de controles | ESC |
| Ver carrito | Panel derecho |
| Finalizar compra | Botón "Ir a Caja" |

---

## 💡 **PRÓXIMOS PASOS SUGERIDOS**

1. **Personalizar** el número de WhatsApp
2. **Agregar** tus propios productos
3. **Cambiar** colores del tema
4. **Hacer deploy** a GitHub Pages
5. **Compartir** el link con amigos

---

## 📞 **¿NECESITÁS AYUDA?**

1. Revisar `README.md` (documentación completa)
2. Revisar `CUSTOMIZATION.md` (guía sin código)
3. Revisar `DEPLOY.md` (deployment paso a paso)
4. Google el error específico
5. Crear un issue en GitHub

---

**¡Empezá a personalizar tu supermercado! 🛒✨**

**Tiempo estimado total:** 5-10 minutos para tener todo funcionando
