//动态脚本
function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
//动态样式
function loadStyles(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}

/**
 * 正序排序
 * @param  {array} arr
 * @return {array}
 */
function ascSort(arr) {
    function compare(value1, value2) {
        if (value1 < value2) {
            return -1;
        } else if (value2 < value2) {
            return 1;
        } else {
            return 0;
        }
    }
    arr.sort(compare);
    return arr;
}

/**
 * 倒序排序
 * @param  {array} arr
 * @return {array}
 */
function descSort(arr) {
    function compare(value1, value2) {
        if (value1 < value2) {
            return 1;
        } else if (value2 < value2) {
            return -1;
        } else {
            return 0;
        }
    }
    arr.sort(compare);
    return arr;
}

/**
 * 获取非行间样式,只能取单一样式,不能取复合样式
 * @param  {obj} obj
 * @param  {style} style [description]
 * @return {style}
 */
function getStyle(obj, styleName) {
    if (obj.currentStyle) {
        // ie
        return obj.currentStyle[styleName];
    } else {
        // chrome firefox
        return getComputedStyle(obj, false)[styleName];
    }
}

/**
 * 跨浏览器的事件处理程序
 */
var EventUtil = {
    /**
     * 添加事件
     * @param {[type]} element 要操作的元素
     * @param {[type]} type    事件名称
     * @param {[type]} handler 事件处理程序函数
     */
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    //获取事件
    getEvent: function(event) {
        return event ? event : window.event;
    },
    //获取事件的目标
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    //取消事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    /**
     * 删除事件
     * @param {[type]} element 要操作的元素
     * @param {[type]} type    事件名称
     * @param {[type]} handler 事件处理程序函数
     */
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    //阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //获取鼠标事件相关元素
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },

    /**
     * 获取鼠标按键
     * 0:表示主鼠标
     * 1:表示鼠标滚轮按钮
     * 2:表示次鼠标按钮
     */
    getButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    //获得鼠标滚轮增量值(delta)
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engin.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    //获得按键字符编码
    getCharCode: function(event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
};
