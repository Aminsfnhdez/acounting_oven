# 📦 Sistema de Facturación - Angular + Firebase

Sistema de facturación personalizado para clientes, desarrollado en Angular y Firebase (Cloud Firestore). Permite registrar ventas sin precios fijos, gestionar pagos parciales y llevar historial de cada cliente. Incluye autenticación con roles (Administrador y Empleado) y reportes.

---

## 🧰 Tecnologías Usadas

- 🔥 **Firebase**
  - Cloud Firestore
  - Firebase Auth
- 🧩 **Angular 17+**
- 💨 **TailwindCSS + Preline UI**
- 🔐 Guards personalizados (rol y sesión)

---

## 🎯 Funcionalidades

- 🔐 Login de usuarios con autenticación por rol
- 👤 Registro de clientes
- 🧾 Generación de facturas con productos y total sin precio fijo ni stock
- 💸 Registro de pagos parciales (efectivo / NEQUI)
- 📜 Historial de ventas por cliente
- 📝 Registro de modificaciones (bitácora/logs)
- 📊 Reportes generales

---

# Estructura de Carpetas del Proyecto

```
src/
│
├── app/
│   ├── core/                         # Contiene lógica central reutilizable en todo el proyecto
│   │   ├── auth/                     # Servicios de autenticación y guards para proteger rutas
│   │   │   ├── auth.service.ts       # Servicio de login/logout y control de sesión
│   │   │   ├── auth.guard.ts         # Protege rutas para usuarios autenticados
│   │   │   ├── role.guard.ts         # Protege rutas según el rol (admin o empleado)
│   │   │   └── auth.interceptor.ts   # Interceptor (opcional) para agregar tokens a las peticiones
│   │   ├── firebase/                 # Configuración y utilidades para Firebase
│   │   │   └── firebase.service.ts   # Abstracción para inicializar Firestore u otros servicios
│   │   ├── services/                 # Lógica de negocio (servicios para manipular datos)
│   │   │   ├── user.service.ts       # Gestión de usuarios
│   │   │   ├── client.service.ts     # Gestión de clientes
│   │   │   ├── invoice.service.ts    # Gestión de facturas
│   │   │   └── payment.service.ts    # Gestión de pagos
│   │   └── models/                   # Interfaces y tipos de datos usados en el proyecto
│   │       ├── user.model.ts
│   │       ├── client.model.ts
│   │       ├── invoice.model.ts
│   │       └── product.model.ts
│
│   ├── shared/                       # Componentes, pipes o directivas reutilizables
│   │   ├── components/               # Componentes que pueden ser usados en varios módulos
│   │   ├── pipes/                    # Pipes personalizados (formato moneda, fecha, etc.)
│   │   └── directives/               # Directivas personalizadas (resaltar, permisos, etc.)
│
│   ├── modules/                      # Módulos por funcionalidad principal
│   │   ├── auth/                     # Login de usuario
│   │   │   └── login/                # Componente de login
│   │   │       ├── login.component.ts
│   │   │       └── login.component.html
│   │   ├── dashboard/                # Vistas principales según el rol del usuario
│   │   │   ├── admin-dashboard/
│   │   │   └── employee-dashboard/
│   │   ├── clients/                  # Módulo para registrar y listar clientes
│   │   │   ├── client-list/          # Lista de clientes
│   │   │   └── client-form/          # Formulario de creación/edición
│   │   ├── invoices/                 # Gestión de facturación
│   │   │   ├── invoice-form/         # Crear nueva factura
│   │   │   ├── invoice-detail/       # Ver factura con detalle
│   │   │   └── invoice-history/      # Historial de facturas por cliente
│   │   ├── payments/                 # Registro de abonos y pagos parciales
│   │   └── reports/                  # Módulo para generar reportes
│
│   ├── app-routing.module.ts         # Configuración de rutas principales
│   └── app.component.ts              # Componente raíz del proyecto
│
├── assets/                           # Imágenes, logos, estilos globales
├── environments/                     # Archivos de configuración por entorno (dev/prod)
└── index.html                        # Página principal que carga el app
```


---

## 🔥  Firestore - Modelo de Datos

```
users (colección)
 └── userId (documento)
     ├── name: string                # Nombre del usuario
     ├── email: string               # Correo electrónico
     ├── role: 'admin' | 'employee'  # Rol del usuario
     └── createdAt: timestamp        # Fecha de creación

clients (colección)
 └── clientId (documento)
     ├── name: string                # Nombre del cliente
     ├── contactInfo: object         # Teléfono, dirección, etc.
     ├── totalDebt: number           # Total acumulado pendiente
     └── createdByUserId: string     # ID del usuario que lo registró

invoices (colección)
 └── invoiceId (documento)
     ├── clientId: string            # ID del cliente asociado
     ├── userId: string              # ID del usuario que creó la factura
     ├── date: timestamp             # Fecha de creación de la factura
     ├── total: number               # Monto total de la factura
     ├── products: Array             # Lista de productos incluidos
     │   └── { name, quantity, price }
     └── status: 'pendiente' | 'pagada'  # Estado de la factura

payments (colección)
 └── paymentId (documento)
     ├── clientId: string            # ID del cliente que realiza el pago
     ├── invoiceId: string|null      # ID de la factura (opcional si es pago global)
     ├── amount: number              # Valor del pago
     ├── method: 'efectivo' | 'nequi'# Método de pago
     ├── date: timestamp             # Fecha del pago
     └── registeredBy: string        # ID del usuario que registró el pago

logs (subcolección, opcional dentro de invoices o clients)
 └── logId
     ├── action: string              # Acción realizada (creación, edición, pago)
     ├── byUser: string              # Usuario que hizo la acción
     ├── timestamp: timestamp        # Fecha y hora del cambio
     └── details: object             # Datos del cambio
```
---

## 🛡️ Guards Implementados

- `AuthGuard`: Protege rutas para usuarios autenticados.
- `RoleGuard`: Permite acceso a rutas específicas según el rol (admin o empleado).

---

## 🎨 UI con Preline + TailwindCSS

Preline UI es utilizado para los componentes visuales (cards, modales, tablas, etc.) con soporte completo de TailwindCSS.

---

## 📌 Requisitos

- Node.js 18+
- Angular CLI
- Firebase CLI

---

## 🚀 Instrucciones para correr el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Aminsfnhdez/acounting_oven.git facturacion-app
   cd facturacion-app
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar Firebase:
   ```bash
   ng add @angular/fire
   ```

4. Configurar variables en `environment.ts` y `environment.prod.ts`:
   ```ts
   export const environment = {
     firebaseConfig: {
       apiKey: "XXX",
       authDomain: "XXX",
       projectId: "XXX",
       ...
     },
     production: false
   };
   ```

5. Ejecutar el proyecto:
   ```bash
   ng serve
   ```

---

## 📌 Pendientes

- [ ] Crear componente de login con Firebase Auth
- [ ] Implementar guards y servicios de roles
- [ ] Crear formulario para facturas con productos dinámicos
- [ ] Registro y visualización de pagos
- [ ] Generación de reportes por cliente
- [ ] Agregar bitácora de cambios (logs)

---

## 🧠 Autor

Desarrollado por Houdini - Ingeniero en desarrollo de software.

---


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


