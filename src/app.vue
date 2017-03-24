<template>
    <div>
        <h1>vue-app</h1>
        <p>A vue project.</p>
        <button @click="showAlert">测试 alert</button>
        <button @click="showConfirm">测试 confirm</button>
        <button @click="showModal_1">测试 modal_1</button>
        <button @click="showModal_2">测试 modal_2</button>
        <v-modal ref="modal1">
            <p>测试表单1 {{ msg }}</p>
            <input placeholder="父组件" v-model="msg" type="text">
        </v-modal>
        <v-modal ref="modal2">
            <p>测试表单2 {{ msg }} </p>
            <input placeholder="父组件" v-model="msg" type="text">
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
          msg : 'test'
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

        showModal_1 () {
            this.$refs.modal1.show({
                buttons: ['按钮一', '按钮二', '按钮三']
            }).then((index) => {
                console.log('modal result index : ' + index)
            })
        },

        showModal_2 () {
            this.$refs.modal2.show({
                buttons: ['按钮四', '按钮五', '按钮六']
            }).then((index) => {
                console.log('modal result index : ' + index)
            })
        }
    }
}
</script>