# Componentes Vue Bootstrap

## Componentes Disponibles
- BButton: Componente de botón personalizable
- BModal: Componente modal básico
- ThemeSwitcher: Selector de tema (claro/oscuro)

## BButton.vue

### Descripción General
`BButton` es un componente de botón que implementa los estilos de Bootstrap 5, con soporte para iconos y diferentes variantes.

### Propiedades

| Nombre | Tipo | Valor por Defecto | Descripción |
|--------|------|-------------------|-------------|
| `label` | `string` | - | Texto del botón |
| `variant` | `string` | `'primary'` | Variante de estilo (`primary`, `secondary`, `success`, etc.) |
| `size` | `'sm' \| 'lg'` | - | Tamaño del botón |
| `icon` | `string` | - | Clase del icono de Bootstrap (ej: 'bi-heart') |
| `type` | `string` | `'button'` | Tipo de botón (`button`, `submit`, `reset`) |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `class` | `string` | - | Clases CSS adicionales |

### Eventos

| Nombre | Payload | Descripción |
|--------|---------|-------------|
| `click` | `MouseEvent` | Se emite al hacer clic en el botón |

### Ejemplo de Uso

```vue
<!-- Botón básico -->
<BButton>Click me</BButton>

<!-- Con variante y tamaño -->
<BButton variant="primary" size="lg">Large Button</BButton>

<!-- Con icono -->
<BButton icon="bi-heart">Like</BButton>

<!-- Deshabilitado -->
<BButton disabled>Disabled</BButton>

<!-- Con clase personalizada -->
<BButton class="custom-class">Custom</BButton>
```

## BModal.vue

### Descripción General
`BModal` es un componente modal que soporta temas claro/oscuro y diferentes estilos de botones.

### Propiedades

| Nombre | Tipo | Valor por Defecto | Descripción |
|--------|------|-------------------|-------------|
| `v-model` | `boolean` | `false` | Controla la visibilidad del modal |
| `required` | `boolean` | `false` | Impide cerrar el modal al hacer clic fuera |
| `cancelText` | `string` | `'Cancelar'` | Texto del botón cancelar |
| `confirmText` | `string` | `'Aceptar'` | Texto del botón confirmar |
| `modalId` | `string` | `auto` | ID único del modal |

### Eventos

| Nombre | Payload | Descripción |
|--------|---------|-------------|
| `close` | `string` | Se emite al cerrar el modal |
| `confirm` | - | Se emite al confirmar |

### Slots

| Nombre | Props | Descripción |
|--------|-------|-------------|
| `header` | - | Contenido del encabezado |
| `body` | - | Contenido principal |
| `buttons` | `{ close, confirm }` | Botones personalizados |

### Ejemplo de Uso

```vue
<!-- Modal básico -->
<BModal v-model="isVisible">
  <template #header>Título</template>
  <template #body>Contenido</template>
</BModal>

<!-- Con botones personalizados -->
<BModal v-model="isVisible">
  <template #buttons="{ close, confirm }">
    <BButton variant="light" class="border" @click="close">
      <i class="bi bi-x-lg me-2"></i>Cancelar
    </BButton>
    <BButton variant="dark" @click="confirm">
      <i class="bi bi-check-lg me-2"></i>Aceptar
    </BButton>
  </template>
</BModal>
```

## ThemeSwitcher.vue

### Descripción General
Componente para cambiar entre temas claro, oscuro y automático.

### Funcionalidades

- Cambia entre temas claro y oscuro
- Modo automático basado en preferencias del sistema
- Persiste la selección en localStorage
- Soporta iconos para cada tema

### Ejemplo de Uso

```vue
<template>
  <div class="theme-switcher-container">
    <ThemeSwitcher />
  </div>
</template>
```

## Instalación y Uso

1. Instalar dependencias:
```bash
pnpm install
```

2. Asegurarse de tener Bootstrap y Bootstrap Icons:
```html
<!-- En index.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
```

3. Importar y usar los componentes:
```vue
import { BButton, BModal, ThemeSwitcher } from './components'
```

## Dependencias
- Vue 3
- Bootstrap 5
- Bootstrap Icons
- Vue I18n (para internacionalización)

## Notas Adicionales
- Los componentes soportan temas claro y oscuro automáticamente
- Se incluye soporte para internacionalización
- Los botones pueden usar cualquier icono de Bootstrap Icons
