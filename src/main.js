import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from "@/store"
import components from "@/components/UI"
import {Tabs, Tab} from 'vue3-tabs-component';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLPmHqXYSCjTvgeSQDmd9ZQ6373vYeADE",
  authDomain: "vue-store-76307.firebaseapp.com",
  projectId: "vue-store-76307",
  storageBucket: "vue-store-76307.appspot.com",
  messagingSenderId: "822136771627",
  appId: "1:822136771627:web:057380f9542f4c1f58066e"
};
// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
const app = createApp(App)
components.forEach(component => {
    app.component(component.name, component)
});


app
.component('tabs', Tabs)
.component('tab', Tab)
.use(router)
.use(store)
.mount('#app')

