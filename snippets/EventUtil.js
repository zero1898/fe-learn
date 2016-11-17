/**
 * 跨浏览器的事件处理模块
 */
(function(window, document) {

    /**
     * 添加事件
     * @param {HTMLElement} element 要操作的元素
     * @param {string} type    事件名称
     * @param {function} handler 事件处理程序函数
     */
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }

    /**
     * 删除事件
     * @param {HTMLElement} element 要操作的元素
     * @param {string} type    事件名称
     * @param {function} handler 事件处理程序函数
     */
    function removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    }

    //获取事件
    function getEvent(event) {
        return event || window.event;
    }

    //获取事件的目标
    function getTarget(event) {
        return event.target || event.srcElement;
    }

    //获取鼠标事件相关元素
    function getRelatedTarget(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    }

    //取消事件的默认行为
    function preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    //阻止事件冒泡
    function stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

    /**
     * 获取鼠标按键
     * 0:表示主鼠标
     * 1:表示鼠标滚轮按钮
     * 2:表示次鼠标按钮
     */
    function getButton(event) {
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
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
    }

    //获得鼠标滚轮增量值(delta)
    function getWheelDelta(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engin.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    }

    //获得按键字符编码
    function getCharCode(event) {
        if (typeof event.charCode == 'number') {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }

    window.eventUtil = {
        "addHandler": addHandler,
        "removeHandler": removeHandler,
        "getEvent": getEvent,
        "getTarget": getTarget,
        "preventDefault": preventDefault,
        "stopPropagation": stopPropagation,
        "getRelatedTarget": getRelatedTarget,
        "getButton": getButton,
        "getWheelDelta": getWheelDelta,
        "getCharCode": getCharCode
    };

})(window, document);
