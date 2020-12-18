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
  this.jsonFilePath = 'https://pepperihomepage.github.io/Public/Beauty/config_body.js'
  this.jsonModuleChatFilePath = 'https://storage.pepperi.com/PreSales/beauty_demo/chat.js'
  this.promotionsJsonPath = 'https://pepperihomepage.github.io/Public/promotions/body_promotions.js'
  this.brandscssPath = "https://pepperihomepage.github.io/Public/brands/body_brands.css";
  this.brandsJsonPath = 'https://pepperihomepage.github.io/Public/brands/body_brands.js'
  this.brandscssPath = "https://pepperihomepage.github.io/Public/brands/body_brands.css";
  this.carousalJsonPath = 'https://pepperihomepage.github.io/Public/carousal/body_carousel.js'
  this.carousalcssPath = "https://pepperihomepage.github.io/Public/carousal/body_carousal.css";
  this.freeShippingJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/free-shipping/body_sidebar_free_shipping.js'
  this.freeShippingCssPath = 'https://pepperihomepage.github.io/Public/sidebar/free-shipping/body_sidebar_free_shipping.css'
  this.accountBalanceJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/account-balance/body_sidebar-account_balance.js'
  this.accountBalanceCssPath = 'https://pepperihomepage.github.io/Public/sidebar/account-balance/body_sidebar-account_balance.css'
  this.activeOrderJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/active-order/body_sidebar_active-order.js'
  this.activeOrderCssPath = 'https://pepperihomepage.github.io/Public/sidebar/active-order/body_sidebar-active-order.css'
  this.submitedOrderJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/submitted-orders/body_sidebar-submitted-orders.js'
  this.submitedOrderCssPath = 'https://pepperihomepage.github.io/Public/sidebar/submitted-orders/body_sidebar-submitted-orders.css'
  this.accountDropdownJsonPath = 'https://pepperihomepage.github.io/Public/sidebar/account-dropdown/body_sidebar_store-selector.js'
  this.accountDropdownCssPath = 'https://pepperihomepage.github.io/Public/sidebar/account-dropdown/body_sidebar_store-selector.css'
  this.navigationJsonPath = 'https://pepperihomepage.github.io/Public/navigation/body_navigation.js'
  this.jsListenersJsonPath = 'https://pepperihomepage.github.io/Public/jsListeners/demo_jsListeners.js'
  this.helperJsonPath = 'https://pepperihomepage.github.io/Public/helper/demo_helper.js'
  this.customHelperJsonPath = 'https://pepperihomepage.github.io/Public/helper/customFunction.js'
  this.isMultiAccount = true
  this.cssFilePath = "";
  this.transactionFields = []
  this.transactionsHistoryFields = []
  this.setHtml = function () {
    var str = `            
            <main class="wrapper">
            <section id="carousal-content">
            </section>
            <aside id="sidebar">
              <div id="response-menu" class="response-menu">
                <button onclick="customFunction.openCloseMenu();" class="regular-button" id="btn">Open menu</button>
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
      JsURLs: [this.jsonFilePath,
        this.jsonModuleChatFilePath,
        this.promotionsJsonPath,
        this.brandsJsonPath,
        this.carousalJsonPath,
        this.freeShippingJsonPath,
        this.accountBalanceJsonPath,
        this.activeOrderJsonPath,
        this.submitedOrderJsonPath,
        this.accountDropdownJsonPath,
        this.navigationJsonPath,
        this.jsListenersJsonPath,
        this.helperJsonPath,
        this.customHelperJsonPath
      ],
      cssURLs: [this.cssFilePath,
        this.carousalcssPath,
        this.brandscssPath,
        this.freeShippingCssPath,
        this.accountBalanceCssPath,
        this.submitedOrderCssPath,
        this.activeOrderCssPath,
        this.accountDropdownCssPath
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
      this.setSessionStorage("accountUUID", data.accountUUID)
    }
    customFunction.getCatalogs();
  };

  // TODO: start

  //end  
  this.buildHTML = function () {
    //try to remove ifelse, settimeout also remove
    
    customFunction.closeAllMenusListener();
    customFunction.carousel("carousal-content", CaruselData)
    customFunction.drawImagesBlocks("brands", Brands)
    customFunction.drawPromotions("promotions", Promotions)
    customFunction.getAccounts('customHomepage.findTransactionForSelectedAccount');
  };


  customHomepage.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };
  this.findTransactionForSelectedAccount = function (uuid) {
    console.log("uuid -----> ", uuid)
    this.accountUUID = uuid;
    customHomepage.setSessionStorage("accountUUID", uuid);
    if (blocks_config.free_shipping) {
      customFunction.freeShipping(uuid, blocks_config.free_shipping, "free_shipping")
    }
    if (blocks_config.account_balance) {
      customFunction.accountBalance(uuid, blocks_config.account_balance, "account_balance")
    }
    if (blocks_config["active-order"]) {
      customFunction.activeOrder(customFunction.transactionName, blocks_config["active-order"].table, uuid, "active-order")
    }
    if (blocks_config["submitted_orders"]) {
      customFunction.submitedOrders(customFunction.transactionName, blocks_config["submitted_orders"].table, uuid, "submitted_orders")
    }
  }
}.apply(customHomepage));