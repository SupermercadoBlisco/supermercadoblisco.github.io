# 📱 EJEMPLO DE MENSAJE DE WHATSAPP

Cuando el usuario hace click en "Ir a Caja", se genera automáticamente un mensaje como este:

---

```
🛒 *PEDIDO DEL SUPERMERCADO VIRTUAL 3D*

📦 *Productos:*
1. 🥛 Leche
   Cantidad: 2 × $1200 = $2400

2. 🍎 Manzanas
   Cantidad: 3 × $600 = $1800

3. 🍫 Chocolate
   Cantidad: 1 × $1100 = $1100

4. 🥤 Gaseosas
   Cantidad: 2 × $1000 = $2000

━━━━━━━━━━━━━━━━━
💰 *TOTAL: $7300*
━━━━━━━━━━━━━━━━━

📊 Total de items: 8
📅 Fecha: 11/02/2026
🕐 Hora: 14:35

¡Gracias por tu compra! 😊
```

---

## 🔧 **CÓMO SE GENERA**

El mensaje se construye automáticamente en `js/checkout.js` con:

1. **Título** del pedido
2. **Lista de productos** con cantidades y subtotales
3. **Total general**
4. **Información** de fecha y hora
5. **Mensaje** de agradecimiento

## 📱 **CÓMO FUNCIONA**

1. Usuario hace click en "Ir a Caja"
2. Se ejecuta `openWhatsAppCheckout()`
3. Se construye el mensaje en `buildWhatsAppMessage()`
4. Se abre WhatsApp con el mensaje precargado:
   ```
   https://wa.me/5491112345678?text=MENSAJE_CODIFICADO
   ```
5. Usuario solo debe hacer click en "Enviar"

## ✏️ **PERSONALIZAR EL MENSAJE**

Editá la función `buildWhatsAppMessage()` en `js/checkout.js`:

```javascript
function buildWhatsAppMessage(cart) {
    let message = '🛒 *PEDIDO DEL SUPERMERCADO VIRTUAL 3D*\n\n';
    
    // Personalizar el título
    message += '📦 *Productos:*\n';
    
    // ... resto del código
    
    // Personalizar el pie
    message += '¡Gracias por tu compra! 😊';
    
    return message;
}
```

## 🌎 **FORMATO INTERNACIONAL**

El formato del número debe ser:

```
Código País + Código Área + Número
(sin +, sin espacios, sin guiones)
```

**Ejemplos:**
- 🇦🇷 Argentina: `5491112345678`
- 🇲🇽 México: `5215512345678`
- 🇨🇴 Colombia: `573001234567`
- 🇪🇸 España: `34612345678`
- 🇧🇷 Brasil: `5511987654321`
- 🇨🇱 Chile: `56912345678`
- 🇵🇪 Perú: `51987654321`
- 🇺🇾 Uruguay: `59891234567`

## 📲 **TESTING**

Para probar el mensaje de WhatsApp:

1. Configurá tu propio número en `js/config.js`
2. Agregá productos al carrito
3. Click en "Ir a Caja"
4. WhatsApp se abrirá con el mensaje
5. Podés enviártelo a vos mismo para probar

## 💡 **TIPS**

- El mensaje usa **Markdown de WhatsApp** para negritas (`*texto*`)
- Los emojis hacen el mensaje más visual y atractivo
- El separador `━━━` ayuda a destacar el total
- La fecha y hora se generan automáticamente
- Podés agregar campos personalizados (dirección, notas, etc.)

## 🎨 **VARIANTES DEL MENSAJE**

### **Versión simple:**
```javascript
let message = `Hola! Quiero hacer este pedido:\n\n`;
cart.forEach(item => {
    message += `- ${item.name} x${item.quantity}\n`;
});
message += `\nTotal: $${getCartTotal()}`;
```

### **Versión detallada con instrucciones:**
```javascript
let message = `🛒 PEDIDO ONLINE\n\n`;
message += `Productos:\n`;
// ... lista de productos
message += `\n📍 Dirección de envío: [completar]\n`;
message += `💳 Forma de pago: [completar]\n`;
message += `📝 Notas adicionales: [completar]\n`;
```

### **Versión con descuento:**
```javascript
const subtotal = getCartTotal();
const discount = subtotal * 0.10; // 10% descuento
const total = subtotal - discount;

message += `Subtotal: $${subtotal}\n`;
message += `Descuento (10%): -$${discount}\n`;
message += `━━━━━━━━━━━━━━\n`;
message += `TOTAL: $${total}\n`;
```

## 🔗 **ENLACES ADICIONALES**

- [WhatsApp Business API](https://business.whatsapp.com/)
- [Click to Chat Documentation](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)
- [WhatsApp URL Scheme](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)

---

**¡El mensaje está listo para personalizar según tus necesidades! 📱✨**
