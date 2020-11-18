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
  this.jsonFilePath = 'https://storage.pepperi.com/PreSales/beauty_demo/config_body.js'
  this.jsonModuleChatFilePath = 'https://storage.pepperi.com/PreSales/beauty_demo/chat.js'
  this.promotionsJsonPath = 'https://pepperihomepage.github.io/Public/promotions/beauty_body_promotions.js'
  this.brandscssPath = "https://pepperihomepage.github.io/Public/brands/beauty_body_brands.css";
  this.brandsJsonPath = 'https://pepperihomepage.github.io/Public/brands/beauty_body_brands.js'
  this.brandscssPath = "https://pepperihomepage.github.io/Public/brands/beauty_body_brands.css";
  this.carousalJsonPath = 'https://pepperihomepage.github.io/Public/carousal/beauty_body_carousel.js'
  this.carousalcssPath = "https://pepperihomepage.github.io/Public/carousal/beauty_body_carousal.css";
  this.freeShippingJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/free-shipping/beauty_body_sidebar_free_shipping.js'
  this.freeShippingCssPath = 'https://pepperihomepage.github.io/Public/sidebar/free-shipping/beauty_body_sidebar_free_shipping.css'
  this.accountBalanceJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/account-balance/beauty_bode_sidebar-account_balance.js'
  this.accountBalanceCssPath = 'https://pepperihomepage.github.io/Public/sidebar/account-balance/beauty_bode_sidebar-account_balance.css'
  this.activeOrderJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/active-order/beauty_body_sidebar_active-order.js'
  this.activeOrderCssPath = 'https://pepperihomepage.github.io/Public/sidebar/active-order/beauty_body_sidebar_active-order.css'
  this.submitedOrderJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/submitted-orders/beauty_bode_sidebar-submitted-orders.js'
  this.submitedOrderCssPath = 'https://pepperihomepage.github.io/Public/sidebar/submitted-orders/beauty_body_sidebar_submitted-orders.css'
  this.accountDropdownJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/account-dropdown/beauty_body_sidebar_store-selector.js'
  this.accountDropdownCssPath = 'https://pepperihomepage.github.io/Public/sidebar/account-dropdown/beauty_body_sidebar_store-selector.css'
  this.cssFilePath = "";
  this.transactionFields = []
  this.transactionsHistoryFields = []
  this.setHtml = function () {
    var str = `            
            <main class="wrapper">
            TO DO:
            <section id="carousal-content">
              <div id="carousel" class="carousel">
                <div id="slides" class="slides"></div>
              </div>
            </section>
            <aside id="sidebar">
              <div id="response-menu" class="response-menu">
                <button onclick="customHomepage.openCloseMenu();" class="regular-button" id="btn">Open menu</button>
              </div>
          
              <div id="sidebar-sm" class="sidebar-menu">
                <div id="store-selector" class="sidebar-box  sidebar-gap" style="display:none">
                  <label class="title-1-xs sidebar-gap" for="order-for">Order for:</label>
                  <div class="custom-input-dropdown" onclick="customHomepage.openStoreSelect()">
                    <p role="label" id="selected-account">Select a store</p>
                    <ul class="dropdown-content-fit" id="select-menu" role="select">
                    </ul>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M5.80032148,9.28674354 L11.2542824,13.2027583 C11.6661309,13.585083 12.3338691,13.585083 12.7457176,13.2027583 L18.1996785,9.28674354 C18.611527,8.90441882 19.2792652,8.90441882 19.6911137,9.28674354 C20.1029621,9.66906826 20.1029621,10.2889391 19.6911137,10.6712638 L13.4914351,16.4265129 C12.6677383,17.1911624 11.3322617,17.1911624 10.5085649,16.4265129 L4.30888633,10.6712638 C3.89703789,10.2889391 3.89703789,9.66906826 4.30888633,9.28674354 C4.72073478,8.90441882 5.38847303,8.90441882 5.80032148,9.28674354 Z" />
                    </svg>
                  </div>
                </div>
          
                <!--<hr>-->
                
                <div class="card dark-card sidebar-gap" id="free_shipping" style="display:none">
                </div>
          
                <div class="card sidebar-gap" id="account_balance" style="display:none">
                </div>
          
                <hr id ="store-selector-hr" style="display:none" class="sidebar-gap">
          
                <div id="active-order" class="sidebar-box  sidebar-gap" style="display:none">
                  
                </div>
          
                <hr class="sidebar-gap">
          
                <div class="sidebar-box" id="submitted_orders" style="display:none">
                  
                </div>
                <div id="overSide"></div>
              </div>
          
          
            </aside>
          
            <div id="categories">
              <div id="brands">
          
              </div>
              <div class="promotions" id="promotions">
                
              </div>
            </div>
          </main>
    `;
    return str;
  };
  this.initPlugin = function () {
    var options = {
      JsURLs: [this.jsonFilePath,
        this.jsonModuleChatFilePath,
        this.promotionsJsonPath, 
        this.brandsJsonPath, 
        this.carousalJsonPath, this.freeShippingJsonPath, this.accountBalanceJsonPath, this.activeOrderJsonPath, this.submitedOrderJsonPath, this.accountDropdownJsonPath
      ],
      cssURLs: [this.cssFilePath, this.carousalcssPath, this.brandscssPath, this.freeShippingCssPath, this.accountBalanceCssPath, this.submitedOrderCssPath, this.activeOrderCssPath, this.accountDropdownCssPath],
    };
    return options;
  };
  this.onPluginLoad = function (context) {
    this.context = context;
    var data = JSON.parse(context.pluginData);
    if (data) {
      this.accountUUID = this.getSessionStorage("accountUUID") || "";
    }
    this.getCatalogs();
  };
 
  this.setActiveDropdown = function (uuid, name) {
    document.getElementById("selected-account").innerHTML = name
    document.querySelector('li.active-dropdown-item') ? document.querySelector('li.active-dropdown-item').classList.remove("active-dropdown-item") : null;
    document.getElementById(uuid).classList.add("active-dropdown-item");
    this.setSessionStorage("accountUUID", uuid);
  }
  this.findTransactionForSelectedAccount = function (uuid) {

    this.accountUUID = uuid;
    this.setSessionStorage("accountUUID", uuid);
    let currentAccount = this.accounts.filter((el) => {
      return el.UUID == uuid;
    });
    console.log("blocks_config", blocks_config)
    console.log("currentAccount", currentAccount)
    if (blocks_config.free_shipping) {
      customHomepage.freeShipping(uuid, blocks_config.free_shipping)
    }
    if (blocks_config.account_balance) {
      customHomepage.accountBalance(uuid, blocks_config.account_balance)
    }
    customHomepage.activeOrder(this.transactionName, this.transactionFields, uuid)
    customHomepage.submitedOrders(this.transactionName, this.transactionFields, uuid)
  }
  this.buildHTML = function () {
    if (document.getElementById("slides")) {
      this.transactionName = Transaction
      this.catalogName = Catalog
      for (var keys in blocks_config) {
        if (!blocks_config[keys])
          document.getElementById(keys).style.display = "none"
        else
          document.getElementById(keys).style.display = "flex"
      }
      let additionalAccountFields = []
      if (blocks_config.free_shipping && blocks_config.free_shipping.field)
        additionalAccountFields.push(blocks_config.free_shipping.field)
      if (blocks_config.account_balance && blocks_config.account_balance.field)
        additionalAccountFields.push(blocks_config.account_balance.field)
      if (blocks_config["active-order"] && blocks_config["active-order"].table && blocks_config["active-order"].table.length > 0)
        this.transactionFields = blocks_config["active-order"].table
      if (blocks_config["active-order"] && blocks_config["submitted_orders"].table && blocks_config["submitted_orders"].table.length > 0)
        this.transactionsHistoryFields = blocks_config["submitted_orders"].table
      this.getAccounts(additionalAccountFields);
      this.closeAllMenusListener();
      customHomepage.carousel("slides", CaruselData)
      customHomepage.drawImagesBlocks("brands", Brands)
      customHomepage.drawPromotions("promotions", Promotions)
    } else {
      setTimeout(() => {
        customHomepage.buildHTML()
      }, 100);
    }

  };


  this.setSessionStorage = function (paramName, data) {
    sessionStorage.setItem(paramName, data);
  };
  this.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };
  //navigation
  this.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null) {
    const uuid = customHomepage.getSessionStorage('LastOpenTransactionUUID');
    if (uuid && uuid !== "undefined") {
      deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customHomepage.navigation(deepLink);
    } else {
      customHomepage.createNewOrder(in_catalog, in_transactionName, deepLink);
    }
  };
  this.NavigateToActiveCart = function (data) {
    var uuid = this.getSessionStorage("LastOpenTransactionUUID");
    if (uuid) {
      this.navigation("/Transactions/Cart/" + uuid.replace(/-/g, ""));
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
  //JS listeners


}.apply(customHomepage));