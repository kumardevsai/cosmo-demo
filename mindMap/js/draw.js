'use strict';
// 获取面板元素
var r = mindPaper.draw().raphael;
// 测试xml文件位置
var filepath = 'data/demo.xml';
// 获取脑图根节点对象
var mindNodeRoot = getMindDocStruct(filepath);
// 根节点绑定面板并绘制
mindNodeRoot.bindMindPaper(mindPaper).draw();
// 遍历脑图节点
for (var i = 0, ii = mindPaper.mindNodes.length; i < ii; i++) {
    // 设置脑图节点样式
    setMindNodeStyle(mindPaper.mindNodes[i]);
    // 获取脑图节点的元素
    bindMindNodeEvents(mindPaper.mindNodes[i]);
}
// 绘制连接线
mindPaper.connectChildMindNodes().drawChildMindNodesConnection();
// 按钮事件绑定
bindBtnsEvent();

function setMindNodeStyle(mindNode) {
    var element = mindNode.element;
    element.attr({
        fill: '#000000',
        "fill-opacity": 0,
        "stroke-width": 1,
        cursor: "move"
    });
};

function bindMindNodeEvents(mindNode) {
    var element = mindNode.element;
    // 设置元素的事件拖动
    element.drag(move, dragger, function(e) {
        up(mindNode.element);
    });
    element.mousedown(function(e) {
        contextmenuonmousedown(e);
        if (e.which === 3) {
            eleClickAnimate(element);
            setCurrentSelected(mindNode);
        }
    });
    element.mouseup(function(e) {
        contextmenuonmouseup(e);
        if (e.which === 3) {
            if (mindPaper.currentSelected && mindPaper.currentSelected !== mindNode)
                up(mindNode.element);
            preventDefault_stopPropagation(e);
        }
    });
    // 设置鼠标点击事件
    element.click(eleClick);
};

// 元素拖动方法
function dragger() {
    var e = window.event ? window.event : arguments.callee.caller.arguments[0];
    preventDefault_stopPropagation(e);
    /**
    if (e.which !== 1)
        return;
    **/
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    this.animate({
        "fill-opacity": .2
    }, 200);
};
// 移动重绘
function move(dx, dy) {
    var e = window.event ? window.event : arguments.callee.caller.arguments[0];
    if (e.which !== 1)
        return;
    preventDefault_stopPropagation(e);
    var att = this.type == "rect" ? {
        x: this.ox + dx,
        y: this.oy + dy
    } : {
        cx: this.ox + dx,
        cy: this.oy + dy
    };
    this.attr(att);
    var mindNode = this.ownMindNode;
    mindNode.centerPoint = new MindPoint({
        x: att.cx,
        y: att.cy
    });
    if (mindNode.childMindNodes.length > 0) {
        mindNode.redraw();
    } else {
        mindNode.mindPaper.redrawConnections();
    }
    // 强制safari渲染
    mindPaper.raphael.safari();
};

// 元素点击
function eleClick(e, x, y) {
    preventDefault_stopPropagation(e);
    eleClickAnimate(this);
    setCurrentSelected(this.ownMindNode);
};

function setCurrentSelected(mindNode) {
    // 恢复前一个选中节点的样式
    if (mindPaper.currentSelected && mindPaper.currentSelected !== mindNode)
        up(mindPaper.currentSelected.element);
    // 设置当前被选中节点的样式
    mindPaper.setCurrentSelected(mindNode);
};
// 鼠标点击节点设置样式
function eleClickAnimate(ele) {
    ele.animate({
        "fill-opacity": .2,
        "stroke": 'blue',
        "fill": "#000000"
    }, 200);
};

// 鼠标抬起恢复节点样式
function up(ele) {
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
function bindBtnsEvent() {
    var clearBranch_btn = document.getElementById('clear_branch');
    AttachEvent(clearBranch_btn, 'click', clearMindPaperBrach, false);
};

// 添加节点
function addMindNode() {
    if (!checkSelectedMindNode('add'))
        return;
    var newMindNode = new MindNode();
    mindPaper.currentSelected.addLeafNode(newMindNode);
    newMindNode.draw();
    var mindConnection = new MindConnection().connect(mindPaper.currentSelected, newMindNode).bindMindPaper(mindPaper).draw();
    setMindNodeStyle(newMindNode);
    bindMindNodeEvents(newMindNode);
    mindPaper.currentSelected.redraw();
};

// 删除节点
function delMindeNode() {
    if (!checkSelectedMindNode('delete'))
        return;
    mindPaper.currentSelected.remove();
};

// 清空面板
function clearMindPaper() {};

// 清空根节点分支
var clearMindPaperBrach = function() {};

function checkSelectedMindNode(action) {
    var currentSelected = mindPaper.currentSelected;
    if (!currentSelected) {
        if (action === "delete")
            alert('请选择节点!');
        else if (action === 'add')
            alert('请选择父节点!');
        return false;
    }
    return true;
};

function preventDefault_stopPropagation(e) {
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false;
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
};