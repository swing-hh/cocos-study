cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start () {

    },

    onClick() {
        cc.log('button 点击了')
        var a = 100;
        this.test(a);
    },

    test(a) {
        console.log(a)
    }
    // update (dt) {},
});
