<script setup lang="ts">
import { ref } from 'vue'
import DialogModal from './componentes/DialogModal.vue' // Adjust the import path as needed

// Interface for person data
interface PersonData {
  nombre: string
  email: string
}

// Reactive state for dialog data
const dialogDatos = ref<PersonData>({
  nombre: '',
  email: ''
})

// Reactive state to control dialog visibility
const showDialog = ref(false)

// Method to open the dialog
const openDialog = () => {
  // Reset form data when opening
  dialogDatos.value = {
    nombre: '',
    email: ''
  }
  showDialog.value = true
}

// Method to handle dialog confirmation
const handleConfirm = () => {
  // Validate data
  if (dialogDatos.value.nombre && dialogDatos.value.email) {
    console.log('Persona guardada:', dialogDatos.value)
    // Here you would typically save the data, 
    // e.g., call an API or update a store
    showDialog.value = false
  } else {
    // Optional: show validation error
    alert('Por favor, complete todos los campos')
  }
}

// Method to handle dialog cancellation
const handleCancel = (trigger: string) => {
  console.log('Diálogo cancelado por:', trigger)
  showDialog.value = false
}
</script>

<template>
  <div class="container mt-5">
    <!-- Button to open the dialog -->
    <button 
      class="btn btn-primary" 
      @click="openDialog"
    >
      Editar Persona
    </button>

    <!-- Dialog Modal -->
    <DialogModal 
      v-model="showDialog"
      @confirm="handleConfirm"
      @close="handleCancel"
      id="dialogo"
    >
      <template #header>Edición persona</template>
      
      <template #body>
        <form>
          <div class="mb-3">
            <label for="nombre_es" class="form-label">Nombre</label>
            <input 
              type="text" 
              v-model="dialogDatos.nombre" 
              class="form-control autofocus" 
              id="nombre_es"
              placeholder="Introduce tu nombre"
            >
          </div>
          <div class="mb-3">
            <label for="nombre_va" class="form-label">Correo electrónico</label>
            <input 
              type="email" 
              v-model="dialogDatos.email"  
              class="form-control" 
              id="nombre_va"
              placeholder="Introduce tu correo electrónico"
            >
          </div>
        </form>
      </template>
    </DialogModal>
  </div>
</template>