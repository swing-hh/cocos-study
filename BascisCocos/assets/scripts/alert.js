// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        label: {
            type: cc.Label,
            default: null
        },
        confirmFun1: null,
        cancelFun: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // 显示prefab
    show(tip, confirmFun = function(){}, cancelFun = function() {}) {
        this.clear()
        this.node.active = true;
        this.setTip(tip);
        this.setConfirmFun(confirmFun)
        this.setCancelFun(cancelFun)
    },

    clear() {
        this.setTip('');
        this.setConfirmFun(null)
        this.setCancelFun(null)
    },

    closeFun() {
        this.node.active = false;
        if(this.cancelFun !== null) {
            this.cancelFun()
        }
    },

    confirmFun() {
        this.node.active = false;
        if(this.confirmFun1 !== null) {
            this.confirmFun1()
        }
    },

    setTip(str) {
        this.label.string = str
    },

    setConfirmFun(confirmFun) {
        this.confirmFun1 = confirmFun
    },

    setCancelFun(cancelFun) {
        this.cancelFun = cancelFun
    }

    // update (dt) {},
});
