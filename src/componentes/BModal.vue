<template>
  <div 
    class="modal fade" 
    :class="{ show: modelValue }" 
    :style="{ display: modelValue ? 'block' : 'none' }"
    tabindex="-1" 
    aria-hidden="true"
    @click.self="handleBackdropClick"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title h3">
            <slot name="header"></slot>
          </h2>
          <button 
            v-if="!props.required" 
            type="button" 
            class="btn-close" 
            @click="closeModal('close')"
          ></button>
        </div>
        
        <div class="modal-body pb-0">
          <slot name="body"></slot>
        </div>
        
        <div class="modal-footer mt-3">
          <slot name="buttons" :close="closeModal" :confirm="confirmModal">
            <button 
              type="button" 
              class="btn btn-secondary" 
              @click="closeModal('cancel')"
            >
              {{ props.cancelText || 'Cancelar' }}
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="confirmModal"
            >
              {{ props.confirmText || 'Aceptar' }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// BModal.vue
import { withDefaults, defineEmits } from 'vue'

const modelValue = defineModel<boolean>({ default: false })

const props = withDefaults(defineProps<{
  required?: boolean
  cancelText?: string
  confirmText?: string
}>(), {
  required: false
})

const emit = defineEmits<{
  (e: 'close', trigger: string): void
  (e: 'confirm'): void
}>()

const handleBackdropClick = () => {
  if (!props.required) {
    closeModal('backdrop')
  }
}

const closeModal = (trigger: string = 'close') => {
  modelValue.value = false
  emit('close', trigger)
}

const confirmModal = () => {
  modelValue.value = false
  emit('confirm')
}
</script>