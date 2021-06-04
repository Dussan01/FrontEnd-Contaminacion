import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import store from "./store";
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';


const appInstance = createApp(App).use(store);
appInstance.use(Chartkick.use(Chart))
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
