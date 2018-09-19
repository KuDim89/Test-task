'use strict';
$(document).ready(function () {
    showTub();
    selectStyle();
    calculate();
    calculateSum();
    resetCalculate();
    pageTub();
});
function showTub() {
    var tubTire = $(".js-tabsTire");
    var tabsTireTxt= $(".js-tabsTire__txt");
    var tabsDisc = $(".js-tabsDisc");
    var tabsDiscTxt= $(".js-tabsDisc__txt");
    var tabsWheel = $(".js-tabsWheel");
    var tabsWheelTxt= $(".js-tabsWheel__txt");
    var page = $(".page");
    var page1 = $(".page1");
    var page2 = $(".page2");

    $(".js-tabsTire").click(function () {
        tubTire.addClass("tabsTire_active");
        tabsTireTxt.addClass("tabsTire__txt_active");
        page.addClass("page__hidden");
        page1.addClass("page1__active");
        page2.removeClass("page2__active");
        tabsDisc.removeClass("tabsDisc_active");
        tabsDiscTxt.removeClass("tabsDisc__txt_active");
        tabsWheel.removeClass("tabsWheel_active");
        tabsWheelTxt.removeClass("tabsWheel__txt_active");
    });

    $(".js-tabsDisc").click(function () {
        tabsDisc.addClass("tabsDisc_active");
        tabsDiscTxt.addClass("tabsDisc__txt_active");
        page1.removeClass("page1__active");
        page2.removeClass("page2__active");
        tubTire.removeClass("tabsTire_active");
        tabsTireTxt.removeClass("tabsTire__txt_active");
        page.removeClass("page__active");
        tabsWheel.removeClass("tabsWheel_active");
        tabsWheelTxt.removeClass("tabsWheel__txt_active");
        page.removeClass("page__hidden");
    });
    $(".js-tabsWheel").click(function () {
        tabsWheel.addClass("tabsWheel_active");
        tabsWheelTxt.addClass("tabsWheel__txt_active");
        tabsDisc.removeClass("tabsDisc_active");
        tabsDiscTxt.removeClass("tabsDisc__txt_active");
        tubTire.removeClass("tabsTire_active");
        tabsTireTxt.removeClass("tabsTire__txt_active");
        page2.addClass("page2__active");
        page1.removeClass("page1__active");
        page.addClass("page__hidden");
    });
}
function selectStyle() {
    $('.select-chosen').chosen({
        disable_search: true
    });
}
function calculate() {
        $('.minus-trigger').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 0 ? 0 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.plus-trigger').click(function () {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
}
function calculateSum() {
    $('.buttonGroup_calculate').click(function () {
        var sum=0;
        $(".inputCalculate").each(function () {
            sum += parseInt($(this).val());
        });
        alert(sum);
    });
}
function resetCalculate() {
    $('.buttonGroup_reset').click(function () {
        $(".inputCalculate").val(0);

    });
}
function pageTub() {
    $(".page .js-head").click(function () {
        $('.page .js-body').not($(this).next()).slideUp(200);
        $(this).next().slideToggle(200);
    });
}

