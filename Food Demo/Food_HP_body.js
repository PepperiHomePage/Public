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
  this.jsonFilePath = "https://pepperihomepage.github.io/Public/Food%20Demo/config_Food_HP_body.js";
  this.carousalJsonPath = 'https://pepperihomepage.github.io/Public/carousal/body_carousel.js'
  this.carousalcssPath = "https://pepperihomepage.github.io/Public/carousal/body_carousal.css";
  this.customHelperJsonPath = 'https://pepperihomepage.github.io/Public/helper/customFunction.js'
  this.topSidebarBuildJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/sidebar.js'
  this.topSidebarBaseListJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/sidebar_base_list.js'
  this.topSidebarFoodListJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/sidebar_food_list.js'
  this.topSidebarListsJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/sidebar_lists.js'
  this.topSidebarPopupJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/sidebar_popup.js'
  this.topSidebarSmallJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/topSidebar/sidebar_small.js'
  this.navigationJsonPath = 'https://pepperihomepage.github.io/Public/navigation/body_navigation.js'
  this.categoriesJsonPath = 'https://pepperihomepage.github.io/Public/foodDemoCategories/categories.js'
  this.accountJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/foodDemo/account_info.js'
  this.cssFilePath = "";
  this.cssFoodDemoFilePath = "https://pepperihomepage.github.io/Public/beauty-food-demo-body.css";
  this.accountUUID;
  this.typeName;
  this.clientApiPath = "https://webapp.pepperi.com/V16_20/WebApp_154/ClientApi/clientapi.js";
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

    var str = ` 
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
        this.navigationJsonPath,
        this.categoriesJsonPath,
        this.accountJsonPath,
      ],
      cssURLs: [this.cssFilePath,
        this.carousalcssPath,
        this.cssFoodDemoFilePath
      ],
    };
    return options; 
  }
  this.onPluginLoad = function (context) {
    this.context = context;
    this.transactionName = "Buyer Order";
    customFunction.setSessionStorage("isWeb", true);
    
    customFunction.getCatalogs("customHomepage")
    var data = JSON.parse(context.pluginData);
    if (data) {
      this.transactionName = data.typeName || "";
      this.accountUUID = data.accountUUID || "";
    }
    /*customFunction.getTransactionStatus();
    customFunction.getLastTransactions();*/
  };







  this.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };

  this.NavigateToActiveCart = function (data) {
    var uuid = customHomepage.getSessionStorage("LastOpenTransactionUUID");
    if (uuid) {
      customFunction.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
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
    customFunction.getAccountInternalID();
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


}).apply(customHomepage) 