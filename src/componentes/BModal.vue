<template>
  <div 
      v-if="modelValue"
      class="modal-backdrop fade show"
      role="presentation"
  ></div>
  
  <div 
      class="modal fade"
      :class="{
          'show': modelValue,
          'modal-static': props.required
      }"
      :style="{ display: modelValue ? 'block' : 'none' }"
      tabindex="-1"
      role="dialog"
      :aria-modal="modelValue"
      :aria-hidden="!modelValue"
      @click.self="handleBackdropClick"
      data-bs-backdrop="static"
  >
      <div 
          class="modal-dialog modal-xl modal-dialog-centered" 
          role="document"
      >
          <div class="modal-content">
              <div class="modal-header">
                  <h2 
                      id="modal-title" 
                      class="modal-title h5"
                  >
                      <slot name="header"></slot>
                  </h2>
                  <button
                      v-if="!props.required"
                      type="button"
                      class="btn-close"
                      aria-label="Close"
                      @click="closeModal('close')"
                  ></button>
              </div>
              
              <div 
                  class="modal-body pb-0"
                  id="modal-description"
              >
                  <slot name="body"></slot>
              </div>
              
              <div class="modal-footer mt-3">
                  <slot 
                      name="buttons" 
                      :close="closeModal" 
                      :confirm="confirmModal"
                  >
                      <button
                          type="button"
                          class="btn btn-secondary"
                          @click="closeModal('cancel')"
                      >
                          {{ props.cancelText || t('cancel') }}
                      </button>
                      <button
                          type="button"
                          class="btn btn-primary"
                          @click="confirmModal"
                      >
                          {{ props.confirmText || t('ok') }}
                      </button>
                  </slot>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineEmits, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true
})

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

// Trap focus within modal when open
watch(modelValue, (isOpen) => {
  if (isOpen) {
      trapFocus()
  } else {
      releaseFocus()
  }
})

const trapFocus = () => {
  const modal = document.querySelector('.modal[role="dialog"]')
  if (!modal) return

  const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  if (focusableElements.length) {
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
      
      const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
              if (e.shiftKey && document.activeElement === firstElement) {
                  e.preventDefault()
                  lastElement.focus()
              } else if (!e.shiftKey && document.activeElement === lastElement) {
                  e.preventDefault()
                  firstElement.focus()
              }
          }
      }

      document.addEventListener('keydown', handleTabKey)
  }
}

const releaseFocus = () => {
  // Remove event listeners if needed
}

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

<style scoped>
.modal-static {
  transform: none !important;
}
</style>

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