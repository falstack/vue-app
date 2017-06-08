import Vue from 'vue';
import VueToast from './toast.vue';

const timeout = (duration = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
};

function newVue(dom) {
  let selector = 'v-app-loading-' + Math.random().toString(36).substring(3, 6);
  let el = document.createElement('div');
  let parent = dom ? dom : document.body;

  el.id = selector;
  parent.appendChild(el);

  return new Vue(VueToast).$mount('#' + selector);
}

class Toast {
  constructor() {
    this._vm = undefined;
  }

  showToast(opts, duration, dom) {
    let tips, timer, el;
    if (typeof opts === 'string') {
      el = dom;
      tips = opts;
      timer = duration || 1500;
    } else {
      el = opts.el;
      tips = opts.tips;
      timer = opts.time || 1500;
    }

    if (this._vm && this._vm.getState() > 0) {
      this._vm.update({
        tips: tips,
        icon: opts.icon,
        showIcon: opts.showIcon,
        position: opts.position
      });

      setTimeout(() => {
        this._vm.hide();
      }, timer);

      return;
    }

    this._vm = newVue(el);

    this._vm.show({
      tips: tips,
      icon: opts.icon,
      showIcon: opts.showIcon,
      position: opts.position
    });

    return timeout(timer).then(() => {
      return this._vm.hide();
    });
  }

  showLoading(opts, dom) {
    let tips;
    if (typeof opts === 'string') {
      tips = opts;
    } else {
      tips = opts.tips;
    }

    if (this._vm && this._vm.getState() > 0) {
      this._vm.update({
        tips: tips,
        showIcon: true,
        position: opts.position
      });
      return;
    }

    this._vm = newVue(dom);

    this._vm.show({
      tips: tips,
      showIcon: true,
      position: opts.position
    });
  }

  hide() {
    if (this._vm) this._vm.hide();
  }

  update(options) {
    this._vm.update(options);
  }
}

let toast = new Toast();

window.$loading = {
  show: toast.showLoading,
  hide: toast.hide
};

window.$toast = {
  show: toast.showToast,
  hide: toast.hide
};
