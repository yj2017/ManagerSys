var inputUsername;
var inputPassword;
var inputRepeatPassword;
var btnSubmit;
var errorHint;

window.onload = function () {
    inputUsername = document.getElementById("username");
    inputPassword = document.getElementById("password");
    inputRepeatPassword = document.getElementById("repeat-password");
    btnSubmit = document.getElementById("btnRegister");
    errorHint = document.getElementById("error_hint");

    btnSubmit.onclick = funSubmit;
};

var funSubmit = function () {
    var username = inputUsername.value;
    var password = inputPassword.value;
    var repeatPassword = inputRepeatPassword.value;

    // console.log(username, password, repeatPassword);

    //数据校验
    if (!username || !(username = username.trim())) {
        showError("请输入用户名！");
        return;
    }
    if (!password || !(password = password.trim())) {
        showError("请输入密码！");
        return;
    }
    if (repeatPassword !== password) {
        showError("两次输入的密码不一致！");
        return;
    }
    if (!/^[a-zA-Z0-9_\\\u4e00-\u9fa5]{6,20}$/.test(username)) {
        showError("用户名应为6~20个字母、数字、下划线、汉字组成！");
        return;
    }
    if (!/^.*(?=.{6,20})(?=.*\d)(?=.*[A-Za-z])(?=.*[(!@#$%^&*?)]).*$/.test(password)) {
        showError("密码6~20位，包括至少1个字母，1个数字，1个特殊字符(!@#$%^&*)");
        return;
    }
    //向服务器提交数据
    $.ajax({
        url: 'register.do',
        type: 'POST',
        data: {
            username: username,
            password: md5(password + username)
        },
        cache: false,
        dataType: 'JSON'
    }).done(function (result) {
        console.log(result);
        if (result.code === 0) {
            errorHint.style.visibility = "hidden";
            hideError();
            alert("注册成功！");
            window.location = 'login.html';
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