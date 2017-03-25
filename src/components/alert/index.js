import Vue from 'vue'
import VueAlert from './alert'

class Alert
{
    constructor () {
        this._vm = undefined
    }

    show (opt) {
        this._selector = 'v-app-alert-' + Math.random().toString(36).substring(3, 6)
        this._el = document.createElement('div')
        this._el.id = this._selector

        this._parent = (opt && opt.dom) ? opt.dom : document.body
        this._parent.appendChild(this._el)

        this._vm = new Vue(VueAlert).$mount('#' + this._selector)

        return this._vm.show(opt)
    }
}

window.$alert = new Alert()

export { default } from './alert.vue'