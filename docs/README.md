# 简介
> vue-pwa 提供了大量仿 Native App 的组件.

## 组件

### alert

```javascript
$alert.show({
    content: '提示警示信息'
}).then(() => {
    console.log('alert submit')
})
```
参数 | 描述 | 默认值
----|------|----
title | 弹窗的标题  | 提示
content | 弹窗的内容  | 
btnText | 确认按钮的文本  | 好

### confirm
```javascript
$confirm.show({
    content: '提示确认信息'
}).then(() => {
    console.log('confirm ok')
}).catch(() => {
    console.log('confirm cancel')
})
```
参数 | 描述 | 默认值
----|------|----
title | 弹窗的标题  | 提示
content | 弹窗的内容  | 
okText | 确认按钮的文本  | 好
cancelText | 取消按钮的文本  | 取消

### popup
```html
<v-popup ref="popup1">
    content area
</v-popup>
```
```javascript
this.$refs.popup1.show({
    content: '...',
    buttons: ['按钮一', '按钮二', '按钮三']
}).then((index) => {
    console.log('modal result index : ' + index)
})
```
参数 | 描述 | 默认值
----|------|----
title | 弹窗的标题  | 提示
content | 弹窗的内容  | 
buttons | 可选按钮数组  |

### toast
```javascript
$toast.show({
    tips: 'this is a toast',
    icon: 'http://cn.vuejs.org/images/logo.png',
    showIcon: true,
    position: 2,
    time: 1000
}).then(() => {
    console.log('toast closed');
})
```
参数 | 描述 | 默认值
----|------|----
tips | 文本信息  | 
showIcon | 是否显示一个图标  | true 
icon | 图标的 url 地址 | 旋转的 svg
position | 图标相对于文本的位置（顺时针 0 ~ 3） | 0
time | 展示时长（单位：ms） | 1500

### loading
```javascript
$loading.show({
    tips: 'this is a loading',
    position: 0
});

setTimeout(() => {
    // 需要手动调用 hide 方法
    $loading.hide()
}, 3000)
```
参数 | 描述 | 默认值
----|------|----
tips | 文本信息  | 
showIcon | 是否显示一个图标  | true 
position | 图标相对于文本的位置（顺时针 0 ~ 3） | 0

### message
```javascript
$message.show({
    icon : true,
    content : '一个信息',
    theme : 'info',
    auto : false
}).then(() => {
    console.log('message close : ' + content);
})
// 如果设置 auto = true，则不写 promise 回调
```
参数 | 描述 | 默认值
----|------|----
content | 文本信息  | 
theme | 主题样式 ['success', 'warning', 'error', 'info'] | info
icon | 是否显示主题相关图标 | false
auto | 是否自动关闭弹窗 | false 
time | 自动关闭时展示时长（单位：ms） | 5000

### toggle
```html
<v-toggle v-model="toggle">toggle is {{ toggle }}</v-toggle>
```
参数 | 描述 | 默认值
----|------|----
v-model | 数据绑定  | 

### modal
```html
<v-modal ref="modal1"
         :from="'bottom'"
         :clazz="'modal-style'"
         :title="'模态框标题'">
    <div slot="content"></div>
</v-modal>
```
```javascript
this.$refs.modal1.show().then(() => {
    console.log('modal1 result ok');
}).catch(() => {
    console.log('modal1 result cancel');
})
```
参数 | 描述 | 默认值
----|------|----
title | 标题 | 
clazz | 自定义样式的类名 | 
from | 弹窗从哪个方向出现（顺时针：0 ~ 3）| 2 

### tabs

### range
```html
<v-range v-model="rangeModel"
         :min="rangeMin"
         :max="rangeMax"
         @rangeChangeEvent="handleEvent"
></v-range>
```
参数 | 描述 | 默认值
----|------|----
v-model | 数据双向绑定 | 
min | 最小刻度 | 0 
max | 最大刻度 | 100 
step | 步长 | 0 （-infinity）
disabled | 处于禁用状态 | false
loading | 可选的最大刻度 | 0（infinity）
barsize | range 的宽 | 6（px）
tailsize | range 按钮的直径 | 14（px）
vertical | 垂直状态 | false

### button
```html
<v-button :clazz="'test-btn-style info primary'"
          @click="showLoading">button</v-button>
```

### ripple
```html
<v-ripple>
    <div> any dom </div>
</v-ripple>
```

### drawer
```html
<v-drawer ref="drawer">
    this is drawer
</v-drawer>
```

```javascript
this.$refs.drawer.show();
```

## 运行

```shell
npm i cooking-cli -g
npm run dev
npm run dist
```

## License
MIT
