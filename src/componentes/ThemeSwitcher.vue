<template>
  <div class="theme-switcher">
    <button 
      class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center"
      id="bd-theme"
      type="button"
      aria-expanded="false"
      data-bs-toggle="dropdown"
      data-bs-display="static"
    >
      <!-- Icono del tema actual -->
      <i class="bi" :class="currentThemeIcon"></i>
    </button>
    <ul 
      class="dropdown-menu dropdown-menu-end" 
      aria-labelledby="bd-theme"
    >
      <li>
        <button 
          type="button"
          class="dropdown-item d-flex align-items-center"
          :class="{ active: currentTheme === 'light' }"
          @click="setTheme('light')"
        >
          <i class="bi bi-sun-fill me-2"></i>
          Light
        </button>
      </li>
      <li>
        <button 
          type="button"
          class="dropdown-item d-flex align-items-center"
          :class="{ active: currentTheme === 'dark' }"
          @click="setTheme('dark')"
        >
          <i class="bi bi-moon-fill me-2"></i>
          Dark
        </button>
      </li>
      <li>
        <button 
          type="button"
          class="dropdown-item d-flex align-items-center"
          :class="{ active: currentTheme === 'auto' }"
          @click="setTheme('auto')"
        >
          <i class="bi bi-circle-half me-2"></i>
          Auto
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const currentTheme = ref(getPreferredTheme());

// Obtener tema almacenado
function getStoredTheme() {
  return localStorage.getItem('theme');
}

// Guardar tema
function setStoredTheme(theme: string) {
  localStorage.setItem('theme', theme);
}

// Obtener tema preferido
function getPreferredTheme() {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Aplicar tema
function setTheme(theme: string) {
  if (theme === 'auto') {
    document.documentElement.setAttribute(
      'data-bs-theme',
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
  currentTheme.value = theme;
  setStoredTheme(theme);
}

// Icono del tema actual
const currentThemeIcon = computed(() => {
  switch (currentTheme.value) {
    case 'light':
      return 'bi-sun-fill';
    case 'dark':
      return 'bi-moon-fill';
    default:
      return 'bi-circle-half';
  }
});

// Escuchar cambios en el tema del sistema
onMounted(() => {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme('auto');
    }
  });

  // Aplicar tema inicial
  setTheme(currentTheme.value);
});
</script>

<style scoped>
.theme-switcher {
  position: relative;
}

.dropdown-menu {
  min-width: 8rem;
}
</style>