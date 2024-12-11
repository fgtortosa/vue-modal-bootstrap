# Modal Components

## BModal.vue

### Overview
`BModal` is a base modal component built with Vue 3 and Bootstrap, providing a flexible and customizable modal interface.

### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `v-model` | `boolean` | `false` | Controls the visibility of the modal |
| `required` | `boolean` | `false` | If `true`, prevents closing the modal by backdrop click or close button |
| `cancelText` | `string` | `'Cancelar'` | Text for the cancel button |
| `confirmText` | `string` | `'Aceptar'` | Text for the confirm button |

### Events

| Event Name | Payload | Description |
|------------|---------|-------------|
| `close` | `trigger: string` | Emitted when the modal is closed (backdrop, close button, or cancel) |
| `confirm` | - | Emitted when the confirm button is clicked |

### Slots

| Slot Name | Slot Props | Description |
|-----------|------------|-------------|
| `header` | - | Content for the modal header |
| `body` | - | Content for the modal body |
| `buttons` | `{ close: Function, confirm: Function }` | Custom footer buttons (with default cancel/confirm buttons) |

### Example Usage

```vue
<template>
  <BModal 
    v-model="isModalVisible" 
    :required="false"
    cancelText="No"
    confirmText="Yes"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <template #header>
      Confirm Action
    </template>

    <template #body>
      Are you sure you want to proceed?
    </template>

    <!-- Optional: Custom buttons -->
    <template #buttons="{ close, confirm }">
      <button @click="close">Custom Cancel</button>
      <button @click="confirm">Custom Confirm</button>
    </template>
  </BModal>
</template>

<script setup>
import { ref } from 'vue'
import BModal from './BModal.vue'

const isModalVisible = ref(false)

const handleClose = (trigger) => {
  console.log(`Modal closed by: ${trigger}`)
}

const handleConfirm = () => {
  console.log('Action confirmed')
}
</script>
```

## DialogModal.vue

### Overview
`DialogModal` extends `BModal` with additional functionality for form validation, internationalization, and advanced modal control.

### Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `mensajes` | `MensajeModales` | `undefined` | Custom messages for internationalization |
| `cerradoautomatico` | `boolean` | `false` | Automatically close modal on confirm |
| `requerido` | `boolean` | `false` | Prevent modal from being closed |
| `deshabilitarconfirmar` | `boolean` | `true` | Disable confirm button |
| `cancelText` | `string` | `undefined` | Override cancel button text |
| `confirmText` | `string` | `undefined` | Override confirm button text |

### Events

| Event Name | Payload | Description |
|------------|---------|-------------|
| `close` | `trigger: string` | Emitted when the modal is closed |
| `confirm` | - | Emitted when the modal is confirmed |

### Methods

| Method Name | Parameters | Description |
|-------------|------------|-------------|
| `show()` | `idformulario?: string, funcionConfirmar?: Function` | Programmatically show the modal |
| `hide()` | - | Programmatically hide the modal |
| `deshabilitarConfirmar()` | `estado: boolean` | Enable/disable confirm button |
| `confirm()` | - | Trigger confirmation programmatically |
| `cancel()` | - | Trigger cancellation programmatically |

### Example Usage

```vue
<template>
  <DialogModal 
    ref="dialogRef"
    v-model="isDialogVisible"
    @confirm="saveData"
    @close="handleClose"
  >
    <template #header>
      Edit User
    </template>

    <template #body>
      <form>
        <input 
          v-model="userData.name" 
          placeholder="Name" 
          class="form-control"
        >
        <input 
          v-model="userData.email" 
          placeholder="Email" 
          class="form-control"
        >
      </form>
    </template>
  </DialogModal>

  <button @click="openDialog">Open Dialog</button>
</template>

<script setup>
import { ref } from 'vue'
import DialogModal from './DialogModal.vue'

const dialogRef = ref(null)
const isDialogVisible = ref(false)
const userData = ref({ name: '', email: '' })

const openDialog = () => {
  // Programmatically show dialog with optional validation function
  dialogRef.value.show(null, async () => {
    // Optional validation logic
    return userData.value.name && userData.value.email
  })
}

const saveData = () => {
  console.log('Saving:', userData.value)
}

const handleClose = (trigger) => {
  console.log(`Dialog closed by: ${trigger}`)
}
</script>
```

## Installation

1. Ensure you have Vue 3 and Bootstrap installed
2. Import the components as shown in the examples
3. Use within your Vue 3 application

## Dependencies
- Vue 3
- Vue I18n (for internationalization)
- Bootstrap