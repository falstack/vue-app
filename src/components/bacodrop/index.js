import Vue from 'vue'
import VueBackdrop from './backdrop'

class Backdrop {
    constructor () {
        this._vm = undefined
    }

    show (opt) {
        if ( ! document.querySelectorAll('.vue-app-backdrop').length) {
            this._selector = 'v-app-backdrop-' + Math.random().toString(36).substring(3, 6)
            this._el = document.createElement('div')
            this._el.id = this._selector

            this._parent = (opt && opt.dom) ? opt.dom : document.body
            this._parent.appendChild(this._el)

            this._vm = new Vue(VueBackdrop).$mount('#' + this._selector)

            this._vm.show()
        }
    }

    hide (force = false) {
        if (this._vm && document.querySelectorAll('.vue-app-dialog').length === 1 || force) {
            this._vm.hide();
            setTimeout(() => {
                this._vm.$destroy()
            }, 200)
        }
    }
}

window.$backdrop = new Backdrop()

export { default } from './backdrop.vue'