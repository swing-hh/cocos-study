// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        zhStr: {
            type: cc.EditBox,
            default: null
        },
        mmStr: {
            type: cc.EditBox,
            default: null
        },
        toggleStr: {
            type: cc.Toggle,
            default: false
        },
        animation: {
            type: cc.Animation,
            default: null
        }
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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.log(this.bgNode)
        this.node.active = false
        this.animation.hideFun = ()=> {
            this.node.active = false
            cc.log('hide结束事件触发')
        }
        this.show()
    },

    hide() {
        // this.node.active = false
        this.animation.play("loginHide")
    },

    show() {
        this.node.active = true
        this.animation.play("loginShow")
    },

    loginFun() {
        if (this.zhStr.string !== "yaobai") return cc.log('账号不对')
        if (this.mmStr.string !== "111111") return cc.log('密码不对')
        if (!this.toggleStr.isChecked) return cc.log('同意后才能登陆')
        cc.log('登陆成功，账号是', this.zhStr.string, "密码是", this.mmStr.string)
        this.hide();
        this.loginSucFun();
    }

    // update (dt) {},
});
