<script setup lang="ts">
import { ref } from "vue";
import ThemeSwitcher from "./componentes/ThemeSwitcher.vue";
import BModal from "./componentes/BModal.vue";
import BButton from "./componentes/BButton.vue";
import DialogModal from "./componentes/DialogModal.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  inheritLocale: true,
});

// Interfaz ModalType
interface ModalType {
  show: (formId?: string) => Promise<boolean>;
}

const isModalVisibleDark = ref(false);
const isModalVisible = ref(false);
const dialogModal = ref<ModalType | null>(null);
const formData = ref({
  nombre: "",
  email: "",
  telefono: "",
});

const handleClose = (trigger: any) => {
  console.log(`Modal cerrado por: ${trigger}`);
};

const handleConfirm = () => {
  console.log("Acción confirmada");
};

const abrirDialogModal = async () => {
  const resultado = await dialogModal.value?.show("userForm");
  if (resultado) {
    console.log("Formulario enviado:", formData.value);
  }
};

// const isSubmitting = ref(false);
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Panel izquierdo -->
      <div class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <!-- ThemeSwitcher -->
          <div class="px-3 mb-3">
            <ThemeSwitcher />
          </div>

          <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted">
            <span>{{ t("components.title") }}</span>
          </h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="#buttons-section">BButton</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#modals-section">BModal</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Contenido principal -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <!-- Sección de Botones -->
        <section id="buttons-section" class="py-5">
          <h2>BButton Examples</h2>

          <!-- Botones básicos -->
          <div class="mb-4">
            <h4 class="h5 mb-3">{{ t("components.buttons.basic.title") }}</h4>
            <div class="row g-3">
              <div class="col-auto">
                <BButton>{{ t("components.buttons.basic.click_me") }}</BButton>
              </div>
              <div class="col-auto">
                <BButton :label="t('components.buttons.basic.click_me')" />
              </div>
            </div>
          </div>

          <!-- Variantes -->
          <div class="mb-4">
            <h4 class="h5 mb-3">Variantes</h4>
            <div class="row g-3">
              <div class="col-auto">
                <BButton variant="primary">{{
                  t("components.buttons.variants.title")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton variant="secondary">{{
                  t("components.buttons.variants.primary")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton variant="success">{{
                  t("components.buttons.variants.secondary")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton variant="danger">{{
                  t("components.buttons.variants.danger")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton variant="warning">{{
                  t("components.buttons.variants.warning")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton variant="info">{{
                  t("components.buttons.variants.info")
                }}</BButton>
              </div>
            </div>
          </div>

          <!-- Tamaños -->
          <div class="mb-4">
            <h4 class="h5 mb-3">{{ t("components.buttons.sizes.title") }}</h4>
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <BButton size="sm">{{
                  t("components.buttons.sizes.small")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton>{{ t("components.buttons.sizes.default") }}</BButton>
              </div>
              <div class="col-auto">
                <BButton size="lg">{{
                  t("components.buttons.sizes.large")
                }}</BButton>
              </div>
            </div>
          </div>

          <!-- Con iconos -->
          <div class="mb-4">
            <h4 class="h5 mb-3">{{ t("components.buttons.icons.title") }}</h4>
            <div class="row g-3">
              <div class="col-auto">
                <BButton icon="bi-hand-thumbs-up">{{
                  t("components.buttons.icons.like")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton icon="bi-heart" variant="danger">{{
                  t("components.buttons.icons.love")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton icon="bi-check-circle" variant="success">{{
                  t("components.buttons.icons.confirm")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton icon="bi-trash" variant="danger">{{
                  t("components.buttons.icons.delete")
                }}</BButton>
              </div>
            </div>
          </div>

          <!-- Estados -->
          <div class="mb-4">
            <h4 class="h5 mb-3">{{ t("components.buttons.states.title") }}</h4>
            <div class="row g-3">
              <div class="col-auto">
                <BButton disabled>{{
                  t("components.buttons.states.disabled")
                }}</BButton>
              </div>
              <div class="col-auto">
                <BButton type="submit" variant="primary">{{
                  t("components.buttons.states.submit")
                }}</BButton>
              </div>
            </div>
          </div>
          <!-- Botones Claros y Oscuros -->
          <div class="mb-4">
            <h4 class="h5 mb-3">{{ t("components.buttons.themes.title") }}</h4>
            <div class="row g-3">
              <!-- Botones Claros -->
              <div class="col-12 mb-3">
                <h5 class="h6 mb-3">
                  {{ t("components.buttons.themes.light") }}
                </h5>
                <div class="d-flex gap-2">
                  <BButton variant="light" class="border" icon="bi-check-lg">
                    {{ t("ok") }}
                  </BButton>
                  <BButton variant="light" class="border" icon="bi-x-lg">
                    {{ t("cancel") }}
                  </BButton>
                </div>
              </div>

              <!-- Botones Oscuros -->
              <div class="col-12">
                <h5 class="h6 mb-3">
                  {{ t("components.buttons.themes.dark") }}
                </h5>
                <div class="d-flex gap-2">
                  <BButton variant="dark" icon="bi-check-lg">
                    {{ t("ok") }}
                  </BButton>
                  <BButton variant="dark" icon="bi-x-lg">
                    {{ t("cancel") }}
                  </BButton>
                </div>
              </div>

              <!-- Botones Outline -->
              <div class="col-12">
                <h5 class="h6 mb-3">
                  {{ t("components.buttons.outline.title") }}
                </h5>
                <div class="d-flex gap-2">
                  <BButton class="btn-outline-dark border" icon="bi-check-lg">
                    {{ t("ok") }}
                  </BButton>
                  <BButton
                    class="btn-secondary btn-outline-dark border"
                    icon="bi-x-lg"
                  >
                    {{ t("cancel") }}
                  </BButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Sección de Modales -->
        <!-- Sección de Modales en App.vue -->
        <section id="modals-section" class="py-5">
          <h2>Modal Examples</h2>

          <!-- Modal con tema monocromático -->
          <div class="mb-5">
            <h4 class="h5 mb-3">Modal Monocromático</h4>
            <BModal
              v-model="isModalVisible"
              :required="false"
              @close="handleClose"
              @confirm="handleConfirm"
            >
              <template #header>
                {{ t("modal.confirmar_accion") }}
              </template>

              <template #body>
                {{ t("modal.esta_seguro") }}
              </template>

              <template #buttons="{ close, confirm }">
                <BButton
                  variant="light"
                  class="border me-2"
                  icon="bi-x-lg"
                  @click="close"
                >
                  {{ t("cancel") }}
                </BButton>
                <BButton variant="dark" icon="bi-check-lg" @click="confirm">
                  {{ t("ok") }}
                </BButton>
              </template>
            </BModal>

            <BButton variant="dark" @click="isModalVisible = true">
              {{ t("modal.abrir_modal_simple") }}
            </BButton>
          </div>

          <!-- Modal con colores Bootstrap -->
          <div class="mb-5">
            <h4 class="h5 mb-3">Modal con Colores Bootstrap</h4>
            <DialogModal ref="dialogModal">
              <template #header>
                {{ t("modal.formulario_usuario") }}
              </template>

              <template #body>
                <form id="userForm">
                  <div class="mb-3">
                    <label for="nombre" class="form-label">
                      {{ t("modal.nombre") }}
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="nombre"
                      v-model="formData.nombre"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">
                      {{ t("modal.email") }}
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="formData.email"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="telefono" class="form-label">
                      {{ t("modal.telefono") }}
                    </label>
                    <input
                      type="tel"
                      class="form-control"
                      id="telefono"
                      v-model="formData.telefono"
                    />
                  </div>
                </form>
              </template>

              <template #buttons="{ close, confirm }">
                <BButton
                  variant="secondary"
                  class="me-2"
                  icon="bi-x-lg"
                  @click="close"
                >
                  {{ t("cancel") }}
                </BButton>
                <BButton variant="primary" icon="bi-check-lg" @click="confirm">
                  {{ t("ok") }}
                </BButton>
              </template>
            </DialogModal>

            <BButton variant="primary" @click="abrirDialogModal">
              {{ t("modal.abrir_modal_formulario") }}
            </BButton>
          </div>

          <!-- Ejemplo de Modal en tema oscuro -->
          <div class="mb-5 p-4 bg-dark rounded" data-bs-theme="dark">
            <h4 class="h5 mb-3 text-light">Modal en Tema Oscuro</h4>
            <BModal
              v-model="isModalVisibleDark"
              :required="false"
              @close="handleClose"
              @confirm="handleConfirm"
            >
              <template #header>
                {{ t("modal.confirmar_accion") }}
              </template>

              <template #body>
                {{ t("modal.esta_seguro") }}
              </template>

              <template #buttons="{ close, confirm }">
                <BButton
                  variant="dark"
                  class="me-2"
                  icon="bi-x-lg"
                  @click="close"
                >
                  {{ t("cancel") }}
                </BButton>
                <BButton
                  variant="light"
                  class="border"
                  icon="bi-check-lg"
                  @click="confirm"
                >
                  {{ t("ok") }}
                </BButton>
              </template>
            </BModal>

            <BButton
              variant="light"
              class="border"
              @click="isModalVisibleDark = true"
            >
              {{ t("modal.abrir_modal_simple") }}
            </BButton>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.nav-link {
  font-weight: 500;
  color: #333;
}

.nav-link:hover {
  color: #0d6efd;
}

main {
  padding-top: 1.5rem;
}

section {
  margin-bottom: 3rem;
}
</style>
