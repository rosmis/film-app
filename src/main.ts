import "virtual:windi.css";
import { createApp } from "vue";
import { VueQueryPlugin } from "vue-query";
import App from "./App.vue";
import router from "./router/index";
import "./style.css";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");
