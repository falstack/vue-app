import Vue from 'vue'
import VueConfirm from './confirm'

class Confirm
{
    constructor () {
        this._vm = undefined
    }

    show (opt) {
        this._selector = 'v-app-confirm-' + Math.random().toString(36).substring(3, 6)
        this._el = document.createElement('div')
        this._el.id = this._selector

        this._parent = (opt && opt.dom) ? opt.dom : document.body
        this._parent.appendChild(this._el)

        this._vm = new Vue(VueConfirm)
        this._vm.$mount('#' + this._selector)

        return this._vm.show(opt)
    }
}

window.$confirm = new Confirm()