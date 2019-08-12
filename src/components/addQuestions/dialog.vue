<template>
    <transition name='dialog' v-on:after-leave='leave'>
        <div class='dialog-masker' v-if='isShow'> 
            <div class='dialog-wrap'>
                <h6>{{title}}</h6>
                <div>
                    <div v-if='content'>{{content}}</div>
                    <jcontent v-if='!content'></jcontent>
                </div>
                <div class='dialog-footer'>
                    <button v-on:click='close(1)'>确定</button>
                    <button v-on:click='close(0)'>取消</button>
                </div>
        </div>
    </transition>
</template>

<script>
    export default {
        methods: {
            leave() {
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            close(flage) {
                this.isShow = false
                // this.$destroy();
                this.callback && this.callback(flage, flag == 1 && {...this.$children[0]._data}); 
            }
        }
    };
</script>

<style>
    .dialog-masker {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 999999;
        
    }

    .dialog-wrap {
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        min-width: 60%;
        min-height: 100px;
        padding: 10px;
        border-radius: 3px;
        font-size: 16px;
        box-sizing: border-box;
        transform: translate3d(-50%, -50%, 0);
    }
    .dialog-enter{opacity: 0;}
    .dialog-enter-to{opacity: 1;}
    .dialog-enter-active{
        transition: opacity linear .3s;
    }
    .dialog-leave{opacity: 1;}
    .dialog-leave-to{opacity: 0;}
    .dialog-leave-active{
        transition: opacity linear .3s;
    }
</style>
