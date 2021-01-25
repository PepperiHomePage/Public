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
  this.accountUUID;
  this.catalogs = [];
  this.accounts = [];
  this.jsonFilePath = 'https://github.com/LudoPepperi/bainetnature/blob/main/config_body.js'
  this.isMultiAccount = true
  this.cssFilePath = "";
  this.transactionFields = []
  this.transactionsHistoryFields = []



  this.setHtml = function () {
    var str = `  
    
<style>

#brands {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (1fr)[4];
      grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

#brands .big-brand {
  min-height: 12rem;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
  grid-column: 1 / 4;
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  grid-row: 1 / 3;
}

@media screen and (max-width: 1280px) {
  #brands {
    -ms-grid-columns: (1fr)[3];
        grid-template-columns: repeat(3, 1fr);
  }
  #brands .big-brand {
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
    grid-column: 1 / 3;
  }
}

@media screen and (max-width: 960px) {
  #brands {
    -ms-grid-columns: (1fr)[2];
        grid-template-columns: repeat(2, 1fr);
  }
}

.brand {
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-color: white;
  cursor: pointer;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  -webkit-transition: -webkit-box-shadow ease-in-out 0.35s;
  transition: -webkit-box-shadow ease-in-out 0.35s;
  transition: box-shadow ease-in-out 0.35s;
  transition: box-shadow ease-in-out 0.35s, -webkit-box-shadow ease-in-out 0.35s;
  background-size: cover;
  min-height: 8rem;
}

.brand:hover {
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
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
  background: green;
  margin-bottom: 0.25rem;
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
  width: 100%;
  align-items: center;
  justify-content: flex-end;
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
  grid-area: carousal;
}

#carousal-content {
  display: -ms-grid;
  display: grid;
}

@media screen and (max-width: 768px) {
  #carousal-content {
    margin-top: var(--header-height);
  }
  .carousel {
    border-radius: 0;
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
  border-radius: 4px;
}

.slides {
  height: 100%;
  width: 100%;
  position: relative;
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

.promotion {
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  background-color: white;
  cursor: pointer;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  -webkit-transition: -webkit-box-shadow ease-in-out 0.35s;
  transition: -webkit-box-shadow ease-in-out 0.35s;
  transition: box-shadow ease-in-out 0.35s;
  transition: box-shadow ease-in-out 0.35s, -webkit-box-shadow ease-in-out 0.35s;
  background-size: cover;
  margin-bottom: 1rem;
  height: 12rem;
}

.promotion .gard-overlay {
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
  padding: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}

.promotion:hover {
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
}

.promotion div {
  -ms-flex-item-align: end;
      align-self: flex-end;
}

.kits {
  background-image: url("https://storage.pepperi.com/Beauty_demo/1.jpg");
}

.promotion .gard-overlay {
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);
  padding: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}

.title-4-lg {
  font-weight: 700;
  font-size: 2rem;
  color: white;
  line-height: 1.1em;
}

@media screen and (max-width: 960px) {
  .title-4-lg {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 576px) {
  .title-4-lg {
    font-size: 2rem;
  }
}

.comonBtn {
  color: white;
  background: #0a0a0a;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 1em;
  -webkit-transition: all ease-in-out 0.35s;
  transition: all ease-in-out 0.35s;
}

.comonBtn:hover {
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.16);
  -webkit-transform: translateY(-1px);
          transform: translateY(-1px);
}

.card {
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
  background-color: rgba(10, 10, 10, 0.08);
  color: #1a1a1a;
  border-radius: 4px;
  padding: 1rem;
}

.card img {
  width: 3rem;
  -webkit-margin-start: 0.5rem;
          margin-inline-start: 0.5rem;
}

.card p {
  line-height: 1.5rem;
}

.dark-card {
  background-color: #0a0a0a;
  color: white;
  font-weight: 500;
}

.sidebar-menu .sidebar-gap {
  margin-bottom: 1rem;
}

.dimmed {
  opacity: 0.7;
}

.bold {
  font-weight: 600;
}

.title-2-sm {
  font-weight: 600;
  font-size: 1.125rem;
}
.sidebar-box {
  padding: 1rem;
  max-width: 100%;
  border-radius: 4px;
  background-color: rgba(10, 10, 10, 0.08);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  gap: 0.875rem;
}

.title-1-xs {
  font-weight: 600;
  font-size: 1rem;
}

.custom-input-dropdown {
  overflow: hidden;
}

.custom-input-dropdown select {
  padding: 0.5rem;
  margin-top: 0;
  z-index: 1;
  width: 100%;
  font-size: inherit;
  border: 0;
  background: none;
  outline: none;
  height: 40px;
  line-height: 40px;
} 

.custom-input-dropdown::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  width: 40px;
}

.custom-input-dropdown:after {
  content: "";
  display: block;
  position: absolute;
  background-image: url(dd-arrow.png);
  background-position: center;
  background-size: 16px;
  background-repeat: no-repeat;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
}

[class*="dropdown-content"] .active-dropdown-item {
  background-color: #0a0a0a;
  color: white;
}

.sidebar-box h3, .sidebar-box hr, .sidebar-box ul, .sidebar-box button {
  -webkit-margin-after: 0.875rem;
          margin-block-end: 0.875rem;
}

.sidebar-box h3:last-child, .sidebar-box hr:last-child, .sidebar-box ul:last-child, .sidebar-box button:last-child {
  -webkit-margin-after: 0;
          margin-block-end: 0;
}

.sidebar-menu .sidebar-gap {
  margin-bottom: 1rem;
}

.title-1-xs {
  font-weight: 600;
  font-size: 1rem;
}

.title-2-sm {
  font-weight: 600;
  font-size: 1.125rem;
}

.dimmed {
  opacity: 0.7;
}
.card {
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
  background-color: rgba(10, 10, 10, 0.08);
  color: #1a1a1a;
  border-radius: 4px;
  padding: 1rem;
}

.card img {
  width: 3rem;
  -webkit-margin-start: 0.5rem;
          margin-inline-start: 0.5rem;
}

.card p {
  line-height: 1.5rem;
}

.dark-card {
  background-color: #0a0a0a;
  color: white;
  font-weight: 500;
}

.sidebar-menu .sidebar-gap {
  margin-bottom: 1rem;
}

.dimmed {
  opacity: 0.7;
}

.bold {
  font-weight: 600;
}

.title-2-sm {
  font-weight: 600;
  font-size: 1.125rem;
}
.sidebar-box {
  padding: 1rem;
  max-width: 100%;
  border-radius: 4px;
  background-color: rgba(10, 10, 10, 0.08);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  gap: 0.875rem;
}

.title-1-xs {
  font-weight: 600;
  font-size: 1rem;
}

.custom-input-dropdown {
  overflow: hidden;
}

.custom-input-dropdown select {
  padding: 0.5rem;
  margin-top: 0;
  z-index: 1;
  width: 100%;
  font-size: inherit;
  border: 0;
  background: none;
  outline: none;
  height: 40px;
  line-height: 40px;
} 

.custom-input-dropdown::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  width: 40px;
}

.custom-input-dropdown:after {
  content: "";
  display: block;
  position: absolute;
  background-image: url(dd-arrow.png);
  background-position: center;
  background-size: 16px;
  background-repeat: no-repeat;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
}

[class*="dropdown-content"] .active-dropdown-item {
  background-color: #0a0a0a;
  color: white;
}

.sidebar-box h3, .sidebar-box hr, .sidebar-box ul, .sidebar-box button {
  -webkit-margin-after: 0.875rem;
          margin-block-end: 0.875rem;
}

.sidebar-box h3:last-child, .sidebar-box hr:last-child, .sidebar-box ul:last-child, .sidebar-box button:last-child {
  -webkit-margin-after: 0;
          margin-block-end: 0;
}

.sidebar-menu .sidebar-gap {
  margin-bottom: 1rem;
}

.title-1-xs {
  font-weight: 600;
  font-size: 1rem;
}

.title-2-sm {
  font-weight: 600;
  font-size: 1.125rem;
}

.dimmed {
  opacity: 0.7;
}

.card {
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
  background-color: rgba(10, 10, 10, 0.08);
  color: #1a1a1a;
  border-radius: 4px;
  padding: 1rem;
}

.card img {
  width: 3rem;
  -webkit-margin-start: 0.5rem;
          margin-inline-start: 0.5rem;
}

.card p {
  line-height: 1.5rem;
}

.dark-card {
  background-color: #0a0a0a;
  color: white;
  font-weight: 500;
}

.sidebar-menu .sidebar-gap {
  margin-bottom: 1rem;
}

.dimmed {
  opacity: 0.7;
}

.bold {
  font-weight: 600;
}

.title-2-sm {
  font-weight: 600;
  font-size: 1.125rem;
}
</style>          
            <main class="wrapper">
            <section id="carousal-content">
            </section>
            <aside id="sidebar">
              <div id="response-menu" class="response-menu">
                <button onclick="this.openCloseMenu();" class="regular-button" id="btn">Open menu</button>
              </div>
          
              <div id="sidebar-sm" class="sidebar-menu">
                <div id="store-selector" style="display:none">                  
                </div>
          
                <!--<hr>-->
                 
                <div id="free_shipping" style="display:none">
                </div>
          
                <div id="account_balance" style="display:none">
                </div>
          
                <hr id ="store-selector-hr" style="display:none">
          
                <div id="active-order" style="display:none">
                  
                </div>
          
                <hr class="sidebar-gap">
          
                <div id="submitted_orders" style="display:none">
                  
                </div>
                <div id="overlay"></div>
              </div>
          
          
            </aside>
          
            <div id="categories">
              <div id="brands">
          
              </div>
              <div id="promotions">
                
              </div>
            </div>
          </main>
    `;
    return str;
  };
  this.initPlugin = function () {
    
    var options = {
      JsURLs: [
        this.jsonFilePath,
      ],
      cssURLs: [
        this.cssFilePath,
      ],
    };
    
    console.log("initPlugin body",options)
    return options;
  };
  this.onPluginLoad = function (context) {
    console.log("onPluginLoad body")
    this.context = context;
    var data = JSON.parse(context.pluginData);
    if (data && this.isMultiAccount) {
      this.accountUUID = this.getSessionStorage("accountUUID") || "";
    } else if (data) {
      this.accountUUID = data.accountUUID
      customHomepage.setSessionStorage("accountUUID", data.accountUUID)
    }
    this.getCatalogs('customHomepage');
  };

  // TODO: start

  //end  
  this.buildHTML = function () {
    //try to remove ifelse, settimeout also remove
    this.transactionName = Transaction;
    this.closeAllMenusListener();
    customHomepage.carousel("carousal-content", CaruselData)
    this.drawImagesBlocks("brands", Brands)
    this.drawPromotions("promotions", Promotions)
    this.getAccounts('customHomepage.findTransactionForSelectedAccount');
  };

  this.getCatalogs = function (x) {
    console.log(x)
    pepperi.api.catalogs.search({
        fields: ["UUID", "ExternalID", "Description", "ID"],
        responseCallback: "customHomepage.getCatalogsCallback",
        requestID: x        
    });
}
 this.getCatalogsCallback = function (res) {
    console.log("get catalog res", res);
    (res && res.objects && res.objects.length) ? this.catalogs = res.objects: false;
    var fun = eval("(" + res.requestID + ")");
    fun.buildHTML();
}


  this.slideLifetyme = 5000;
  this.slideSwitchTimeoutKeeper;
  customHomepage.CaruselData = []
  customHomepage.carousel = function (slideid, CaruselData) {
    customHomepage.CaruselData = CaruselData
      let htmlStr = "";
      let indicatorsStr = "";
      var idx = 0;
      var value = customHomepage.CaruselData[idx];
  
      htmlStr += ` <div id="carousel" class="carousel"> 
      <div id="slides" class="slides"  onclick="customHomepage.setUUIDandNav(null,null,'/Transactions/scope_items/{{UUID}}','customHomepage')"><div class="slide" data-state="active"
      style="background-image: url('${value.imageURL}')">
      <div class="gard-overlay">
          <div class="slide-text">
              <button id="shop_now" onclick="customHomepage.setUUIDandNav(null,null,'${value.deepLink}', 'this')" >${value.buttonText}</button>
              <p class="title">${value.title}</p>
              <p class="desc">${value.description}</p>
          </div>
          <div class="slide-controllers">
              <div id="indicators" class="indicators">
                  
              </div>
              <button onclick="event.stopImmediatePropagation();this.playerClick();" class="pause" id="player">
              </button>
          </div>
      </div>
  </div></div></div>`
  
      document.getElementById(slideid).innerHTML = htmlStr;
  
      for (const [idx1, value] of customHomepage.CaruselData.entries()) {
          indicatorsStr +=
              idx1 == idx ?
              `<div class="radio-box">
             <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)" checked="checked">
             <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customHomepage.switchSlide(true)" ></span>
             </div>` :
              `<div class="radio-box">
             <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customHomepage.switchSlide(true)">
             <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide'));  customHomepage.switchSlide(true)"></span>
             </div>`
      }
  
  
      document.getElementById("indicators").innerHTML = indicatorsStr;
      customHomepage.setSessionStorage("savedIDX", 0);
      this.slideLifetyme = value.time;
      customHomepage.switchSlide();
  
      this.swipeListener()
  }
  
  this.playerClick = function () {
      var btn = document.getElementById("player");
      var btnClass = btn.className;
      if (btnClass == "play") {
          btn.className = "pause";
          customHomepage.switchSlide();
      } else {
          btn.className = "play";
          clearTimeout(this.slideSwitchTimeoutKeeper);
      }
  };
  customHomepage.switchSlide = function (isCurrent, next = true) {
      clearTimeout(this.switcher);
      let htmlStr = "";
  
      let indicatorsStr = "";
  
      var idx;
      var value;
  
      idx = +sessionStorage.getItem("savedIDX") < CaruselData.length ?
          +sessionStorage.getItem("savedIDX") :
          0;
  
      value = CaruselData[idx];
      customHomepage.setSessionStorage(
          "savedIDX",
          +sessionStorage.getItem("savedIDX") + 1 < CaruselData.length ?
          +sessionStorage.getItem("savedIDX") + 1 :
          0
      );
  
      htmlStr += `<div class="slide"  data-state="active"
      style="background-image: url('${value.imageURL}')">
      <div class="gard-overlay">
          <div class="slide-text">
              <button id="shop_now" onclick="customHomepage.setUUIDandNav(null,null,'${value.deepLink}','customHomepage')" >${value.buttonText}</button>
              <p class="title">${value.title}</p>
              <p class="desc">${value.description}</p>
          </div>
          <div class="slide-controllers">
              <div id="indicators" class="indicators">
                  
              </div>
              <button onclick="event.stopImmediatePropagation();this.playerClick();" class="pause" id="player">
              </button>
          </div>
      </div>
  </div>`;
      if (document.getElementById("slides")) {
          document.getElementById("slides").innerHTML = htmlStr;
          for (const [idx1, value] of CaruselData.entries()) {
              indicatorsStr +=
                  idx1 == idx ?
                  `<div class="radio-box">
             <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}"  data-state="active" onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)" checked="checked">
             <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)"></span>
             </div>` :
                  `<div class="radio-box">
             <input type="radio" name="indicator" data-slide="${idx1}" data-time="${value.time}" onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)">
             <span class="radio-dot" data-slide="${idx1}" data-time="${value.time}"  data-state="active"  onclick="event.stopImmediatePropagation();customHomepage.setSessionStorage('savedIDX', this.getAttribute('data-slide')); customHomepage.switchSlide(true)"></span>
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
            customHomepage.switchSlide();
          }, this.speed);
      }
  };
  this.swipeListener = function () {
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
                    customHomepage.switchSlide(true);
                  } else {
                    customHomepage.switchSlide(true, false);
                  }
              }
          }
      }, false);
  }
  
  this.closeAllMenusListener = function () {
    $('#select-menu').attr('tabindex', '-1');
    $('#select-menu').on('focusout', function () {
      $('#select-menu').removeClass('show');
    });

    $('#menuDropdown').attr('tabindex', '-1');
    $('#linksDropdown').attr('tabindex', '-1');
    $('#myDropdown').attr('tabindex', '-1');
  
    $('#menuDropdown').on('focusout', function () {
      $('#menuDropdown').removeClass('show');
    });
    $('#menuDropdown').removeClass('show');
  
    $('#linksDropdown').on('focusout', function () {
      $('#linksDropdown').removeClass('show');
    });
  
    $('#myDropdown').on('focusout', function () {
      $('#myDropdown').removeClass('show');
    });
  };

  
  this.buildShippingBaner = function (slideid) {
      var shippingHTML = "";
  
      shippingHTML += `<div class="shipping" onclick="customHomepage.setUUIDandNav(null,null,'${shipping.deepLink}', 'this')">
                          <p>${shipping.title}</p>
                          <button class="delivery" onclick="customHomepage.setUUIDandNav(null,null,'${shipping.deepLink}', 'this')">${shipping.buttonText}</button>    
                        </div>`;
  
      document.getElementById(slideid).innerHTML = shippingHTML;
      document.getElementById(slideid).style.display = "block";
  };

  this.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };
  this.findTransactionForSelectedAccount = function (uuid) {
    console.log("uuid -----> ", uuid)
    this.accountUUID = uuid;
    customHomepage.setSessionStorage("accountUUID", uuid);
    if (blocks_config.free_shipping) {
      this.freeShipping(uuid, blocks_config.free_shipping, "free_shipping")
    }
    if (blocks_config.account_balance) {
      this.accountBalance(uuid, blocks_config.account_balance, "account_balance")
    }
    if (blocks_config["active-order"]) {
      customHomepage.activeOrder(customHomepage.transactionName, blocks_config["active-order"].table, uuid, "active-order")
    }
    if (blocks_config["submitted_orders"]) {
      this.submitedOrders(customHomepage.transactionName, blocks_config["submitted_orders"].table, uuid, "submitted_orders")
    }
  }

  this.accountBalance=function(uuid,config,id){
    console.log("config ---> ",config);
    if (config.field && config.field != '') {
    this.accountBalanceConfig=config
    pepperi.api.accounts.get({
       key: { UUID: uuid },
       fields: [config.field],
       responseCallback:"customHomepage.accountBalanceCallBack",
       requestID:id
  });
    }else{
      this.accountBalanceCallBack(null, id)
    }
  }
  
   
  
  this.accountBalanceCallBack=function(data, id){
    if (data) {
    console.log("data ---> ",data);
    document.getElementById(data.requestID).innerHTML = `                  
    <div>
    <p class="dimmed">${this.accountBalanceConfig.text}</p>
    <p class="title-2-sm "><b id='balance'>${data.object[this.accountBalanceConfig.field]}</b> ${this.accountBalanceConfig.measure_unit}</p>
    </div>` + (this.accountBalanceConfig.svg ? `<img src="${this.accountBalanceConfig.svg}" alt="Go to Account Balance icon">` : '')
    document.getElementById(data.requestID).classList.add("card", "sidebar-gap")  
    document.getElementById(data.requestID).style.display = "flex"
    }else{
      document.getElementById(data.requestID).innerHTML = `                  
    <div>
    <p class="dimmed">${this.accountBalanceConfig.text}</p>
    <p class="title-2-sm "> ${this.accountBalanceConfig.measure_unit}</p>
    </div>` + (this.accountBalanceConfig.svg ? `<img src="${this.accountBalanceConfig.svg}" alt="Go to Account Balance icon">` : '')
    document.getElementById(id).classList.add("card", "sidebar-gap")  
    document.getElementById(id).style.display = "flex"
    }
  }
  
  this.getAccounts = function (callbackName) {
    console.log("callbackName ->>>>", callbackName);
    var bridgeObject = {
      fields: ["Name", "UUID", "ExternalID"],
      filter: {
        Operation: "AND",
        RightNode: {
          ApiName: "ParentExternalID",
          Operation: "IsEqual",
          Values: [""],
        },
        LeftNode: {
          ApiName: "Hidden",
          Operation: "IsEqual",
          Values: ["false"],
        },
      },
      responseCallback: "customHomepage.setAccountDD",
      requestID: callbackName
    };
    pepperi.api.accounts.search(bridgeObject);
  };
  this.setAccountDD = function (data) {
    console.log("accounts", data)
    if (!data.success || data.count == 0) return;
    this.accounts = data.objects;
    console.log("data.requestID --->", data.requestID);
    this.buildAccountsDropDown(this.accounts, data.requestID);
  };
  this.setActiveDropdown = function (uuid, name) {
    document.getElementById("selected-account").innerHTML = name
    document.querySelector('li.active-dropdown-item') ? document.querySelector('li.active-dropdown-item').classList.remove("active-dropdown-item") : null;
    document.getElementById(uuid).classList.add("active-dropdown-item");
    customHomepage.setSessionStorage("accountUUID", uuid);
  }
  this.buildAccountsDropDown = function (thisAccounts, callback) {
    let ddElement = document.getElementById("store-selector");
    let html = "";
    accounts = thisAccounts
    if (thisAccounts.length == 1) {
      document.getElementById("store-selector-hr").style.display = "none"
      document.getElementById("store-selector").style.display = "none"
    } else {
      document.getElementById("store-selector-hr").style.display = "flex"
      document.getElementById("store-selector").style.display = "flex"
      document.getElementById("store-selector").classList.add("sidebar-box")
      document.getElementById("store-selector").classList.add("sidebar-gap")
    }
    accounts.forEach((element) => {
      if ((customHomepage.getSessionStorage("accountUUID") && customHomepage.getSessionStorage("accountUUID") != '' && element.UUID == customHomepage.getSessionStorage("accountUUID"))) {
        html += `<label class="title-1-xs sidebar-gap" for="order-for">Order for:</label>
        <div class="custom-input-dropdown" onclick="this.openStoreSelect()">
          <p role="label" id="selected-account">${element.Name + `(${element.ExternalID})`}</p>
          <ul class="dropdown-content-fit" id="select-menu" role="select">
          <li class="active-dropdown-item" onclick="this.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); this.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>
          </ul>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                  d="M5.80032148,9.28674354 L11.2542824,13.2027583 C11.6661309,13.585083 12.3338691,13.585083 12.7457176,13.2027583 L18.1996785,9.28674354 C18.611527,8.90441882 19.2792652,8.90441882 19.6911137,9.28674354 C20.1029621,9.66906826 20.1029621,10.2889391 19.6911137,10.6712638 L13.4914351,16.4265129 C12.6677383,17.1911624 11.3322617,17.1911624 10.5085649,16.4265129 L4.30888633,10.6712638 C3.89703789,10.2889391 3.89703789,9.66906826 4.30888633,9.28674354 C4.72073478,8.90441882 5.38847303,8.90441882 5.80032148,9.28674354 Z" />
          </svg>
        </div>`;
        ddElement.innerHTML = html;
        customHomepage.setSessionStorage("accountUUID", element.UUID);
      } else
        html += `<label class="title-1-xs sidebar-gap" for="order-for">Order for:</label>
        <div class="custom-input-dropdown" onclick="this.openStoreSelect()">
          <p role="label" id="selected-account">Select a store</p>
          <ul class="dropdown-content-fit" id="select-menu" role="select">
            <li onclick="this.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); this.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>  
          </ul>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                  d="M5.80032148,9.28674354 L11.2542824,13.2027583 C11.6661309,13.585083 12.3338691,13.585083 12.7457176,13.2027583 L18.1996785,9.28674354 C18.611527,8.90441882 19.2792652,8.90441882 19.6911137,9.28674354 C20.1029621,9.66906826 20.1029621,10.2889391 19.6911137,10.6712638 L13.4914351,16.4265129 C12.6677383,17.1911624 11.3322617,17.1911624 10.5085649,16.4265129 L4.30888633,10.6712638 C3.89703789,10.2889391 3.89703789,9.66906826 4.30888633,9.28674354 C4.72073478,8.90441882 5.38847303,8.90441882 5.80032148,9.28674354 Z" />
          </svg>
        </div>
            `;
    });
    ddElement.innerHTML = html;
  
    if (!customHomepage.getSessionStorage("accountUUID") || customHomepage.getSessionStorage("accountUUID") == '')
      this.setActiveDropdown(this.accounts[0].UUID, this.accounts[0].Name)
    //this.findTransactionForSelectedAccount(customHomepage.getSessionStorage("accountUUID"),callback);
    var value = '(customHomepage.getSessionStorage("accountUUID"))'
    var cb = eval("(" + callback + value + ")");
    document.getElementById("store-selector-hr").classList.add("sidebar-gap");
  };

  customHomepage.activeOrder = function(transactionName,fields,accountUUID, id){
      console.log("text----------->", transactionName, accountUUID);
    pepperi.api.transactions.search({
      fields: [
        "UUID",
        "Status",
        "WrntyID",
        ...fields.map(el => el.field)
      ],
      filter: {
        Operation: "AND",
        RightNode: {
          ApiName: "ActionDateTime",
          Operation: "InTheLast",
          Values: ["4", "Weeks"],
        },
        LeftNode: {
          Operation: "AND",
          RightNode: {
            ApiName: "Type",
            Operation: "IsEqual",
            Values: [transactionName],
          },
          LeftNode: {
            Operation: "AND",
            RightNode: {
              ApiName: "Account.UUID",
              Operation: "IsEqual",
              Values: [accountUUID],
            },
            LeftNode: {
              Operation: "AND",
              RightNode: {
                ApiName: "Hidden",
                Operation: "IsEqual",
                Values: ['false'],
              },
              LeftNode: {
                ApiName: "Status",
                Operation: "IsEqual",
                Values: ["1", "1000"],
              },
            },
          },
        },
      },
      sorting: [{ Field: "ActionDateTime", Ascending: false }],
      pageSize: 1,
      page: 1,
      responseCallback: "customHomepage.getRecentTransactionForAccountCallback",
      requestID:id
    });
  }
  
  this.getRecentTransactionForAccountCallback = function (data) {
    this.transactionFields =  blocks_config["active-order"].table
    console.log("data", data)
    console.log("blocks_config",JSON.stringify(blocks_config))
    let recentOrdBtnDeeplink = ''
    if (data && data.objects && data.objects.length) {
      let uuid = data.objects[0].UUID ? data.objects[0].UUID : "00000000";
      customHomepage.setSessionStorage("LastOpenTransactionUUID", uuid);
      recentOrdBtnDeeplink = 'Transactions/Cart/' + data.objects[0].UUID;
      $("#orderBtn").attr("onclick", `customHomepage.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}', 'customHomepage')`);
      $("#orderBtn").text("Back to Cart")
      this.buildOpenOrdersTable(data.objects, data.requestID);
    } else {
      customHomepage.setSessionStorage("LastOpenTransactionUUID", '');
      recentOrdBtnDeeplink = '/Transactions/scope_items/{{UUID}}';
      $("#orderBtn").attr("onclick", `customHomepage.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}', 'customHomepage')`);
      $("#orderBtn").text("Create New Order");
      let html = `<h3 class="title-2-sm " id="currTransactionName"></h3>
      <ul class="leaders" id="currTransactionFields">
      `;
      this.transactionFields.forEach(el => {
        html += `
        <li>
        <span  class="dimmed">${el.text}</span>
        <span class="bold">0</span>
      </li>`
      })
      html += `</ul><button class="comonBtn" id="orderBtn">Back to Cart</button>`
      
      document.getElementById(data.requestID).style.display = "flex"
      document.getElementById(data.requestID).style.flexDirection = "column"
      document.getElementById(data.requestID).classList.add("sidebar-box");
      document.getElementById(data.requestID).classList.add("sidebar-gap");
      document.getElementById(data.requestID).innerHTML = html
    }
  };
  
  this.buildOpenOrdersTable = function (data, id) {
    console.log("active order data ->>>> ", data);
    console.log("active order block config ->>>> ", blocks_config["active-order"].table);
    recentOrdBtnDeeplink = 'Transactions/Cart/' + data[0].UUID;
    var is_new = false;
    if (data[0].Status == 1000)
      is_new = true;
    let html = `<h3 class="title-2-sm " id="currTransactionName"></h3>
    <ul class="leaders" id="currTransactionFields">`;
    this.transactionFields.forEach(el => {
      if(el.text == 'Total Quantity'){
        html += `<li>
      <span  class="dimmed">${el.text}</span>
      <span class="bold">${is_new ? 0 : data[0][el.field]}</span>
    </li>`
      }else{
        html += `<li>
      <span  class="dimmed">${el.text}</span>
      <span class="bold">${is_new ? 0 : data[0][el.field]}$</span>
    </li>`
      }
      
    })
    html += `</ul>
    <button class="comonBtn" id="orderBtn">Back to Cart</button>`  
    document.getElementById(id).style.display = "flex"  
    document.getElementById(id).style.flexDirection = "column"
    document.getElementById(id).classList.add("sidebar-box");
    document.getElementById(id).classList.add("sidebar-gap");
    document.getElementById(id).innerHTML = html
    document.getElementById("currTransactionName").innerHTML = blocks_config["active-order"].name
    $("#orderBtn").attr("onclick", `customHomepage.setUUIDandNav(null,null,'/Transactions/Cart/{{UUID}}', 'customHomepage')`);
  };

  this.freeShipping = function (uuid, config, id) {
    this.freeShippingConfig = config
    if (config.field && config.field != '') {
      pepperi.api.accounts.get({
        key: {
          UUID: uuid
        },
        fields: [config.field],
        responseCallback: "customHomepage.freeShippingCallback",
        requestID: id
      });
    } else {
      this.freeShippingCallback(null, id)
    }
  
  }
  
  
  
  this.freeShippingCallback = function (data, id) {
    if (data) {
      document.getElementById(data.requestID).innerHTML = `
        <div>
        <p>${this.freeShippingConfig.text}${data.object[this.freeShippingConfig.field]}</p>
      </div>` + (this.freeShippingConfig.svg ? `<img src="${this.freeShippingConfig.svg}" alt="Promotion truck icon">` : '')
  
      document.getElementById(data.requestID).classList.add("card", "sidebar-gap", "dark-card")
      document.getElementById(data.requestID).style.display = "flex"
    } else {
      document.getElementById(id).innerHTML = `
        <div>
        <p>${this.freeShippingConfig.text}</p>
      </div>` + (this.freeShippingConfig.svg ? `<img src="${this.freeShippingConfig.svg}" alt="Promotion truck icon">` : '')
  
      document.getElementById(id).classList.add("card", "sidebar-gap", "dark-card")
      document.getElementById(id).style.display = "flex"
    }
  }
  this.submitedOrders = function (transactionName,fields,accountUUID, id) {
    pepperi.api.transactions.search({
      fields: [
        "UUID",
        ...fields
      ],
      filter: {
        Operation: "AND",
        RightNode: {
          ApiName: "ActionDateTime",
          Operation: "InTheLast",
          Values: ["4", "Weeks"],
        },
        LeftNode: {
          Operation: "AND",
          RightNode: {
            ApiName: "Type",
            Operation: "IsEqual",
            Values: [transactionName],
          },
          LeftNode: {
            Operation: "AND",
            RightNode: {
              ApiName: "Account.UUID",
              Operation: "IsEqual",
              Values: [accountUUID],
            },
            LeftNode: {
              Operation: "AND",
              RightNode: {
                ApiName: "Hidden",
                Operation: "IsEqual",
                Values: ['false'],
              },
              LeftNode: {
                ApiName: "Status",
                Operation: "IsEqual",
                Values: blocks_config["submitted_orders"].statuses,
              },
            },
          },
        },
      },
      sorting: [{ Field: "ActionDateTime", Ascending: false }],
      pageSize: 5,
      page: 1,
      responseCallback: "customHomepage.getRecentSubmittedTransactionForAccountCallback",
      requestID:id
    });
  };
  this.getRecentSubmittedTransactionForAccountCallback = function (data) {
    console.log("transaction data ------> ", data);
    if (data && data.objects && data.objects.length) {
      this.buildSubmittedOrdersTable(data.objects, data.requestID);
    } else {
      document.getElementById(data.requestID).style.display = "flex"
      document.getElementById(data.requestID
      ).innerHTML = `<h3 class="title-2-sm " id="submitted_orders_name">Submitted Orders</h3>
      <hr>
      <ul id="open-orders" class="leaders"><li>No submitted orders for this account</li></ul>
        `;
        
    }
  };
  this.buildSubmittedOrdersTable = function (data, id) {
    let tableHtml = "";
    let Container = document.getElementById(id);
    tableHtml += `
    <h3 class="title-2-sm " id="submitted_orders_name">${blocks_config['submitted_orders'].name
  
  }</h3><hr>
    <ul id="open-orders" class="leaders">`
    data.forEach((element) => {
      let dateValue = new Date(element.ActionDateTime).toLocaleDateString();
      let deepLink = "/transactions/cart/" + element.UUID;
      tableHtml += `
                    <li>
                    <span  class="dimmed">${dateValue}</span>
                    <span class="bold"><a onClick="this.navigation('${deepLink}')">${element.InternalID}</a></span>
                  </li>
                      
            `;
    });
    tableHtml += `</ul>`
    document.getElementById(id).classList.add("sidebar-box");
    document.getElementById(id).style.display = "flex"
    Container.innerHTML = tableHtml;
  
  };
  this.drawPromotions = function (id, Promotions) {
    let str = "";
    for (const [idx1, value] of Promotions.entries()) {
      str += `
          <div class="promotion kits" style="background-image:url('${value.image}')">
          <div class="gard-overlay" style="${(!value.title || value.title == '') ? 'background:none' : ''}">
            <h2 class="title-4-lg">${value.title}</h2>
            <div>
              <button class="comonBtn custom-btn"
                onclick="customHomepage.setUUIDandNav(null, null, '${value.link}', 'customHomepage')">
                ${value.buttonText}
              </button>
            </div>
            </div>
          </div>`;
    }
    if (document.getElementById(id))
      document.getElementById(id).innerHTML = str;
    document.getElementById(id).classList.add("promotions")  
  };

  this.openStoreSelect = function () {
    document.getElementById('select-menu').classList.toggle('show')
  }
  
  customHomepage.NavigateToActiveCart = function (data) {
    var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
    if (uuid) {
      this.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
    }
  };
  
  customHomepage.logout = function () {
    var event = new CustomEvent("logout");
  
    if (document.createEvent) {
      window.dispatchEvent(event);
    } else {
      window.fireEvent("on" + event.eventType, event);
    }
  };
  
  customHomepage.createNewActivity = function (in_transactionName, deeplink) {
    var bridgeObject = {
      references: {
        account: {
          UUID: this.accountUUID,
        },
      },
      type: {
        Name: !in_transactionName ? this.transactionName : in_transactionName,
      },

      responseCallback: "customHomepage.createNewActivityCallback",
      requestID: deeplink,
    };

    pepperi.app.activities.add(bridgeObject);
  };
 
  customHomepage.createNewActivityCallback = function (res) {
    if (res && res.success) {
      var uuid = res.id;

      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        this.navigation(requestID);
      }
    }
  };

  
this.drawImagesBlocks = function (id,ImagesBlock) {
  let imagesBlocks = "";
  for (const [idx1, value] of ImagesBlock.entries()) {
    if (value.bigImage)
      imagesBlocks += `
      <div class="brand big-brand" onclick="customHomepage.setUUIDandNav(null,null,'${value.link}', 'customHomepage')"
      style="background-image: url(${value.img});">
  </div>`;
    else
      imagesBlocks += `
  <div class="brand" onclick="customHomepage.setUUIDandNav(null,null,'${value.link}', 'customHomepage')"
  style="background-image: url(${value.img});">
</div>`;
  }
  if(document.getElementById(id))
  document.getElementById(id).innerHTML = imagesBlocks;
};

this.handleAction = function (item, nameOfMainJs) {
  var deepLink = item.deepLink.replace(/\"/g, '%22');
  switch (item.action) {
    case 'navigation':
      return `customHomepage.navigation('${deepLink}')`;
    case 'setUUIDandNav':
      return `customHomepage.setUUIDandNav('${item.catalog}','${item.transaction}','${deepLink}', '${nameOfMainJs}')`;
    case 'openInNewTab':
      return `customHomepage.openInNewTab('${deepLink}')`;
    case 'createNewActivity':
      return `customHomepage.createNewActivity('${item.activity}','${deepLink}', '${nameOfMainJs}')`;
    case 'createNewTransaction':
      return `customHomepage.createNewOrder('${item.catalog}','${item.transaction}','${deepLink}',true, '${nameOfMainJs}')`;
    case 'zendesk':
      return `location.href = 'javascript:$zopim.livechat.window.show()'`
  }
}
customHomepage.navigation = function (path) {
  this.closeAllMenusListener();
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

customHomepage.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null, nameOfMainJs) {
  this.closeAllMenusListener();
  var name = eval("(" + nameOfMainJs + ")")  
  const uuid = name.getSessionStorage('LastOpenTransactionUUID');
  console.log("uuid --->",uuid);
  if (uuid && uuid !== "undefined") {
    deepLink =   deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
    this.navigation(deepLink);
  } else {
    customHomepage.createNewOrder(in_catalog, in_transactionName, deepLink, false ,nameOfMainJs);
  }
};

customHomepage.openInNewTab = function (url) {
  var win = window.open(url, '_blank');
  win.focus();
};

customHomepage.createNewOrder = function (inCatalog = null, in_transactionName = null, deepLink = null, skipSessionSaving,nameOfMainJs) {
  var name = eval("(" + nameOfMainJs + ")") 
  let catalogUUID = !inCatalog ? this.catalogs.find((el) => el.ExternalID === name.catalogName).UUID : this.catalogs.find((el) => el.ExternalID === inCatalog).UUID
  var bridgeObject = {
    references: {
      account: {
        UUID: name.accountUUID
      },
      catalog: {
        UUID: catalogUUID
      }
    },
    type: {
      Name: !in_transactionName ? name.transactionName : in_transactionName
    },
    responseCallback: skipSessionSaving ? "customHomepage.createNewOrderCallback" : "customHomepage.createNewOrderAndNavCallback",
    requestID: deepLink
  };
  pepperi.app.transactions.add(bridgeObject);
};

customHomepage.createNewOrderAndNavCallback = function (res) {
  console.log('createNewOrderAndNavCallback res', res);
  if (res && res.success) {
    customHomepage.setSessionStorage('LastOpenTransactionUUID', res.id);
    let uuid = res.id;
    if (res.requestID) {
      var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
      this.navigation(requestID);
    }
  }
};
customHomepage.createNewOrderCallback = function (res) {
  console.log('createNewOrderCallback res', res);
  if (res && res.success) {
    let uuid = res.id;
    if (res.requestID) {
      var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
      this.navigation(requestID);
    }
  }
};

this.closeAllMenusListener = function () {
  $('#select-menu').attr('tabindex', '-1');
  $('#select-menu').on('focusout', function () {
    $('#select-menu').removeClass('show');
  });

  $('#menuDropdown').attr('tabindex', '-1');
  $('#linksDropdown').attr('tabindex', '-1');
  $('#myDropdown').attr('tabindex', '-1');

  $('#menuDropdown').on('focusout', function () {
    $('#menuDropdown').removeClass('show');
  });
  $('#menuDropdown').removeClass('show');

  $('#linksDropdown').on('focusout', function () {
    $('#linksDropdown').removeClass('show');
  });

  $('#myDropdown').on('focusout', function () {
    $('#myDropdown').removeClass('show');
  });
};
this.openCloseMenu = function () {
  const over = document.getElementById("overlay");
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

this.getTransactionStatus = function () {
  var currentTransactionUUID = customHomepage.getSessionStorage(
    "LastOpenTransactionUUID"
  );
  if (!currentTransactionUUID) {
    this.createNewOrder();
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
    this.createNewOrder();
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
  this.getTransactions(
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
    this.createNewOrder();
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

customHomepage.setSessionStorage = function (paramName, data) {
  sessionStorage.setItem(paramName, data);
};

// this.getAccountStatus = function () {
//   var bridgeObject = {
//     fields: ["Name", "UUID"],
//     sorting: [],
//     responseCallback: "customHomepage.getCurrentAccountCallback",
//   };
//   pepperi.api.accounts.search(bridgeObject);
// };

// this.getCurrentAccountCallback = function (res) {
//   if (res && res.success && res.objects && res.objects.length)
//     customHeader.accountUUID = res.objects[0].UUID;
// };
}.apply(customHomepage));