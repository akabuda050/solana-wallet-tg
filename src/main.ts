import './index.css'
import {Buffer} from 'buffer';
window.Buffer = Buffer;

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
