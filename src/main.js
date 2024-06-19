import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import apiClient from "./apiClient";
import "./assets/styles/main.scss";

const app = createApp(App);
app.provide("apiClient", apiClient);
app.use(router);
app.mount("#app");
