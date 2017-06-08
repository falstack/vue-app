<style lang="scss" scoped>
    $fadeInTime: .2s;
    $fadeOutTime: .1s;

    @-webkit-keyframes scaleOut {
        from {
            -webkit-transform: scale(1);
            opacity: 1;
        }
        to {
            -webkit-transform: scale(0.8);
            opacity: 0;
        }
    }

    @keyframes scaleOut {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0.8);
            opacity: 0;
        }
    }

    @-webkit-keyframes superScaleIn {
        from {
            -webkit-transform: scale(1.3);
            opacity: 0;
        }
        to {
            -webkit-transform: scale(1);
            opacity: 1
        }
    }

    @keyframes superScaleIn {
        from {
            transform: scale(1.3);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .vue-pwa-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        z-index: 12;

        &.hidden {
            display: none;
        }
    }

    .vue-pwa-alert {
        width: 320px;
        background-color: #fff;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 2px 13px rgba(0, 0, 0, 0.18);

        &.hidden {
            visibility: hidden;
        }

        &.enter {
            animation-name: superScaleIn;
            animation-duration: $fadeInTime;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both
        }

        &.show {
            visibility: visible
        }

        &.leave {
            animation-name: scaleOut;
            animation-duration: $fadeOutTime;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both
        }

        .title, .sub-title {
            text-align: center;
            margin-bottom: 0;
        }

        .title {
            margin-top: 0;
            padding-bottom: 15px;
            padding-top: 20px;
        }

        .sub-title {
            margin-top: 8px;
            padding-bottom: 22px;
        }

        .buttons {
            height: 40px;
            position: relative;
            padding: 0 16px;

            &:before {
                content: '';
                background-color: #eee;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                height: 1px;
                transform: scaleY(.5);
            }

            button {
                color: #0070c9;
                font-size: 16px;
                padding: 12px 18px;
                float: right;
            }
        }
    }
</style>

<template>
    <div class="vue-pwa-container"
         :class="{ 'hidden' : !state } ">
        <div class="vue-pwa-alert vue-pwa-dialog"
             :class="{'hidden' : state === 0, 'enter' : state === 1, 'show' : state === 2, 'leave' : state === 3}">
            <h3 class="title" v-text="title"></h3>
            <p class="sub-title" v-if="content" v-text="content"></p>
            <div class="buttons">
                <button v-text="btnText" @click="submit"></button>
            </div>
        </div>
    </div>
</template>

<script>

    const fadeInTime = 200;
    const fadeOutTime = 300;

    export default {
      name: 'v-alert',

      data() {
        return {
          title: '',
          content: '',
          btnText: '',
          state: 0
        };
      },

      methods: {
        show(opt) {

          this.state = 1;
          window.$backdrop.show();

          this.title = (opt && opt.title) ? opt.title : '提示';
          this.content = (opt && opt.content) ? opt.content : '';
          this.btnText = (opt && opt.btnText) ? opt.btnText : '好';

          setTimeout(() => {
            this.state = 2;
          }, fadeInTime);

          return new window.Promise((resolve) => {
            this.$on('alertSubmitEvent', () => {
              this.hide();
              resolve();
            });
          });
        },

        hide() {
          this.state = 3;
          window.$backdrop.hide();

          setTimeout(() => {
            this.$destroy();
          }, fadeOutTime);
        },

        submit(evt) {
          evt.currentTarget.setAttribute('disabled', 'disabled');
          evt.stopPropagation();
          this.$emit('alertSubmitEvent');
        }
      },

      destroyed() {
        this.$el.parentNode.removeChild(this.$el);
      }
    };
</script>
