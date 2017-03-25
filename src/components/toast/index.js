import Vue from 'vue'
import VueToast from './toast'

const timeout = (duration = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

function newVue(dom) {
    let selector = 'v-app-loading-' + Math.random().toString(36).substring(3, 6)
    let el = document.createElement('div')
    let parent = dom ? dom : document.body

    el.id = selector
    parent.appendChild(el)

    return new Vue(VueToast).$mount('#' + selector)
}

class Toast
{
    constructor () {
        this._vm = undefined
    }

    showToast (tips, duration, dom) {
        let timer = duration || 1500

        if (this._vm && this._vm.getState() > 0) {
            this._vm.update({
                tips: tips
            })

            setTimeout(() => {
                this._vm.hide()
            }, timer)

            return
        }

        this._vm = newVue(dom)

        this._vm.show({
            tips: tips
        })

        return timeout(timer).then(() => {
            return this._vm.hide()
        })
    }

    showLoading (tips, dom) {
        if (this._vm && this._vm.getState() > 0) {
            this._vm.update({
                tips: tips,
                showSpinner: true
            })
            return
        }

        this._vm = newVue(dom)

        this._vm.show({
            tips: tips,
            showSpinner: true
        })
    }

    hide () {
        if (this._vm) this._vm.hide()
    }

    update (options) {
        this._vm.update(options)
    }
}

let toast = new Toast()

window.$loading = {
    show: toast.showLoading,
    hide: toast.hide
}

window.$toast = {
    show: toast.showToast,
    hide: toast.hide
}