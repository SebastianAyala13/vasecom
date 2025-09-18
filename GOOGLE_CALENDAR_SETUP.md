# 📅 Configuración de Google Calendar API para VASECOM

## 🚀 Pasos para Configurar Google Calendar

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombra el proyecto: "VASECOM Calendar Integration"

### 2. Habilitar APIs Necesarias

1. En el panel izquierdo, ve a **"APIs y servicios" > "Biblioteca"**
2. Busca y habilita estas APIs:
   - **Google Calendar API**
   - **Google Identity API**

### 3. Crear Credenciales

#### API Key:
1. Ve a **"APIs y servicios" > "Credenciales"**
2. Haz clic en **"+ CREAR CREDENCIALES" > "Clave de API"**
3. Copia la API Key generada
4. **Restringe la API Key** (recomendado):
   - Restricciones de aplicación: **"Referentes HTTP"**
   - Agrega tu dominio: `https://tudominio.com/*`
   - Restricciones de API: Selecciona **"Google Calendar API"**

#### OAuth 2.0 Client ID:
1. Ve a **"APIs y servicios" > "Credenciales"**
2. Haz clic en **"+ CREAR CREDENCIALES" > "ID de cliente de OAuth 2.0"**
3. Tipo de aplicación: **"Aplicación web"**
4. Nombre: "VASECOM Web Client"
5. **Orígenes autorizados de JavaScript**:
   - `http://localhost:8000` (para desarrollo)
   - `https://tudominio.com` (para producción)
6. Copia el **Client ID** generado

### 4. Configurar la Pantalla de Consentimiento OAuth

1. Ve a **"APIs y servicios" > "Pantalla de consentimiento de OAuth"**
2. Selecciona **"Externo"** (para usuarios públicos)
3. Completa la información básica:
   - **Nombre de la aplicación**: "VASECOM"
   - **Correo electrónico de asistencia**: tu-email@gmail.com
   - **Logotipo de la aplicación**: Sube el logo de VASECOM
   - **Dominios autorizados**: tu-dominio.com

### 5. Actualizar Configuración en el Código

Edita el archivo `google-calendar-config.js`:

```javascript
const GOOGLE_CONFIG = {
    // Reemplaza con tu API Key
    API_KEY: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    
    // Reemplaza con tu Client ID
    CLIENT_ID: 'XXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com',
    
    // Mantén estos valores
    DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    SCOPES: 'https://www.googleapis.com/auth/calendar.events',
    CALENDAR_ID: 'primary' // o el ID de un calendario específico
};
```

### 6. Configurar Calendario Específico (Opcional)

Si quieres usar un calendario específico en lugar del principal:

1. Ve a [Google Calendar](https://calendar.google.com/)
2. Crea un nuevo calendario llamado "VASECOM Reuniones"
3. Ve a **Configuración del calendario > Integrar calendario**
4. Copia el **ID del calendario**
5. Reemplaza `'primary'` con el ID del calendario en `google-calendar-config.js`

### 7. Probar la Integración

1. Abre la página web en un servidor local:
   ```bash
   python -m http.server 8000
   ```
2. Ve a `http://localhost:8000`
3. Intenta programar una reunión
4. Deberías ver una ventana de autorización de Google
5. Acepta los permisos
6. El evento debería crearse en tu calendario

## 🔒 Consideraciones de Seguridad

### Para Desarrollo:
- Usa `http://localhost:8000` como origen autorizado
- Las credenciales pueden estar en el código

### Para Producción:
- **NUNCA** expongas las credenciales en el código del cliente
- Usa variables de entorno o un backend para manejar las credenciales
- Implementa autenticación del lado del servidor
- Usa HTTPS obligatoriamente

## 🚨 Solución de Problemas

### Error: "API key not valid"
- Verifica que la API Key esté correcta
- Asegúrate de que Google Calendar API esté habilitada
- Revisa las restricciones de la API Key

### Error: "Invalid client"
- Verifica que el Client ID esté correcto
- Asegúrate de que el dominio esté en los orígenes autorizados
- Revisa la configuración de la pantalla de consentimiento

### Error: "Access blocked"
- Completa la verificación de la aplicación en Google Cloud Console
- Agrega usuarios de prueba en la pantalla de consentimiento
- Publica la aplicación cuando esté lista

## 📋 Lista de Verificación

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google Calendar API habilitada
- [ ] API Key creada y configurada
- [ ] Client ID de OAuth creado
- [ ] Pantalla de consentimiento configurada
- [ ] Credenciales actualizadas en `google-calendar-config.js`
- [ ] Prueba exitosa de creación de eventos
- [ ] Configuración de producción implementada

## 🔄 Funcionalidades Implementadas

✅ **Creación automática de eventos en Google Calendar**
✅ **Verificación de disponibilidad de horarios**
✅ **Invitaciones automáticas por email**
✅ **Recordatorios configurados (1 día y 30 min antes)**
✅ **Integración con WhatsApp para notificaciones**
✅ **Manejo de errores y fallbacks**

## 📞 Soporte

Si necesitas ayuda con la configuración, contacta al equipo de desarrollo de VASECOM.
