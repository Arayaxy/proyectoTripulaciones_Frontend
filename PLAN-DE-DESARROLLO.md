# PLAN DE DESARROLLO SECUENCIAL (TDD ESTRICTO): FRONTEND ERP DE EVENTOS

Este documento establece el orden e instrucciones de ejecución para la construcción del Frontend del ERP de Eventos, basado en las historias de usuario definidas en [AGENTS.md §3](./AGENTS.md#3-historias-de-usuario). El agente debe avanzar componente por componente y archivo por archivo, aplicando de forma obligatoria el flujo TDD antes de dar por completada cualquier tarea.

---

## PROTOCOLO TDD OBLIGATORIO

Para cada elemento del plan, aplicar el ciclo TDD definido en [AGENTS.md §4](./AGENTS.md#4-ciclo-de-desarrollo-tdd-estricto).

---

## FASE 0: INFRAESTRUCTURA BASE Y CONFIGURACIÓN

- [ ] **0.1. Configuración de Vitest y Testing Library**
  - Instalar vitest, @testing-library/react, @testing-library/jest-dom, jsdom (`npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`).
  - Crear `vitest.config.js` con entorno jsdom y plugin React.
  - Crear `src/test/setup.js` con import de `@testing-library/jest-dom`.
  - Añadir script `"test": "vitest run"` en `package.json`.

- [ ] **0.2. Migración a SASS/SCSS**
  - Instalar sass (`npm install -D sass`).
  - Crear `src/styles/_variables.scss` con colores, fuentes, espaciados y breakpoints.
  - Crear `src/styles/_mixins.scss` con mixins `flex-center`, `card`, `button-base`, `respond-to`.
  - Migrar `index.css` y `App.css` a SASS progresivamente.

- [ ] **0.3. Servicio API Centralizado**
  - **TDD:** Testear métodos get, post, put, del simulando fetch exitoso y fallido.
  - **Código:** Crear `src/services/api.js` con métodos HTTP y manejo de errores.

- [ ] **0.4. Hooks genéricos**
  - **TDD:** Testear estados de carga, éxito y error.
  - **Código:** Crear `src/hooks/useFetch.js` y `src/hooks/useForm.js`.

---

## FASE 1: AUTENTICACIÓN (YA IMPLEMENTADA PARCIALMENTE)

- [ ] **1.1. Revisar AuthContext actual** — Google Sign-In con popup, verificación de sesión, logout.
- [ ] **1.2. Refactorizar RequireAdmin** — Convertir en `PrivateRoute.jsx` genérico con `allowedRoles` y `<Outlet />`.
- [ ] **1.3. AppRoutes** — Centralizar rutas en un archivo `src/routes/AppRoutes.jsx`.

---

## FASE 2: GESTIÓN DE EVENTOS (ADMIN)

- [ ] **2.1. EventList** — Listado de eventos con filtros (estado, fecha).
- [ ] **2.2. EventCreate** — Formulario de creación de eventos.
- [ ] **2.3. EventDetail** — Detalle de evento con datos completos.
- [ ] **2.4. EventEdit** — Edición de eventos.

---

## FASE 3: GESTIÓN DE SERVICIOS (ADMIN)

- [ ] **3.1. ServiceList** — Listado de servicios de contacto.
- [ ] **3.2. ServiceCreate** — Formulario de creación de servicio.
- [ ] **3.3. ServiceDetail** — Vista detalle de servicio.
- [ ] **3.4. ServiceEdit** — Edición de servicio.

---

## FASE 4: GESTIÓN DE PONENTES (ADMIN)

- [ ] **4.1. PonenteList** — Listado de ponentes.
- [ ] **4.2. PonenteCreate** — Formulario con itinerario completo (transporte, ponencia, hotel).
- [ ] **4.3. PonenteDetail** — Detalle con todo el itinerario.
- [ ] **4.4. PonenteEdit** — Edición de datos e itinerario.

---

## FASE 5: DOMINIO PONENTE (DASHBOARD + DETALLE EVENTO)

- [ ] **5.1. PonenteDashboard** — Página principal del ponente:
  - Listado de sus eventos asignados (card por evento con título, fecha, estado)
  - Cada card enlaza al detalle individual
  - **TDD:** Testear que carga lista de eventos del ponente, que muestra estado correcto, que enlace navega al detalle.

- [ ] **5.2. EventoDetalle** — Página de detalle de evento individual:
  - Información del evento: título, fechas, ubicación, estado, documentación
  - Sección de itinerario: transporte (tipo, horarios, localizaciones), ponencia (horario, localización), hotel (nombre, dirección, fechas)
  - Subida/modificación de presentación (PDF, PPT)
  - Botón para acceder al chat con organizadoras
  - **TDD:** Testear que carga datos del evento, que muestra itinerario, que permite subir presentación.

- [ ] **5.3. Notificaciones** — Visualización de notificaciones de cambios en itinerario/perfil.

- [ ] **5.4. Chat** — Chat con organizadoras.

---

## FASE 6: GESTIÓN DE CLIENTES Y USUARIOS (ADMIN)

- [ ] **6.1. ClientList** — Listado de clientes.
- [ ] **6.2. ClientCreate** — Creación de cliente.
- [ ] **6.3. UsersList** — Listado de usuarios con asignación de roles.

---

## FASE 7: UI/UX Y ESTILOS

- [ ] **7.1. Sistema de diseño** — Variables globales, tipografía, paleta de colores.
- [ ] **7.2. Componentes base** — Botones, inputs, cards, modales, tablas.
- [ ] **7.3. Responsive** — Adaptación mobile-first de todas las páginas.
- [ ] **7.4. Loaders y estados vacíos** — Spinners, skeletons, empty states, errores.

---

## REPORTE DE ENTREGA TDD OBLIGATORIO

Al finalizar cada subtarea, incluir el reporte del ciclo TDD siguiendo el formato definido en [AGENTS.md §14](./AGENTS.md#14-formato-de-salida-e-interacción).
