// 
var Ylobj = {
    user_type: "Guest",
    uid: null,
    message_list: [],
    time_live: 20,
    self_send_msg: null,
    defHight: window.innerHeight,
    user_dev: navigator.userAgent.match("Windows"),

    SelfMsgFun: function(msg) {
        return '<li class="self clear_float">' +
            '<div class="avater"><img src="" alt="自己"></div>' +
            '<ul><li class="self_words">' + msg + '</li></ul></li>';
    },
    OPMsgFun: function(msg_list) {

    }
};
console.log(navigator.cookieEnabled);
$("#ChatContentBox").append(navigator.cookieEnabled);
// console.log(Ylobj);
// 一些函数
function SendModChanges(element, para, para2) {
    element.style.backgroundColor = para;
    element.style.color = para2;
}
// 输入框变化
function InpModFun() {
    $("#InputModuleList,#InputModule").each(function() {
        $(this).css({ "height": "auto" }).height(35);
    });
}
// 提交信息
function SubInfo() {
    // msg = 
    $("#ChatContentList").append(Ylobj.SelfMsgFun($("#InputModule").val()));
    $("#InputModule").val("");
    InpModFun();
    $("#ChatContentBox").css("height", $("#main").innerHeight() - $("header").innerHeight() - $("#DialogInputBox").innerHeight());
    // 滚动条置底
    $("#ChatContentBox").scrollTop(function() {
        return $(this)[0].scrollHeight;
    });
}


// 加载完成
(function() {
    $("#SendModule").css("background-color", "#e9e9e9");
    // 滚动条置底
    $("#ChatContentBox").scrollTop(function() {
        return $(this)[0].scrollHeight;
    });
})();


// 事件
(function() {
    document.body.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
    // 窗口变化监听
    $(window).resize(function(event) {
        if (Ylobj.user_dev) {
            $("#main").height(event.target.innerHeight - 1);
            $("#ChatContentBox").css("height", $("#main").innerHeight() - $("header").innerHeight() - $("#DialogInputBox").innerHeight());
        }
    });
    // 监听输入
    $("#InputModule").bind("input", function(event) {
        $("#InputModuleList,#InputModule").each(function() {
            $(this).css({ "height": "auto" }).height(event.target.scrollHeight);
        });

        $("#ChatContentBox").css("height", $("#main").innerHeight() - $("header").innerHeight() - $("#DialogInputBox").innerHeight());
    });

    // 发送模块点击事件
    // web端
    $("#SendModule").bind("mousedown", function(event) {
        if (event.button == 0) {
            SendModChanges(this, "#05bf5e", "#000000")
            this.onmouseup = function(event) {
                if (event.button == 0) {
                    SendModChanges(this, "#e9e9e9", "#06c191");
                    SubInfo();
                }
            }
        }
    });
    // 移动端$("#InputModule")
    document.getElementById("InputModule").addEventListener("focus", function() {
        $("#ChatContentBox").css("height", $("#main").innerHeight() - $("header").innerHeight() - $("#DialogInputBox").innerHeight());
        $("#test").text(window.innerHeight + "," + Ylobj.user_dev);
        console.log(window.innerHeight);
    });
    $("#InputModule").blur(function() {
        $("#test").text(window.innerHeight + "," + Ylobj.user_dev);
        $("#ChatContentBox").scrollTop(function() {
            return $(this)[0].scrollHeight;
        });
    });
})();

// 定位