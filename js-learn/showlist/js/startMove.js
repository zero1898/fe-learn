/**
 * 完美运动模块
 */

var startMove = function() {
    /**
     * @param {HTMLElement} element 运动对象
     * @param {JSON}        json    属性：目标值
     *   @property {String} attr    属性值
     *   @config   {Number} target  目标值
     * @param {function}    func    可选，回调函数，链式动画。
     */
    function run(element, json, func) {
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
                speed = (json[attr] - currentStyle) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                //3.未到达目标值时，执行代码
                if (currentStyle !== json[attr]) {
                    flag = false; //多属性未运动完毕
                    if (attr === 'opacity') { //为透明度时，执行
                        element.style.filter = 'alpha(opacity:' + (currentStyle + speed) + ')'; //IE
                        element.style.opacity = (currentStyle + speed) / 100; //标准
                    } else { //默认
                        element.style[attr] = currentStyle + speed + 'px';
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
        run: run,
        getStyle: getStyle
    };
}();
