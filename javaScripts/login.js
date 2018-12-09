var inputUsername;
var inputPassword;
var btnSubmit;
var errorHint;

window.onload = function () {
    inputUsername = document.getElementById("username");
    inputPassword = document.getElementById("password");
    btnSubmit = document.getElementById("btnRegister");
    errorHint = document.getElementById("error_hint");

    btnSubmit.onclick = funSubmit;
};

document.onkeydown = function (e) {
    if (e.keyCode === 13) {
        btnSubmit.onclick();
    }
};

var funSubmit = function () {
    var username = inputUsername.value;
    var password = inputPassword.value;

    //数据校验
    if (!username || !(username = username.trim())) {
        showError("请输入用户名！");
        return;
    }
    if (!password || !(password = password.trim())) {
        showError("请输入密码！");
        return;
    }

    //向服务器提交数据
    btnSubmit.disabled = true;
    $.ajax({
        url: 'login.do',
        type: 'POST',
        data: {
            username: username,
            password: md5(password + username)
        },
        cache: false,
        dataType: 'JSON'
    }).done(function (result) {
        // console.log(result);
        if (result.code === 0) {
            errorHint.style.visibility = "hidden";
            // alert("登录成功！");
            storage.clearSessionStorage();
            storage.setSessionStorage("user", result.data);
            window.location = 'chat.html';
        } else {
            errorHint.style.visibility = "visible";
            errorHint.innerHTML = result.msg;
        }
    }).fail(function (xhr, status, errorThrown) {
        console.log("Error: " + errorThrown, "Status: " + status);
        alert("网络错误！");
    }).always(function (xhr, status) {
        console.log(status);
        btnSubmit.disabled = false;
    });
};

function showError(msg) {
    errorHint.style.visibility = "visible";
    errorHint.innerHTML = msg;
}

function hideError() {
    errorHint.style.visibility = "none";
}