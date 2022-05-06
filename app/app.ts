import Vue from 'nativescript-vue'
import Home from './components/Home.vue'
import Dropdown from './components/Dropdown.vue';
import {loadStateFromDisk} from '~/store'

declare let __DEV__: boolean;

loadStateFromDisk()

// Vue.registerElement("DropDown", Dropdown);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
