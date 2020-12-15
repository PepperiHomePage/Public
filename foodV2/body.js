/*******************************************Ver: 19-06-2019 - fix to open orders list***************************************************/
//                                  Pepperi plugin interface
/**********************************************************************************************/
//  1. The namespace of the header must be "customHomepage".
//  3. The header must implement those functions:
//     * initPlugin - This method is to get the option object with the declared interface:
//          - JsURLs: the path of the script files.
//          - cssURLs: the path of the css files.
//          - more...
//     * onPluginLoad(context) - This method is called when the plugin is ready for use (external files are loaded).
//          - params: context object .
//     * navigateTo - (Optional) The event for the navigation the data need to be like this:
//          - detail: {
//              path: 'HomePage' - (the path is the url that you want).
//          }
//     * logout - (Optional) The event for the logout the name of the event have to be 'logout':
//
/**********************************************************************************************/
var customHomepage = {};
(function() {
    this.caruselInterval;
    this.caruselInterValTime = 3; // sec
    this.context;
    this.jsonFilePath = 'https://storage.pepperi.com/PreSales/food_demo_2/config_body.js';
    this.cssFilePath = '';
    this.accountUUID;
    this.typeName;
    this.catalogName = 'Default Catalog';
    this.slides;
    this.speed = 7000; // 5 seconds
    this.slideDesc;
    this.indicators;
    this.switcher;
    this.clickedLists;
    this.setHtml = function() {
        this.slideIndex = 1;

        var str =
            ` <style>
            /* START MAIN STYLES*/

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;900&display=swap');
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.wrapper {
    display: grid;
    grid-template-areas: "carousal-content sidebar" "categories sidebar";
    grid-template-rows: 420px 336px;
    grid-template-columns: 1fr 216px;
    grid-column-gap: 24px;
    height: 120%;
    -webkit-flex: 1;
    /* Safari 6.1+ */
    -ms-flex: 1;
    /* IE 10 */
    padding-left: 24px;
    padding-right: 24px;
    max-width: 1464px;
    margin: 24px auto;
}

button,
button:active,
button:focus {
    outline: none;
    border: none;
    cursor: pointer;
}

hr {
    background: #c1c2c3;
    margin-bottom: 16px;
    margin-top: 16px;
}

#sidebar {
    grid-area: sidebar;
}

.response-menu {
    display: none;
}

#overSide {
    display: none;
}

.sidebar-menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: black;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.16px;
    line-height: 28px;
    margin-bottom: 0;
    background: white;
    opacity: 90%;
}

.baselist {
    display: flex;
    flex-direction: column;
    background: white;
    color: black;
    font-family: 'Montserrat', sans-serif;
    margin-top: -6px;
}

.top-base {
    display: flex;
    flex-direction: row;
    height: 28px;
    justify-content: space-between;
}

.top-base p {
    height: 28px;
    color: rgb(26, 26, 26);
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    letter-spacing: 0.16px;
    line-height: 46px;
}

.order-button {
    position: relative;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.12px;
    line-height: 20px;
    text-align: center;
    margin-top: 14px;
    background: rgb(250, 250, 250);
    border-radius: 4px;
    border: 1px solid rgb(153, 153, 153);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    height: 40px;
    color: #000;
}

@media screen and (min-width: 960px) and (max-width: 1366px) {
    .wrapper {
        display: grid;
        grid-template-areas: "carousal-content sidebar" "categories sidebar";
        grid-template-rows: 280px 336px;
        grid-template-columns: 1fr 216px;
        height: 100vh;
        flex: 1;
        padding-left: 24px;
        padding-right: 24px;
        margin-top: 24px;
    }
}

@media screen and (min-width: 768px) and (max-width: 960px) {
    .wrapper {
        display: grid;
        grid-template-areas: "carousal-content sidebar" "categories categories";
        grid-template-rows: 500px 336px;
        grid-template-columns: 1fr 190px;
        height: 100vh;
        padding-left: 24px;
        padding-right: 16px;
        margin-top: 24px;
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    #overSide {
        display: block;
        margin-top: 0px !important;
        height: 170%;
    }
    .wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: "sidebar" "carousal-content" "categories";
        height: auto;
        grid-template-rows: 64px 420px 2fr;
        padding: 0px;
        grid-gap: unset;
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 0px;
    }
    .baselist {
        padding-top: 24px;
        margin-top: 0px;
        box-shadow: inset 0px 11px 4px -8px rgba(21, 24, 26, 0.16);
    }
    #sidebar-sm {
        display: none;
    }
    #sidebar-sm {
        position: absolute;
        z-index: 1000;
        min-width: 100vw;
        height: fit-content !important;
        padding-left: 39px;
        padding-right: 40px;
        opacity: 100%;
        box-shadow: inset 0px 11px 4px -8px rgba(21, 24, 26, 0.16);
    }
    #sidebar {
        height: unset;
    }
    .response-menu {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 64px;
    }
    .response-menu button {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.12px;
        line-height: 20px;
        text-align: center;
        margin-top: 12px;
        background: rgb(250, 250, 250);
        border-radius: 4px;
        border: 1px solid rgb(153, 153, 153);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
        height: 40px;
        color: #000;
        padding: 9px 92px;
    }
}

@media screen and (min-width: 320px) and (max-width: 576px) {
    .wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: "sidebar" "carousal-content" "categories";
        height: auto;
        grid-template-rows: 64px 420px 2fr;
        padding: 0px;
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 0px;
    }
    #overSide {
        display: block;
        margin-top: 0px !important;
        height: 170%;
    }
    #sidebar-sm {
        display: none;
    }
    .response-menu {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 64px;
    }
    #sidebar {
        box-shadow: 0px 2px 4px 0px rgba(21, 24, 26, 0.16);
    }
    .response-menu button {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.12px;
        line-height: 20px;
        text-align: center;
        background: rgb(250, 250, 250);
        border-radius: 4px;
        border: 1px solid rgb(153, 153, 153);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
        height: 40px;
        color: #000;
        padding: 7px 80px;
        margin-top: 12px;
    }
    #sidebar-sm {
        position: absolute;
        z-index: 1000;
        min-width: 100vw;
        height: fit-content;
        padding-left: 39px;
        padding-right: 40px;
        box-shadow: inset 0px 11px 4px -8px rgba(21, 24, 26, 0.16);
    }
    #sidebar {
        height: unset;
    }
    .baselist {
        padding-top: 24px;
        margin-top: 0px;
        box-shadow: inset 0px 11px 4px -8px rgba(21, 24, 26, 0.16);
    }
    .sidebar-menu {
        opacity: 100%;
    }
    .order-button {
        position: relative;
    }
}


/* END MAIN STYLES*/


/*START CAROUSAL STYLES*/

#carousal-content {
    grid-area: carousal-content;
}

#carousel {
    grid-area: carousel;
}

.carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    background: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/back.png");
    background-color: #e5e5e5;
    cursor: pointer;
    border-radius: 4px;
}

#carousal-content {
    display: grid;
    grid-template-areas: "carousel";
    grid-template-rows: 1fr;
    background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
    border-radius: 4px;
}

.indicators:hover {
    background-color: rgba(255, 255, 255, 0.4);
}

.indicators:active,
.indicators:focus {
    -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
    box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
}

.indicators:active {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.radio-box {
    display: block;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 1rem;
    width: 1rem;
    -webkit-margin-end: 1rem;
    margin-inline-end: 1rem;
}

.radio-box:last-child {
    -webkit-margin-end: 0;
    margin-inline-end: 0;
}

.radio-box input {
    height: 1rem;
    width: 1rem;
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.radio-box input:checked~.radio-dot {
    background-color: #0a0a0a;
}

.radio-dot {
    position: absolute;
    top: 0;
    left: 0;
    height: 1rem;
    width: 1rem;
    background-color: rgba(10, 10, 10, 0.25);
    border-radius: 50%;
}

.radio-dot :after {
    content: "";
    position: absolute;
    display: none;
}

.radio-dot:hover {
    background-color: rgba(10, 10, 10, 0.4);
}

.radio-dot:active,
.radio-dot:focus {
    -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
    box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
}

.slides {
    height: 100%;
    width: 100%;
    position: relative;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-size: 3em;
    color: white;
    line-height: 400px;
    text-align: center;
    opacity: 0;
    transition: opacity 1000ms;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.slide:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0));
}

.slide-text {
    position: absolute;
    color: #ffffff;
    bottom: 20px;
    left: 26px;
    opacity: 0;
}

.slide-text .title {
    margin-top: 0;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 1.67px;
    line-height: 48px;
    margin-bottom: 0;
}

.slide-text .sub_title {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.11px;
    line-height: 16px;
    margin-bottom: 0;
}

.slide-text .desc {
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 0.18px;
    line-height: 32px;
    margin-bottom: 0px;
}

.slide:nth-child(1) {
    opacity: 1;
}

.slide-text:nth-child(1) {
    opacity: 1;
}

.slide[data-state=active] {
    display: block;
}

.indicators {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 20px;
    right: 60px;
    width: 110px;
    padding: 9px 6px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
}

#shop_now {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 100%;
    padding: 6px 12px;
    border-radius: 4px;
    color: black;
    font-family: 'Inter-SemiBold', sans-serif;
    font-weight: 600;
    letter-spacing: 0.1px;
    line-height: 28px;
    font-size: 16px;
    background: linear-gradient(45deg, rgb(120, 170, 0) 0%, rgb(147, 201, 14) 100%);
    border-radius: 3px;
}

.pause {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 11px 0;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    height: 34px;
    width: 33px;
    background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/pause.svg");
    background-position: center;
    background-size: 16px;
    background-repeat: no-repeat;
}

.play {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 11px 0;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    height: 32px;
    width: 32px;
    background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/play.svg");
    background-position: center;
    background-size: 20px;
    background-repeat: no-repeat;
}

.indicator {
    cursor: pointer;
}

input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: none;
}

input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #000000;
    content: '';
    display: inline-block;
    visibility: visible;
    border: none;
}

@media screen and (min-width: 768px) and (max-width: 960px) {
    .slide-text {
        width: 70%;
    }
    .slide-text .desc {
        font-size: 24px;
        line-height: 37px;
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    #carousal-content {
        grid-template-rows: 1fr;
    }
    .slide-text {
        position: absolute;
        width: 75%;
        bottom: 20px;
        left: 24px;
        opacity: 0;
    }
    .slide-text .title {
        margin-top: 0;
        font-size: 38px;
        font-weight: bold;
        letter-spacing: 1.67px;
        line-height: 43px;
    }
    .slide-text .desc {
        font-size: 25px;
        line-height: 37px;
    }
    #shop_now {
        bottom: 100%;
        padding: 6px 6px;
        font-size: 10px;
    }
    .carousel {
        border-radius: 0px;
    }
}

@media screen and (min-width: 320px) and (max-width: 576px) {
    .carousel {
        border-radius: 0px;
    }
    #carousal-content {
        grid-template-rows: 1fr;
    }
    #shop_now {
        bottom: 100%;
        padding: 6px 6px;
        font-size: 10px;
    }
    .indicators {
        width: 64px;
    }
    .slide-text {
        position: absolute;
        width: 40%;
        bottom: 20px;
        left: 24px;
        opacity: 0;
    }
    .slide-text .title {
        margin-top: 0;
        font-size: 31px;
        font-weight: bold;
        letter-spacing: 1.67px;
        line-height: 35px;
        margin-bottom: 0;
    }
    .slide-text .desc {
        font-size: 21px;
        line-height: 32px;
    }
}


/* END CAROUSAL STYLES*/


/*START HOMEPAGE LIST STYLES*/

.option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
}

#add {
    height: 24px;
    width: 24px;
    border-radius: 2px;
    fill: black;
    margin: 3px;
    background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/Icon-plus.svg");
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center;
}

#popup #overlay1 {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
    display: none;
}

#popup #content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    background: #fff;
    width: 500px;
    height: 250px;
    z-index: 2;
    color: rgb(71, 71, 71);
    text-align: left;
    padding: 20px;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
}

.option .close-btn {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    background: #222;
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
}

#overlay1 {
    display: block;
}

#content {
    transition: all 300ms ease-in-out;
    transform: translate(-50%, -50%) scale(1);
}

#order_btn_qty {
    position: absolute;
    display: inline-block;
    background-color: green;
    color: #ffff;
    font-size: 12px;
    height: 20px;
    border-radius: 10px;
    padding: 0 8px;
    top: -10px;
    right: -8px;
}

@media screen and (min-width: 768px) and (max-width: 960px) {
    #order_btn_qty {
        margin-left: 109px !important;
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    #order_btn_qty {
        width: 6% !important;
        right: -12px;
    }
}

@media screen and (min-width: 320px) and (max-width: 576px) {
    #order_btn_qty {
        width: 6% !important;
        right: -12px;
    }
}


/*END HOMEPAGE LIST STYLES*/


/*START IMAGES BLOCK STYLES*/

#categories {
    display: grid;
    grid-template-areas: "box1 box2 box3";
    grid-template-columns: 2fr 2fr 1fr;
    grid-gap: 16px;
    margin-top: 16px;
    grid-area: categories;
}

.box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 16px;
    border-radius: 4px;
}

.box div {
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    background-size: cover;
    border-radius: 4px;
}

.box1 {
    grid-area: box1;
    grid-template-columns: 1fr;
}

.box2 {
    grid-area: box2;
}

.box3 {
    grid-area: box3;
    display: grid;
    grid-gap: 16px;
}

.box3 div {
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    background-size: cover;
    border-radius: 4px;
}

.categories_item {
    background-color: #e5e5e5;
    cursor: pointer;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
}

.overlay {
    background: white;
    position: absolute;
    margin-top: 128px;
    width: 100%;
    text-align: center;
    padding: 8px 3px;
    cursor: pointer;
    height: 40px;
    color: #1a1a1a;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.15px;
    line-height: 24px;
}

.box1 .overlay_b1 {
    position: absolute;
    top: 0;
    height: 40px;
    left: 0;
    color: rgb(255, 255, 255);
    font-family: 'Heebo-Bold', sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 24px;
    padding-top: 7px;
    padding-right: 12px;
    padding-left: 12px;
    text-align: left;
    cursor: pointer;
    background: rgb(48, 37, 29);
    border-radius: 4px 0px 4px 0px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1), 0px 4px 8px 0px rgba(21, 24, 26, 0.1), 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 768px) and (max-width: 960px) {
    #categories {
        display: grid;
        grid-template-areas: "box1 box2 box3";
        grid-template-columns: 2fr 2fr 1fr;
        grid-gap: 16px;
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    #categories {
        display: grid;
        grid-template-areas: "box2" "box3" "box1";
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        padding: 16px;
    }
    .box1 {
        margin-top: -174px;
    }
    .box3 {
        grid-template-columns: 1fr 1fr;
        height: 151px;
    }
}

@media screen and (min-width: 320px) and (max-width: 576px) {
    #categories {
        display: grid;
        grid-template-areas: "box2" "box3" "box1";
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        padding: 16px;
    }
    .box1 {
        margin-top: -174px;
    }
    .box3 {
        grid-template-columns: 1fr 1fr;
        height: 151px;
    }
}


/*END IMAGES BLOCK STYLES*/


/*START INVOICE BLOCK STYLES*/

#balance-line {
    height: 28px;
    color: rgb(230, 38, 0);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.16px;
    line-height: 10px;
    font-family: 'Inter-SemiBold', sans-serif;
}

.balance {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    background-color: rgb(236, 235, 235);
    border-radius: 4px;
    cursor: pointer;
    height: 80px;
}

.balance div {
    height: 24px;
    color: rgba(26, 26, 26, 0.7);
    font-size: 16px;
    font-family: Inter-Regular;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 24px;
    font-family: 'Inter', sans-serif;
    margin-top: 10px;
    padding-left: 15px;
    cursor: pointer;
    margin-top: 14px;
}

.balance img {
    color: black;
    padding-top: 19px;
    height: 60px;
    width: 70px;
    opacity: 85%;
}

#balance {
    font-weight: bold;
    color: black;
}

@media screen and (min-width: 768px) and (max-width: 960px) {
    .balance div {
        font-size: 15px;
    }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
    .balance {
        margin-bottom: 48px;
    }
}

@media screen and (min-width: 320px) and (max-width: 576px) {
    .balance {
        margin-bottom: 48px;
    }
    .balance {
        height: 80px;
    }
    .balance div {
        line-height: 20px;
    }
}


/*END INVOICE BLOCK STYLES*/


/*START CREDIT BLOCK STYLES*/

.credit {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(236, 235, 235);
    border-radius: 4px;
    margin-top: 8px;
    height: 80px;
    font-family: 'Inter', sans-serif;
    padding: 14px 16px;
}

#credit-line {
    width: 40px;
    height: 28px;
    color: rgb(26, 26, 26);
    font-size: 18px;
    display: inline;
    font-weight: 600;
    letter-spacing: 0.16px;
    line-height: 10px;
    font-family: 'Inter-SemiBold', sans-serif;
}

.credit p {
    width: 97px;
    height: 24px;
    color: rgba(26, 26, 26, 0.7);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 24px;
    font-family: 'Inter', sans-serif;
}

.credit img {
    color: black;
    padding-top: 4px;
    padding-right: 0px;
    padding-bottom: 4px;
    width: 48px;
    opacity: 85%;
}

@media screen and (min-width: 320px) and (max-width: 576px) {
    .credit {
        height: 80px;
    }
    .credit div {
        line-height: 20px;
    }
}


/*END CREDIT BLOCK STYLES*/


/*START REPLENISHMENT BLOCK*/

.rep-button {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.12px;
    line-height: 20px;
    text-align: center;
    background: rgb(48, 37, 29);
    border-radius: 4px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1), 0px 4px 8px 0px rgba(21, 24, 26, 0.1), 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
    padding-top: 10px;
    padding-bottom: 10px;
    color: white;
}


/*END REPLENISHMENT BLOCK*/
        </style>
        <div class="wrapper">
        <div id="carousal-content">
          <div id="carousel" class="carousel">
            <div id="slides" class="slides"></div>
            <div id="indicators" class="indicators"></div>
            <button onclick="customHomepage.playerClick();" class="pause" id="player">
            </button>
          </div>
        </div>
        <aside id="sidebar">
          <div id="response-menu" class="response-menu">
            <button onclick="customHomepage.openCloseMenu();" class="dropbtn" id="btn">Open menu</button>
          </div>
          <div id="sidebar-sm" class="sidebar-menu">
            
            <div class="baselist">
              <div class="top-base">
                <p>My Lists</p>
              </div>
              <hr>
              <div id="food_list" style="display: block">
              </div>
              <button class="order-button" id="transactionTotal1" onclick="customHomepage.NavigateToActiveCart()">
                <p id="order_btn_qty" style="display: none"></p><span id="totalText">Go to cart</span>
              </button>
            </div>
            <hr>
            <button class="rep-button" onclick="customHomepage.createNewReplenishment()">Replenishment</button>
            <hr>
            <div id="credit_line" class="credit"></div>
            <div id="invoice-balance" class="balance" onclick="customHomepage.CreateNewAgingActivity()">
            </div>
            <div id="overSide">
            </div>
          </div>
        </aside>
        <div id="categories">
        </div>
      </div>
    `;

        return str;
    };

    this.initPlugin = function() {
        var options = {
            JsURLs: [this.jsonFilePath],
            cssURLs: [this.cssFilePath]
        };
        return options;
    };

    this.onPluginLoad = function(context) {
        this.context = context;
        this.buildHTML();
        var data = JSON.parse(context.pluginData);
        if (data) {
            this.transactionName = data.typeName || '';
            this.accountUUID = data.accountUUID || '';
        }
        for (var keys in blocks_config) {
            if (!blocks_config[keys])
                document.getElementById(keys).style.display = "none"
            else
                document.getElementById(keys).style.display = "flex"
        }
        this.accountCredit();
        this.getTransactionStatus();
    };
    this.buildHTML = function() {
            customHomepage.carousel("carousal-content", CaruselData);
            customHomepage.homepageLists('food_list');
            customHomepage.drawImagesBlocks("categories", ImagesBottomBlock);
            customHomepage.getAgingInvoiceBalance();
        }
        /********************* ********************************************************************************/
        /********************* ********************************************************************************/
        /**START CAROUSAL PART */
    customHomepage.slideLifetyme = 5000;
    customHomepage.slideSwitchTimeoutKeeper;
    customHomepage.CaruselData = []
    customHomepage.carousel = function(slideid, CaruselData) {
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

    customHomepage.playerClick = function() {
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
    customHomepage.switchSlide = function(isCurrent, next = true) {
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
                "savedIDX", +sessionStorage.getItem("savedIDX") + 1 < customHomepage.CaruselData.length ?
                +sessionStorage.getItem("savedIDX") + 1 :
                0
            );
        } else {
            customHomepage.setSessionStorage(
                "savedIDX", +sessionStorage.getItem("savedIDX") - 1 > 0 ?
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
        if (document.getElementById("carousal-content")) {
            document.getElementById("carousal-content").innerHTML = htmlStr;
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
            customHomepage.slideSwitchTimeoutKeeper = setTimeout(function() {
                customHomepage.switchSlide();
            }, customHomepage.slideLifetyme);
        }
    };
    customHomepage.swipeListener = function() {
            var initialPoint;
            var finalPoint;
            document.addEventListener('touchstart', function(event) {
                event.preventDefault();
                event.stopPropagation();
                initialPoint = event.changedTouches[0];
            }, false);
            document.addEventListener('touchend', function(event) {
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
        /**END CAROUSAL PART */
        /********************* ********************************************************************************/
        /********************* ********************************************************************************/
        /**START HOMEPAGE LIST */
    this.homepageLists = function(id) {
        var bridgeObject = {
            fields: ['Name', 'InternalID', "UUID"],
            responseCallback: 'customHomepage.setAccountInternalID',
            requestID: id
        };
        pepperi.api.accounts.search(bridgeObject);
    }
    this.setAccountInternalID = function(data) {
        var self = this;
        this.AccountInternalID = data.objects.filter(el => {
            return el.UUID.replace(/-/g, '') == self.accountUUID
        })[0].InternalID;
        this.getUDTAccount(data.requestID);
    }
    this.getUDTAccount = function(id) {
        var account = this.AccountInternalID;
        pepperi.api.userDefinedTables.get({
            table: udtTable.udtOfCategotyListStorage.name,
            mainKey: account + '',
            secondaryKey: '1',
            requestID: id,
            responseCallback: 'customHomepage.setListValuesFromUdt'
        });
    };
    this.setListValuesFromUdt = function(data) {
        if (data.success) {
            var values = [data.value.split('~')[0], data.value.split('~')[1], data.value.split('~')[2]];
            var options = `<div id="popup" style="display: none">
    <div id="overlay1"></div>
    <div id="content" onclick="customHomepage.popupForAddedItemsFromUDTList()">                          
        <h1>Success!</h1>
        <hr>
        <p id="modal-text">Items from selected list were succesfully added to the cart!</p>
        <hr>                            
    </div></div>`;
            values.forEach(el => {
                options += `
    <div class="option">
           <p id="list">${el}</p>
           <button id="add" name="${el}" onclick='customHomepage.getListOfRelativeItemsFromUDT(this.name)'></button>
       </div>
   `
            })
            document.getElementById(data.requestID).innerHTML = options;
            document.getElementById(data.requestID).style.display = "block";
        }
    };
    this.getListOfRelativeItemsFromUDT = function(list) {
        this.clickedLists = list;
        list = list.replace('&amp;', '&')
        var account = this.AccountInternalID;
        pepperi.api.userDefinedTables.getList({
            table: udtTable.udtOfItemsStorage.name,
            mainKey: account + '~' + list,
            responseCallback: 'customHomepage.updateTransactionScopeFromUDTList'
        });
    };
    this.updateTransactionScopeFromUDTList = function(data) {
        var bridgeArray = []
        for (let i = 0; i < data.objects.length; i++) {
            var tmpObj = {};
            tmpObj.item = {
                ExternalID: data.objects[i].secondaryKey
            }
            tmpObj.UnitsQuantity = data.objects[i].value
            bridgeArray.push(tmpObj)
        }
        pepperi.app.transactionScopeItems.update({
            transaction: {
                UUID: customHomepage.getSessionStorage('LastOpenTransactionUUID')
            },
            objects: bridgeArray,
            responseCallback: 'customHomepage.popupForAddedItemsFromUDTList'
        });
    };
    this.popupForAddedItemsFromUDTList = function(data) {
        var modal = document.getElementById("popup");
        modal.style.display = "block";
        this.getTransactionStatus();
        setTimeout(function() {
            modal.style.display = "none";
        }, 1500)
    }
    this.getTransactionStatus = function() {
        var currentTransactionUUID = customHomepage.getSessionStorage('LastOpenTransactionUUID');
        if (!currentTransactionUUID) {
            customHomepage.createNewOrder();
        } else {
            var fields = ['Status', 'QuantitiesTotal', 'TSANewGrandTotalCurrency', 'UUID', 'Currency'];

            var filter = {
                ExpressionId: 1,
                ApiName: 'UUID',
                Operation: 'IsEqual',
                Values: [currentTransactionUUID]
            };
            customHomepage.getTransactions(fields, filter, [], 'customHomepage.getExitTransactionCallback');
        }
    };
    this.getTransactions = function(fields, filter, sortBy, callBack) {
        var bridgeObject = {
            fields: fields,
            filter: filter,
            sorting: sortBy,
            responseCallback: callBack
        };
        pepperi.api.transactions.search(bridgeObject);
    };
    this.getExitTransactionCallback = function(res) {
        if (res && res.objects && res.objects.length && (res.objects[0].Status == 1 || res.objects[0].Status == 1000)) {
            var transaction = res.objects[0];
            this.setQuantitiesTotal(transaction.QuantitiesTotal)
            this.setCurrentTransaction(transaction.UUID, transaction.TSANewGrandTotalCurrency, transaction.Currency);
        } else {
            customHomepage.createNewOrder();
        }
    };
    this.setQuantitiesTotal = function(QuantitiesTotal) {
        var quantity = document.getElementById('order_btn_qty');
        if (QuantitiesTotal != 0) {
            quantity.style.display = 'inline-block';
            quantity.innerHTML = +QuantitiesTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,");
        } else {
            quantity.style.display = 'none';
        }
    }
    this.setCurrentTransaction = function(uuid, grandTotal) {
        customHomepage.setSessionStorage('LastOpenTransactionUUID', uuid);
        var total = grandTotal ?
            Number(grandTotal)
            .toFixed(2)
            .toString() :
            '0.00';
        var totalElem = document.getElementById('totalText');
        if (grandTotal != 0 || totalElem) {
            totalElem.innerHTML = '$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            if (grandTotal == 0) {
                totalElem.innerHTML = 'Go to cart';
            }
        }
    };
    /**END HOMEPAGE LIST */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START IMAGES BLOCK */
    customHomepage.drawImagesBlocks = function(id, imagesBlocks) {
        let imagesBlockToDraw = "";
        imagesBlocks.forEach(el => {
            imagesBlockToDraw += `
  <div class="box box1">
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.leftPart.leftTop.deepLink}')"
    style="background-image: url(${el.leftPart.leftTop.img});">
    <div class="overlay_b1">${el.leftPart.leftTop.overlay}</div>
</div>
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.leftPart.leftBottom.deepLink}')"
    style="background-image: url(${el.leftPart.leftBottom.img});">
    <div class="overlay_b1">${el.leftPart.leftBottom.overlay}</div>
</div>
</div>
<div class="box box2">
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.middlePart.leftTop.deepLink}')"
    style="background-image: url(${el.middlePart.leftTop.img});">
    <div class="overlay">${el.middlePart.leftTop.overlay}</div>
</div>
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.middlePart.rightTop.deepLink}')"
    style="background-image: url(${el.middlePart.rightTop.img});">
    <div class="overlay">${el.middlePart.rightTop.overlay}</div>
</div>
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.middlePart.leftBottom.deepLink}')"
    style="background-image: url(${el.middlePart.leftBottom.img});">
    <div class="overlay">${el.middlePart.leftBottom.overlay}</div>
</div>
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.middlePart.rightBottom.deepLink}')"
    style="background-image: url(${el.middlePart.rightBottom.img});">
    <div class="overlay">${el.middlePart.rightTop.overlay}</div>
</div>
</div>
<div class="box3">
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.rigthPart.rightTop.deepLink}')"
    style="background-image: url(${el.rigthPart.rightTop.img});">
    <div class="overlay">${el.rigthPart.rightTop.overlay}</div>
</div>
<div class="categories_item" onclick="customHomepage.setUUIDandNav(null,null,'${el.rigthPart.rightBottom.deepLink}')"
    style="background-image: url(${el.rigthPart.rightBottom.img});">
    <div class="overlay">${el.rigthPart.rightBottom.overlay}</div>
</div>
</div>`;
        })
        if (document.getElementById(id))
            document.getElementById(id).innerHTML = imagesBlockToDraw;
    };
    /**END IMAGES BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START INVOICE BLOCK */
    this.getAgingInvoiceBalance = function() {
        pepperi.api.activities.search({
            fields: blocks_config["invoice-balance"].field,
            filter: {
                Operation: "AND",
                LeftNode: {
                    ApiName: "Type",
                    Operation: "IsEqual",
                    Values: [blocks_config["invoice-balance"].type]
                },
                RightNode: {
                    ApiName: "Status",
                    Operation: "IsEqual",
                    Values: blocks_config["invoice-balance"].status
                }
            },
            pageSize: 10000000,
            page: 1,
            responseCallback: "customHomepage.getAgingInvoiceBalanceCallback"
        });

    };

    this.getAgingInvoiceBalanceCallback = function(data) {
            console.log(data);
            var firstMonth = 0;
            var secondMonth = 0;
            var thirdMonth = 0;
            var total = 0;
            for (var i = 0; i < data.objects.length; i++) {
                firstMonth += data.objects[i].TSA130Days;
                secondMonth += data.objects[i].TSA31to60Days;
                thirdMonth += data.objects[i].TSA6190Days;
            }
            total = firstMonth + secondMonth + thirdMonth;
            var totalElem = '$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            document.getElementById("invoice-balance").innerHTML =
                `<div>
            <p>${blocks_config["invoice-balance"].heading}</p>
            <p id="balance-line">${totalElem}</p>
          </div>
          <img src=${blocks_config["invoice-balance"].svg}>`
        }
        /**END INVOICE BLOCK */
        /********************* ********************************************************************************/
        /********************* ********************************************************************************/
        /**START CREDIT BLOCK */
    customHomepage.accountCredit = function() {
        pepperi.api.accounts.get({
            key: { UUID: this.accountUUID },
            fields: [blocks_config.credit_line.field],
            responseCallback: "customHomepage.accountCreditCallBack"
        });
    }
    customHomepage.accountCreditCallBack = function(data) {
            console.log(data + "~" + this.accountUUID);
            var credit = '$ ' + (data.object.TSACredit).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            document.getElementById("credit_line").innerHTML =
                `<div>
        <p>${blocks_config.credit_line.heading}</p>
        <p id="credit-line">${credit}</p>
      </div>
      <img src=${blocks_config.credit_line.svg}>`
        }
        /**END CREDIT BLOCK */
        /********************* ********************************************************************************/
        /********************* ********************************************************************************/
        /**START REPLENISHMENT BLOCK */
    this.createNewReplenishment = function() {
        var bridgeObject = {
            references: {
                account: {
                    UUID: this.accountUUID
                },
                catalog: {
                    UUID: replenishment.catalogUUID
                }
            },
            type: {
                Name: replenishment.typeName
            },
            responseCallback: 'customHomepage.createNewReplenishmentCallback',
            requestID: replenishment.requestID
        };
        pepperi.app.transactions.add(bridgeObject);
    };
    this.createNewReplenishmentCallback = function(res) {
        if (res && res.success) {
            var uuid = res.id;
            if (res.requestID) {
                var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
                customHomepage.navigation(requestID);
            }
        }
    };
    /**END REPLENISHMENT BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START AGING ACTIVITY BLOCK */
    this.CreateNewAgingActivity = function() {
        var bridgeObject = {
            references: {
                account: {
                    UUID: this.accountUUID
                },
            },
            type: {
                Name: aging.typeName
            },
            responseCallback: "customHomepage.CreateNewAgingActivityCallback",
            requestID: aging.requestID
        };
        pepperi.app.activities.add(bridgeObject);
    };
    this.CreateNewAgingActivityCallback = function(res) {
        if (res && res.success) {
            let uuid = res.id;
            if (res.requestID) {
                var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
                customHeader.navigation(requestID);
            }
        }
    };
    /**END AGING ACTIVITY BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START NAVIGATION BLOCK */
    customHomepage.setUUIDandNav = function(in_catalog = null, in_transactionName = null, deepLink = null) {
        debugger
        const uuid = customHomepage.getSessionStorage('LastOpenTransactionUUID');
        console.log(uuid)
        if (uuid && uuid !== "undefined") {
            deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
            customHomepage.navigation(deepLink);
        } else {
            customHomepage.createNewOrder(in_catalog, in_transactionName, deepLink);
        }
    };
    customHomepage.NavigateToActiveCart = function(data) {
        var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
        if (uuid) {
            customHomepage.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
        }
    };
    customHomepage.navigation = function(path) {
        var eventData = {
            detail: {
                path: path,
            },
        };

        var event = new CustomEvent("navigateTo", eventData);

        if (document.createEvent) {
            window.dispatchEvent(event);
        } else {
            window.fireEvent("on" + event.eventType, event);
        }
    };
    customHomepage.logout = function() {
        var event = new CustomEvent("logout");

        if (document.createEvent) {
            window.dispatchEvent(event);
        } else {
            window.fireEvent("on" + event.eventType, event);
        }
    };
    /**END NAVIGATION BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START LISTERNES BLOCK */
    customHomepage.openStoreSelect = function() {
        document.getElementById('select-menu').classList.toggle('show')
    }
    customHomepage.openCloseMenu = function() {
        const over = document.getElementById("overSide");
        const e = document.getElementById("sidebar-sm");
        const btn = document.getElementById("btn");
        if (e.style.display == "block") {
            e.style.display = "none";
            over.style.display = "none";
            btn.innerText = "Open Menu";
        } else {
            over.style.display = "block";
            e.style.display = "block";
            btn.innerText = "Close Menu";
            $('#sidebar-sm').attr('tabindex', '-1');
            $('#sidebar-sm').focus()
        }
    };
    /**END LISTERNES BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START CHAT BLOCK */
    customHomepage.pepperiChat = function() {
        window.$zopim ||
            (function(d, s) {
                var z = ($zopim = function(c) {
                        z._.push(c);
                    }),
                    $ = (z.s = d.createElement(s)),
                    e = d.getElementsByTagName(s)[0];
                z.set = function(o) {
                    z.set._.push(o);
                };
                z._ = [];
                z.set._ = [];
                $.async = !0;
                $.setAttribute("charset", "utf-8");
                $.src =
                    "//v2.zopim.com/?2BRJmos7HB3lyZsUbSX5vDklKZwe9ayP";
                z.t = +new Date();
                $.type = "text/javascript";
                e.parentNode.insertBefore($, e);
            })(document, "script");

        $zopim(function() {
            $zopim.livechat.departments.filter("");
            $zopim.livechat.theme.setColors({ badge: "white", primary: "#000000" });
            $zopim.livechat.theme.reload(); // apply new theme settings
        });
    };
    customHomepage.pepperiChat();
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    /**START HELPER BLOCK */
    this.createNewOrder = function(in_transactionName, deeplink) {
        var bridgeObject = {
            references: {
                account: {
                    UUID: this.accountUUID
                },
                catalog: {
                    UUID: replenishment.catalogUUID
                }
            },
            type: {
                Name: !in_transactionName ? this.transactionName : in_transactionName
            },

            responseCallback: 'customHomepage.createNewOrderCallback',
            requestID: deeplink
        };

        pepperi.app.transactions.add(bridgeObject);
    };
    this.createNewOrderCallback = function(res) {

        if (res && res.success) {
            customHomepage.setSessionStorage('LastOpenTransactionUUID', res.id);

            var uuid = res.id;

            if (res.requestID) {
                var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
                customHomepage.navigation(requestID);
            }
        }

    };
    /**END HELPER BLOCK */
    /********************* ********************************************************************************/
    /********************* ********************************************************************************/
    this.setSessionStorage = function(paramName, data) {
        sessionStorage.setItem(paramName, data);
    };

    this.getSessionStorage = function(paramName) {
        return sessionStorage.getItem(paramName);
    };

}.apply(customHomepage));