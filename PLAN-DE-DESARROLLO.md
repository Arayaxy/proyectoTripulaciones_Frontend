# PLAN DE DESARROLLO SECUENCIAL (TDD ESTRICTO): FRONTEND ERP DE EVENTOS

Este documento establece el orden e instrucciones de ejecución para la construcción del Frontend del ERP de Eventos. El agente debe avanzar componente por componente y archivo por archivo, aplicando de forma obligatoria el flujo TDD (Test-Driven Development) antes de dar por completada cualquier tarea.

---

## PROTOCOLO TDD OBLIGATORIO PARA EL AGENTE

Para cada elemento del plan, el agente debe proceder aplicando el ciclo TDD definido en [AGENTS.md §4](./AGENTS.md#4-ciclo-de-desarrollo-tdd-estricto).

---

## FASE 0: INFRAESTRUCTURA BASE Y CONFIGURACIÓN

- [ ] **0.1. Configuración de Vitest y Testing Library**
  - Instalar vitest, @testing-library/react, @testing-library/jest-dom, jsdom (`pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom`).
  - Crear `vitest.config.js` con entorno jsdom y plugin React.
  - Crear `src/test/setup.js` con import de `@testing-library/jest-dom`.
  - Añadir script `"test": "vitest run"` en `package.json`.

- [ ] **0.2. Configuración de SASS/SCSS**
  - Instalar sass (`pnpm add -D sass`).
  - Crear `src/styles/_variables.scss` con colores, fuentes, espaciados y breakpoints.
  - Crear `src/styles/_mixins.scss` con mixins `flex-center`, `card`, `button-base`, `respond-to`.
  - Crear `src/main.scss` que importe los partials de styles.
  - Actualizar `src/main.jsx` para importar `main.scss`.
  - Renombrar `App.css` a `App.scss` y actualizar import en `App.jsx`.

- [ ] **0.3. Configuración de Firebase Client**
  - Instalar firebase (`pnpm add firebase`).
  - Crear `src/services/firebase.js` con inicialización de Firebase usando variables de entorno.
  - Crear `.env` con `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`.
  - Actualizar `.env.example` con las variables de Firebase.

- [ ] **0.4. Configuración de React Router**
  - Instalar react-router-dom (`pnpm add react-router-dom`).
  - Crear estructura base de rutas (sin implementar páginas aún).

- [ ] **0.5. Servicio API Centralizado**
  - **TDD:** Testear métodos get, post, put, del del servicio api.js simulando fetch exitoso y fallido.
  - **Código:** Crear `src/services/api.js` con métodos HTTP, inyección automática de token Firebase, y manejo de errores.

---

## FASE 1: AUTENTICACIÓN Y ENRUTAMIENTO (NÚCLEO)

- [ ] **1.1. AuthContext y AuthProvider**
  - **TDD:** Testear que AuthProvider expone login, logout y estado de autenticación. Testear que al montar detecta sesión existente via `onAuthStateChanged`.
  - **Código:** Crear `src/context/AuthContext.jsx` y `src/context/AuthProvider.jsx` integrando Firebase Auth.

- [ ] **1.2. Custom Hooks de Autenticación**
  - **TDD:** Testear useAuth (login, logout, estado) y useLocalStorage (lectura/escritura de token).
  - **Código:** Crear `src/hooks/useAuth.js` y `src/hooks/useLocalStorage.js`.

- [ ] **1.3. PrivateRoute y AppRoutes**
  - **TDD:** Testear que PrivateRoute redirige a /login si no hay usuario, que deniega acceso si el rol no está permitido, y que renderiza <Outlet/> si todo es correcto.
  - **Código:** Crear `src/routes/PrivateRoute.jsx` y `src/routes/AppRoutes.jsx`. Integrar en `src/App.jsx` con AuthProvider.

- [ ] **1.4. Página de Login**
  - **TDD:** Testear que el formulario valida campos vacíos, que login exitoso redirige según rol, y que login fallido muestra error.
  - **Código:** Crear `src/auth/pages/Login.jsx` y su archivo SCSS.

---

## FASE 2: PRESUPUESTOS (CORE DEL PRODUCTO)

- [ ] **2.1. Formulario de Presupuesto (componente reutilizable)**
  - **TDD:** Testear captura de campos (total estimado, moneda, estado), validación de importes positivos, y modo create vs edit con precarga.
  - **Código:** Crear `src/admin/components/BudgetForm.jsx` y su SCSS.

- [ ] **2.2. Listado de Presupuestos**
  - **TDD:** Testear listado con totales, filtros por estado y moneda, y acceso solo para administrador.
  - **Código:** Crear `src/admin/pages/BudgetList.jsx` y su SCSS.

- [ ] **2.3. Detalle de Presupuesto**
  - **TDD:** Testear detalle con partidas (ingresos/gastos), total calculado, y opciones de edición/eliminación.
  - **Código:** Crear `src/admin/pages/BudgetDetail.jsx` y su SCSS.

---

## FASE 3: GESTIÓN DE EVENTOS

- [ ] **3.1. Formulario de Evento (componente reutilizable)**
  - **TDD:** Testear captura de campos (título, fechas, ubicación, presupuesto asociado), validación de obligatorios, y modo create vs edit con precarga.
  - **Código:** Crear `src/admin/components/EventForm.jsx` y su SCSS.

- [ ] **3.2. Páginas de Eventos (admin)**
  - **TDD:** Testear listado con filtros, creación, edición y detalle de evento con datos del presupuesto asociado.
  - **Código:** Crear `src/admin/pages/EventList.jsx`, `EventCreate.jsx`, `EventEdit.jsx`, `EventDetail.jsx` y sus SCSS.

- [ ] **3.3. Dashboard**
  - **TDD:** Testear que muestra indicadores clave: total presupuestos, eventos activos, clientes registrados.
  - **Código:** Crear `src/admin/pages/Dashboard.jsx` y su SCSS.

- [ ] **3.4. Gestión de Usuarios**
  - **TDD:** Testear listado de usuarios, creación de nuevo cliente, y edición de rol.
  - **Código:** Crear `src/admin/pages/UsersList.jsx` y su SCSS.

- [ ] **3.5. Settings**
  - **TDD:** Testear visualización y actualización de configuración del sistema.
  - **Código:** Crear `src/admin/pages/Settings.jsx` y su SCSS.

---

## FASE 4: DOMINIO CLIENTE

- [ ] **4.1. Mis Eventos**
  - **TDD:** Testear que el cliente ve solo sus eventos asignados, con datos informativos (fechas, ubicación, estado, presupuesto asociado).
  - **Código:** Crear `src/clients/pages/MyEvents.jsx` y su SCSS.

- [ ] **4.2. Mis Presentaciones**
  - **TDD:** Testear que el cliente puede subir una presentación (PDF, PPT) y ver las ya subidas.
  - **Código:** Crear `src/clients/pages/MyPresentations.jsx` y su SCSS.

---

## FASE 5: HOOKS Y UTILIDADES

- [ ] **5.1. Custom Hook useFetch**
  - **TDD:** Testear estados de carga, éxito y error.
  - **Código:** Crear `src/hooks/useFetch.js`.

- [ ] **5.2. Custom Hook useForm**
  - **TDD:** Testear captura de valores, validación y reset del formulario.
  - **Código:** Crear `src/hooks/useForm.js`.

---

## REPORTE DE ENTREGA TDD OBLIGATORIO

Al finalizar cada subtarea, el agente debe incluir el reporte del ciclo TDD siguiendo el formato definido en [AGENTS.md §16](./AGENTS.md#16-formato-de-salida-e-interacción).
