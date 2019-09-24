/*
 *Created by Dyan at 2019/6/3 18:15
 */

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
    //功能选择——论文阅读辅助
    $("#paper_read").on("click", function () {
        fc_selector = class_replace(this.id);
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
    });
    //功能选择——智能测试模块
    $("#intel_test").on("click", function () {
        fc_selector = class_replace(this.id);
        fc_selector.append(
            "<div id=\"chat_blank\">\n" +
            "    <div class=\"profile\"><img src=\"image/灵.jpg\" alt=\"主机\"></div>\n" +
            "    <div class=\"chat_item\">\n" +
            "        <div class=\"chat_left\">你好</div><div class=\"clear\"></div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "<textarea id=\"text_blank\" placeholder=\"说点什么\"></textarea>\n" +
            "<div class=\"align_center_vertical\" id=\"send_text\">发送</div>"
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
                    "    <div class=\"chat_right\">" + text + "</div><div class=\"clear\"></div>\n" +
                    "</div>\n" +
                    "<div class=\"profile\"><img src=\"image/空.png\" alt=\"用户\"></div>"
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
                "<div class=\"profile\"><img src=\"image/灵.jpg\" alt=\"主机\"></div>" +
                "<div class=\"chat_item\">\n" +
                "    <div class=\"chat_left\">" + reply_text + "</div><div class=\"clear\"></div>\n" +
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
    });

});

