import Vue from 'vue';
import dialog from './dialog.vue';

let DialogConstructor = Vue.extend(dialog)

function createDialog(options) {
    let { title = '提示框', content = '这是提示内容', callback } = options;
    let components = {}
    if(typeof content != 'string') {
        components.jcontent = content;
    }

    let jdialog = new DialogConstructor({
        el: document.createElement('div'),
        data() {
            return {
                isShow: false,
                title,
                content: typeof content !== 'string' ? false: content,
                callback
            }
        },
        components
    })
    document.body.appendChild(jdialog.$el);

    Vue.nextTick(() => {
        jdialog.isShow = true
    })
}

export default function(Vue, option) {
    Object.defineProperty(Vue.prototype, '$dialog', {
        value(options) {
            createDialog(options)
        }
    })
}
