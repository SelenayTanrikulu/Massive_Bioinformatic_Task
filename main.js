import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Vuex store'u import ediyoruz
import './assets/styles/main.css'; // main.css dosyasını import ediyoruz

const app = createApp(App);
app.use(store); // Vuex'i kullanıyoruz
app.mount('#app');
