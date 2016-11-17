//将nodeList对象转为array
function convertToArray(nodes) {
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes, 0);
    } catch (ex) {
        array = [];
        for (var i = 0, len = nodes.length; i < len; i++) {
            array.push(nodes[i]);
        }
    }
}

//动态脚本
function loadScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
}

//动态样式
function loadStyles(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}

//动态添加window.onload函数
function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldOnload();
            func();
        };
    }
}

//在目标节点之后插入新节点
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//添加新class
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        var newClassName = element.className;
        newClassName += ' ';
        newClassName += value;
        element.className = newClassName;
    }
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
 * @param   {HTMLElement}   element  需要寻找的样式的html节点
 * @param   {String]} attr 在对象中寻找的样式属性
 * @return {String} 获取到的属性
 */
function getStyle(element, attr) {
    if (element.currentStyle) {
        // ie
        return element.currentStyle[attr];
    } else {
        //标准
        return getComputedStyle(element, false)[attr];
    }
}
