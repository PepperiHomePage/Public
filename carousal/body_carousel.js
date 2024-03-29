customFunction.slideLifetyme = 5000;
customFunction.slideSwitchTimeoutKeeper;
customFunction.CaruselData = []
customFunction.carousel = function (slideid, CaruselData) {
    customFunction.CaruselData = CaruselData
    let htmlStr = "";
    let indicatorsStr = "";
    var idx = 0;
    var value = customFunction.CaruselData[idx];
    if (window.innerWidth <= 960) {
    
        htmlStr += ` <div id="carousel" class="carousel"> 
        <div id="slides" class="slides"  onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')"><div class="slide" data-state="active"
        style="background-image: url('${value.imageURLIpad?value.imageURLIpad:value.imageURL}')">
        <div class="gard-overlay">
            <div class="slide-text">
                <button id="shop_now" ${value.buttonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}', 'customFunction')" >${value.buttonText}</button>
                <p class="title">${value.title}</p>
                <p class="desc" style="${(!value.description || value.description== '') ? 'display:none' : ''}">${value.description}</p>
            </div>
            <div class="slide-controllers">
                <div id="indicators" class="indicators">
                    
                </div>
                <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
                </button>
            </div>
        </div>
    </div></div></div>`
    }else if (window.innerWidth <= 480) {
    
        htmlStr += ` <div id="carousel" class="carousel"> 
        <div id="slides" class="slides"  onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')"><div class="slide" data-state="active"
        style="background-image: url('${value.imageURLIphone?value.imageURLIphone:value.imageURL}')">
        <div class="gard-overlay">
            <div class="slide-text">
                <button id="shop_now" ${value.buttonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}', 'customFunction')" >${value.buttonText}</button>
                <p class="title">${value.title}</p>
                <p class="desc" style="${(!value.description || value.description== '') ? 'display:none' : ''}">${value.description}</p>
            </div>
            <div class="slide-controllers">
                <div id="indicators" class="indicators">
                    
                </div>
                <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
                </button>
            </div>
        </div>
    </div></div></div>`
    }else{
        htmlStr += ` <div id="carousel" class="carousel"> 
    <div id="slides" class="slides"  onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')"><div class="slide" data-state="active"
    style="background-image: url('${value.imageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" ${value.buttonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}', 'customFunction')" >${value.buttonText}</button>
            <p class="title">${value.title}</p>
            <p class="desc" style="${(!value.description || value.description== '') ? 'display:none' : ''}">${value.description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div></div>`
    }
    

    

    document.getElementById(slideid).innerHTML = htmlStr;
    if (!value.buttonText)
        document.querySelector(".slide .gard-overlay").style.background = 'none'
    for (const [idx1, value] of customFunction.CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)" ></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)"></span>
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
    clearTimeout(this.switcher);
    let htmlStr = "";

    let indicatorsStr = "";

    var idx;
    var value;

    idx = +sessionStorage.getItem("savedIDX") < CaruselData.length ?
        +sessionStorage.getItem("savedIDX") :
        0;

    value = CaruselData[idx];
    customFunction.setSessionStorage(
        "savedIDX",
        +sessionStorage.getItem("savedIDX") + 1 < CaruselData.length ?
        +sessionStorage.getItem("savedIDX") + 1 :
        0
    );
    if (window.innerWidth <= 960) {
    
        htmlStr +=  `<div id="slides" class="slides"  onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')"><div class="slide"  data-state="active"
        style="background-image: url('${value.imageURLIpad?value.imageURLIpad:value.imageURL}')">
        <div class="gard-overlay">
            <div class="slide-text">
                <button id="shop_now" ${value.buttonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')" >${value.buttonText}</button>
                <p class="title">${value.title}</p>
                <p class="desc" style="${(!value.description || value.description== '') ? 'display:none' : ''}">${value.description}</p>
            </div>
            <div class="slide-controllers">
                <div id="indicators" class="indicators">
                    
                </div>
                <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
                </button>
            </div>
        </div>
    </div></div>`;
    }else if (window.innerWidth <= 480) {
    
        htmlStr += ` <div id="carousel" class="carousel"> 
        <div id="slides" class="slides"  onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')"><div class="slide" data-state="active"
        style="background-image: url('${value.imageURLIphone?value.imageURLIphone:value.imageURL}')">
        <div class="gard-overlay">
            <div class="slide-text">
                <button id="shop_now" ${value.buttonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}', 'customFunction')" >${value.buttonText}</button>
                <p class="title">${value.title}</p>
                <p class="desc" style="${(!value.description || value.description== '') ? 'display:none' : ''}">${value.description}</p>
            </div>
            <div class="slide-controllers">
                <div id="indicators" class="indicators">
                    
                </div>
                <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
                </button>
            </div>
        </div>
    </div></div></div>`
    }else{
        htmlStr += `<div id="slides" class="slides"  onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')"><div class="slide"  data-state="active"
    style="background-image: url('${value.imageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" ${value.buttonText?'':'style="display:none"'} onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink.replace(/["']/g,"%22")}','customHomepage')" >${value.buttonText}</button>
            <p class="title">${value.title}</p>
            <p class="desc" style="${(!value.description || value.description== '') ? 'display:none' : ''}">${value.description}</p>
        </div>
        <div class="slide-controllers">
            <div id="indicators" class="indicators">
                
            </div>
            <button onclick="event.stopImmediatePropagation();customFunction.playerClick();" class="pause" id="player">
            </button>
        </div>
    </div>
</div></div>`;
    }
    document.getElementById("carousel").innerHTML = htmlStr;
    if (!value.buttonText)
        document.querySelector(".slide .gard-overlay").style.background = 'none'
    for (const [idx1, value] of CaruselData.entries()) {
        indicatorsStr +=
            idx1 == idx ?
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)"></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)"></span>
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
    this.speed = value.time;
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

    shippingHTML += `<div class="shipping" onclick="customFunction.setUUIDandNav(null,null,'${shipping.deepLink.replace(/["']/g,"%22")}', 'customHomepage')">
                        <p>${shipping.title}</p>
                        <button class="delivery" onclick="customFunction.setUUIDandNav(null,null,'${shipping.deepLink.replace(/["']/g,"%22")}', 'customHomepage')">${shipping.buttonText}</button>    
                      </div>`;

    document.getElementById(slideid).innerHTML = shippingHTML;
    document.getElementById(slideid).style.display = "block";
};