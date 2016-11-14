function CreateList() {
    this.wrap = document.createElement('div');
    this.init.apply(this, arguments);
    this.click.call(this);
}
CreateList.prototype = {
    constructor: CreateList,

    init: function(data) {
        var navDl, navElem, project;
        for (var j = 0, dataLen = data.length; j < dataLen; j++) {
            navDl = document.createElement('dl');
            project = data[j].project;
            for (var i = 0, projectLen = project.length; i < projectLen; i++) {
                if (!project[i].href) {
                    navElem = document.createElement('dt');
                    navElem.innerHTML = project[i].text + ' (' + (project.length - 1) + ')';
                } else {
                    navElem = document.createElement('dd');
                    navElem.innerHTML = i + '> <a href="' + project[i].href + '" target="_blank">' + project[i].text + '</a>';
                }
                navDl.appendChild(navElem);
                navDl.style.height = '31px';
            }
            this.wrap.appendChild(navDl);
        }
        this.wrap.id = 'wrap';
        document.body.appendChild(this.wrap);
    },

    click: function() {
        this.wrap.onclick = function(event) {
            var ev = event || window.event;
            var target = event.target || event.srcElement;

            if (target.tagName.toLowerCase() === 'dt') {
                var tarParent = target.parentNode;
                tarParent.height = function() {
                    var h = 0;
                    for (var i = 0, dlLen = tarParent.children.length; i < dlLen; i++) {
                        h += tarParent.children[i].offsetHeight;
                    }
                    return h;
                }();
                if (tarParent.style.height == '31px') {
                    window.startMove.run(tarParent, {
                        height: tarParent.height
                    });
                }else{
                    window.startMove.run(tarParent, {
                        height: 31
                    });
                }
            }
        };
    },
};
