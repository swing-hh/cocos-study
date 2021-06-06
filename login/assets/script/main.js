cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: {
            type: cc.Node,
            default: null
        },
        progress: {
            type: cc.Node,
            default: null
        },
        progressSpeed: {
            type: cc.Integer,
            default: 0
        },
        bgNode: {
            type: cc.Node,
            default: null
        },
        loginPrefab: {
            type: cc.Prefab,
            default:null
        }
    },

    // onLoad () {},

    start() {
        // 进度条的宽度
        this.progressMaxWidth = this.progress.width
        // 进度条开关
        this.progressSwitch = true
        cc.log(this.progressBar)

    },

    update(dt) {
        if (this.progressSwitch) {
            if (this.progressBar.width < this.progressMaxWidth) {
                this.progressBar.width += this.progressSpeed * dt;
            } else {
                this.progressBar.width = this.progressMaxWidth
                this.progressSwitch = false
                this.addLoginPrefab()
            }
        }
    },

    addLoginPrefab() {
        if (this.loginPrefab !== null) {
            const loginNode = cc.instantiate(this.loginPrefab);
            this.hideProgress()
            this.bgNode.addChild(loginNode)
            this.loginScript = loginNode.getComponent('login');
            this.loginScript.loginSucFun = this.loginSucFun
        }
    },

    loginSucFun() {
        cc.log('登陆成功后的回掉')
    },

    hideProgress() {
        this.progress.active = false
    }
});
