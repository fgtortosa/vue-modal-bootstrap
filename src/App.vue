<script setup type="ts">
import { ref } from 'vue'
import BModal from './componentes/BModal.vue'
import DialogModal from './componentes/DialogModal.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true
})

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

<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <BModal v-model="isModalVisible" :required="false"  @close="handleClose"
      @confirm="handleConfirm">
      <template #header>
        {{ t('modal.confirmar_accion') }}
      </template>

      <template #body>
        {{ t('modal.esta_seguro') }}
      </template>
    </BModal>

    <DialogModal ref="dialogModal">
      <template #header>
        {{ t('modal.formulario_usuario') }}
      </template>

      <template #body>
        <form id="userForm">
          <div class="mb-3">
            <label for="nombre" class="form-label">{{ t('modal.nombre') }}</label>
            <input type="text" class="form-control" id="nombre" v-model="formData.nombre">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">{{ t('modal.email') }}</label>
            <input type="email" class="form-control" id="email" v-model="formData.email">
          </div>
          <div class="mb-3">
            <label for="telefono" class="form-label">{{ t('modal.telefono') }}</label>
            <input type="tel" class="form-control" id="telefono" v-model="formData.telefono">
          </div>
        </form>
      </template>
    </DialogModal>

    <div class="d-flex gap-3">
      <button class="btn btn-primary mb-3" @click="isModalVisible = true">{{ t('modal.abrir_modal_simple') }}</button>
      <button class="btn btn-success mb-3" @click="abrirDialogModal">{{ t('modal.abrir_modal_formulario') }}</button>
    </div>
  </div>
</template>