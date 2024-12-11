# Componentes Modal

## BModal.vue

### Descripción General
`BModal` es un componente modal base construido con Vue 3 y Bootstrap, que proporciona una interfaz modal flexible y personalizable.

### Propiedades

| Nombre de Propiedad | Tipo | Valor por Defecto | Descripción |
|---------------------|------|-------------------|-------------|
| `v-model` | `boolean` | `false` | Controla la visibilidad del modal |
| `required` | `boolean` | `false` | Si es `true`, impide cerrar el modal al hacer clic en el fondo o en el botón de cierre |
| `cancelText` | `string` | `'Cancelar'` | Texto para el botón de cancelar |
| `confirmText` | `string` | `'Aceptar'` | Texto para el botón de confirmar |

### Eventos

| Nombre del Evento | Payload | Descripción |
|-------------------|---------|-------------|
| `close` | `trigger: string` | Se emite cuando se cierra el modal (fondo, botón de cierre o cancelar) |
| `confirm` | - | Se emite cuando se hace clic en el botón de confirmar |

### Slots

| Nombre del Slot | Props del Slot | Descripción |
|-----------------|----------------|-------------|
| `header` | - | Contenido para la cabecera del modal |
| `body` | - | Contenido para el cuerpo del modal |
| `buttons` | `{ close: Function, confirm: Function }` | Botones de pie de página personalizados (con botones de cancelar/confirmar por defecto) |

### Ejemplo de Uso

```vue
<template>
  <BModal 
    v-model="isModalVisible" 
    :required="false"
    cancelText="No"
    confirmText="Sí"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <template #header>
      Confirmar Acción
    </template>

    <template #body>
      ¿Está seguro de que desea continuar?
    </template>

    <!-- Opcional: Botones personalizados -->
    <template #buttons="{ close, confirm }">
      <button @click="close">Cancelar Personalizado</button>
      <button @click="confirm">Confirmar Personalizado</button>
    </template>
  </BModal>
</template>

<script setup>
import { ref } from 'vue'
import BModal from './BModal.vue'

const isModalVisible = ref(false)

const handleClose = (trigger) => {
  console.log(`Modal cerrado por: ${trigger}`)
}

const handleConfirm = () => {
  console.log('Acción confirmada')
}
</script>
```

## DialogModal.vue

### Descripción General
`DialogModal` extiende `BModal` con funcionalidades adicionales para validación de formularios, internacionalización y control avanzado de modal.

### Propiedades

| Nombre de Propiedad | Tipo | Valor por Defecto | Descripción |
|---------------------|------|-------------------|-------------|
| `mensajes` | `MensajeModales` | `undefined` | Mensajes personalizados para internacionalización |
| `cerradoautomatico` | `boolean` | `false` | Cerrar automáticamente el modal al confirmar |
| `requerido` | `boolean` | `false` | Impedir que se cierre el modal |
| `deshabilitarconfirmar` | `boolean` | `true` | Deshabilitar botón de confirmación |
| `cancelText` | `string` | `undefined` | Sobrescribir texto del botón de cancelar |
| `confirmText` | `string` | `undefined` | Sobrescribir texto del botón de confirmar |

### Eventos

| Nombre del Evento | Payload | Descripción |
|-------------------|---------|-------------|
| `close` | `trigger: string` | Se emite cuando se cierra el modal |
| `confirm` | - | Se emite cuando se confirma el modal |

### Métodos

| Nombre del Método | Parámetros | Descripción |
|-------------------|------------|-------------|
| `show()` | `idformulario?: string, funcionConfirmar?: Function` | Mostrar el modal de forma programática |
| `hide()` | - | Ocultar el modal de forma programática |
| `deshabilitarConfirmar()` | `estado: boolean` | Habilitar/deshabilitar botón de confirmación |
| `confirm()` | - | Activar confirmación de forma programática |
| `cancel()` | - | Activar cancelación de forma programática |

### Ejemplo de Uso

```vue
<template>
  <DialogModal 
    ref="dialogRef"
    v-model="isDialogVisible"
    @confirm="saveData"
    @close="handleClose"
  >
    <template #header>
      Editar Usuario
    </template>

    <template #body>
      <form>
        <input 
          v-model="userData.name" 
          placeholder="Nombre" 
          class="form-control"
        >
        <input 
          v-model="userData.email" 
          placeholder="Correo electrónico" 
          class="form-control"
        >
      </form>
    </template>
  </DialogModal>

  <button @click="openDialog">Abrir Diálogo</button>
</template>

<script setup>
import { ref } from 'vue'
import DialogModal from './DialogModal.vue'

const dialogRef = ref(null)
const isDialogVisible = ref(false)
const userData = ref({ name: '', email: '' })

const openDialog = () => {
  // Mostrar diálogo de forma programática con función de validación opcional
  dialogRef.value.show(null, async () => {
    // Lógica de validación opcional
    return userData.value.name && userData.value.email
  })
}

const saveData = () => {
  console.log('Guardando:', userData.value)
}

const handleClose = (trigger) => {
  console.log(`Diálogo cerrado por: ${trigger}`)
}
</script>
```

## Instalación

1. Asegúrese de tener Vue 3 y Bootstrap instalados
2. Importe los componentes como se muestra en los ejemplos
3. Utilícelos en su aplicación Vue 3

## Dependencias
- Vue 3
- Vue I18n (para internacionalización)
- Bootstrap