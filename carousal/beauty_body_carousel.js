customHomepage.slideLifetyme = 5000;
customHomepage.slideSwitchTimeoutKeeper;
customHomepage.CaruselData = []
customHomepage.carousel = function (slideid, CaruselData) {
    customHomepage.CaruselData = CaruselData
    let htmlStr = "";
    let indicatorsStr = "";
    var idx = 0;
    var value = customHomepage.CaruselData[idx];
    
    htmlStr += ` <div id="carousel" class="carousel"> 
    <div id="slides" class="slides"><div class="slide" data-state="active"
    style="background-image: url('${value.imageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" onclick="customHomepage.setUUIDandNav(null,null,'${value.deepLink}')" >${value.buttonText}</button>
            <p class="title">${value.title}</p>
            <p class="desc">${value.description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="customHomepage.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div></div>`

    document.getElementById(slideid).innerHTML = htmlStr;

    for (const [idx1, value] of customHomepage.CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customHomepage.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick=" customHomepage.switchSlide(true)" ></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick=" customHomepage.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick=" customHomepage.switchSlide(true)"></span>
           </div>`
    }


    document.getElementById("indicators").innerHTML = indicatorsStr;
    customHomepage.setSessionStorage("savedIDX", 0);
    customHomepage.slideLifetyme = value.time;
    customHomepage.switchSlide();
    
    customHomepage.swipeListener()
}

customHomepage.playerClick = function () {
    var btn = document.getElementById("player");
    var btnClass = btn.className;
    if (btnClass == "play") {
        btn.className = "pause";
        customHomepage.switchSlide();
    } else {
        btn.className = "play";
        clearTimeout(customHomepage.slideSwitchTimeoutKeeper);
    }
};
customHomepage.switchSlide = function (isCurrent, next = true) {
    clearTimeout(customHomepage.slideSwitchTimeoutKeeper);
    let htmlStr = "";

    let indicatorsStr = "";

    var idx;
    var value;

    idx = +sessionStorage.getItem("savedIDX") < customHomepage.CaruselData.length ?
        +sessionStorage.getItem("savedIDX") :
        0;

    value = customHomepage.CaruselData[idx];
    if (next) {
        customHomepage.setSessionStorage(
            "savedIDX",
            +sessionStorage.getItem("savedIDX") + 1 < customHomepage.CaruselData.length ?
            +sessionStorage.getItem("savedIDX") + 1 :
            0
        );
    } else {
        customHomepage.setSessionStorage(
            "savedIDX",
            +sessionStorage.getItem("savedIDX") - 1 > 0 ?
            +sessionStorage.getItem("savedIDX") - 1 :
            3
        );

    }

    htmlStr += `<div id="carousel" class="carousel"> 
    <div id="slides" class="slides"><div class="slide"  data-state="active"
    style="background-image: url('${value.imageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" onclick="customHomepage.setUUIDandNav(null,null,'${value.deepLink}')" >${value.buttonText}</button>
            <p class="title">${value.title}</p>
            <p class="desc">${value.description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="customHomepage.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div>
</div>`
    if (document.getElementById("slides")) {
        document.getElementById("slides").innerHTML = htmlStr;
        for (const [idx1, value] of customHomepage.CaruselData.entries()) {
            indicatorsStr +=
                idx1 == idx ?
                `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customHomepage.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.switchSlide(true)"></span>
           </div>` :
                `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customHomepage.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.switchSlide(true)"></span>
           </div>`
        }
        document.getElementById("indicators").innerHTML = indicatorsStr;
        document.querySelectorAll(".slide-text")[0].style.opacity = 1;
        customHomepage.slideLifetyme = value.time;
        customHomepage.slideSwitchTimeoutKeeper = setTimeout(function () {
            customHomepage.switchSlide();
        }, customHomepage.slideLifetyme);
    }
};
customHomepage.swipeListener = function () {
    var initialPoint;
    var finalPoint;
    document.addEventListener('touchstart', function (event) {
        event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
    }, false);
    document.addEventListener('touchend', function (event) {
        event.preventDefault();
        event.stopPropagation();
        finalPoint = event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX) {
                    customHomepage.switchSlide(true);
                } else {
                    customHomepage.switchSlide(true, false);
                }
            }
        }
    }, false);
}