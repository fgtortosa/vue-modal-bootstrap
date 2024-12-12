<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <!-- Primera modal (existente) -->
    <BModal v-model="isModalVisible" :required="true" cancelText="No" confirmText="Sí" @close="handleClose"
      @confirm="handleConfirm">
      <template #header>
        Confirmar Acción
      </template>

      <template #body>
        ¿Está seguro de que desea continuar?
      </template>

      <template #buttons="{ close, confirm }">
        <button @click="close" class="btn btn-secondary">Cancelar</button>
        <button @click="confirm" class="btn btn-primary">Confirmar</button>
      </template>
    </BModal>

    <!-- Segunda modal (nueva) -->
    <DialogModal ref="dialogModal">
      <template #header>
        Formulario de Usuario
      </template>

      <template #body>
        <form id="userForm">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" v-model="formData.nombre">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="formData.email">
          </div>
          <div class="mb-3">
            <label for="telefono" class="form-label">Teléfono</label>
            <input type="tel" class="form-control" id="telefono" v-model="formData.telefono">
          </div>
        </form>
      </template>
    </DialogModal>

    <div class="d-flex gap-3">
      <button class="btn btn-primary mb-3" @click="isModalVisible = true">Abrir Modal Simple</button>
      <button class="btn btn-success mb-3" @click="abrirDialogModal">Abrir Modal con Formulario</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BModal from './componentes/BModal.vue'
import DialogModal from './componentes/DialogModal.vue'

const isModalVisible = ref(false)
const dialogModal = ref(null)
const formData = ref({
  nombre: '',
  email: '',
  telefono: ''
})

const handleClose = (trigger) => {
  console.log(`Modal cerrado por: ${trigger}`)
}

const handleConfirm = () => {
  console.log('Acción confirmada')
}

const abrirDialogModal = async () => {
  const resultado = await dialogModal.value.show('userForm')
  if (resultado) {
    console.log('Formulario enviado:', formData.value)
  }
}
</script>