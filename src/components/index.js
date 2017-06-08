import './utils';
import './plugin';

import Popup from './popup';
import Toggle from './toggle';
import Modal from './modal';
import TabContainer from './tabs/container';
import TabContent from './tabs/content';
import TabItem from './tabs/item';
import TabMenu from './tabs/menu';
import List from './list';
import Video from './video';
import Range from './range';
import Ripple from './ripple';
import Button from './button';
import Drawer from './drawer';

const version = '0.1.4';
const install = function(Vue) {
  if (install.installed) return;

  Vue.component(Popup.name, Popup);
  Vue.component(Toggle.name, Toggle);
  Vue.component(Modal.name, Modal);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContent.name, TabContent);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabMenu.name, TabMenu);
  Vue.component(List.name, List);
  Vue.component(Video.name, Video);
  Vue.component(Range.name, Range);
  Vue.component(Ripple.name, Ripple);
  Vue.component(Button.name, Button);
  Vue.component(Drawer.name, Drawer);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  install,
  version,
  Popup
};
