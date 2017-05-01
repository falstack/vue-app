<style lang="scss" rel="scss">
    @import "./style";

    html, body {
        height: 100%;
    }

    body {
        margin: 0;
    }

    #main {
        height: 100%;
        min-height: 100%;

        .test-tab-item {
            padding: 0 15px;
        }

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
                color: RGB(53, 73, 94);
                transition-duration: 0s;
            }

            .vue-tab-menu-selected {
                color: RGB(65, 184, 131);
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

        .bar-style {
            background-color: RGB(65, 184, 131);

            .vue-tab-menu-selected, .button {
                color: #fff;
            }

            .vue-tab-menu-line {
                background-color: #fff;
            }
        }

        .video-style {
            .test-init {
                background-color:grey;width:100%;height:100%
            }
        }

        $color-blue: #00bfef;
        $color-blue-hover: #00a7de;

        $color-gray: #ccd0d7;
        $color-gray-hover: #99a2aa;

        $color-green: #52C6CA;
        $color-green-hover: #00bb9c;

        $color-pink: #ff9eb0;
        $color-pink-hover: #ff607f;

        $color-yellow: #f3cf4a;
        $color-yellow-hover: #fdbc40;

        $color-red: #fc605c;
        $color-red-hover: #c84c44;

        @mixin mixin-btn($bg, $bg-hover, $color) {
            background-color: $bg;
            color: $color;

            @media (min-width: 1024px) {
                &:hover {
                    background-color: $bg-hover;
                    transition-duration: 0s;
                }
            }
        }

        .test-btn-style {
            margin-top: 15px;

            &.info {
                @include mixin-btn($color-blue, $color-blue-hover, #fff);
            }

            &.warn {
                @include mixin-btn($color-yellow, $color-yellow-hover, #fff);
            }

            &.error {
                @include mixin-btn($color-red, $color-red-hover, #fff);
            }

            &.success {
                @include mixin-btn($color-green, $color-green-hover, #fff);
            }

            .icon {
                width: 20px;
                height: 20px;
            }

            &.on-click:before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, .3);
            }

            &.primary {
                border-radius: 4px;
                height: 40px;
                font-size: 18px;
                padding: 0 12px;
            }
        }
    }
</style>

<template>
    <div id="main">
        <v-tab-container>
            <v-tab-content v-model="active" :swipeable="false">
                <v-tab-item :name="menu[0]" :init="true">
                    <v-tab-container>
                        <v-tab-menu :clazz="'bar-style'"
                                    v-model="active_1"
                                    :menu="menu_1"
                                    :lineWidth="15">
                        </v-tab-menu>
                        <v-tab-content v-model="active_1">
                            <v-tab-item :name="menu_1[0]"
                                        :clazz="'test-tab-item'"
                                        :init="true">
                                <v-button :clazz="'test-btn-style info primary'"
                                          @click="testFunc"
                                >A vue project.</v-button>
                            </v-tab-item>
                            <v-tab-item :name="menu_1[1]"
                                        :clazz="'test-tab-item'">
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
                                <v-button @click="showAlert"
                                          :clazz="'test-btn-style info primary'"
                                >测试 alert</v-button>
                                <v-button @click="showConfirm"
                                          :clazz="'test-btn-style warn primary'"
                                >测试 confirm</v-button>
                                <v-button @click="showPopup_1"
                                          :clazz="'test-btn-style success primary'"
                                >测试 popup_1</v-button>
                                <v-button @click="showPopup_2"
                                          :clazz="'test-btn-style error primary'"
                                >测试 popup_2</v-button>
                            </v-tab-item>
                            <v-tab-item :name="menu_1[2]"
                                        :clazz="'test-tab-item'">
                                <button @click="showToast">测试 toast</button>
                            </v-tab-item>
                            <v-tab-item :name="menu_1[3]"
                                        :clazz="'test-tab-item'">
                                <button @click="showLoading">测试 loading</button>
                            </v-tab-item>
                            <v-tab-item :name="menu_1[4]"
                                        :clazz="'test-tab-item'">
                                <button @click="showMessage">测试 message</button>
                            </v-tab-item>
                        </v-tab-content>
                    </v-tab-container>
                </v-tab-item>
                <v-tab-item :name="menu[1]">
                    <v-tab-container>
                        <v-tab-menu :clazz="'bar-style'"
                                    v-model="active_2"
                                    :menu="menu_2"
                                    :lineWidth="15">
                        </v-tab-menu>
                        <v-tab-content v-model="active_2">
                            <v-tab-item :name="menu_2[0]"
                                        :init="true"
                                        :clazz="'test-tab-item'">
                                this page in tabs
                            </v-tab-item>
                            <v-tab-item :name="menu_2[1]"
                                        :clazz="'test-tab-item'">
                                <button @click="showModal_1">测试 modal_1</button>
                                <button @click="showModal_2">测试 modal_2</button>
                                <button @click="showModal_3">测试 modal_3</button>
                                <v-modal ref="modal1" :title="'测试模态框'" :clazz="'test-style'">
                                    <div slot="content">
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
                                <v-modal ref="modal2"
                                         :from="from"
                                         :title="'测试模态框'">
                                    <div slot="content"></div>
                                </v-modal>
                                <v-modal ref="modal3" :title="'测试模态框'">
                                    <div slot="content">
                                        <v-list :list="list"
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
                            </v-tab-item>
                            <v-tab-item :name="menu_2[2]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">22</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_2[3]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">23</h3>
                            </v-tab-item>
                        </v-tab-content>
                    </v-tab-container>
                </v-tab-item>
                <v-tab-item :name="menu[2]">
                    <v-tab-container>
                        <v-tab-menu :clazz="'bar-style'"
                                    v-model="active_3"
                                    :lineWidth="15"
                                    :menu="menu_3">
                        </v-tab-menu>
                        <v-tab-content v-model="active_3">
                            <v-tab-item :name="menu_3[0]"
                                        :init="true"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">30</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[1]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">31</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[2]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">32</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[3]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">33</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[4]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">34</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[5]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">35</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[6]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">36</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[7]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">37</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[8]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">38</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[9]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">39</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[10]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">310</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[11]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">311</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[12]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">312</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[13]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">313</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[14]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">314</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_3[15]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">315</h3>
                            </v-tab-item>
                        </v-tab-content>
                    </v-tab-container>
                </v-tab-item>
                <v-tab-item :name="menu[3]">
                    <v-tab-container>
                        <v-tab-menu :clazz="'bar-style'"
                                    v-model="active_4"
                                    :lineWidth="15"
                                    :menu="menu_4">
                        </v-tab-menu>
                        <v-tab-content v-model="active_4">
                            <v-tab-item :name="menu_4[0]" :init="true">
                                <p>测试视频播放器</p>
                                <div style="height:244px">
                                    <v-video :source="source"
                                             :poster="'https://ss2.meipian.me/official/resource/video-cover.gif'"
                                             :clazz="'video-style'">
                                    </v-video>
                                </div>
                            </v-tab-item>
                            <v-tab-item :name="menu_4[1]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">41</h3>
                            </v-tab-item>
                            <v-tab-item :name="menu_4[2]"
                                        :clazz="'test-tab-item'">
                                <h3 v-for="item in 20">42</h3>
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
                    :fixed="true"
                    :clazz="'menu-style'"
            ></v-tab-menu>
        </v-tab-container>
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
            active: 'intro',
            active_1: 'intro',
            active_2: 'tabs',
            active_3: '直播',
            active_4: 'video',
            menu: ['intro', 'layouts', 'tools', 'others'],
            menu_1: ['intro', 'popup', 'toast', 'loading', 'message'],
            menu_2: ['tabs', 'modal', 'waterfall', 'swiper', 'header', 'drawer', 'search', 'menu'],
            menu_3: ['直播', '番剧', '动画', '国创', '音乐', '舞蹈', '游戏', '科技', '生活', '鬼畜', '时尚', '广告', '娱乐', '电影', '电视剧', '游戏中心'],
            menu_4: ['video', 'music', 'ripple'],
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
            range: 100,
            from: 0
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
            this.from = this.random([0, 1, 2, 3]);
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
            let n = Math.floor(Math.random() * array.length + 1) - 1;
            return array[n]
        },

        showToast () {
            $toast.show({
                tips: 'this is a toast',
                icon: 'http://cn.vuejs.org/images/logo.png',
                showIcon: true,
                position: 2
            }).then(() => {

            })
        },

        showLoading () {
            $loading.show({
                tips: 'this is a loading',
                position: 0
            });

            setTimeout(() => {
                $loading.hide()
            }, 3000)
        },

        testFunc () {
            console.log('123');
        }
    }
}
</script>