this.slideLifetyme = 5000;
this.slideSwitchTimeoutKeeper;
this.CaruselData = []
this.cssFilePath = "https://github.com/PepperiHomePage/Public/blob/Burrypony-test/brands/beauty_body_brands.css";
this.carousel = function (slideid, CaruselData) {
    this.initPlugin = function () {
        var options = {
          cssURLs: [this.cssFilePath],
        };
        return options;
      };
    this.CaruselData = CaruselData
    let htmlStr = "";
    let indicatorsStr = "";
    var idx = 0;
    var value = this.CaruselData[idx];
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

    for (const [idx1, value] of this.CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customHomepage.switchSlide(true)" ></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customHomepage.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customHomepage.switchSlide(true)"></span>
           </div>`
    }


    document.getElementById("indicators").innerHTML = indicatorsStr;
    this.setSessionStorage("savedIDX", 0);
    this.slideLifetyme = value.time;
    this.switchSlide();
    this.playerClick = function () {
        var btn = document.getElementById("player");
        var btnClass = btn.className;
        if (btnClass == "play") {
            btn.className = "pause";
            this.switchSlide();
        } else {
            btn.className = "play";
            clearTimeout(this.slideSwitchTimeoutKeeper);
        }
    };
    this.switchSlide = function (isCurrent, next = true) {
        clearTimeout(this.slideSwitchTimeoutKeeper);
        let htmlStr = "";

        let indicatorsStr = "";

        var idx;
        var value;

        idx = +sessionStorage.getItem("savedIDX") < this.CaruselData.length ?
            +sessionStorage.getItem("savedIDX") :
            0;

        value = this.CaruselData[idx];
        if (next) {
            this.setSessionStorage(
                "savedIDX",
                +sessionStorage.getItem("savedIDX") + 1 < this.CaruselData.length ?
                +sessionStorage.getItem("savedIDX") + 1 :
                0
            );
        } else {
            this.setSessionStorage(
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
            for (const [idx1, value] of this.CaruselData.entries()) {
                indicatorsStr +=
                    idx1 == idx ?
                    `<div class="radio-box">
               <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)" checked="checked">
               <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)"></span>
               </div>` :
                    `<div class="radio-box">
               <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)">
               <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)"></span>
               </div>`
            }
            document.getElementById("indicators").innerHTML = indicatorsStr;
            document.querySelectorAll(".slide-text")[0].style.opacity = 1;
            this.slideLifetyme = value.time;
            this.slideSwitchTimeoutKeeper = setTimeout(function () {
                customHomepage.switchSlide();
            }, this.slideLifetyme);
        }
    };
    this.swipeListener = function () {
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
    this.swipeListener()
}