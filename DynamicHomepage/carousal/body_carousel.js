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
    <div id="slides" class="slides"  onclick="customFunction.setUUIDandNav('${value.DeepLink}')"><div class="slide" data-state="active"
    style="background-image: url('${value.ImageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" ${value.ButtonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.DeepLink.replace(/["']/g,"%22")}', 'customFunction')" >${value.ButtonText}</button>
            <p class="title">${value.Title}</p>
            <p class="desc" style="${(!value.Description || value.Description== '') ? 'display:none' : ''}">${value.Description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div></div>`

    document.getElementById(slideid).innerHTML = htmlStr;
    if (!value.ButtonText)
        document.querySelector(".slide .gard-overlay").style.background = 'none'
    for (const [idx1, value] of customFunction.CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.Time}"  data-state="active" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.Time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)" ></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.Time}" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.Time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)"></span>
           </div>`
    }


    document.getElementById("indicators").innerHTML = indicatorsStr;
    customFunction.setSessionStorage("savedIDX", 0);
    customFunction.slideLifetyme = value.Time;
    customFunction.switchSlide();

    customFunction.swipeListener()
}

customFunction.playerClick = function () {
    var btn = document.getElementById('player');
    var btnClass = btn.className
    if (btnClass == 'play') {
        btn.className = 'pause'
        customFunction.switchSlide();
    } else {
        btn.className = 'play'
        clearTimeout(customFunction.switcher);
    }
};
customFunction.switchSlide = function (isCurrent, next = true) {
    clearTimeout(this.switcher);
    let htmlStr = "";

    let indicatorsStr = "";

    var idx;
    var value;

    idx = +sessionStorage.getItem("savedIDX") < customHomepage.configFile.CaruselData.length ?
        +sessionStorage.getItem("savedIDX") :
        0;

    value = customHomepage.configFile.CaruselData[idx];
    customFunction.setSessionStorage(
        "savedIDX",
        +sessionStorage.getItem("savedIDX") + 1 < customHomepage.configFile.CaruselData.length ?
        +sessionStorage.getItem("savedIDX") + 1 :
        0
    );

    htmlStr += `<div id="slides" class="slides"  onclick="customFunction.setUUIDandNav(null,null,'${value.DeepLink.replace(/["']/g,"%22")}','customFunction')"><div class="slide"  data-state="active"
    style="background-image: url('${value.ImageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" ${value.ButtonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.DeepLink.replace(/["']/g,"%22")}','customFunction')" >${value.ButtonText}</button>
            <p class="title">${value.Title}</p>
            <p class="desc" style="${(!value.Description || value.Description== '') ? 'display:none' : ''}">${value.Description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div>`;
    document.getElementById("carousel").innerHTML = htmlStr;
    if (!value.ButtonText)
        document.querySelector(".slide .gard-overlay").style.background = 'none'
    for (const [idx1, value] of customHomepage.configFile.CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.Time}"  data-state="active" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.Time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)"></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.Time}" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.Time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)"></span>
           </div>`;
    }
    document.getElementById("indicators").innerHTML = indicatorsStr;
    document.querySelectorAll(".slide-text")[0].style.opacity = 1;
    var carousel = document.getElementById("carousel");
    if (carousel) {
        this.slides = carousel.querySelectorAll(".slide");
        this.slideDesc = carousel.querySelectorAll(".slide-text");
        this.indicators = carousel.querySelectorAll(".indicator");
    }
    this.speed = value.Time;
    this.switcher = setTimeout(function () {
        customFunction.switchSlide();
    }, this.speed);

};
customFunction.swipeListener = function () {
    var initialPoint;
    var finalPoint;
    document.addEventListener('touchstart', function (event) {
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
    }, false);
    document.addEventListener('touchend', function (event) {
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

customFunction.buildCarouselBanner = function (slideid) {
    var carouselBannerHTML = "";

    carouselBannerHTML += `<section id="carousal-content"></section>
                            <div id="shipping-baner" style="display: block;"></div>`;

    document.getElementById(slideid).innerHTML = carouselBannerHTML;
};

customFunction.buildShippingBaner = function (slideid) {
    var shippingHTML = "";

    shippingHTML += `<div class="shipping" onclick="customFunction.setUUIDandNav(null,null,'${shipping.DeepLink.replace(/["']/g,"%22")}', 'customFunction')">
                        <p>${shipping.Title}</p>
                        <button class="delivery" onclick="customFunction.setUUIDandNav(null,null,'${shipping.DeepLink.replace(/["']/g,"%22")}', 'customFunction')">${shipping.ButtonText}</button>    
                      </div>`;

    document.getElementById(slideid).innerHTML = shippingHTML;
    document.getElementById(slideid).style.display = "block";
};