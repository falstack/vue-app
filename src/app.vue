<style lang="scss" rel="scss">
    @import "./style";

    #main {
        .test-style {
            top: 20%;
        }

        $tab-menu-height: 50px;
        .menu-style {
            height: $tab-menu-height;
            min-height: $tab-menu-height;
            border-top: 1px solid #eee;

            .button {
                height: $tab-menu-height;
            }

            .vue-tab-menu-icon {
                margin-bottom: 5px;
                font-family: "iconfont" !important;
                font-size: 20px;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;

                &.icon-0:before { content: "\e6a1"; }

                &.icon-1:before { content: "\e63f"; }

                &.icon-2:before { content: "\e609"; }

                &.icon-3:before { content: "\e65d"; }
            }
        }
    }
</style>

<template>
    <div id="main">
        <h1>vue-app</h1>
        <p>A vue project.</p>
        <button @click="showModal_1">测试 modal_1</button>
        <button @click="showModal_3">测试 modal_3</button>
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
        <v-modal ref="modal1" :title="'测试模态框'" :className="'test-style'">
            <div slot="content">
                <button @click="showAlert">测试 alert</button>
                <button @click="showMessage">测试 message</button>
                <button @click="showConfirm">测试 confirm</button>
                <button @click="showPopup_1">测试 popup_1</button>
                <button @click="showPopup_2">测试 popup_2</button>
                <button @click="showModal_2">测试 modal_2</button>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
                <p>666</p>
            </div>
        </v-modal>
        <v-modal ref="modal2" :title="'测试模态框'">
            <div slot="content">
                <v-tab-container>
                    <v-tab-content v-model="active" :swipeable="false">
                        <v-tab-item :name="menu[0]">
                            <v-tab-container>
                                <v-tab-menu v-model="active_1" :menu="menu_1" :lineWidth="20"></v-tab-menu>
                                <v-tab-content v-model="active_1">
                                    <v-tab-item :name="menu_1[0]">
                                        <div style="width: 100%; height:300px">
                                            <v-video :source="source"></v-video>
                                        </div>
                                        <v-range v-modal="range"></v-range>
                                        <h3 v-for="item in 20">10</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_1[1]">
                                        <h3 v-for="item in 20">11</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_1[2]">
                                        <h3 v-for="item in 20">12</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_1[3]">
                                        <h3 v-for="item in 20">13</h3>
                                    </v-tab-item>
                                </v-tab-content>
                            </v-tab-container>
                        </v-tab-item>
                        <v-tab-item :name="menu[1]">
                            <v-tab-container>
                                <v-tab-menu v-model="active_2" :menu="menu_2"></v-tab-menu>
                                <v-tab-content v-model="active_2">
                                    <v-tab-item :name="menu_2[0]">
                                        <h3 v-for="item in 20">20</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_2[1]">
                                        <h3 v-for="item in 20">21</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_2[2]">
                                        <h3 v-for="item in 20">22</h3>
                                    </v-tab-item>
                                </v-tab-content>
                            </v-tab-container>
                        </v-tab-item>
                        <v-tab-item :name="menu[2]">
                            <v-tab-container>
                                <v-tab-menu v-model="active_3" :menu="menu_3"></v-tab-menu>
                                <v-tab-content v-model="active_3">
                                    <v-tab-item :name="menu_3[0]">
                                        <h3 v-for="item in 20">30</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[1]">
                                        <h3 v-for="item in 20">31</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[2]">
                                        <h3 v-for="item in 20">32</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[3]">
                                        <h3 v-for="item in 20">33</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[4]">
                                        <h3 v-for="item in 20">34</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[5]">
                                        <h3 v-for="item in 20">35</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[6]">
                                        <h3 v-for="item in 20">36</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[7]">
                                        <h3 v-for="item in 20">37</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[8]">
                                        <h3 v-for="item in 20">38</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[9]">
                                        <h3 v-for="item in 20">39</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[10]">
                                        <h3 v-for="item in 20">310</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[11]">
                                        <h3 v-for="item in 20">311</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[12]">
                                        <h3 v-for="item in 20">312</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[13]">
                                        <h3 v-for="item in 20">313</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[14]">
                                        <h3 v-for="item in 20">315</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_3[15]">
                                        <h3 v-for="item in 20">315</h3>
                                    </v-tab-item>
                                </v-tab-content>
                            </v-tab-container>
                        </v-tab-item>
                        <v-tab-item :name="menu[3]">
                            <v-tab-container>
                                <v-tab-menu v-model="active_4" :menu="menu_4"></v-tab-menu>
                                <v-tab-content v-model="active_4">
                                    <v-tab-item :name="menu_4[0]">
                                        <h3 v-for="item in 20">40</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_4[1]">
                                        <h3 v-for="item in 20">41</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_4[2]">
                                        <h3 v-for="item in 20">42</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_4[3]">
                                        <h3 v-for="item in 20">43</h3>
                                    </v-tab-item>
                                    <v-tab-item :name="menu_4[4]">
                                        <h3 v-for="item in 20">44</h3>
                                    </v-tab-item>
                                </v-tab-content>
                            </v-tab-container>
                        </v-tab-item>
                    </v-tab-content>
                    <v-tab-menu
                            v-model="active"
                            :menu="menu"
                            :showLine="false"
                            :showIcon="true"
                            :className="'menu-style'"
                    ></v-tab-menu>
                </v-tab-container>
            </div>
        </v-modal>
        <v-modal ref="modal3" :title="'测试模态框'">
            <div slot="content">
                <v-list
                        :list="list"
                        :total="total"
                        :pageSize="take"
                        v-model="page"
                        @listLoadingEvent="getList">
                    <template slot="content" scope="props">
                        <div class="my-fancy-item">{{ props.text }}</div>
                    </template>
                </v-list>
            </div>
        </v-modal>
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
            theme: ['success', 'warning', 'error', 'info'],
            active: '阿里云',
            active_1: '域名注册',
            active_2: '监控报警',
            active_3: '直播',
            active_4: '订单管理',
            menu: ['阿里云', '控制台', '分区', '我的'],
            menu_1: ['域名注册', '云服务器 ECS', '安骑士', '对象存储 OSS'],
            menu_2: ['监控报警', '急需续费', '工单'],
            menu_3: ['直播', '番剧', '动画', '国创', '音乐', '舞蹈', '游戏', '科技', '生活', '鬼畜', '时尚', '广告', '娱乐', '电影', '电视剧', '游戏中心'],
            menu_4: ['订单管理', '发票管理', '当月消费', '账户余额', '卡卷'],
            list: 100,
            page: 1,
            take: 10,
            total: 500,
            source : [
                {
                    src: 'http://static2.ivwen.com/official/resource/meipian.mp4?',
                    type: 'video/mp4'
                },
                {
                    src: 'http://static2.ivwen.com/official/resource/meipian.webm?',
                    type: 'video/webm;codecs="vp8, vorbis"'
                }
            ],
            range: 0
        }
    },

    created () {
        this.getList(this.take)
    },

    methods: {

        getList (take) {
            if (this.list >= this.total) return
            this.list += take
        },

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
                buttons: ['按钮一', '按钮二']
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
                console.log('modal1 result ok');
            }).catch(() => {
                console.log('modal1 result cancel');
            })
        },

        showModal_2 () {
            this.$refs.modal2.show().then(() => {
                console.log('modal2 result ok');
            }).catch(() => {
                console.log('modal2 result cancel');
            })
        },

        showModal_3 () {
            this.$refs.modal3.show().then(() => {
                console.log('modal3 result ok');
            }).catch(() => {
                console.log('modal3 result cancel');
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
//        $toast.show({
//            tips: 'this is a toast',
//            icon: 'http://cn.vuejs.org/images/logo.png',
//            showIcon: true,
//            position: 2
//        }).then(() => {
//            $loading.show({
//                tips: 'this is a loading',
//                position: 0
//            })
//        })
//
//        setTimeout(() => {
//            $loading.hide()
//        }, 5000)
    }
}
</script>