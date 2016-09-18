//等待DOM加载完毕
$(document).ready(function() {
    var $category = $('ul li:gt(5):not(:last)');
    $category.hide();
    var $toggleBtn = $('div.showmore > a');
    $toggleBtn.click(function() {
        if ($category.is(":hidden")) {
            $category.show();
            $(this).find("span")
                .css("background", "url(img/up.gif) no-repeat 0 0")
                .text("精简显示品牌");
            $('ul li').filter(":contains('佳能'),:contains('尼康'),:contains('奥林巴斯')")
                .addClass("promoted");
            return false;
        } else {
            $category.hide();
            $(this).find("span")
                .css("background", "url(img/down.gif) no-repeat 0 0")
                .text("显示全部品牌");
            return false;
        }
    });
});
