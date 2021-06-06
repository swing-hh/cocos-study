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
        loginNode: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loginNode = this.loginNode.getComponent(cc.Animation)
        this.loginNode.node.active = false
        this.loginNode.hideFun = ()=> {
            cc.log('hide结束事件触发')
        }
        cc.log(this.loginNode)
    },

    start () {

    },

    testShowFun() {
        this.loginNode.node.active = true
        this.loginNode.play("loginShow")
        cc.log('test')
    },

    testHideFun() {
        this.loginNode.play("loginHide")
    }
    // update (dt) {},
});
