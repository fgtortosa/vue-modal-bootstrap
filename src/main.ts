import { createApp } from 'vue'
import App from './App.vue'
import i18n from "./plugins/i18n" ;

// Assets
import './assets/scss-bootstrap/styles.scss';
import "bootstrap";

const app = createApp(App)
 .use(i18n)


app.mount('#app')
