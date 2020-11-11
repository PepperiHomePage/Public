customHomePage.slideLifetyme = 5000;
customHomePage.slideSwitchTimeoutKeeper;
customHomePage.CaruselData = []
customHomePage.carousel = function (slideid, CaruselData) {
    customHomePage.CaruselData = CaruselData
    let htmlStr = "";
    let indicatorsStr = "";
    var idx = 0;
    var value = customHomePage.CaruselData[idx];
    htmlStr += `<div class="slide" data-state="active"
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
</div>`

    document.getElementById(slideid).innerHTML = htmlStr;

    for (const [idx1, value] of customHomePage.CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide')); customHomepage.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide'));  customHomepage.switchSlide(true)" ></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide'));  customHomepage.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide'));  customHomepage.switchSlide(true)"></span>
           </div>`
    }


    document.getElementById("indicators").innerHTML = indicatorsStr;
    customHomePage.setSessionStorage("savedIDX", 0);
    customHomePage.slideLifetyme = value.time;
    customHomePage.switchSlide();
    customHomePage.playerClick = function () {
        var btn = document.getElementById("player");
        var btnClass = btn.className;
        if (btnClass == "play") {
            btn.className = "pause";
            customHomePage.switchSlide();
        } else {
            btn.className = "play";
            clearTimeout(customHomePage.slideSwitchTimeoutKeeper);
        }
    };
    customHomePage.switchSlide = function (isCurrent, next = true) {
        clearTimeout(customHomePage.slideSwitchTimeoutKeeper);
        let htmlStr = "";

        let indicatorsStr = "";

        var idx;
        var value;

        idx = +sessionStorage.getItem("savedIDX") < customHomePage.CaruselData.length ?
            +sessionStorage.getItem("savedIDX") :
            0;

        value = customHomePage.CaruselData[idx];
        if (next) {
            customHomePage.setSessionStorage(
                "savedIDX",
                +sessionStorage.getItem("savedIDX") + 1 < customHomePage.CaruselData.length ?
                +sessionStorage.getItem("savedIDX") + 1 :
                0
            );
        } else {
            customHomePage.setSessionStorage(
                "savedIDX",
                +sessionStorage.getItem("savedIDX") - 1 > 0 ?
                +sessionStorage.getItem("savedIDX") - 1 :
                3
            );

        }

        htmlStr += `<div class="slide"  data-state="active"
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
    </div>`
        if (document.getElementById("slides")) {
            document.getElementById("slides").innerHTML = htmlStr;
            for (const [idx1, value] of customHomePage.CaruselData.entries()) {
                indicatorsStr +=
                    idx1 == idx ?
                    `<div class="radio-box">
               <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide')); customHomepage.switchSlide(true)" checked="checked">
               <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide')); customHomepage.switchSlide(true)"></span>
               </div>` :
                    `<div class="radio-box">
               <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide')); customHomepage.switchSlide(true)">
               <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', customHomePage.getAttribute('data-slide')); customHomepage.switchSlide(true)"></span>
               </div>`
            }
            document.getElementById("indicators").innerHTML = indicatorsStr;
            document.querySelectorAll(".slide-text")[0].style.opacity = 1;
            customHomePage.slideLifetyme = value.time;
            customHomePage.slideSwitchTimeoutKeeper = setTimeout(function () {
                customHomepage.switchSlide();
            }, customHomePage.slideLifetyme);
        }
    };
    customHomePage.swipeListener = function () {
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
    customHomePage.swipeListener()
}