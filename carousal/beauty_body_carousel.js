customFunction.slideLifetyme = 5000;
customFunction.slideSwitchTimeoutKeeper;
customFunction.CaruselData = []
customFunction.carousel = function (slideid, CaruselData) {
    customFunction.CaruselData = CaruselData
    let htmlStr = "";
    let indicatorsStr = "";
    var idx = 0;
    var value = customFunction.CaruselData[idx];
    
    htmlStr += ` <div id="carousel" class="carousel"> 
    <div id="slides" class="slides"><div class="slide" data-state="active"
    style="background-image: url('${value.imageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink}', "customFunction")" >${value.buttonText}</button>
            <p class="title">${value.title}</p>
            <p class="desc">${value.description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="customFunction.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div></div>`

    document.getElementById(slideid).innerHTML = htmlStr;

    for (const [idx1, value] of customFunction.CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick=" customFunction.switchSlide(true)" ></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick=" customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick=" customFunction.switchSlide(true)"></span>
           </div>`
    }


    document.getElementById("indicators").innerHTML = indicatorsStr;
    customFunction.setSessionStorage("savedIDX", 0);
    customFunction.slideLifetyme = value.time;
    customFunction.switchSlide();
    
    customFunction.swipeListener()
}

customFunction.playerClick = function () {
    var btn = document.getElementById("player");
    var btnClass = btn.className;
    if (btnClass == "play") {
        btn.className = "pause";
        customFunction.switchSlide();
    } else {
        btn.className = "play";
        clearTimeout(customFunction.slideSwitchTimeoutKeeper);
    }
};
customFunction.switchSlide = function (isCurrent, next = true) {
    clearTimeout(customFunction.slideSwitchTimeoutKeeper);
    let htmlStr = "";

    let indicatorsStr = "";

    var idx;
    var value;

    idx = +sessionStorage.getItem("savedIDX") < customFunction.CaruselData.length ?
        +sessionStorage.getItem("savedIDX") :
        0;

    value = customFunction.CaruselData[idx];
    if (next) {
        customFunction.setSessionStorage(
            "savedIDX",
            +sessionStorage.getItem("savedIDX") + 1 < customFunction.CaruselData.length ?
            +sessionStorage.getItem("savedIDX") + 1 :
            0
        );
    } else {
        customFunction.setSessionStorage(
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
            <button id="shop_now" onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink}', "customFunction")" >${value.buttonText}</button>
            <p class="title">${value.title}</p>
            <p class="desc">${value.description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="customFunction.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div>
</div>`
    if (document.getElementById("carousal-content")) {
        document.getElementById("carousal-content").innerHTML = htmlStr;
        for (const [idx1, value] of customFunction.CaruselData.entries()) {
            indicatorsStr +=
                idx1 == idx ?
                `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customFunction.switchSlide(true)"></span>
           </div>` :
                `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customFunction.switchSlide(true)"></span>
           </div>`
        }
        document.getElementById("indicators").innerHTML = indicatorsStr;
        document.querySelectorAll(".slide-text")[0].style.opacity = 1;
        customFunction.slideLifetyme = value.time;
        customFunction.slideSwitchTimeoutKeeper = setTimeout(function () {
            customFunction.switchSlide();
        }, customFunction.slideLifetyme);
    }
};
customFunction.swipeListener = function () {
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
                    customFunction.switchSlide(true);
                } else {
                    customFunction.switchSlide(true, false);
                }
            }
        }
    }, false);
}