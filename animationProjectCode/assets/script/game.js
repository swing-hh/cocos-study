cc.Class({
    extends: cc.Component,

    properties: {
        monster: {
            type: cc.Animation,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStartCallback, this, true);
    },

    onTouchStartCallback(event) {
        let location = event.getLocation();
        const end = this.node.convertToNodeSpaceAR(cc.v2(location.x, location.y))
        const start = this.monster.node.getPosition();
        const angle = this.getAngle(start, end)
        this.switchDirection(angle, end)
    },

    // 角度
    getAngle: function (start, end) {
        //计算出朝向
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var dir = cc.v2(dx, dy);

        //根据朝向计算出夹角弧度
        var angle = dir.signAngle(cc.v2(1, 0));

        //将弧度转换为欧拉角
        var degree = angle / Math.PI * 180;

        return -degree
    },

    switchDirection(angle, end) {
        let direction = null
        // up
        if (angle >= 45 && angle < 135) {
            direction = 0
            // right
        } else if (angle < 45 && angle >= -45) {
            direction = 3
            // left
        } else if (angle >= 135 || angle <= - 135) {
            direction = 2
            // down
        } else {
            direction = 1
        }
        const clips = this.monster.getClips()
        // if(this.monster)
        cc.log(this.monster._currentClip)
        cc.log(this.monster._currentClip && this.monster._currentClip.name !== clips[direction].name)
        if (!this.monster._currentClip || this.monster._currentClip.name !== clips[direction].name) this.monster.play(clips[direction].name)
        if(this.action) this.monster.node.stopAction(this.action)
        this.action = cc.moveTo(2, end.x, end.y);
        this.action = this.monster.node.runAction(this.action);
    }

    // update (dt) {},
});
