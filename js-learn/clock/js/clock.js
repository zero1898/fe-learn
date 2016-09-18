window.onload = function() {
    var oDiv = document.getElementById('clock');
    var aImg = oDiv.getElementsByTagName('img');
    var iImgLen = aImg.length;
    var aNow = getDate();
    var g_aImg = [];

    for (var i = 0; i < iImgLen; i++) {
        if (!isNaN(parseInt(aImg[i].alt))) {
            g_aImg.push(aImg[i]);
        }
    }
};

function getDate() {
    var oDate = new Date();

    var iYear = oDate.getFullYear();
    var iMonth = oDate.getMonth();
    var iDate = oDate.getDate();
    var iHour = oDate.getHours();
    var iMin = oDate.getMinutes();
    var iSec = oDate.getSeconds();
    var iDay = oDate.getDay();

    var str = '' + iYear + toDou(iMonth + 1) + toDou(iDate + 1) + toDou(iHour + 1) + toDou(iMin + 1) + toDou(iSec + 1) + iDay;

    var aNum = str.split("");
    return aNum;
}

function toDou(n) {
    if (n < 10) {
        return '0' + n;
    } else {
        return '' + n;
    }
}
