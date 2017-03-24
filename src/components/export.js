import FastClick from 'fastclick'
import Promise from 'es6-promise'

FastClick.attach(document.body)
Promise.polyfill()

import Backdrop from  './bacodrop'
import Alert from  './alert'
import Confirm from './confirm'
import Modal from './modal'

const version = '0.1.4';
const install = function(Vue) {
    if (install.installed) return;

    Vue.component(Backdrop.name, Backdrop);
    Vue.component(Alert.name, Alert);
    Vue.component(Confirm.name, Confirm);
    Vue.component(Modal.name, Modal);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

module.exports = {
    install,
    version,
    Backdrop,
    Alert,
    Confirm,
    Modal
};