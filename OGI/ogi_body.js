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
  this.jsonFilePath = 'https://pepperihomepage.github.io/Public/OGI/config_body.js'
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
  this.jsListenersJsonPath = 'https://pepperihomepage.github.io/Public/jsListeners/jsListeners.js'
  this.helperJsonPath = 'https://pepperihomepage.github.io/Public/helper/body_helper.js'
  this.customHelperJsonPath = 'https://pepperihomepage.github.io/Public/helper/customFunction.js'
  this.isMultiAccount = true
  this.cssFilePath = "";
  this.transactionFields = []
  this.transactionsHistoryFields = []

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

    console.log("initPlugin body", options)
    return options;
  };

  this.setHtml = function () {
    var str = `
            <style>
              .brand{
                height: 256px !important;
                width: 256px !important;
                background-size: contain !important;
              }
              #brands{
                grid-template-columns: repeat(3, 1fr) !important;
              }

              #dealer_level{
                background: rgb(26, 26, 26);
                border-radius: 4px;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                height: 121px;
                width: 256px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
              }

              #dealer_level hr{
                background: rgb(153, 153, 153);
                border-radius: 0px;
              }
              .dealerLevelText{
                color: rgb(255, 255, 255);
                font-size: 16px;
                font-weight: 600;
                letter-spacing: 0.15px;
                line-height: 24px;
              }
              
              .levelUp{
                color: rgb(255, 255, 255);
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0.12px;
                line-height: 20px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 112px;
              }

              .level{
                color: rgb(255, 255, 255);
                font-size: 40px;
                font-weight: bold;
                letter-spacing: 1.67px;
                line-height: 48px;
                text-align: center;
              }
              .levelInfo{
                display: flex;
                align-items: center;
                justify-content: space-around;
              }
              .termsCondition{
                color: rgba(26, 26, 26, 0.7);
                font-size: 12px;
                font-weight: normal;
                height: 16px;
                letter-spacing: 0.11px;
                line-height: 16px;
                text-align: center;
                padding: 7px 0 16px 0;
              }
            </style>            
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
                 
                <div id="dealer_level">
                </div>

                <span class="termsCondition">See program’s <span>Terms & conditions here</span></span>

                <hr>
          
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
          <footer>
          <div>
          <div>
              
          </div>
          <div>
      
          </div>
      </div>
      <table>
          <tr>
              <th>Title</th>
              <th>Title</th>
              <th>Title</th>
              <th>Title</th>
              <th>Title</th>
          </tr>
          <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
          </tr>
          <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
          </tr>
          <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
          </tr>
          <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
          </tr>
          <tr>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
              <td>Item</td>
          </tr>
      </table>
          </footer>
    `;
    return str;
  };

  this.onPluginLoad = function (context) {
    console.log("onPluginLoad body")
    this.context = context;
    var data = JSON.parse(context.pluginData);
    if (data && this.isMultiAccount) {
      this.accountUUID = this.getSessionStorage("accountUUID") || "";
    } else if (data) {
      this.accountUUID = data.accountUUID
      customFunction.setSessionStorage("accountUUID",  data.accountUUID)
    }
    customFunction.getCatalogs('customHomepage');
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

  customHomepage.getDealerlevel = function (uuid) {

    pepperi.api.accounts.get({
      key: {
        UUID: uuid
      },
      fields: ["Prop2", "TSAFramesNextLevel"],
      responseCallback: "customHomepage.buildDealerlevel"
    });

  }

  customHomepage.buildDealerlevel = function (data) {
    console.log("Dealerlevel", data);

    var dealerLevel = document.getElementById("dealer_level");
    let html = '';

    html = `<div class="levelInfo">
          <span class="dealerLevelText">Dealer Level</span><span class="dealerLevelText">${data.object.Prop2}</span>
      </div>
      <hr>
      <div class="levelInfo">
          <span class='levelUp'>Frames needed to Level Up</span><span class="level">${data.object.TSAFramesNextLevel}</span>
      </div>`
      dealerLevel.innerHTML = html
  }



  this.findTransactionForSelectedAccount = function (uuid) {   
    console.log("uuid -----> ", uuid)
    this.accountUUID = uuid;
    customFunction.setSessionStorage("accountUUID", uuid);
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
    customHomepage.getDealerlevel(uuid)
  }
}.apply(customHomepage));