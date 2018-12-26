var storage = {
    setSessionStorage: function (key, value) {
        sessionStorage[key] = JSON.stringify(value);
    },
    getSessionStorage: function (key) {
        return sessionStorage[key] ? JSON.parse(sessionStorage[key]) : undefined;
    },
    clearSessionStorage: function () {
        sessionStorage.clear();
    },
    setLocalStorage: function (key, value) {
        localStorage[key] = JSON.stringify(value);
    },
    getLocalStorage: function (key) {
        return localStorage[key] ? JSON.parse(localStorage[key]) : undefined;
    },
    clearLocalStorage: function () {
        localStorage.clear();
    }
};

Date.prototype.toString = function () {
    return this.getFullYear()
        + "-" + (this.getMonth() > 8 ? (this.getMonth() + 1) : "0" + (this.getMonth() + 1))
        + "-" + (this.getDate() > 9 ? this.getDate() : "0" + this.getDate())
        + " " + (this.getHours() > 9 ? this.getHours() : "0" + this.getHours())
        + ":" + (this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes())
        + ":" + (this.getSeconds() > 9 ? this.getSeconds() : "0" + this.getSeconds());
};
