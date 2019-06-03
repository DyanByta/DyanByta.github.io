/*
 *Created by Dyan at 2019/6/3 18:15
 */

//绑定点击事件
$(document).ready(function () {
    //论文阅读辅助——换行转换
    $("#deal_start").on("click", function () {
        text = $("#raw_text").val();
        $("#rul_text").val(text.replace(/\n/g, " ")).select();
        document.execCommand("copy");
    });
    //论文阅读辅助——清空输入输出栏
    $("#clear_text").on("click", function () {
        $("#raw_text").val("");
        $("#rul_text").val("");
    })
});
function select_func() {
    
}

function deal_with_paper() {

}
