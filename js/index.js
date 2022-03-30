$(function() {
    $(".monitor .tabs").on("click", "a", function() {
        $(this).addClass("active").siblings("a").removeClass("active");
    })
    $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
})