import Vue from 'vue'
import App from './App'

import Fab from './components/Fab/Fab'
import { navigateTo } from './utils/index'

Vue.config.productionTip = false

Vue.component('Fab', Fab)

Vue.prototype.$to = navigateTo

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
