/**
 * 时间版运动框架
 * @param  {HTMLElement}   element   运动的元素
 * @param  {json}   json  多运动的属性
 * @param  {number}   duration 运动持续时间
 * @param  {String}   fx    运动方式 Tween的运动形式
 * @param  {Function} fn    回调函数
 */
function startMove(element, json, duration, fx, fn) {

    // 自定义参数
    if (typeof duration === 'undefined') {
        duration = 400;
        fx = 'linear';
    } else if (typeof duration === 'string') {
        if (typeof fx === 'function') {
            fn = fx;
        }
        fx = duration;
        duration = 400;
    } else if (typeof duration === 'function') {
        fn = duration;
        duration = 400;
        fx = 'linear';
    } else if (typeof duration === 'number') {
        if (typeof fx === 'function') {
            fn = fx;
            fx = 'linear';
        } else if (typeof fx === 'undefined') {
            fx = 'linear';
        }
    }

    // 遍历运动属性的初始值
    var beginningValue = {};
    for (var attr in json) {
        beginningValue[attr] = 0; //初始化
        if (attr === 'opacity') {
            beginningValue[attr] = Math.round(getStyle(element, attr) * 100); //透明度单独处理
        } else {
            beginningValue[attr] = parseInt(getStyle(element, attr)); //其他属性直接获取属性
        }
    }

    // 清除定时器
    clearInterval(element.timer);
    var startTime = now(); //获取运动开始时间

    element.timer = setInterval(function() {

        // 定时器开启的时间节点
        var changeTime = now();
        // 运动到当前位置所需运行时间 = 运动持续时间 - 运动剩余时间(max限定运动剩余时间不能为负)
        var currentTime = duration - Math.max(0, startTime - changeTime + duration);

        for (var attr in json) {
            // 运动的改变量 = 运动终点坐标-运动起点坐标
            var changeInValue = json[attr] - beginningValue[attr];
            // 目标点位置 = Tween[fx](currentTime, beginningValue, changeInValue, duration)
            var value = Tween[fx](currentTime, beginningValue[attr], changeInValue, duration);

            if (attr === 'opacity') {
                element.style.opacity = value / 100;
                element.style.filter = 'alpha(opacity=' + value + ')';
            } else {
                element.style[attr] = value + 'px';
            }
        }

        if (currentTime === duration) {
            clearInterval(element.timer);
            if (fn) {
                fn();
            }
        }

    }, 13);

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
    // 获取当前时间
    function now() {
        return (new Date()).getTime();
    }

}


var Tween = {
    linear: function(t, b, c, d) { //匀速
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) { //加速曲线
        return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) { //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function(t, b, c, d) { //加速减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d) { //加加速曲线
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function(t, b, c, d) { //减减速曲线
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 3.70158; //回缩的距离
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}
