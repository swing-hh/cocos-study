function createAlert(parent, tip, confirmFun, cancelFun) {
    cc.resources.load("alert", (err, prefab)=> {
        let node = cc.instantiate(prefab)
        parent.addChild(node);
        node = node.getComponent("alert")
        node.show(tip, confirmFun, cancelFun);
        console.log(111, node)
    })
}