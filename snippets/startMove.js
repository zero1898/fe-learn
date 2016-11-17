/**
 * 完美运动模块
 */

var startMove = function() {

    /**
     * 缓冲运动
     * @param {HTMLElement} element 运动对象
     * @param {JSON}        json    属性：目标值
     *   @property {String} attr    属性值
     *   @config   {Number} target  目标值
     * @param {function}    func    可选，回调函数，链式动画。
     */
    function ease(element, json, func) {
        clearInterval(element.timer); //停止上一次定时器
        var currentStyle = 0; //当前属性值
        var speed = 0; //运动速度

        element.timer = setInterval(function() {
            var flag = true; //多属性运动标志，true为运动完毕

            for (var attr in json) {
                //1.取当前的属性值。
                if (attr === 'opacity') { //为透明度时执行。
                    currentStyle = Math.round(parseFloat(getStyle(element, attr)) * 100);
                } else { //默认情况
                    currentStyle = parseInt(getStyle(element, attr));
                }
                //2.计算运动速度,动画缓冲效果
                speed = (json[attr] - currentStyle) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                //3.未到达目标值时，执行代码
                if (currentStyle !== json[attr]) {
                    flag = false; //多属性未运动完毕
                    var tmpStyle = currentStyle + speed;
                    if (attr === 'opacity') { //为透明度时，执行
                        element.style.filter = 'alpha(opacity:' + tmpStyle + ')'; //IE
                        element.style.opacity = tmpStyle / 100; //标准
                    } else { //默认
                        element.style[attr] = tmpStyle + 'px';
                    }
                }
            }
            // 运动终止，并判断是否有链式运动
            if (flag) {
                clearInterval(element.timer);
                if (func) {
                    func();
                }
            }
        }, 30);
    }

    /**
     * 弹性运动
     * @param {HTMLElement} element 运动对象
     * @param {JSON}        json    属性：目标值
     *   @property {String} attr    属性值
     *   @config   {Number} target  目标值
     * @param {function}    func    可选，回调函数，链式动画。
     */
    function elastic(element, json, func) {
        clearInterval(element.timer); //停止上一次定时器
        var currentStyle = 0; //当前属性值
        var speed = [];
        for (var attr in json) {
            speed[attr] = 0;
        }

        element.timer = setInterval(function() {
            var flag = true; //多属性运动标志，true为运动完毕

            for (var attr in json) {
                //1.取当前的属性值。
                if (attr === 'opacity') { //为透明度时执行。
                    currentStyle = Math.round(parseFloat(getStyle(element, attr)) * 100);
                } else { //默认情况
                    currentStyle = parseFloat(getStyle(element, attr));
                }
                //2.计算运动速度,动画弹性效果
                speed[attr] += (json[attr] - currentStyle) / 10;
                speed[attr] *= 0.7;
                //3.未到达目标值时，执行代码
                if (Math.abs(speed[attr]) <= 1 && Math.abs(json[attr] - currentStyle) <= 1) {
                    if (attr === 'opacity') { //为透明度时，执行
                        element.style.filter = 'alpha(opacity:' + json[attr] + ')'; //IE
                        element.style.opacity = json[attr] / 100; //标准
                    } else { //默认
                        element.style[attr] = json[attr] + 'px';
                    }
                } else {
                    flag = false; //多属性未运动完毕
                    var tmpStyle = currentStyle + speed[attr];
                    //消除弹性过界
                    if ((attr === 'width' || attr === 'height' || attr === 'opacity') && tmpStyle < 0) {
                        tmpStyle = 0;
                    }
                    if (attr === 'opacity') { //为透明度时，执行
                        element.style.filter = 'alpha(opacity:' + tmpStyle + ')'; //IE
                        element.style.opacity = tmpStyle / 100; //标准
                    } else { //默认
                        element.style[attr] = tmpStyle + 'px';
                    }
                }
            }
            // 运动终止，并判断是否有链式运动
            if (flag) {
                clearInterval(element.timer);
                if (func) {
                    func();
                }
            }
        }, 30);
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

    //对外接口
    return {
        ease: ease,
        elastic: elastic,
        getStyle: getStyle
    };
}();
