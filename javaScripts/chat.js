"use strict";

var msgInputBox = void 0;
var friendInputBox = void 0;
var btnSendMsg = void 0;
var btnClearMsg = void 0;
var btnExit = void 0;
var btnSearchFriends = void 0;
var btnCloseChat = void 0;
var messages = void 0;
var searchFriendResult = void 0;
var friendList = void 0;
var currentUser = void 0;
var currentFriend = void 0;
var firstShowMsg = void 0;
var friendShips = {};
var friendShips1 = {}; //可收发消息的好友
var newMsgs = {};

var an_hour = 60 * 60 * 1000;
var refreshFriendListTimer = void 0;
var refreshMsgTimer = void 0;

var lastRefreshTime = "lastRefreshTime";
var savedMsgs = "savedMsgs";

window.onload = function () {
    //检查登录状态
    currentUser = storage.getSessionStorage("user");
    if (!currentUser) {
        reLogin();
        return;
    }
    $("#username").text(currentUser.username);
    $("#chat").hide();
    // $("#chat-empty").hide();
    friendShips = {};
    friendShips1 = {};

    if (!storage.getSessionStorage(lastRefreshTime)) {
        storage.setSessionStorage(lastRefreshTime, new Date().getTime() - 7 * 24 * an_hour);
    }
    if (!storage.getSessionStorage(savedMsgs)) {
        storage.setSessionStorage(savedMsgs, []);
    }
    //绑定组件
    msgInputBox = document.getElementById("msg-editor-input");
    friendInputBox = document.getElementById("search-friend-input");

    btnSendMsg = document.getElementById("btn-send-msg");
    btnClearMsg = document.getElementById("btn-clear-msg");
    btnSearchFriends = document.getElementById("btn-search");
    btnCloseChat = document.getElementById("close-chat");
    btnExit = document.getElementById("btn-exit");

    messages = document.getElementById("msg-list");
    searchFriendResult = document.getElementById("search-friend-output");
    friendList = document.getElementById("friend-list");

    btnSendMsg.onclick = funSendMsg;
    btnClearMsg.onclick = funClearMsg;
    btnSearchFriends.onclick = funcSearchFriends;
    btnCloseChat.onclick = function () {
        currentFriend = undefined;
        $("#chat").hide();
        $("#chat-empty").show();
    };
    btnExit.onclick = function () {
        storage.clearSessionStorage();
        window.location = "login.html";
    };

    funcRefreshFriendList();
    refreshFriendListTimer = setInterval(funcRefreshFriendList, 30000); //30秒刷新一次
    funcRefreshMsg();
    refreshMsgTimer = setInterval(funcRefreshMsg, 2000); //2秒刷新一次
};

document.onkeydown = function (e) {
    if (e.ctrlKey && e.keyCode === 13) {
        btnSendMsg.onclick();
    }
};

var funcSearchFriends = function funcSearchFriends() {
    var username = friendInputBox.value;
    if (!username.trim()) {
        alert("好友账号不能为空！");
        return;
    }
    btnSearchFriends.disabled = true;
    searchFriendResult.innerHTML = "";
    $.ajax({
        url: 'friends/search.do',
        type: 'POST',
        data: {
            username: username
        },
        cache: false,
        dataType: 'JSON'
    }).done(function (result) {
        // console.log(result);
        switch (result.code) {
            case 0:
                var rs = result.data;
                if (rs.length === 0) {
                    searchFriendResult.innerHTML = "没有找到匹配的好友！<hr>";
                } else {
                    rs.map(function (user) {
                        if (user.uid === currentUser.uid) {
                            //当前用户
                        } else if (hasFriend(user.uid)) {
                            var li = document.createElement("li");
                            li.innerHTML = "<a href='#" + user.uid + "'>" + user.username + "</a>";
                            searchFriendResult.appendChild(li);
                        } else {
                            var _li = document.createElement("li");
                            var btnAddFriend = document.createElement("button");
                            _li.innerHTML = "<a>" + user.username + "</a>";
                            _li.appendChild(btnAddFriend);
                            btnAddFriend.onclick = funAddFriend(user.uid, btnAddFriend);
                            btnAddFriend.classList.add("friend-item-ops");
                            btnAddFriend.innerHTML = "添加";
                            searchFriendResult.appendChild(_li);
                        }
                    });
                    searchFriendResult.appendChild(document.createElement("hr"));
                }
                break;
            case 1003:
                reLogin();
                break;
            default:
                console.log(result);
                break;
        }
    }).fail(function (xhr, status, errorThrown) {
        console.log("Error: " + errorThrown, "Status: " + status);
        alert("网络错误！");
    }).always(function (xhr, status) {
        console.log(status);
        btnSearchFriends.disabled = false;
    });
};

var funSendMsg = function funSendMsg() {
    var msg = msgInputBox.value;
    //
    if (!msg || !(msg = msg.trim())) {
        return;
    }
    //消息发送、展示
    // addMessage(new Date().getTime(), msg, 'sent');
    $.ajax({
        url: 'message.do',
        type: 'POST',
        data: {
            op: 'send',
            sendTime: storage.getSessionStorage(lastRefreshTime),
            uid_friend: currentFriend.uidFriend,
            content: msg
        },
        cache: false,
        dataType: 'JSON'
    }).done(function (result) {
        switch (result.code) {
            case 0:
                msgInputBox.value = "";
                updateMsgs(result.data);
                break;
            case 1003:
                reLogin();
                break;
            default:
                console.log(result);
                break;
        }
    }).fail(function (xhr, status, errorThrown) {
        console.log("Error: " + errorThrown, "Status: " + status);
        alert("网络错误！");
    }).always(function (xhr, status) {
        console.log(status);
    });
};

var funClearMsg = function funClearMsg() {
    msgInputBox.value = "";
};

var funAddFriend = function funAddFriend(uidFriend, btnAdd) {
    return function () {
        console.log(uidFriend, btnAdd);
        btnAdd.style.display = "none";
        $.ajax({
            url: 'friends/list.do',
            type: 'POST',
            data: {
                uid_friend: uidFriend,
                op: "add"
            },
            cache: false,
            dataType: 'JSON'
        }).done(function (result) {
            // console.log(result);
            switch (result.code) {
                case 0:
                    btnAdd.display = "none";
                    updateFriendList(result.data);
                    break;
                case 1003:
                    reLogin();
                    break;
                default:
                    console.log(result);
                    break;
            }
        }).fail(function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown, "Status: " + status);
            alert("网络错误！");
        }).always(function (xhr, status) {
            console.log(status);
        });
    };
};

function addMessage(time, content, type) {
    var msgNode = document.createElement("div");
    var msgTime = document.createElement('div');
    var msgContent = document.createElement('div');
    msgTime.innerHTML = new Date(time).toString();
    msgContent.innerHTML = content;
    msgTime.classList.add('msg-time');
    msgContent.classList.add('msg-content');
    msgNode.appendChild(msgTime);
    msgNode.appendChild(msgContent);
    msgNode.classList.add('msg-item');
    if (type === 'sent') {
        msgNode.classList.add('msg-item-sent');
    } else {
        msgNode.classList.add('msg-item-recv');
    }
    messages.appendChild(msgNode);
    messages.scrollTop = messages.scrollHeight;
}

function reLogin() {
    clearInterval(refreshFriendListTimer);
    alert("登录状态已失效，请重新登录！");
    window.location = "login.html";
}

var funcRefreshFriendList = function funcRefreshFriendList() {
    $.ajax({
        url: 'friends/list.do',
        type: 'POST',
        data: {},
        cache: false,
        dataType: 'JSON'
    }).done(function (result) {
        switch (result.code) {
            case 0:
                updateFriendList(result.data);
                break;
            case 1003:
                reLogin();
                break;
            default:
                console.log(result);
                break;
        }
    }).fail(function (xhr, status, errorThrown) {
        console.log("Error: " + errorThrown, "Status: " + status);
        alert("网络错误！");
    }).always(function (xhr, status) {
        console.log(status);
    });
};

var funcRefreshMsg = function funcRefreshMsg() {
    $.ajax({
        url: 'message.do',
        type: 'POST',
        data: {
            op: 'list',
            sendTime: storage.getSessionStorage(lastRefreshTime)
        },
        cache: false,
        dataType: 'JSON'
    }).done(function (result) {
        switch (result.code) {
            case 0:
                updateMsgs(result.data);
                break;
            case 1003:
                reLogin();
                break;
            default:
                console.log(result);
                break;
        }
    }).fail(function (xhr, status, errorThrown) {
        console.log("Error: " + errorThrown, "Status: " + status);
        alert("网络错误！");
    }).always(function (xhr, status) {
        console.log(status);
    });
};

var funcDeleteFriend = function funcDeleteFriend(uidFriend, btnDelete) {
    return function () {
        btnDelete.style.display = "none";
        $.ajax({
            url: 'friends/list.do',
            type: 'POST',
            data: {
                op: "delete",
                uid_friend: uidFriend
            },
            cache: false,
            dataType: 'JSON'
        }).done(function (result) {
            switch (result.code) {
                case 0:
                    updateFriendList(result.data);
                    break;
                case 1003:
                    reLogin();
                    break;
                default:
                    console.log(result);
                    break;
            }
        }).fail(function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown, "Status: " + status);
            alert("网络错误！");
        }).always(function (xhr, status) {
            console.log(status);
        });
    };
};

var funcAcceptFriend = function funcAcceptFriend(uidFriend, btnDelete) {
    return function () {
        btnDelete.style.display = "none";
        $.ajax({
            url: 'friends/list.do',
            type: 'POST',
            data: {
                op: "accept",
                uid_friend: uidFriend
            },
            cache: false,
            dataType: 'JSON'
        }).done(function (result) {
            switch (result.code) {
                case 0:
                    updateFriendList(result.data);
                    break;
                case 1003:
                    reLogin();
                    break;
                default:
                    console.log(result);
                    break;
            }
        }).fail(function (xhr, status, errorThrown) {
            console.log("Error: " + errorThrown, "Status: " + status);
            alert("网络错误！");
        }).always(function (xhr, status) {
            console.log(status);
        });
    };
};

var funcChangeMemoName = function funcChangeMemoName(btnChangeMemoName) {
    return function () {
        var newMemoName = prompt("请输入新的备注名", currentFriend.memoName);
        if (newMemoName && (newMemoName = newMemoName.trim()) && newMemoName !== currentFriend.memoName) {
            console.log(newMemoName);
            btnChangeMemoName.style.display = "none";
            $.ajax({
                url: 'friends/list.do',
                type: 'POST',
                data: {
                    op: "changeMemoName",
                    uid_friend: currentFriend.uidFriend,
                    new_memo_name: newMemoName
                },
                cache: false,
                dataType: 'JSON'
            }).done(function (result) {
                switch (result.code) {
                    case 0:
                        currentFriend.memoName = newMemoName;
                        funcChat(currentFriend)();
                        updateFriendList(result.data);
                        break;
                    case 1003:
                        reLogin();
                        break;
                    default:
                        console.log(result);
                        break;
                }
            }).fail(function (xhr, status, errorThrown) {
                console.log("Error: " + errorThrown, "Status: " + status);
                alert("网络错误！");
            }).always(function (xhr, status) {
                console.log(status);
                btnDelete.style.display = "inline";
            });
        }
    };
};

var funcChat = function funcChat(friend) {
    return function () {
        currentFriend = friend;
        firstShowMsg = true;
        $("#new-msg-" + friend.uidFriend).hide();
        newMsgs[friend.uidFriend] = false;
        messages.innerHTML = "";
        $("#current-friend-memo-name").html(friend.memoName + " &nbsp;&nbsp;&nbsp;\n            <span id='change-memo-name'>[\u6539\u5907\u6CE8]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            <span id='delete-friend'>[\u5220\u9664\u8BE5\u597D\u53CB]</span>");

        $("#chat-empty").hide();
        $("#chat").show();
        var btnChangeMemoName = document.getElementById("change-memo-name");
        var btnDelete = document.getElementById("delete-friend");

        btnChangeMemoName.onclick = funcChangeMemoName(btnChangeMemoName);
        btnDelete.onclick = function () {
            currentFriend = undefined;
            $("#chat").hide();
            $("#chat-empty").show();
            funcDeleteFriend(friend.uidFriend, btnDelete)();
        };
        funcRefreshMsg();
    };
};

function updateFriendList(list) {
    console.log(list);
    friendShips = {};
    friendShips1 = {};
    list.map(function (friend) {
        friendShips[friend.uidHost] = friend;
        friendShips1[friend.uidFriend] = friend;
    });
    if (list.length === 0) {
        friendList.innerHTML = "暂无好友。";
    } else {
        friendList.innerHTML = "";
        list.map(function (friend) {
            if (friend.uidHost === currentUser.uid) {
                var li = document.createElement("li");
                li.id = friend.uidFriend;
                if (friendShips[friend.uidFriend]) {
                    //等待对方同意
                    li.innerHTML = friend.memoName + "<br><span class='new-msg'>[\u7B49\u5F85\u5BF9\u65B9\u540C\u610F]</span>";
                    var btnCancelAdd = document.createElement("button");
                    btnCancelAdd.innerHTML = "取消添加";
                    btnCancelAdd.classList.add('friend-item-ops');
                    btnCancelAdd.onclick = funcDeleteFriend(friend.uidFriend, btnCancelAdd);
                    li.appendChild(btnCancelAdd);
                } else if (!friend.accepted) {
                    //好友请求
                    li.innerHTML = friend.memoName + "<br><span class='new-msg'>[\u52A0\u4F60\u4E3A\u597D\u53CB]</span>";
                    var btnAcceptAdd = document.createElement("button");
                    var btnRefuseAdd = document.createElement("button");
                    btnRefuseAdd.innerHTML = "拒绝";
                    btnAcceptAdd.innerHTML = "同意";
                    btnAcceptAdd.classList.add('friend-item-ops');
                    btnRefuseAdd.classList.add('friend-item-ops');

                    btnRefuseAdd.onclick = funcDeleteFriend(friend.uidFriend, btnRefuseAdd);
                    btnAcceptAdd.onclick = funcAcceptFriend(friend.uidFriend, btnAcceptAdd);

                    li.appendChild(btnAcceptAdd);
                    li.appendChild(btnRefuseAdd);
                } else {
                    //正常好友
                    if (newMsgs[friend.uidFriend]) {
                        li.innerHTML = friend.memoName + "\n<span class='new-msg' id='new-msg-"
                            + friend.uidFriend + "'><br>[\u6709\u65B0\u6D88\u606F\uFF01]</span>";
                    } else {
                        li.innerHTML = friend.memoName + "\n<span class='new-msg' id='new-msg-"
                            + friend.uidFriend + "' style='display: none;'><br>[\u6709\u65B0\u6D88\u606F\uFF01]</span>";
                    }
                    li.onclick = funcChat(friend);
                }
                friendList.appendChild(li);
            }
        });
    }
}

function hasFriend(fuid) {
    return !!friendShips1[fuid];
}

function updateMsgs(msgs) {
    console.log(msgs);
    var ms = void 0;
    var f = firstShowMsg;
    if (msgs.length === 0) {
        //没有新消息
        if (firstShowMsg) {
            //初次打开聊天框
            ms = storage.getSessionStorage(savedMsgs);
        } else {
            return;
        }
    } else {
        //有新消息
        storage.setSessionStorage(lastRefreshTime, msgs[0].sendTime);
        var smsgs = storage.getSessionStorage(savedMsgs);
        if (firstShowMsg) {
            //初次打开聊天框，显示所有消息
            ms = smsgs.concat(msgs);
            storage.setSessionStorage(savedMsgs, ms);
        } else {
            //只显示新消息
            ms = msgs;
            storage.setSessionStorage(savedMsgs, smsgs.concat(msgs));
        }
    }

    firstShowMsg = false;

    // ms.sort((m1, m2) => {
    //     return m1.sendTime - m2.sendTime;
    // });
    var msgs1 = [];
    ms.forEach(function (msg) {
        if (currentFriend) {
            if (msg.toUid === currentUser.uid && msg.fromUid === currentFriend.uidFriend) {
                //当前聊天窗口发给我的消息
                // addMessage(msg.sendTime, msg.content, 'recv');
                msg.recv = true;
                msgs1.push(msg);
            } else if (msg.toUid === currentFriend.uidFriend && msg.fromUid === currentUser.uid) {
                //当前聊天窗口我发送的消息
                // addMessage(msg.sendTime, msg.content, 'sent');
                msg.recv = false;
                msgs1.push(msg);
            } else if (msg.toUid === currentUser.uid && !!friendShips1[msg.fromUid]) {
                //提示有新消息
                if (!f) {
                    $("#new-msg-" + msg.fromUid).show();
                    newMsgs[msg.fromUid] = true;
                }
            }
        } else {
            $("#new-msg-" + msg.fromUid).show();
            newMsgs[msg.fromUid] = true;
        }
    });
    msgs1.sort(function (m1, m2) {
        return m1.sendTime - m2.sendTime;
    });
    msgs1.map(function (msg) {
        if (msg.recv) {
            addMessage(msg.sendTime, msg.content, 'recv');
        } else {
            addMessage(msg.sendTime, msg.content, 'sent');
        }
    });
}