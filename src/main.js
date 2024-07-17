import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LoadingPlugin } from 'vue-loading-overlay';
import App from './App.vue'
import router from './router'
import './plugins/bootstrap.config';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(LoadingPlugin)
app.mount('#app')
