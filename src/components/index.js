import './utils'
import './plugin'

import Popup from './popup'
import Toggle from './toggle'
import Modal from './modal'
import TabContainer from './tab-container/container'
import TabItem from './tab-container/item'

const version = '0.1.4'
const install = function(Vue) {
    if (install.installed) return

    Vue.component(Popup.name, Popup)
    Vue.component(Toggle.name, Toggle)
    Vue.component(Modal.name, Modal)
    Vue.component(TabContainer.name, TabContainer)
    Vue.component(TabItem.name, TabItem)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

module.exports = {
    install,
    version,
    Popup
}