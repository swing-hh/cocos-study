cc.Class({
    extends: cc.Component,

    properties: {
        // myName: "name",
        // age: 18
        mySprirw: cc.Sprite,
        updateSprite: cc.SpriteAtlas,
    },

    // onLoad () {},

    start () {
        // 关联对象的方式有两种，一种是直接声明变量类型然后拖拽元素赋值，还有一种形式是通过当前节点用代码直接获取子节点
        cc.log("mySprirw", this.mySprirw)
        cc.log("mySprirw1", this.node.getChildByName("sprite"))
        cc.log(this.myName, this.age)
    },

    onClick(target, data) {
        if(data === "spriteButton"){
            this.mySprirw.spriteFrame = this.updateSprite.getSpriteFrame("a12")
            cc.log("spriteButton")
        }else if(data === "change"){
            cc.director.loadScene("piazaView");
        }else{
            this.mySprirw.spriteFrame = this.updateSprite.getSpriteFrame("a13")
            cc.log("colorButton")
        }
        // cc.log('button 点击了', target, data, data1)
        // var a = 100;
        // this.test(a);
    },

    // test(a) {
    //     // console.log(a)
    // }
    // update (dt) {},
});
