import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./plugins/i18n";

// Assets
import "./assets/scss-bootstrap/styles.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const app = createApp(App).use(i18n);

app.mount("#app");
