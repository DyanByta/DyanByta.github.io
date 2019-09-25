/*
 *Created by Dyan at 2019/6/3 18:15
 */

var title_origin = "🐱幻想猫舍🐱";

//绑定点击事件
$(document).ready(function () {
    //功能选择按钮——通用操作
    function class_replace(id){
        $(".func_list ul").removeClass("active_func");
        $("#" + id).addClass("active_func");
        fc_selector = $(".func_container");
        fc_selector.empty();
        return fc_selector;
    }
    //论文阅读辅助
    function paper_read(){
        //改变标题
        document.title = document.getElementById("paper_read").innerText + " - " + title_origin;
        let fc_selector = class_replace(this.id);
        fc_selector.append(
            "<textarea class=\"text_blank\" id=\"raw_text\" placeholder=\"在这里输入原始文本\"></textarea>\n" +
            "<div class=\"buttons\">\n" +
            "    <button id=\"deal_start\">👉👉</button>\n" +
            "    <button id=\"clear_text\">✘✘✘</button>\n" +
            "</div>\n" +
            "<textarea class=\"text_blank\" id=\"rul_text\" placeholder=\"点击👉👉获取处理后的文本\n点击✘✘✘清除输入文本\" disabled></textarea>"
        );
        document.getElementById("raw_text").focus();
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
    }
    //智能测试模块
    function intel_test(){
        //改变标题
        document.title = document.getElementById("intel_test").innerText + " - " + title_origin;
        let fc_selector = class_replace(this.id);
        fc_selector.append(
            "<div class=\"border_radius\" id=\"chat_blank\">\n" +
            "    <div class=\"profile\"><img src=\"image/喵.jpg\" alt=\"主机\"></div>\n" +
            "    <div class=\"chat_item\">\n" +
            "        <div class=\"chat_left border_radius\">你好</div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "<textarea id=\"text_blank\" placeholder=\"说点什么\"></textarea>\n" +
            "<div class=\"align_center_vertical border_radius\" id=\"send_text\">发送</div>"
        );
        document.getElementById("text_blank").focus();
        //将输入文本传入系统，生成回复并显示聊天效果
        function chart_write(){
            let text_selector = $("#text_blank");
            let text = text_selector.val();
            if(text){
                text = text.replace(/\n/g,"<br/>");
                //输出聊天效果——用户
                // let chat_selector = $("#chat_blank");
                $("#chat_blank").append(
                    "<div class=\"chat_item\">\n" +
                    "    <div class=\"chat_right border_radius\">" + text + "</div>\n" +
                    "</div>\n" +
                    "<div class=\"profile\"><img src=\"image/猫.jpg\" alt=\"用户\"></div>"
                );
                //获取回复
                chart_reply(text);
                //保持滚动条处于最下方
                let scroll_selector = document.getElementById("chat_blank");
                scroll_selector.scrollTop = scroll_selector.scrollHeight - scroll_selector.clientHeight;
                //设置延时，对输入框进行清除
                setTimeout(() => {
                    text_selector.val("");
                }, 0);
            }
        }
        //回复语句生成
        function chart_reply(text){
            let reply_text = reply(text);
            //输出聊天效果——系统
            $("#chat_blank").append(
                "<div class=\"profile\"><img src=\"image/喵.jpg\" alt=\"主机\"></div>" +
                "<div class=\"chat_item\">\n" +
                "    <div class=\"chat_left border_radius\">" + reply_text + "</div>\n" +
                "</div>\n"
            );
        }
        //“发送”按钮响应
        $("#send_text").on("click", chart_write);
        //回车响应，Shift+Enter视为换行
        $("#text_blank").on("keydown", function(e) {
            let keyCode = e.keyCode;
            if(!e.shiftKey && keyCode === 13){
                chart_write();
            }
        })
    }
    function test(){
        alert("开发中……");
    }
    //初始功能选择
    $(".func_select").on("click", function () {
        let func_selector = $(".origin_container");
        func_selector.empty();
        func_selector.append(
            "<div class=\"func_list border_radius\">\n" +
            "    <ul class=\"border_radius\" id=\"func_select\">返回功能选择</ul>\n" +
            "    <ul class=\"border_radius\" id=\"paper_read\">论文阅读辅助</ul>\n" +
            "    <ul class=\"border_radius\" id=\"intel_test\">智能测试模块</ul>\n" +
            "    <ul class=\"border_radius\" id=\"test\">测试功能</ul>\n" +
            "</div>\n" +
            "<div class=\"func_container border_radius\"></div>"
        );
        //功能选择——返回功能选择
        $("#func_select").on("click", function () {
            location.reload();
        });
        //功能选择——论文阅读辅助
        $("#paper_read").on("click", paper_read);
        //功能选择——智能测试模块
        $("#intel_test").on("click", intel_test);
        //功能选择——测试功能
        $("#test").on("click", test);
        //跳转到所选功能
        eval(this.id + "()");
    });
});

