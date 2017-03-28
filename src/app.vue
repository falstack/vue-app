<template>
    <div>
        <h1>vue-app</h1>
        <p>A vue project.</p>
        <button @click="showAlert">测试 alert</button>
        <button @click="showConfirm">测试 confirm</button>
        <button @click="showPopup_1">测试 popup_1</button>
        <button @click="showPopup_2">测试 popup_2</button>
        <button @click="showMessage">测试 message</button>
        <button @click="showMessage">测试 message</button>
        <button @click="showModal_1">测试 modal_1</button>
        <v-popup ref="popup1">
            <p>测试表单1 {{ msg }}</p>
            <input placeholder="父组件" v-model="msg" type="text">
        </v-popup>
        <v-popup ref="popup2">
            <p>测试表单2 {{ msg }} </p>
            <v-toggle v-model="toggle_1">toggle_1 is {{ toggle_1 }}</v-toggle>
            <v-toggle v-model="toggle_2">toggle_2 is {{ toggle_2 }}</v-toggle>
            <v-toggle v-model="toggle_3">toggle_3 is {{ toggle_3 }}</v-toggle>
        </v-popup>
        <v-modal ref="modal1">

        </v-modal>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
    </div>
</template>

<script lang="babel">

export default {

    name: 'app',

    data () {
        return {
            msg : 'test',
            toggle_1: false,
            toggle_2: false,
            toggle_3: false,
            content: [
                'You know what I\'d like to be?',
                'I thought what I\'d do was,I\'d pretend I was one of those deaf-mutes',
                'did you miss me?',
                'Valar Morghulis, Valar Dohaeris',
                'perfect is shit'
            ],
            theme: ['success', 'warning', 'error', 'info']
        }
    },

    created () {

    },

    methods : {

        showAlert () {
            $alert.show({
                subTitle: '哈哈啊哈1'
            }).then(() => {
                console.log('alert submit')
            })

            $alert.show({
                subTitle: '哈哈啊哈2'
            }).then(() => {
                console.log('alert submit')
            })

            $alert.show({
                subTitle: '哈哈啊哈3'
            }).then(() => {
                console.log('alert submit')
            })
        },

        showConfirm () {
            $confirm.show({
                subTitle: '测试哈哈'
            }).then(() => {
                console.log('confirm ok')
            }).catch(() => {
                console.log('confirm cancel')
            })
        },

        showPopup_1 () {
            this.$refs.popup1.show({
                buttons: ['按钮一', '按钮二', '按钮三']
            }).then((index) => {
                console.log('modal result index : ' + index)
            })
        },

        showPopup_2 () {
            this.$refs.popup2.show({
                buttons: ['按钮四', '按钮五', '按钮六']
            }).then((index) => {
                console.log('modal result index : ' + index)
            })
        },

        showModal_1 () {
            this.$refs.modal1.show().then(() => {
                console.log('modal result ok');
            }).catch(() => {
                console.log('modal result cancel');
            })
        },

        showMessage () {
            let content = this.random(this.content)
            let auto = this.random([true, false])

            if (auto) {
                $message.show({
                    icon : this.random([true, false]),
                    content : content,
                    theme : this.random(this.theme),
                    auto : auto
                })
            } else {
                $message.show({
                    icon : this.random([true, false]),
                    content : content,
                    theme : this.random(this.theme),
                    auto : auto
                }).then(() => {
                    console.log('message close : ' + content);
                })
            }
        },

        random (array) {
            var n = Math.floor(Math.random() * array.length + 1) - 1;
            return array[n];
        }
    },
    mounted () {
        $toast.show({
            tips: 'this is a toast',
            icon: 'http://cn.vuejs.org/images/logo.png',
            showIcon: true,
            position: 2
        }).then(() => {
            $loading.show({
                tips: 'this is a loading',
                position: 0
            })
        })

        setTimeout(() => {
            $loading.hide()
        }, 5000)
    }
}
</script>