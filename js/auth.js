function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.' + window.location.hostname + ';';
}

function checkCookie(name) {
    let cookie = getCookie(name);
    if (cookie != "") {
        return true;
    }
    return false;
}

function guid() {
    function a() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) }
    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a() }

function giveMeACookie() {
    var COOKIE_NAME = "fanadnetworkuid",
        uid = "";
    fanads.checkCookie(COOKIE_NAME) ? uid = getCookie(COOKIE_NAME) : (uid = guid(), setCookie(COOKIE_NAME, uid, 60));
    return uid;
}

var loggedInTemplate = '<div class="dropdown logged-in">' +
    '<button onclick="showMenu()" class="dropbtn">Hi, {{username}}<span class="caret"></span></button>' +
    '<div id="userDropdown" class="dropdown-content">' +
    '<a href="/auth/dashboard.html" data-target="fanalytics" data-value="goto-dashboard">Dashboard</a>' +
    '<a href="/auth/plan.html" data-target="fanalytics" data-value="goto-plan">Plan</a>' +
    '<a onclick="logout()" href="#" data-target="fanalytics" data-value="logout-btn">Log out</a>' +
    '</div>' +
    '</div>';
var loggedOutTemplate = '<div class="dropdown logged-out">' +
    '<button onclick="login()" class="login-btn" data-target="fanalytics" data-value="login-btn">Login</button>' +
    '</div>';

var token = getCookie(window.location.hostname + "-auth");

if ((window.location.pathname.indexOf("/auth/signup.html") > -1 || window.location.pathname.indexOf("/auth/signin.html") > -1) && token != null && token != undefined && token.length) {
    window.location.href = '/';
}

if ((window.location.pathname.indexOf("/auth/dashboard.html.html") > -1 || window.location.pathname.indexOf("/auth/pay.html") > -1) && (token == null || token == undefined || token.length == 0)) {
    window.location.href = '/signin.html';
}

function showMenu() {
    document.getElementById("userDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function removeTemplate(className) {
    var element = document.getElementsByClassName(className),
        index;

    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }
}

function logout() {
    //Delete cookie
    deleteCookie(window.location.hostname + "-auth");
    removeTemplate("logged-in");
    var nav = document.getElementById("nav-auth");
    nav.innerHTML += loggedOutTemplate;
    if (window.location.pathname.indexOf("/auth/") > -1) {
        window.location.href = '/';
    }
}

function login() {
    if (window.location.pathname.indexOf("/auth/plan.html") > -1) {
        window.location.href = "/auth/signin.html?redirect_to=/auth/plan.html";
    } else {
        window.location.href = "/auth/signin.html";
    }
}

function decodeToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

if (isPaywallSet && isPaywallSet.length && isPaywallSet == "true") {
    document.onreadystatechange = function() {
        if (document.readyState == "interactive") {
            var nav = document.getElementById("nav-auth");

            if (token != undefined && token.length != 0) {
                var decoded = decodeToken(token);
                loggedInTemplate = loggedInTemplate.replace("{{username}}", decoded.name);
                nav.innerHTML += loggedInTemplate;
            } else {
                nav.innerHTML += loggedOutTemplate;
            }
        }
    }
}
