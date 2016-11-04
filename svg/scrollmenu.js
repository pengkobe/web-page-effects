/**
 *  箭头显示列表
 */
(function () {
    var tpl = document.getElementById("svg_tpl").innerHTML;
    var num = 12;

    var menuHtml = '<ul id="svg-menu-ul">'
    for (var i = 0; i < num; i++) {
        menuHtml += '<li class="svg-menu-li" style="z-index:' + (-i) + '">'
        menuHtml += tpl
        menuHtml += '</li>'
    }

    menuHtml += '</ul>'
    document.getElementById("svg_menu_list").innerHTML = menuHtml;
    document.getElementById("svg-menu-ul").style.width = num * 141 + "px";

})();