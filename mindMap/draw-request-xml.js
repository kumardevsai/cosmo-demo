// 画板对象 包含面板元素
var mindPaper;
window.onload = function() {
    // 绑定面板到指定的div上
    mindPaper = new MindPaper(document.getElementById('draw_panel'), 'mindPaper0');
    // 获取面板元素
    r = mindPaper.draw().raphael;
    // 测试xml文件位置
    var filepath = 'demo.xml';
    // 获取脑图根节点对象
    var mindNodeRoot = getMindDocStruct(filepath);
    // 根节点绑定面板并绘制
    mindNodeRoot.bindMindPaper(mindPaper).draw();
    // 遍历脑图节点
    for (var i = 0, ii = mindPaper.mindNodes.length; i < ii; i++) {
        // 设置脑图节点样式
        mindPaper.mindNodes[i].element.attr({
            fill: '#000000',
            "fill-opacity": 0,
            "stroke-width": 2,
            cursor: "move"
        });
        // 获取脑图节点的元素
        var element = mindPaper.mindNodes[i].element;
        // 设置元素的事件拖动
        element.drag(move, dragger, up);
        // 设置鼠标点击事件
        element.click(eleClick);
    }
    // 绘制连接线
    mindPaper.connectChildMindNodes().drawChildMindNodesConnection();

    // 按钮事件绑定
    bindBtnsEvent();
};

// 元素拖动方法
var dragger = function() {
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    this.animate({
        "fill-opacity": .2
    }, 200);
};
// 移动重绘
var move = function(dx, dy) {
    var att = this.type == "rect" ? {
        x: this.ox + dx,
        y: this.oy + dy
    } : {
        cx: this.ox + dx,
        cy: this.oy + dy
    };
    this.attr(att);
    // 重新绘制连接线
    for (var i = mindPaper.mindConnections.length; i--;) {
        mindPaper.raphael.connection(mindPaper.mindConnections[i].element);
    }
    // 强制safari渲染
    mindPaper.raphael.safari();
};

// 元素点击
var eleClick = function(e, x, y) {
    eleClickAnimate(this);
    // 恢复前一个选中节点的样式
    if (mindPaper.currentSelected && mindPaper.currentSelected !== this.ownMindNode)
        up(mindPaper.currentSelected.element);
    // 设置当前被选中节点的样式
    mindPaper.setCurrentSelected(this.ownMindNode);
};

// 鼠标点击节点设置样式
var eleClickAnimate = function(ele) {
    ele.animate({
        "fill-opacity": .2,
        "stroke": 'blue',
        "fill": "#000000"
    }, 200);
};

// 鼠标抬起恢复节点样式
var up = function(ele) {
    ele = ele ? ele : this;
    if (ele instanceof MouseEvent)
        ele = this;
    ele.animate({
        "fill-opacity": 0,
        'stroke': '#000000',
        "file": "#000000"
    }, 200);
};

// 绑定按钮事件
var bindBtnsEvent = function() {
    var add_btn = document.getElementById('add_mindNode');
    var del_btn = document.getElementById('del_mindNode');
    var clear_btn = document.getElementById('clear');
    var clearBranch_btn = document.getElementById('clear_branch');
    AttachEvent(add_btn, 'click', addMindNode, false);
    AttachEvent(del_btn, 'click', delMindeNode, false);
    AttachEvent(clear_btn, 'click', clearMindPaper, false);
    AttachEvent(clearBranch_btn, 'click', clearMindPaperBrach, false);
};

// 添加节点
var addMindNode = function() {
    var currentSelected = mindPaper.currentSelected;
    if (!currentSelected) {
        alert('请选择父节点!');
        return;
    }
    var newMindNode = new MindNode();
    currentSelected.addLeafNode(newMindNode);
    newMindNode.draw();
    var mindConnection = new MindConnection().connect(currentSelected, newMindNode).bindMindPaper(mindPaper).draw();
};

// 删除节点
var delMindeNode = function() {};

// 清空面板
var clearMindPaper = function() {};

// 清空根节点分支
var clearMindPaperBrach = function() {};