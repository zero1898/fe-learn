(function(window, document, Math) {

    var tagList, tagEles, CX, CY, EX, EY,
        RADIUS = 250, // 半径
        fallLength = 450, // 焦距
        fontSize = 20, // 字体大小
        tags = [],
        angleX = Math.PI / 500,
        angleY = Math.PI / 500;

    function init(data, eleId) {
        appendList(data, eleId);
        generateXYZ();
        move();
        eventlisten();
        animate();
    }

    // 生成网页结构
    function appendList(data, eleId) {
        tagList = document.createElement('div');
        tagList.style.position = 'relative';
        tagList.style.width = '700px';
        tagList.style.height = '700px';
        tagList.style.margin = '50px auto';
        for (var i = 0, len = data.length; i < len; i++) {
            var tagEle = document.createElement('a');
            tagEle.href = data[i].href;
            tagEle.target = '_blank';
            tagEle.innerHTML = data[i].test;
            tagEle.style.color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
            tagEle.style.display = 'block';
            tagEle.style.position = 'absolute';
            tagEle.style.textDecoration = 'none';
            tagEle.style.fontWeight = 'bold';
            tagEle.style.fontFamily = '微软雅黑 sans-serif';

            tagList.appendChild(tagEle);
        }
		document.getElementById(eleId).appendChild(tagList);
    }

    // 生成球面上的点的x,y,z轴的坐标
    function generateXYZ() {
        tagEles = tagList.getElementsByTagName('a');
        // 初始化常量
        CX = tagList.offsetWidth / 2;
        CY = tagList.offsetHeight / 2;
        EX = tagList.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft;
        EY = tagList.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;

        for (var i = 0, len = tagEles.length; i < len; i++) {
            var k = -1 + (2 * (i + 1) - 1) / len;
            var a = Math.acos(k);
            var b = a * Math.sqrt(len * Math.PI);
            var x = RADIUS * Math.sin(a) * Math.cos(b);
            var y = RADIUS * Math.sin(a) * Math.sin(b);
            var z = RADIUS * Math.cos(a);

            // 存入tags数组
            tags.push({
                "ele": tagEles[i],
                "x": x,
                "y": y,
                "z": z
            });
        }
    }

    // 设置标签属性
    function move() {
        var scale, alpha;
        for (var i = 0, len = tags.length; i < len; i++) {
            scale = fallLength / (fallLength - tags[i].z);
            alpha = (tags[i].z + RADIUS) / (2 * RADIUS);
            tags[i].ele.style.color = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';
            tags[i].ele.style.fontSize = fontSize * scale + "px";
            tags[i].ele.style.opacity = alpha + 0.5;
            tags[i].ele.style.filter = "alpha(opacity = " + (alpha + 0.5) * 100 + ")";
            tags[i].ele.style.zIndex = parseInt(scale * 100);
            tags[i].ele.style.left = tags[i].x + CX - tags[i].ele.offsetWidth / 2 + "px";
            tags[i].ele.style.top = tags[i].y + CY - tags[i].ele.offsetHeight / 2 + "px";
        }
    }

    // 给tagList添加鼠标滑动事件监听
    function eventlisten() {
        addHandler(tagList, 'mousemove', function(event) {
            var ev = getEvent(event);
            var x = ev.clientX - EX - CX;
            var y = ev.clientY - EY - CY;
            angleY = x * 0.0001;
            angleX = y * 0.0001;
        });
    }
    // 添加事件
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }
    //获取事件
    function getEvent(event) {
        return event || window.event;
    }

    // 获取新的 xyz 坐标
    function rotateX() {
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        for (var i = 0, len = tags.length; i < len; i++) {
            var y = tags[i].y * cos - tags[i].z * sin;
            var z = tags[i].z * cos + tags[i].y * sin;
            tags[i].y = y;
            tags[i].z = z;
        }
    }

    function rotateY() {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for (var i = 0, len = tags.length; i < len; i++) {
            var x = tags[i].x * cos - tags[i].z * sin;
            var z = tags[i].z * cos + tags[i].x * sin;
            tags[i].x = x;
            tags[i].z = z;
        }
    }

    // 设置动画
    function animate() {
        setInterval(function() {
            rotateX();
            rotateY();
            move();
        }, 17);
    }


    window.tagCloud = {
        "start": init
    };

})(window, window.document, window.Math);
