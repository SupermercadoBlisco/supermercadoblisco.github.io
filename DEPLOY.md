# 📘 GUÍA PASO A PASO - DEPLOYMENT A GITHUB PAGES

Esta guía es para personas que **no tienen experiencia** con Git o GitHub. Seguí estos pasos exactamente como están escritos.

---

## 🎯 **OPCIÓN A: Subir manualmente sin Git (MÁS FÁCIL)**

### **Paso 1: Crear cuenta en GitHub**

1. Ir a [github.com](https://github.com)
2. Click en **Sign up** (arriba a la derecha)
3. Completar:
   - Email
   - Contraseña
   - Username (ej: `juanperez123`)
4. Verificar email

### **Paso 2: Crear repositorio**

1. Dentro de GitHub, click en **+** (arriba a la derecha) → **New repository**
2. Completar:
   - **Repository name**: `supermercado-3d`
   - **Public** ✅ (debe estar en público)
   - ❌ NO marcar "Add a README file"
3. Click en **Create repository**

### **Paso 3: Subir archivos**

1. En la página del repositorio nuevo, click en **uploading an existing file**
2. **Arrastrá TODOS los archivos** del proyecto a la ventana:
   - `index.html`
   - `styles.css`
   - `README.md`
   - `.gitignore`
   - Carpeta `js/` (con todos los archivos adentro)
3. Abajo donde dice "Commit changes", escribir: `Primer commit`
4. Click en **Commit changes**

### **Paso 4: Activar GitHub Pages**

1. En tu repositorio, click en **Settings** (arriba)
2. En el menú izquierdo, click en **Pages**
3. En "Branch", seleccionar:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click en **Save**
5. **¡ESPERAR 2-3 MINUTOS!**

### **Paso 5: Ver tu juego online**

1. Refrescar la página (F5)
2. Arriba aparecerá un cuadro verde que dice:
   ```
   Your site is live at https://TU_USUARIO.github.io/supermercado-3d/
   ```
3. **¡Click en ese link y listo!** 🎉

---

## 🎯 **OPCIÓN B: Usar Git desde la terminal (Avanzado)**

### **Requisitos previos**

- Git instalado ([descargar aquí](https://git-scm.com/downloads))
- Cuenta de GitHub creada

### **Paso 1: Configurar Git (solo la primera vez)**

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### **Paso 2: Inicializar repositorio local**

```bash
# Navegar a la carpeta del proyecto
cd supermercado-3d

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit"
```

### **Paso 3: Conectar con GitHub**

1. **Crear repositorio en GitHub** (igual que en Opción A, Paso 2)
2. **Copiar la URL** que aparece (ej: `https://github.com/TU_USUARIO/supermercado-3d.git`)
3. En la terminal:

```bash
# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/supermercado-3d.git

# Cambiar nombre de rama a main
git branch -M main

# Subir código
git push -u origin main
```

### **Paso 4: Activar GitHub Pages**

*(Igual que Opción A, Paso 4)*

---

## 🔧 **ACTUALIZAR EL JUEGO (después del primer deploy)**

### **Si subiste manualmente (Opción A)**:

1. Ir a tu repositorio en GitHub
2. Navegar a la carpeta/archivo que querés cambiar
3. Click en el lápiz ✏️ (Edit)
4. Hacer cambios
5. Abajo en "Commit changes", escribir qué cambiaste
6. Click en **Commit changes**
7. **Esperar 1-2 minutos** y refrescar tu página web

### **Si usaste Git (Opción B)**:

```bash
# Hacer cambios en tu código local

# Agregar cambios
git add .

# Commit
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push
```

---

## 🛠️ **CAMBIAR EL NÚMERO DE WHATSAPP**

### **Antes de hacer deploy**:

1. Abrir `js/checkout.js`
2. Buscar la línea 13:
   ```javascript
   const WHATSAPP_NUMBER = '5491112345678';
   ```
3. Cambiar por TU número (con código de país, sin +, sin espacios)
   - Argentina: `5491112345678`
   - México: `5215512345678`
   - Colombia: `573001234567`
4. Guardar y hacer deploy

### **Después de hacer deploy**:

1. En GitHub, navegar a `js/checkout.js`
2. Click en el lápiz ✏️
3. Cambiar el número
4. Commit changes
5. Esperar 1-2 minutos

---

## ✅ **CHECKLIST ANTES DE DEPLOY**

- [ ] Todos los archivos están en la carpeta correcta
- [ ] Cambié el número de WhatsApp en `checkout.js`
- [ ] Probé el juego localmente (con Live Server o http-server)
- [ ] El repositorio es **público** (no privado)
- [ ] El repositorio se llama `supermercado-3d` (o el nombre que quieras)

---

## 🐛 **PROBLEMAS COMUNES**

### **"404 - Page not found"**

✅ **Solución**: Esperar 2-3 minutos después de activar Pages
✅ **Verificar** que el repositorio sea público
✅ **Verificar** que la rama sea `main` y folder sea `/ (root)`

### **"The page loads but the game doesn't work"**

✅ **Abrir consola del navegador** (F12 → Console)
✅ **Ver errores** en rojo
✅ **Común**: Revisar que todos los archivos `.js` estén en la carpeta `js/`

### **"Cannot open WhatsApp"**

✅ **Verificar** que el número tenga el formato correcto
✅ **Probar** en móvil (WhatsApp debe estar instalado)

### **"My changes don't appear"**

✅ **Esperar 1-2 minutos** después de hacer commit
✅ **Forzar recarga**: Ctrl + Shift + R (Windows) o Cmd + Shift + R (Mac)
✅ **Vaciar caché** del navegador

---

## 📞 **¿NECESITÁS AYUDA?**

1. **Revisar la consola** del navegador (F12)
2. **Google** el error específico
3. **Crear un issue** en GitHub con:
   - Descripción del problema
   - Capturas de pantalla
   - Errores de consola

---

## 🎉 **¡FELICITACIONES!**

Si llegaste hasta acá, tu juego está **online y funcionando**. Compartí el link con amigos:

```
https://TU_USUARIO.github.io/supermercado-3d/
```

---

**Próximos pasos sugeridos**:

- Personalizar productos
- Cambiar colores
- Agregar más góndolas
- Compartir en redes sociales

**¡Mucha suerte! 🚀**
