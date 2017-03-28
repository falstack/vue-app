import './utils'
import './plugin'

import Popup from './popup'
import Toggle from './toggle'
import Modal from './modal'

const version = '0.1.4'
const install = function(Vue) {
    if (install.installed) return

    Vue.component(Popup.name, Popup)
    Vue.component(Toggle.name, Toggle)
    Vue.component(Modal.name, Modal)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

module.exports = {
    install,
    version,
    Popup
}