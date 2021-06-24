/* 
  this.startup - the first and the main function   
*/

var customConfigBody = {};
(function () {
  this.context;
  this.accountUUID;
  this.catalogs = [];
  this.accounts = [];
  // Url Update dynamic from storage () Change from git to storage links
  // this.jsonFilePath = ""; // https://pepperihomepage.github.io/Public/Beauty/config_body.js
  // this.jsonModuleChatFilePath = "https://storage.pepperi.com/PreSales/beauty_demo/chat.js"; //?!
  // this.promotionsJsonPath = ""; // https://pepperihomepage.github.io/Public/promotions/body_promotions.js
  // this.brandscssPath = ""; // https://pepperihomepage.github.io/Public/brands/body_brands.css
  // this.brandsJsonPath = ""; // https://pepperihomepage.github.io/Public/brands/body_brands.js
  // this.carousalJsonPath = ""; // https://pepperihomepage.github.io/Public/carousal/body_carousel.js
  // this.carousalcssPath = ""; // https://pepperihomepage.github.io/Public/carousal/body_carousal.css
  // this.freeShippingJsonPath = ""; // https://pepperihomepage.github.io/Public/sidebar/free-shipping/body_sidebar_free_shipping.js
  // this.freeShippingCssPath = ""; // https://pepperihomepage.github.io/Public/sidebar/free-shipping/body_sidebar_free_shipping.css
  // this.accountBalanceJsonPath = ""; // https://pepperihomepage.github.io/Public/sidebar/account-balance/body_sidebar-account_balance.js
  // this.accountBalanceCssPath = ""; // https://pepperihomepage.github.io/Public/sidebar/account-balance/body_sidebar-account_balance.css
  // this.activeOrderJsonPath = ""; // https://pepperihomepage.github.io/Public/sidebar/active-order/body_sidebar_active-order.js
  // this.activeOrderCssPath = ""; // https://pepperihomepage.github.io/Public/sidebar/active-order/body_sidebar-active-order.css
  // this.submitedOrderJsonPath = ""; // https://pepperihomepage.github.io/Public/sidebar/submitted-orders/body_sidebar-submitted-orders.js
  // this.submitedOrderCssPath = ""; // https://pepperihomepage.github.io/Public/sidebar/submitted-orders/body_sidebar-submitted-orders.css
  // this.accountDropdownJsonPath = ""; // https://pepperihomepage.github.io/Public/sidebar/account-dropdown/body_sidebar_store-selector.js
  // this.accountDropdownCssPath = ""; // https://pepperihomepage.github.io/Public/sidebar/account-dropdown/body_sidebar_store-selector.css
  // this.navigationJsonPath = ""; // https://pepperihomepage.github.io/Public/navigation/body_navigation.js
  // this.jsListenersJsonPath = ""; // https://pepperihomepage.github.io/Public/jsListeners/jsListeners.js
  // this.helperJsonPath = ""; // https://pepperihomepage.github.io/Public/helper/body_helper.js
  // this.customHelperJsonPath = ""; // https://pepperihomepage.github.io/Public/helper/customFunction.js
  // this.isMultiAccount = true;

  this.transactionFields = [];
  this.transactionsHistoryFields = [];

  this.startup = async function (parentContext, storage) {
    await customConfigBody.appendConfigFiles(storage);
    await customConfigBody.buildHtml();
    await customFunction.buildSidebar("sidebar");
    await customFunction.buildSidebarSmall("sidebar-sm");
    await customFunction.buildBaseList("baselist");
    await customFunction.buildItemList("item_list");
    await customFunction.buildLists("lists");
    await customFunction.buildAccountInfo("account_info");
    await customConfigBody.onPluginLoad(parentContext);
    await customConfigBody.getAccountInternalID();
  };

  this.buildHtml = function () {
    var str = `            
            <main class="wrapper">
            <section id="carousal-content">
            </section>
            <aside id="sidebar">

            </aside>
          
            <div id="categories">
              <div id="brands">
          
              </div>
              <div id="promotions">
                
              </div>
            </div>
          </main>
    `;
    document.getElementById('custom_body_id').innerHTML = str;
  };

  this.onPluginLoad = function (context) {
    console.log("onPluginLoad body");
    this.context = context;
    var data = JSON.parse(context.pluginData);
    if (data && this.isMultiAccount) {
      this.accountUUID = this.getSessionStorage("accountUUID") || "";
    } else if (data) {
      this.accountUUID = data.accountUUID;
      customFunction.setSessionStorage("accountUUID", data.accountUUID);
    }
    customFunction.getCatalogs("customConfigBody");
  };

  // TODO: start

  //end
  this.buildHTML = function () {
    //try to remove ifelse, settimeout also remove

    customFunction.closeAllMenusListener();
    customFunction.carousel("carousal-content", customHomepage.configFile.CaruselData);
    customFunction.drawImagesBlocks("brands", customHomepage.configFile.Categories);
    // customFunction.drawPromotions("promotions", Promotions);
    // customFunction.getAccounts(
    //   "customConfigBody.findTransactionForSelectedAccount"
    // );
  };

  customConfigBody.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };
  // this.findTransactionForSelectedAccount = function (uuid) {
  //   console.log("uuid -----> ", uuid);
  //   this.accountUUID = uuid;
  //   customFunction.setSessionStorage("accountUUID", uuid);

  //   // switch(customHomepage.configFile.Sidebar) {
  //   //   case ""
  //   // }
  //   if (blocks_config.free_shipping) {
  //     customFunction.freeShipping(
  //       uuid,
  //       blocks_config.free_shipping,
  //       "free_shipping"
  //     );
  //   }
  //   if (blocks_config.account_balance) {
  //     customFunction.accountBalance(
  //       uuid,
  //       blocks_config.account_balance,
  //       "account_balance"
  //     );
  //   }
  //   if (blocks_config["active-order"]) {
  //     customFunction.activeOrder(
  //       customFunction.transactionName,
  //       blocks_config["active-order"].table,
  //       uuid,
  //       "active-order"
  //     );
  //   }
  //   if (blocks_config["submitted_orders"]) {
  //     customFunction.submitedOrders(
  //       customFunction.transactionName,
  //       blocks_config["submitted_orders"].table,
  //       uuid,
  //       "submitted_orders"
  //     );
  //   }
  // };

  customConfigBody.getAccountInternalID = function () {
    var bridgeObject = {
      fields: ["Name", "InternalID", "ExternalID", "UUID"],
        filter:{
            ApiName:"UUID",
            Operation:"IsEqual",
            Values:[customConfigBody.accountUUID]
        },
      responseCallback: "customConfigBody.setAccountInternalID",
    };
    pepperi.api.accounts.search(bridgeObject);
  };

  customConfigBody.setAccountInternalID = function (data) {
    console.log(data);
    if (!data.success) return;
    var balance = null;
    var credit = null;
    if (data.objects.length) {
      balance = data.objects[0].TSABalance || null;
      credit = data.objects[0].TSACreditLimit || null;
    }

    if (balance == null || balance == NaN || balance == undefined) {
      document.getElementById("balance").innerHTML = "$" + 0.0;
    } else {
      document.getElementById("balance").innerHTML = "$" + balance;
    }

    if (credit == null || credit == NaN || credit == undefined) {
      document.getElementById("credit").innerHTML = "$" + 0.0;
    } else {
      document.getElementById("credit").innerHTML = "$" + credit;
    }
  };

  customConfigBody.appendConfigFiles = async function (storage) {
    debugger;
    return await new Promise((resolve) => {
      var uploadedFiles = 0;
      var filePaths = customHomepage.appendFilePaths;

      var filteredStorage = storage.filter(({Title}) => {
        var splittedTitle = Title.split("/");
        Title = splittedTitle[splittedTitle.length - 1]
        return filePaths.includes(Title)
      })

      filteredStorage.forEach(el => {
        var file = '';
        if (el["URL"].includes('.js')) {
          file = document.createElement("script");
          file.src = el["URL"];
        } else if (el["URL"].includes('.css')) {
          file = document.createElement("link");
          file.rel = "stylesheet";
          file.type = "text/css"
          file.href = el["URL"];
        }
        document.getElementsByTagName("head")[0].appendChild(file);

        file.onload = function () {
          uploadedFiles++;
          if (uploadedFiles == filePaths.length) {
            resolve(uploadedFiles)
          }
        };
      })

    })

    // Add chat
    // file = document.createElement("script");
    // file.src = customConfigBody.jsonModuleChatFilePath;
    // document.getElementsByTagName("head")[0].appendChild(file);
  };
}.apply(customConfigBody));
