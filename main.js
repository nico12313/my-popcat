function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    
    for (var i=0, l=cookieAry.length; i<l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    
    return cookieObj;
}

function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }
    return value;
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

// References to DOM elements
const popcat = document.querySelector("#popcat");
const btn = document.querySelector("#btn");
const clickCount = document.querySelector("#counts");
var counter;
function doSomething() {
    var myCookie = getCookie("clicks");

    if (myCookie == null) {
        document.cookie = 'clicks=0';
        counter = getCookieByName("clicks");
        document.getElementById("counts").innerHTML = counter;
    }
    else {
        counter = getCookieByName("clicks");
        document.getElementById("counts").innerHTML = counter;
        // do cookie exists stuff
    }
}
doSomething()

// The two images of the POP CAT
const openMouthImg = "./open.png";
const closeMouthImg = "./close.png";

// The two Popping sounds
const openMouthSound = new Audio("./sound-open.mp3");
const closeMouthSound = new Audio("./sound-close.mp3");

// Event Handlers (Desktops)
btn.addEventListener("mousedown", openMouth);
btn.addEventListener("mouseup", closeMouth);

// Event Handers (Touch Screens)
btn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    openMouth();
})

btn.addEventListener("touchend", function(e) {
    e.preventDefault();
    closeMouth();
})

// The functions which will perform the cool stuff
function openMouth() {
    popcat.src = openMouthImg;
    openMouthSound.play();
    counter++;
    document.getElementById("counts").innerHTML = counter;
    document.cookie = 'clicks=' + (counter || "");
}

function closeMouth() {
    popcat.src = closeMouthImg;
    closeMouthSound.play();
}