<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <!-- Icono (si existe) -->
    <i v-if="icon" :class="`bi ${icon}`" class="me-2"></i>

    <!-- Contenido -->
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label?: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  size?: "sm" | "lg";
  icon?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  class?: string; // Añadir esta línea
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  type: "button",
  disabled: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const buttonClasses = computed(() => [
  "btn",
  `btn-${props.variant}`,
  props.size && `btn-${props.size}`,
  props.class, // Añadir esta línea
]);

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit("click", event);
};
</script>
