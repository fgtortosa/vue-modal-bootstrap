<template>
  <div v-if="modelValue" class="modal-backdrop fade show"></div>

  <div
    class="modal fade"
    :class="{
      show: modelValue,
      'modal-static': props.required,
    }"
    :style="{ display: modelValue ? 'block' : 'none' }"
    tabindex="-1"
    role="dialog"
    :aria-modal="modelValue"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header"></slot>
          </h5>
          <button
            v-if="!props.required"
            type="button"
            class="btn-close"
            @click="closeModal('close')"
          ></button>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="buttons" :close="closeModal" :confirm="confirmModal">
            <BButton variant="secondary" @click="closeModal('cancel')">
              {{ props.cancelText || t("cancel") }}
            </BButton>
            <BButton variant="primary" @click="confirmModal">
              {{ props.confirmText || t("ok") }}
            </BButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  inheritLocale: true,
});

const modelValue = defineModel<boolean>({ default: false });

const props = withDefaults(
  defineProps<{
    required?: boolean;
    modalId?: string;
    cancelText?: string;
    confirmText?: string;
  }>(),
  {
    required: false,
    modalId: () => `modal-${Math.random().toString(36).substr(2, 9)}`, // ID único por defecto
  },
);

const emit = defineEmits<{
  (e: "close", trigger: string): void;
  (e: "confirm"): void;
}>();

// Computar IDs únicos para header y body
const headerId = computed(() => `${props.modalId}-title`);
const bodyId = computed(() => `${props.modalId}-description`);

// Trap focus within modal when open
watch(modelValue, (isOpen) => {
  if (isOpen) {
    trapFocus();
  } else {
    releaseFocus();
  }
});

const trapFocus = () => {
  const modal = document.querySelector('.modal[role="dialog"]');
  if (!modal) return;

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (focusableElements.length) {
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
  }
};

const releaseFocus = () => {
  // Remove event listeners if needed
};

const handleBackdropClick = () => {
  if (!props.required) {
    closeModal("backdrop");
  }
};

const closeModal = (trigger: string = "close") => {
  modelValue.value = false;
  emit("close", trigger);
};

const confirmModal = () => {
  modelValue.value = false;
  emit("confirm");
};
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
