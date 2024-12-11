<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BModal from './BModal.vue' // Adjust the import path as needed
import { MensajeModales } from '../interfaces/MensajesModales'

// Define props with more comprehensive options
const props = withDefaults(defineProps<{
  mensajes?: MensajeModales
  cerradoautomatico?: boolean
  requerido?: boolean
  deshabilitarconfirmar?: boolean
  cancelText?: string
  confirmText?: string
}>(), {
  cerradoautomatico: false,
  requerido: false,
  deshabilitarconfirmar: true
})

const emit = defineEmits<{
  (e: 'close', trigger: string): void
  (e: 'confirm'): void
}>()

const { t } = useI18n({
  inheritLocale: true
})

const modelValue = defineModel<boolean>({ default: false })
const deshabilitarconfirmar = ref<boolean>(false)
const formulariovalidar = ref<string | null>(null)
let funcionconfirmar: (() => Promise<boolean>) | null = null

const show = (idformulario: string | null = null, funcionConfirmar: ((() => Promise<boolean>) | null) = null) => {
  if (props.deshabilitarconfirmar ?? true)
    deshabilitarconfirmar.value = false

  formulariovalidar.value = idformulario
  modelValue.value = true
  funcionconfirmar = funcionConfirmar
  return new Promise<boolean>((resolve) => {
    resolvePromise = resolve
  })
}

let resolvePromise: (value: boolean) => void

const hide = () => {
  modelValue.value = false
}

const deshabilitarConfirmar = (estado: boolean) => {
  deshabilitarconfirmar.value = estado
}

const cancel = (trigger: string = 'close') => {
  resolvePromise?.(false)
  modelValue.value = false
  emit('close', trigger)
}

const confirm = async () => {
  let salir = false

  if (formulariovalidar.value) {
    // Placeholder for form validation
    // Uncomment and implement form validation logic as needed
    // if (gestformulario.validarFormulario(formulariovalidar.value)) {
    //   salir = true
    // }
    salir = true
  } else {
    salir = true
  }

  if (salir) {
    if (props.deshabilitarconfirmar ?? true)
      deshabilitarconfirmar.value = true

    let salirconfirmar = true

    if (funcionconfirmar) {
      salirconfirmar = await funcionconfirmar() ?? true
    }

    if (salirconfirmar) {
      resolvePromise?.(true)
      emit('confirm')

      if (props.cerradoautomatico) {
        modelValue.value = false
      }
    } else {
      if (props.deshabilitarconfirmar ?? true)
        deshabilitarconfirmar.value = false
    }
  }
}

// Expose methods for component usage
defineExpose({
  show,
  hide,
  deshabilitarConfirmar,
  confirm,
  cancel
})
</script>

<template>
  <BModal 
    v-model="modelValue"
    :required="requerido"
    :cancel-text="mensajes?.cancel ?? t('cancel')"
    :confirm-text="mensajes?.ok ?? t('ok')"
    @close="cancel"
    @confirm="confirm"
  >
    <template #header>
      <slot name="header"></slot>
    </template>

    <template #body>
      <slot name="body"></slot>
    </template>

    <template #buttons="{ close, confirm }">
      <slot 
        name="buttons" 
        :close="close" 
        :confirm="confirm"
      >
        <button 
          type="button" 
          class="btn btn-secondary" 
          @click="cancel('cancel')"
        >
          {{ mensajes?.cancel ?? t('cancel') }}
        </button>
        <button 
          type="button" 
          :disabled="deshabilitarconfirmar" 
          class="btn btn-primary" 
          @click="confirm"
        >
          <span 
            v-show="deshabilitarconfirmar" 
            role="status" 
            class="spinner-border spinner-border-sm mx-2 mt-1 float-start"
          ></span>
          {{ mensajes?.ok ?? t('ok') }}
        </button>
      </slot>
    </template>
  </BModal>
</template>

<style lang="scss" scoped></style>

<i18n>
{
    "es": {
        "ok": "Aceptar",
        "cancel": "Cancelar",
    },
    "ca": {
        "ok": "Acceptar",
        "cancel": "Cancel·lar",
    },
    "en": {
        "ok": "Ok",
        "cancel": "Cancel",
    }
}
</i18n>