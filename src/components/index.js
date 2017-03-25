import './utils'
import './plugin'

import Modal from './modal'
import Toggle from './toggle'

const version = '0.1.4'
const install = function(Vue) {
    if (install.installed) return

    Vue.component(Modal.name, Modal)
    Vue.component(Toggle.name, Toggle)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

module.exports = {
    install,
    version,
    Modal
}