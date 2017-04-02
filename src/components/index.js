import './utils'
import './plugin'

import Popup from './popup'
import Toggle from './toggle'
import Modal from './modal'
import TabContainer from './tabs/container'
import TabContent from './tabs/content'
import TabItem from './tabs/item'
import TabMenu from './tabs/menu'

const version = '0.1.4'
const install = function(Vue) {
    if (install.installed) return

    Vue.component(Popup.name, Popup)
    Vue.component(Toggle.name, Toggle)
    Vue.component(Modal.name, Modal)
    Vue.component(TabContainer.name, TabContainer)
    Vue.component(TabContent.name, TabContent)
    Vue.component(TabItem.name, TabItem)
    Vue.component(TabMenu.name, TabMenu)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

module.exports = {
    install,
    version,
    Popup
}