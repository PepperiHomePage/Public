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
  this.carousalJsonPath = 'https://pepperihomepage.github.io/Public/carousal/beauty_body_carousel.js'
  this.carousalcssPath = "https://pepperihomepage.github.io/Public/carousal/beauty_body_carousal.css";
  this.customHelperJsonPath = 'https://pepperihomepage.github.io/Public/helper/customFunction.js'
  this.topSidebarBuildJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/food_demo_top_sidebar.js'
  this.topSidebarBaseListJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/food_demo_top_sidebar_base_list.js'
  this.topSidebarFoodListJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/food_demo_top_sidebar_food_list.js'
  this.topSidebarListsJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/food_demo_top_sidebar_lists.js'
  this.topSidebarPopupJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/food_demo_top_sidebar_popup.js'
  this.topSidebarSmallJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/food_demo_top_sidebar_small.js'
  this.navigationJsonPath = 'https://pepperihomepage.github.io/Public/navigation/beauty_body_navigation.js'
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
      JsURLs: [this.jsonFilePath,
              this.customHelperJsonPath,
               this.carousalJsonPath,
               this.topSidebarBuildJsonPath,
               this.topSidebarBaseListJsonPath,
               this.topSidebarFoodListJsonPath,
               this.topSidebarListsJsonPath,
               this.topSidebarPopupJsonPath,
               this.topSidebarSmallJsonPath,
               this.navigationJsonPath
               ],
      cssURLs: [this.cssFilePath,
                this.carousalcssPath],
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

    customFunction.buildSidebar("sidebar");
    customFunction.buildSidebarSmall("sidebar-sm");
    customFunction.buildBaseList("baselist");
    customFunction.buildFoodList("food_list");
    customFunction.buildSidebarPopup("popup");
    customFunction.buildLists("lists");

    customFunction.buildAccountInfo("account_info");

    customFunction.buildCategories("categories");
  };

  // Start Carusel & Shipping
  // End Carusel & Shipping

  // Start top sidebar

  // End top sidebar

  // Start Account info

  // End Account info



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
