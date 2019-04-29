// 构造函数
// 用于自定义长按和单击指令中
export default function Vmouse(el, binding, vNode) {
    this.el = el;
    this.binding = binding;
    this.vNode = vNode;
    this.startTime = 0;

    this.el.addEventListener('mousedown', (e)=>{
        this.start(e);
    })
    this.el.addEventListener('mouseup', (e)=>{
        this.end(e);
    })
    this.el.addEventListener('touchstart', (e)=>{
        this.start(e);
    })
    this.el.addEventListener('touchend', (e)=>{
        this.end(e);
    })
}
Vmouse.prototype = {
    start: function(e) {
        this.mouseUp = false;
        this.longPress = false;
        this.startTime = e.timeStamp;
        if (e.button !== 0) {
            return;
        }
        this.timeout = setTimeout(() => {
            if(!this.mouseUp) {
                this.vNode.context.$emit('longpress-' + this.binding.value);
                this.longPress = true;
            }
        }, 1000);
    },
    end: function(e) {
        let timePressed = e.timeStamp - this.startTime;
        if (!this.longPress && timePressed < 1000) {
            this.vNode.context.$emit('click-' + this.binding.value);
            this.mouseUp = true;
        }
        clearTimeout(this.timeout);
        this.timeout = null;
    }
}

