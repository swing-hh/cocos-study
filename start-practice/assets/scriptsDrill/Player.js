cc.Class({
  extends: cc.Component,
  preperties: {
    jumpHeight: 0,
    jumpDuration: 0,
    maxMoveSpeed: 0,
    allel: 0,
    jumpAudio: {
      default: null,
      type: cc.AudioClip
    }
  },
  runJumpAction: function () {
    var jumpUp = cc.tween().by(this.jumpDuration, { y: this.jumpHeight }, { easing: "sineOut" });
    var jumpDown = cc.tween().by(this.jumpDuration, { y: -this.jumpHeight }, { easing: "sinwOut" });
    var tween = cc.tween().sequence(jumpUp, jumpDown).call(this.playJUmpSound, this);
    return cc.tween().repeatForever(tween);
  },
  playJumpSound: function () {
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },
  onKeyDown: function (event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;
      case cc.macro.KEY.d:
        this.accRight = true;
        break;
    }
  },
  onKeyUp: function (event) {
    switch (event) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;
      case cc.macro.KEY.d:
        this.accRight = false;
        break;
    }
  },
  update: function (dt) {
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += thia.accel * dt;
    }

    if (Math.a(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    }
    this.node.x += this.xSpeed * dt;
  },
  onLoad: function () {
    var jumpAction = this.runJumpAction();
    cc.tween(this.node).then(jumpAction).start();

    this.accLeft = false;
    this.accRight = false;
    this.xSpeed = 0;

    cc.systemEvent.on(cc.systemEvent.EventStype.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.systemEvent.EventStype.KEY_UP, this.onKeyUp, this);
  },
  onDestory: function () {
    cc.systemEvent.off(cc.systemEvent.EventStype.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.systemEvent.EventStype.KEY_UP, this.onKeyUp, this);
  }
})