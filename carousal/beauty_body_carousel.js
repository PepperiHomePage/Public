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
            <button id="shop_now" onclick="customFunction.setUUIDandNav(null,null,'${value.deepLink}', 'customFunction')" >${value.buttonText}</button>
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
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)" ></span>
           </div>` :
            `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customFunction.switchSlide(true)"></span>
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

    idx =
      +sessionStorage.getItem("savedIDX") < CaruselData.length
        ? +sessionStorage.getItem("savedIDX")
        : 0;

    value = CaruselData[idx];
    customFunction.setSessionStorage(
      "savedIDX",
      +sessionStorage.getItem("savedIDX") + 1 < CaruselData.length
        ? +sessionStorage.getItem("savedIDX") + 1
        : 0
    );

    htmlStr += `<div class="slide"  data-state="active"
    style="background-image: url('${value.imageURL}')">
    <div class="gard-overlay">
        <div class="slide-text">
            <button id="shop_now" onclick="customFunction.setUUIDandNav('${value.deepLink}',true)" >${value.buttonText}</button>
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
</div>`;
    if (document.getElementById("slides")) {
      document.getElementById("slides").innerHTML = htmlStr;

      /* htmlStr += `<div class="slide" onclick="customFunction.setUUIDandNav('${value.deepLink}',true)"  data-state="active" style="background-image: url('${value.imageURL}'), linear-gradient(to right, rgba(117, 117, 117, 0.7) 10%, rgba(163, 163, 163, .2))"></div>
                           <div class="slide-text">
                           <button id="shop_now" onclick="customFunction.setUUIDandNav('/Transactions/scope_items/{{UUID}}?CurrentTab=%22%7B%5C%22DynamicFilter%5C%22:%5C%22Item.MainCategory%5C%22,%5C%22Value%5C%22:%5C%22Bakery%5C%22,%5C%22Parent%5C%22:%5C%22%7B%5C%5C%5C%22JsonFilter%5C%5C%5C%22:%5C%5C%5C%224cb18aba-1986-43a0-a5d1-f53433c6a589%5C%5C%5C%22%7D%5C%22%7D%22&ViewType=%7B%22Key%22:%22OrderCenterView3%22,%22Value%22:%22Medium%22%7D&TopPadding=0&SearchAll=false')"></button>
                           <p class="title">${value.title}</p>
                           <p class="desc">${value.description}</p>
                       </div>`;*/

      for (const [idx1, value] of CaruselData.entries()) {
        indicatorsStr +=
          /*idx1 === 0
            ? `<input class="indicator" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));customFunction.switchSlide(true)" checked type="radio"/>`
            : `<input class="indicator" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide'));customFunction.switchSlide(true)" type="radio"/>`;
          */
          idx1 == idx
            ? `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)" checked="checked">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)"></span>
           </div>`
            : `<div class="radio-box">
           <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)">
           <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="customFunction.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customFunction.switchSlide(true)"></span>
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
    }
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