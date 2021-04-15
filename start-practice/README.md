# cocos 练习项目总结

## 项目目录结构
assets 开发目录
>audio 音频文件
>floder 预置文件
>scripts 脚本文件
>textures 图片纹理文件
>game 场景入口
>mikado_outline_shadow.fnt 字体文件

## cocos编辑器各个模块
>资源管理器 显示我们的各种资源，包含场景、图片音频字体脚本等、预置资源
>层级管理器 一个场景显示所有节点，在这可以管理层级、父子关系
>场景编辑器 场景元素位置、旋转、缩放、尺寸等属性
>属性检查器 场景元素属性的表单配置，比层级编辑器更强大，提供脚本、资源、预置资源的绑定
>控件库 cocos提供默认的控件
>控制台 显示报错、报警等信息
>工具栏 变换工具、预览、打开文件夹等一些工具功能
>构建预览 运行在web或者原生查看效果

## 开始开发一个项目
* 检查游戏资源图片、音频、字体文件
* 创建游戏场景，在层级管理器会生成对应的canvas节点，称之为主场景
* 拖动游戏的背景、地面、主角到层级管理器的canvas中称之为组件，通过场景编辑器和属性编辑器调整位置大小，通过层级编辑器调整资源的显示位置
* 资源管理器添加主角脚本，主角资源属性区添加script脚本资源绑定（可以绑定多个）
* 脚本使用全局的cc.Class()方法声明，cc是Cocos的简称，包含引擎代码中所有的类、函数、属性和常量，属于一个类似与window或global的全局对象。
* 脚本中properties类似与vue的data，可以添加一些基础的属性和资源对应，在编辑器中可以动态传入

* 跳跃代码理解
```
runJumpAction () {
    // 跳跃上升
    var jumpUp = cc.tween().by(this.jumpDuration, {y: this.jumpHeight}, {easing: 'sineOut'});
    // 下落
    var jumpDown = cc.tween().by(this.jumpDuration, {y: -this.jumpHeight}, {easing: 'sineIn'});

    // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
    var tween = cc.tween().sequence(jumpUp, jumpDown)
    // 不断重复
    return cc.tween().repeatForever(tween);
},
onLoad: function () {
    var jumpAction = this.runJumpAction();
    cc.tween(this.node).then(jumpAction).start()
},
```
主要使用了cc.tween 缓动系统来做动画，this.node为当前绑定的节点资源，使用cc.tween().by()创建上升下落对象，cc.tween().sequence()创建一个缓动对象，cc.tween().repeatForever()规定了重复的方式，onload事件后使用start方法开始执行这个缓动动画

* 移动代码理解
```
runJumpAction: function () {
    //...
},

onKeyDown (event) {
    // set a flag when key pressed
    switch(event.keyCode) {
        case cc.macro.KEY.a:
            this.accLeft = true;
            break;
        case cc.macro.KEY.d:
            this.accRight = true;
            break;
    }
},

onKeyUp (event) {
    // unset a flag when key released
    switch(event.keyCode) {
        case cc.macro.KEY.a:
            this.accLeft = false;
            break;
        case cc.macro.KEY.d:
            this.accRight = false;
            break;
    }
},
onLoad: function () {
    // 初始化跳跃动作
    var jumpAction = this.runJumpAction();
    cc.tween(this.node).then(jumpAction).start()

    // 加速度方向开关
    this.accLeft = false;
    this.accRight = false;
    // 主角当前水平方向速度
    this.xSpeed = 0;

    // 初始化键盘输入监听
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
},

onDestroy () {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},

update: function (dt) {
    // 根据当前加速度方向每帧更新速度
    if (this.accLeft) {
        this.xSpeed -= this.accel * dt;
    }
    else if (this.accRight) {
        this.xSpeed += this.accel * dt;
    }

    // 限制主角的速度不能超过最大值
    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
        // if speed reach limit, use max speed with current direction
        this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    }

    // 根据当前速度更新主角的位置
    this.node.x += this.xSpeed * dt;
},
```
使用cc.systemEvent.on()监听键盘事件，绑定对应的按下ad控制防水键盘打开，在页面更新方法中监听控制键打开执行刷新位置操作，通过this.node.x更新位置，组件销毁事件中移除绑定事件

* 制作Prefab
像是随机星星这种组件需要重复生成，这时候无法使用固定位置。资源拖入到层级管理器中，添加对应的属性。从层级管理器拖入到资源管理器中生成对应的预置资源，然后在资源管理器双击预置资源，属性管理器中点击保存，这时候删除掉层级管理器中的资源即可。

* 添加游戏控制脚本
```
properties: {
    // 这个属性引用了星星预制资源
    starPrefab: {
        default: null,
        type: cc.Prefab
    },

    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,

    // 地面节点，用于确定星星生成的高度
    ground: {
        default: null,
        type: cc.Node
    },

    // Player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    player: {
        default: null,
        type: cc.Node
    }
},
```
canvas节点中也可以增加脚本控制，属性中可以增加节点、预置资源属性，添加后属性编辑区将对应的资源拖入即可完成赋值

* 生成随机星星位置
```
onLoad: function () {
    // 获取地平面的 y 轴坐标
    this.groundY = this.ground.y + this.ground.height/2;
    // 生成一个新的星星
    this.spawnNewStar();
},

spawnNewStar: function() {
    // 使用给定的模板在场景中生成一个新节点
    var newStar = cc.instantiate(this.starPrefab);
    // 将新增的节点添加到 Canvas 节点下面
    this.node.addChild(newStar);
    // 为星星设置一个随机位置
    newStar.setPosition(this.getNewStarPosition());
},

getNewStarPosition: function () {
    var randX = 0;
    // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
    var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
    // 根据屏幕宽度，随机得到一个星星 x 坐标
    var maxX = this.node.width/2;
    randX = (Math.random() - 0.5) * 2 * maxX;
    // 返回星星坐标
    return cc.v2(randX, randY);
},
```
简单理解为获取地面的高度，生成的星星需要限定到一定的位置中，否则主角无法碰撞到。使用cc.instantiate()获得预置对象，this.node.addChild()添加新的节点setPosition()设置位置

* 添加星星的触碰行为
```
game.js
spawnNewStar: function() {
    // ...
    // 在星星脚本组件上保存 Game 对象的引用
    newStar.getComponent('Star').game = this;
},

star.js
getPlayerDistance: function () {
    // 根据 Player 节点位置判断距离
    var playerPos = this.game.player.getPosition();
    // 根据两点位置计算两点之间距离
    var dist = this.node.position.sub(playerPos).mag();
    return dist;
},

onPicked: function() {
    // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
    this.game.spawnNewStar();
    // 然后销毁当前星星节点
    this.node.destroy();
},
update: function (dt) {
    // 每帧判断星星和主角之间的距离是否小于收集距离
    if (this.getPlayerDistance() < this.pickRadius) {
        // 调用收集行为
        this.onPicked();
        return;
    }
},
```
在星星脚本Component上保存game对象的引用便于使用，在星星执行的刷新方法中判断player和星星对象的距离，当小于一定的距离后，执行game中的生成星星逻辑，同时销毁当前节点

* 添加得分
使用基础控件文字，填写默认的string，将字体文件拖入对应font属性中替换字体

* 添加得分逻辑
```
game.js
properties: {
    // ...
    // score label 的引用
    scoreDisplay: {
        default: null,
        type: cc.Label
    }
},
onLoad: function () {
    // ...
    // 初始化计分
    this.score = 0;
},
gainScore: function () {
    this.score += 1;
    // 更新 scoreDisplay Label 的文字
    this.scoreDisplay.string = 'Score: ' + this.score;
},

star.js
onPicked: function() {
    // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
    this.game.spawnNewStar();

    // 调用 Game 脚本的得分方法
    this.game.gainScore();

    // 然后销毁当前星星节点
    this.node.destroy();
},
```
主场景添加对应的资源对应，game提供对应的修改记录分数的方法，star监听到主角与星星碰撞调用game的方法修改分数

* 添加星星的消失逻辑
```
game.js
onLoad: function () {
    // ...

    // 初始化计时器
    this.timer = 0;
    this.starDuration = 0;

    // 生成一个新的星星
    this.spawnNewStar();

    // 初始化计分
    this.score = 0;
},
spawnNewStar: function() {
    // ...

    // 重置计时器，根据消失时间范围随机取一个值
    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
},
update: function (dt) {
    // 每帧更新计时器，超过限度还没有生成新的星星
    // 就会调用游戏失败逻辑
    if (this.timer > this.starDuration) {
        this.gameOver();
        return;
    }

    this.timer += dt;
},
gameOver: function () {
    // 停止 Player 节点的跳跃动作
    this.player.stopAllActions(); 

    // 重新加载场景 game
    cc.director.loadScene('game');
}

star.js
update: function() {
    // ...

    // 根据 Game 脚本中的计时器更新星星的透明度
    var opacityRatio = 1 - this.game.timer/this.game.starDuration;
    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
}
```
定义了一个最小和最大的消失时间，初始化随机在min和max中取一个固定时间，添加一个计时器监测监测大于随机消失时间游戏暂停游戏重新渲染。星星组件监测时间低于50%动态修改透明度，给一个快要失败的现象

* 加入音频
```
properties: {
    // ...

    // 跳跃音效资源
    jumpAudio: {
        default: null,
        type: cc.AudioClip
    },
},
playJumpSound: function () {
    // 调用声音引擎播放声音
    cc.audioEngine.playEffect(this.jumpAudio, false);
},
```
添加音频对应，使用cc.audioEngine.playEffect()在跳跃、得分环节播放音效