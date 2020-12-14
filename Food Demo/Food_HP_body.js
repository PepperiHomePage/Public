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
(function () {
  this.context;
  this.jsonFilePath =
    "https://storage.pepperi.com/PreSales/food_demo_1/config_body.js";
  this.cssFilePath = "";
  this.accountUUID;
  this.typeName;
  this.clientApiPath =
    "https://webapp.pepperi.com/V16_20/WebApp_154/ClientApi/clientapi.js";
  this.catalogName = "Default Catalog";
  //this.slides;
  //this.slideDesc;
  //this.indicators;
  //this.switcher;
  this.slideLifetyme = 5000;
  this.slideSwitchTimeoutKeeper;
  this.CaruselData = [];

  this.setHtml = function () {
    this.slideIndex = 1;

    var str = ` <style>

    /*---START BODY---*/

    @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,600&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;900&display=swap");
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .wrapper {
      display: grid;
      grid-template-areas: "carousal-banner sidebar" "categories categories";
      grid-template-rows: 1fr 280px;
      grid-template-columns: 1fr 257px;
      height: 100%;
      -webkit-flex: 1; /* Safari 6.1+ */
      -ms-flex: 1; /* IE 10 */
      flex: 1;
    }
    
    button,
    button:active,
    button:focus {
      outline: none;
      border: none;
      cursor: pointer;
    }
    
    @media (max-width: 1330px) {
      .wrapper {
        display: grid;
        grid-template-areas: "carousal-banner sidebar" "categories categories";
        grid-template-rows: 1fr 320px; /* 1fr */
        grid-template-columns: 2fr 311px;
        height: 100vh;
      }
    }
    
    @media (max-width: 1200px) {
      .wrapper {
        display: grid;
        grid-template-areas: "carousal-banner sidebar" "categories categories";
        grid-template-rows: 2fr 270px;
        grid-template-columns: 2fr 1fr;
        height: 100vh;
      }
    }

    @media (max-width: 960px) { 
      .wrapper {
        grid-template-rows: 2fr 200px;
      }
    }
    
    @media (max-width: 768px) {
      .wrapper {
        display: grid;
        grid-template-areas: "carousal-banner sidebar" "categories categories";
        grid-template-rows: 2fr 160px;
        grid-template-columns: 2fr 1fr;
        height: 100vh;
      }
    }
    
    @media (max-width: 576px) {
      .wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: "sidebar" "carousal-banner" "categories";
        height: auto;
        grid-template-rows: auto 1fr 2fr;
      }
    }
    
    /*---END BODY---*/
    
    /*---START CAROUSAL---*/

    #carousal-banner {
      display: grid;
      grid-template-areas:
          "carousal-content"
          "shipping-banner";
      grid-template-rows: 1fr 72px;
    }
    
    #carousel {
      grid-area: carousel;
    }
    
    #carousal-content {
      display: grid;
      grid-area: carousel;
      grid-template-areas: "carousel" "shipping";
      grid-template-rows: 1fr 72px;
    }
    .carousel {
      position: relative;
      overflow: hidden;
      width: 100%;
      /*background: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/back.png");*/
      background-color: rgb(103, 103, 103);
      cursor: pointer;
    }
    
    .slides {
      height: 100%;
      width: 100%;
      position: relative;
    }
    
    .slide {
      height: 100%;
      width: 100%;
      opacity: 0;
      -webkit-transition: opacity 1000ms;
      transition: opacity 1000ms;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    
    .slide .gard-overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
      padding: 1.5rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
          -ms-flex-direction: row;
              flex-direction: row;
      -webkit-box-pack: justify;
          -ms-flex-pack: justify;
              justify-content: space-between;
    }
    
    @media screen and (max-width: 960px) {
      .slide .gard-overlay {
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
      }

      .slide-controllers {
        position: absolute;
        bottom: 5.5%;
      }

      .slide-text {
        width: 40%;
        position: absolute;
        bottom: 4%;
      }

      .shipping p {
        font-size: 20px;
      }
    }
    
    .slide-text {
      -ms-flex-item-align: end;
          align-self: flex-end;
      text-align: left;
      color: white;
      opacity: 0;
      font-weight: 600;
      max-width: 35rem;
    }
    
    @media screen and (max-width: 960px) {
      .slide-text {
        -ms-flex-item-align: start;
            align-self: flex-start;
      }
    }
    
    .slide-text #shop_now {
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      padding: 0.5em 0.7em;
      border-radius: 4px;
      background: #000000;
      margin-bottom: 0.25rem;
      position: absolute;
      right: 4%;
      padding: 10px;
    }

    .shop_now {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 84px;
      right: 39px;
      width: 105px;
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      padding: 0.5em 0.7em;
      border-radius: 4px;
      background: #000000;
    }
    
    .slide-text .title {
      font-size: 2rem;
      margin-bottom: 0.25rem;
    }
    
    .slide-text .sub_title {
      font-size: 0.875rem;
    }
    
    .slide-text .desc {
      font-size: 1.25rem;
    }
    
    .slide:nth-child(1) {
      opacity: 1;
    }
    
    .slide-text:nth-child(1) {
      opacity: 1;
    }
    
    .slide[data-state="active"] {
      display: block;
    }
    
    .slide-controllers {
      -ms-flex-item-align: end;
          align-self: flex-end;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 180px;
      align-items: center;
    }
    
    .slide-controllers button {
      -webkit-margin-start: 1rem;
              margin-inline-start: 1rem;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      -webkit-transition: background-color ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.125s;
      transition: background-color ease-in-out 0.25s, -webkit-box-shadow ease-in-out 0.125s;
      transition: background-color ease-in-out 0.25s, box-shadow ease-in-out 0.125s;
      transition: background-color ease-in-out 0.25s, box-shadow ease-in-out 0.125s, -webkit-box-shadow ease-in-out 0.125s;
      height: 3rem;
      width: 3rem;
      background-position: center;
      background-size: 2rem;
      background-repeat: no-repeat;
    }
    
    .slide-controllers button:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    
    .slide-controllers button:active, .slide-controllers button:focus {
      -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
              box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
    }
    
    .slide-controllers .pause {
      background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/pause.svg");
    }
    
    .slide-controllers .play {
      background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/play.svg");
    }
    
    
    #carousal-content {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      grid-area: carousal-content;
    }
    
    #carousal-content {
      display: -ms-grid;
      display: grid;
    }
    
    @media screen and (max-width: 768px) {
      #carousal-content {
        
      }
      .carousel {
        border-radius: 0;
      }
      .slide-controllers {
        position: absolute;
        bottom: 5.5%;
      }

      .slide-text {
        width: 40%;
        position: absolute;
        bottom: 4%;
      }
    }
    
    #carousal-content {
      display: -ms-grid;
      display: grid;
      grid-template-areas: "carousel";
      -ms-grid-rows: 1fr;
      grid-template-rows: 1fr;
      background: linear-gradient(45deg, black 0%, rgba(0, 0, 0, 0) 100%);
      border-radius: 4px;
    }
    
    .carousel {
      overflow: hidden;
      width: 100%;
      background: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/back.png");
      background-color: #e5e5e5;
      cursor: pointer;
    }
    
    .slides {
      height: 100%;
      width: 100%;
      position: relative;
    }
    
    .indicators {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      width: 100px;
      padding: 8px 5px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4px;
    }
    
    .indicators:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
    
    .indicators:active, .indicators:focus {
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
      height: 1.25rem;
      width: 1.25rem;
      -webkit-margin-end: 1rem;
              margin-inline-end: 1rem;
    }
    
    .radio-box:last-child {
      -webkit-margin-end: 0;
              margin-inline-end: 0;
    }
    
    .radio-box input {
      height: 1.25rem;
      width: 1.25rem;
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    
    .radio-box input:checked ~ .radio-dot {
      background-color: #0a0a0a;
    }
    
    .radio-dot {
      position: absolute;
      top: 0;
      left: 0;
      height: 1.25rem;
      width: 1.25rem;
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
    
    .radio-dot:active, .radio-dot:focus {
      -webkit-box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
              box-shadow: 0 0 0 4px rgba(23, 102, 166, 0.25);
    }
    
    .pause {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      padding: 11px 0;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      height: 32px;
      width: 32px;
      background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/pause.svg");
      background-position: center;
      background-size: 10px;
      background-repeat: no-repeat;
    }

    @media screen and (max-width: 576px) {
      #carousal-banner {
        grid-template-rows: 1fr 52px;
      }
    }
    
    /*---END CAROUSAL---*/
    
    /*---START SHIPPING---*/
    
    .shipping {
      background: rgb(0, 102, 33);
      grid-area: shipping;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 16px 16px 16px;
      color: #ffffff;
      font-size: 30px;
      font-weight: bold;
      cursor: pointer;
    }
    .shipping p {
      font-size: 24px;
    }
    
    .shipping button {
      margin: 15px 10px;
      width: 151px;
      height: 40px;
      background: rgb(41, 41, 41);
      border-radius: 4px;
      color: rgb(255, 255, 255);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.12px;
      line-height: 20px;
    }
    
    .shipping button::after {
      content: "";
    }
    
    .shipping button:visited {
      border: none;
    }
    
    @media (max-width: 1330px) {
      .shipping button {
        margin: 15px 10px;
        width: 151px;
        height: 40px;
        background: rgb(41, 41, 41);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.12px;
        line-height: 20px;
      }
    }
    
    @media (max-width: 1200px) {
      .shipping button {
        margin: 15px 10px;
        width: 151px;
        height: 40px;
        background: rgb(41, 41, 41);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.12px;
        line-height: 20px;
      }
    }
    
    @media (max-width: 768px) {
      .shipping {
        height: 100%;
        padding-bottom: 0px;
      }
      
      .shipping button {
        display: none;
      }
    
      .shipping p {
        margin: 0 auto;
        font-size: 17px;
        font-weight: bold;
      }
    }
    
    @media (max-width: 576px) {
      .shipping button {
        display: none;
      }
      .shipping p {
        margin: 0 auto;
        font-size: 17px;
        font-weight: bold;
      }
    }
    
    /*---END SHIPPING---*/
    
    /*---START SIDEBAR---*/
    #sidebar {
      grid-area: sidebar;
    }
    
    .sidebar-menu {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 24px;
      color: rgb(255, 255, 255);
      font-family: "Inter", sans-serif;
      font-size: 16px;
      font-weight: normal;
      letter-spacing: 0.16px;
      line-height: 28px;
      margin-bottom: 0;
      background: rgb(41, 41, 41);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1),
        0px 8px 16px 0px rgba(21, 24, 26, 0.1), 0px 16px 32px 0px rgba(0, 0, 0, 0.1);
    }
    
    .response-menu {
      display: none;
    }
    
    @media (max-width: 576px) {
      #response-menu {
        display: flex;
      }
    
      .response-menu {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 72px;
        background-color: black;
      }
      .response-menu button {
        background-color: black;
        width: 100%;
        height: 32px;
        color: rgb(255, 255, 255);
        font-size: 24px;
        font-family: "Montserrat", sans-serif;
        font-weight: bold;
        letter-spacing: 0.64px;
        line-height: 32px;
        margin-top: 21px;
        text-align: center;
      }
    
      .response-menu button::after {
        content: " ↓";
        color: #ffffff;
        font-size: 24px;
      }
    
      #sidebar-sm {
        display: none;
        position: absolute;
        z-index: 1000;
        min-width: -webkit-fill-available;
        height: auto;
      }
    }
    
    /*---END SIDEBAR---*/
    
    /*---START SIDEBAR-BASELIST---*/
    
    .baselist {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      background: rgb(41, 41, 41);
      color: #ffffff;
      font-family: "Montserrat", sans-serif;
    }
    
    .top-base {
      display: flex;
      flex-direction: row;
      height: 28px;
      justify-content: space-between;
    }
    
    .top-base p {
      font-size: 18px;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      letter-spacing: 0.16px;
      line-height: 28px;
    }
    
    .option {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-family: "Inter", sans-serif;
    }
    
    .baselist #add {
      background: rgb(26, 26, 26);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
      height: 30px;
      width: 30px;
      border-radius: 2px;
      color: #ffffff;
      margin: 3px;
      background-image: url("https://storage.pepperi.com/PreSales/NewFoodDemoImg/Icon_number_plus.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
    
    .order-button {
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
    
    hr {
      background: rgb(255, 255, 255);
      opacity: 25%;
      margin-top: 16px;
      margin-bottom: 16px;
    }
    
    /*---END SIDEBAR-BASELIST---*/
    
    /*---START FOOD-LIST---*/
    
    #overlay1 {
      display: block;
    }
    
    #content {
      transition: all 300ms ease-in-out;
      transform: translate(-50%, -50%) scale(1);
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
    
    /*---END FOOD-LIST---*/
    
    /*---START ACCOUNT INFO---*/
    
    .credit {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: rgb(26, 26, 26);
      border-radius: 4px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
      height: 70px;
    }

    #credit {
      margin-top: 7px;
    }
    
    .credit button {
      background: #41ae5f;
      color: rgb(255, 255, 255);
      font-family: "Inter", sans-serif;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.16px;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
    }
    
    .credit div {
      color: rgb(255, 255, 255);
      font-family: "Inter", sans-serif;
      font-size: 18px;
      font-weight: normal;
      height: 28px;
      letter-spacing: 0.16px;
      line-height: 28px;
      width: 109px;
      padding-left: 15px;
      padding-top: 10px;
    }
    
    .credit img {
      padding-top: 9px;
      padding-right: 17px;
      height: 58px;
      width: 80px;
    }
    
    .balance {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 10px;
      background: rgb(26, 26, 26);
      border-radius: 4px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
      height: 70px;
    }

    #balance {
      margin-top: 7px;
    }
    
    .balance div {
      color: rgb(255, 255, 255);
      font-family: "Inter", sans-serif;
      font-size: 18px;
      font-weight: normal;
      height: 28px;
      letter-spacing: 0.16px;
      line-height: 28px;
      width: 109px;
      padding-left: 15px;
      padding-top: 10px;
    }
    
    .balance img {
      padding-top: 9px;
      padding-right: 30px;
      height: 57px;
      width: 70px;
    }
    
    @media (max-width: 576px) {
      .credit,
      .balance {
        height: 65px;
      }
    
      .credit div,
      .balance div {
        line-height: 20px;
      }
    }
    /*---END ACCOUNT INFO---*/
    
    /*---START CATEGORIES---*/
    
    #categories {
      display: grid;
      grid-area: categories;
      grid-template-areas: "box1 box2 box3";
      grid-template-columns: 2fr 2fr 1fr;
      grid-template-rows: 483px 500px;
    }
    
    .overlay {
      background: linear-gradient(
        0deg,
        rgba(21, 24, 26, 0) 0%,
        rgb(21, 24, 26) 100%
      );
      opacity: 70%;
      position: absolute;
      top: 0;
      width: 100%;
      height: 70%;
      left: 0;
      text-align: left;
      color: rgb(255, 255, 255);
      font-size: 21px;
      padding: 8px 16px;
      font-family: "Montserrat", sans-serif;
      font-weight: bold;
      letter-spacing: 0.32px;
      line-height: 30px;
      cursor: pointer;
    }
    
    .box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
    .box div {
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      background-size: cover;
      background-position-y: inherit;
    }
    .box1 {
      grid-area: box1;
    }
    .box2 {
      grid-area: box2;
    }
    .box3 {
      grid-area: box3;
      display: grid;
    }
    .box3 div {
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      background-size: cover;
    }
    
    .item1 {
      background-color: #bae74a;
      cursor: pointer;
    }
    .item2 {
      background-color: chartreuse;
      cursor: pointer;
    }
    .item3 {
      background-color: #93c90e;
      grid-area: 2 / span 2;
      cursor: pointer;
    }
    .item4 {
      background-color: #bae74a;
      grid-area: 1/1;
      cursor: pointer;
    }
    .item5 {
      background-color: #ff9800;
      grid-area: 2/1;
      cursor: pointer;
    }
    .item6 {
      grid-area: span 2/ 2;
      cursor: pointer;
    }
    .item7 {
      background-color: #bae74a;
      cursor: pointer;
    }
    .item8 {
      background-color: #ff9800;
      cursor: pointer;
    }
    
    @media screen and (max-width: 1712px) and (min-width: 1321px) {
      #categories {
        grid-template-rows: 400px 500px;
      }
    }
    
    @media (max-width: 1330px) {
      #categories {
        grid-template-rows: 339px 500px;
      }
    }
    
    @media (max-width: 1200px) {
      #categories {
        grid-template-rows: 271px 500px;
      }
    }
    
    @media screen and (max-width: 968px) and (min-width: 773px) {
      #categories {
        grid-template-rows: 203px 500px;
      }
    }
    
    @media screen and (max-width: 772px) and (min-width: 732px) {
      #categories {
        grid-template-rows: 200px 500px;
      }
    }
    
    @media screen and (max-width: 731px) and (min-width: 577px) {
      #categories {
        grid-template-rows: 160px 500px;
      }
    }
    
    @media (max-width: 576px) {
      #categories {
        display: grid;
        grid-template-areas: "box1" "box2" "box3";
        grid-template-columns: 1fr;
        /* grid-template-rows: 1fr 1fr 1fr; */
        grid-template-rows: 321px 340px 315px;
      }
    }
    
    /*---END CATEGORIES---*/
  
    </style>

    <div class="wrapper">
      <div id="carousal-banner"></div>
      <aside id="sidebar"></aside>
      <div id="categories"></div>
    </div>
    `;
    return str;
  };

  this.initPlugin = function () {
    var options = {
      JsURLs: [this.jsonFilePath],
      cssURLs: [this.cssFilePath],
    };
    return options;
  };

  this.onPluginLoad = function (context) {
    this.context = context;
    this.transactionName = "Buyer Order";
    customHomepage.setSessionStorage("isWeb", true);
    this.getAccountInternalID();
    this.buildHTML();
    var data = JSON.parse(context.pluginData);
    if (data) {
      this.transactionName = data.typeName || "";
      this.accountUUID = data.accountUUID || "";
    }
    this.getTransactionStatus();
    this.getLastTransactions();
  };

  this.getAccountInternalID = function () {
    var bridgeObject = {
      fields: ["Name", "InternalID", "UUID"], //"TSACreditLine", "TSABalance"
      //   filter:{
      //       ApiName:"UUID",
      //       Operation:"IsEqual",
      //       Value:this.accountUUID
      //   },
      responseCallback: "customHomepage.setAccountInternalID",
    };
    pepperi.api.accounts.search(bridgeObject);
  };

  this.setAccountInternalID = function (data) {
    console.log(data);
    if (!data.success) return;
    var balance = data.objects[0].TSABalance;
    var credit = data.objects[0].TSACreditLine;
    if (balance == null) {
      document.getElementById("balance").innerHTML = "$" + 0.0;
    } else {
      document.getElementById("balance").innerHTML = "$" + balance;
    }

    if (credit == null) {
      document.getElementById("credit").innerHTML = "$" + 0.0;
    } else {
      document.getElementById("credit").innerHTML = "$" + credit;
    }
    this.AccountInternalID = data.objects[0].InternalID;
    this.accountUUID = data.objects[0].UUID;
  };

  this.getTransactionStatus = function () {
    var currentTransactionUUID = customHomepage.getSessionStorage(
      "LastOpenTransactionUUID"
    );
    if (!currentTransactionUUID) {
      customHomepage.createNewOrder();
    } else {
      var fields = ["Status", "UUID", "Currency"];
      var filter = {
        ExpressionId: 1,
        ApiName: "UUID",
        Operation: "IsEqual",
        Values: [currentTransactionUUID],
      };
      customHomepage.getTransactions(
        fields,
        filter,
        [],
        100000,
        "customHomepage.getExitTransactionCallback"
      );
    }
  };

  this.getExitTransactionCallback = function (res) {
    if (
      res &&
      res.objects &&
      res.objects.length &&
      (res.objects[0].Status == 1 || res.objects[0].Status == 1000)
    ) {
      var transaction = res.objects[0];
    } else {
      customHomepage.createNewOrder();
    }
  };
  this.getLastTransactions = function () {
    var fields = [
      "Status",
      "UUID",
      "GrandTotal",
      "QuantitiesTotal",
      "CreationDateTime",
    ];
    var sortBy = [{ Field: "CreationDateTime", Ascending: false }];
    var Size = 1;
    var filter = {
      ComplexId: 4,
      Operation: "AND",
      LeftNode: {
        ComplexId: 3,
        Operation: "AND",
        LeftNode: {
          ComplexId: 2,
          Operation: "AND",
          LeftNode: {
            ExpressionId: 1,
            ApiName: "CreationDateTime",
            Operation: "InTheLast",
            Values: ["20", "Weeks"],
          },
          RightNode: {
            ExpressionId: 2,
            ApiName: "Status",
            Operation: "IsEqual",
            Values: ["1"],
          },
        },
        RightNode: {
          ExpressionId: 3,
          ApiName: "QuantitiesTotal",
          Operation: ">",
          Values: ["0"],
        },
      },
      RightNode: {
        ExpressionId: 4,
        ApiName: "ActivityTypeID",
        Operation: "IsEqual",
        Values: ["270336"],
      },
    };

    customHomepage.getTransactions(
      fields,
      filter,
      sortBy,
      Size,
      "customHomepage.getLastTransactionsCallback"
    );
  };
  this.getLastTransactionsCallback = function (res) {
    console.log("getLastTransactionsCallback---->", res);
    if (res && res.objects != null && res.objects.length > 0) {
      console.log(res.objects[0].UUID);
      customHomepage.setSessionStorage(
        "LastOpenTransactionUUID",
        res.objects[0].UUID
      );
    } else {
      customHomepage.createNewOrder();
    }
  };

  this.getTransactions = function (fields, filter, sortBy, Size, callBack) {
    var bridgeObject = {
      fields: fields,
      filter: filter,
      sorting: sortBy,
      pageSize: Size,
      responseCallback: callBack,
    };
    pepperi.api.transactions.search(bridgeObject);
  };
  this.createNewOrder = function (
    in_transactionName,
    deeplink /* = 'Transactions/scope_items/{{UUID}})'*/
  ) {
    var bridgeObject = {
      references: {
        account: {
          UUID: this.accountUUID,
        },
      },
      type: {
        Name: !in_transactionName ? this.transactionName : in_transactionName,
      },
      // catalog: this.catalogName,
      responseCallback: "customHomepage.createNewOrderCallback",
      requestID: deeplink,
    };
    pepperi.app.transactions.add(bridgeObject);
  };

  this.createNewOrderCallback = function (res) {
    if (res && res.success) {
      customHomepage.setSessionStorage("LastOpenTransactionUUID", res.id);
      var uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        customHomepage.navigation(requestID);
      }
    }
  };

  this.setSessionStorage = function (paramName, data) {
    sessionStorage.setItem(paramName, data);
  };

  this.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };

  this.setUUIDandNav = function (deepLink) {
    var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
    if (uuid) {
      deepLink = deepLink.replace("{{UUID}}", uuid.replace(/-/g, ""));
      customHomepage.navigation(deepLink);
    } else {
      customHomepage.createNewOrder(this.transactionName, deepLink);
    }
  };

  this.NavigateToActiveCart = function (data) {
    var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
    if (uuid) {
      customHomepage.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
    }
  };

  this.navigation = function (path) {
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

  this.logout = function () {
    var event = new CustomEvent("logout");
    if (document.createEvent) {
      window.dispatchEvent(event);
    } else {
      window.fireEvent("on" + event.eventType, event);
    }
  };

  /** Private function - not part of the interface  **/
  this.buildHTML = function () {
    customFunction.buildCarouselBanner("carousal-banner");
    customFunction.carousel("carousal-content", CaruselData);
    customFunction.buildShippingBaner("shipping-baner");

    this.buildSidebar("sidebar");
    this.buildSidebarSmall("sidebar-sm");
    this.buildBaseList("baselist");
    this.buildFoodList("food_list");
    this.buildSidebarPopup("popup");
    this.buildLists("lists");

    this.buildAccountInfo("account_info");

    this.buildCategories("categories");
  };

  // Start Carusel & Shipping
  // End Carusel & Shipping

  // Start top sidebar
  this.buildSidebar = function (slideid) {
    var sidebarHTML = "";

    sidebarHTML += `<div id="response-menu" class="response-menu">
                      <button onclick="customHomepage.openCloseMenu();" class="dropbtn" id="btn">Open menu</button>
                    </div>
                    <div id="sidebar-sm" class="sidebar-menu"></div>`;

    document.getElementById(slideid).innerHTML = sidebarHTML;
  };

  this.buildSidebarSmall = function (slideid) {
    var sidebarSmallHTML = "";

    sidebarSmallHTML += `<div id="baselist" class="baselist" style="display: none;"></div>
                      <hr>
                      <div id="account_info" style="display: none;"></div>`;

    document.getElementById(slideid).innerHTML = sidebarSmallHTML;
  };

  this.buildBaseList = function (slideid) {
    var baseListHTML = "";

    baseListHTML += `<div class="top-base">
                        <p>Base list</p>   
                      </div>
                      <hr>
                      <div id="food_list" style="display: none"></div>
                      <button class="order-button" id="transactionTotal" onclick="customHomepage.NavigateToActiveCart()">Go to Order</button>`;

    document.getElementById(slideid).innerHTML = baseListHTML;
    document.getElementById(slideid).style.display = "flex";
  };

  this.buildFoodList = function (slideid) {
    var foodListHTML = "";

    foodListHTML += `<div id="popup" style="display: none"></div>
                     <div id="lists" style="display: none;"></div>`;

    document.getElementById(slideid).innerHTML = foodListHTML;
    document.getElementById(slideid).style.display = "block";
  };

  this.buildSidebarPopup = function (slideid) {
    var popupHTML = "";

    popupHTML += `<div id="overlay1"></div>
                  <div id="content" onclick="customHomepage.togglePopup()">                          
                    <h1>Success!</h1>
                    <hr>
                    <p id="modal-text">Items from selected list were succesfully added to the cart!</p>
                    <hr>                            
                  </div>`;

    document.getElementById(slideid).innerHTML = popupHTML;
  };

  this.buildLists = function (slideid) {
    var listsHTML = "";

    for (const [index, item] of list.entries()) {
      listsHTML += `
            <div class="option">
            <p id="list">${item.listLabel}</p>
            <button id="add" onclick="customHomepage.setUUIDandNav('${item.deepLink}')"></button>
        </div>`;
    }
    document.getElementById(slideid).innerHTML = listsHTML;
    document.getElementById(slideid).style.display = "block";
  };

  // End top sidebar

  // Start Account info

  this.buildAccountInfo = function (slideid) {
    var accountInfoHTML = "";

    accountInfoHTML += this.buildCredit();
    accountInfoHTML += this.buildBalance();

    document.getElementById(slideid).innerHTML = accountInfoHTML;
    document.getElementById(slideid).style.display = "block";
  };

  this.buildCredit = function () {
    var creditHTML = "";

    creditHTML += `<div class="credit">
                      <div>
                        <p>Credit</p>
                        <p id="credit"></p>
                      </div>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABQCAMAAADRPICnAAACN1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9pu+VyAAAAvXRSTlMAAQIDBAUGBwgJCgsMDg8QERIUFRYXGBobHB0eHyAhIyQnKCkqKywtLi8wMTU2Nzg5Ojs8PT4/REVGR0hJSktMTU5PUlNUVVZXWFlaXF9gYWJjZGVmZ2hpamttbm9wcXJzdHV6e3x9foCBgoOFhoeIiYqLjI2Oj5CRkpaYmZqbnJ2hoqOkpaanqKmqq6yusLGys7S2t7i5u76/wMHCw8XGx8jLzM3Oz9DR0tPU1tfY2drb3N3e3+Dh4uPk5ebl3HCbAAAAAWJLR0QB/wIt3gAABJ5JREFUWMPtWetfE0cUTYJBiCKpSBUFMVpLQw2oQQiggq+IT8D3A2hUwCAoEJ8YReOTxEcEpUV8QCukSlUI1hL0/nGdbF47mdnN7iT+fn7gfNrN3D03ezJzz9yJQjGDGXxHSP5x9reiVmaX1dlf+MB3a3nCubVra2y9Xghh0pA46tl55ub7HojCX8mJUCSnvP7aSx+f98vQjRMV+mZ0VRanIsZaW58X+85jrpad+ZrA8BBAEyu1WldpcQxj1FODXUdN2fwgO8AdBu5M09Gu/imM2+NoNOuSiMg6gBFZ1GmG3a1uXJEP7s59hjkC8SYUoE2gIgQWo7BCSYoMTktRhJxf4wDVonNk/4Wnkxj1O6d1hz5VsqZPADoEB/MffeFTf3p28UDRfBnlAi0OVC7giVBEcXieTL/utmxcqpJVLiKLY1xJj9Jwq/6t01qlT5FRLraT5WIxPXYTGqrPiKdchGCiP2EBGGIuFxiO0x87DDDKpAiBq/SHS8QXIVcu/gMpeE5nWISGVkssF+Lw0S1B+ZFYhJRyIQkr6K/gBugUK6DSsYWeoB2gl0UREo30BHsBvKd7/ob4cZuewACJgoDnpH2Nl/iDu3W3wV8R0ukZ3rBTT/R37SvKCHtOAT3BbRZq37DDUqlT4Z6zl56gkUURsvL2ArTTE2yRTD3uV0TIizoB3PSRFSyKkKhGPwndc9TiK9fjpCpCYDWKzaIPDbAoQiBd2HOusihCYhTgGH3kGIsiJO4Keo4pQP3xcfuegjQG5vSAYTUBDNADshD7+ZIslvbsZ3PTvVGYqvDfbEO7TLVUz5HcngVw0//RSomeE1uRNag9m8C2x+u51/HF8pyYmIUUidpdfP798uHi4KZhEOCU3EWI/1YjeHt282RlbhLe59yiP1mI4pfETlAd4v7HdWbXrxpan/NGwHPQQ6WRW1Vph6undRURlvMe/u2/dHDdAuzTVP0OaxvXn5QimjRBz6kL3yz7I/A9HYRBzVmENSNJSzdaul9ze/+H/vslop5jD13nvg9v1eYKqjW/6MDFZ58iP4iLm7oTYp4zGNKnP/KYjRKKFGlxvcNm0uTTtoUhzzlHT7A1svEr4de8zOi9fvcQ1g1Nv7r+2/ocFc9zHtMT/ISCVwYuz/IJtpNh4aLYc7rql6hznBpU0OjTPRl5zrbA5R1+ggY8LI/70Nt3vtb4g3zPCR42dPMTHIkKq7pSX56jZPScu4GrBn6CYoVszzlEHzke7nNyea34qFpmgj9RvyfsOcF11RZJsFkefQbq92CD8GFDsM9RO4L0XxskU6foq6zOt9xLp8Q+bEg6OOYPHTBJoVZx5SIs62ejpMOGWavMm3QxuaPLBargD/IEoztEDhto5cLqjC4XF/YbtUwbvwSd+RQKHzYEMc/fxE2S+2yNtLeeh3tOVFtrbnR4yFOwTFmTeITvOSKKTA/7FZG5qwwWObsURVIVjGgKn7po8ne2uMYwam+frdaoVcSFcsTTnF9x4gZuKb6X10QLqIwzb6LZ9NxvNucl8K+Bgojg3l5bzVqtItHQOabA98JeV5atVHwjqBckK2Ywg+8H/wN6KKgIpbeWyAAAAABJRU5ErkJggg==">
                    </div>`;

    return creditHTML;
  };

  this.buildBalance = function () {
    var balanceHTML = "";

    balanceHTML += `<div class="balance">
                      <div>
                        <p>Balance</p>
                        <p id="balance"></p>
                      </div>
                      <img src="https://storage.pepperi.com/PreSales/NewFoodDemoImg/balance.svg">
                    </div>`;

    return balanceHTML;
  };

  // End Account info

  this.buildCategories = function (slideid) {
    var categoriesImgHTML = "";
    categoriesImgHTML += `
            <div class="box box1">
                  <div class="item1"
                  onclick="customHomepage.setUUIDandNav('${left_top_img_left.deepLink}')"
                  style="background-image: url(${left_top_img_left.image});">
                      <div class="overlay">${left_top_img_left.title}</div>
                  </div>
                  <div class="item2"
                  onclick="customHomepage.setUUIDandNav('${left_top_img_right.deepLink}')"
                  style="background-image: url(${left_top_img_right.image});">
                      <div class="overlay">${left_top_img_right.title}</div>
                  </div>
                  <div class="item3"
                  onclick="customHomepage.setUUIDandNav('${left_bottom_img.deepLink}')"
                  style="background-image: url(${left_bottom_img.image});">
                      <div class="overlay">${left_bottom_img.title}</div>
                  </div>
                </div>
                <div class="box box2">
                   <div class="item4" 
                   onclick="customHomepage.setUUIDandNav('${midle_top_left_img.deepLink}')"
                   style="background-image: url(${midle_top_left_img.image});">
                       <div class="overlay">${midle_top_left_img.title}</div>
                   </div>
                   <div class="item5"
                   onclick="customHomepage.setUUIDandNav('${midle_bottom_left_img.deepLink}')"
                    style="background-image: url(${midle_bottom_left_img.image});">
                     <div class="overlay">${midle_bottom_left_img.title}</div> 
                   </div>
                    <div class="item6"
                    onclick="customHomepage.setUUIDandNav('${midle_right_img.deepLink}')"
                    style="background-image: url(${midle_right_img.image});">
                    <div class="overlay">${midle_right_img.title}</div>
                    </div>
                </div>
    
                <div class="box3">
                    <div class="item7"
                    onclick="customHomepage.setUUIDandNav('${right_top_img.deepLink}')"
                    style="background-image: url(${right_top_img.image});">
                        <div class="overlay">${right_top_img.title}</div>
                    </div>
                    <div class="item8"
                    onclick="customHomepage.setUUIDandNav('${right_bottom_img.deepLink}')"
                    style="background-image: url(${right_bottom_img.image});">
                         <div class="overlay">${right_bottom_img.title}</div>
                    </div>
                </div>
            `;
    document.getElementById(slideid).innerHTML = categoriesImgHTML;
  };

  this.openCloseMenu = function () {
    const e = document.getElementById("sidebar-sm");
    const btn = document.getElementById("btn");
    if (e.style.display == "block") {
      e.style.display = "none";
      btn.innerText = "Open button";
    } else {
      e.style.display = "block";
      btn.innerText = "Close button";
    }
  };
}.apply(customHomepage));
