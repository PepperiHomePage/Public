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
  this.isMultiAccount = true;

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

  // From another homepage

  // this.buildSidebarSmall = function (slideid) {
  //   var sidebarSmallHTML = "";

  //   sidebarSmallHTML += `<div id="baselist" class="baselist" style="display: none;"></div>
  //                     <hr>
  //                     <div id="account_info" style="display: none;"></div>`;

  //   document.getElementById(slideid).innerHTML = sidebarSmallHTML;
  // };

  // this.buildBaseList = function (slideid) {
  //   var baseListHTML = "";

  //   baseListHTML += `<div class="top-base">
  //                       <p>Quick Order Links</p>   
  //                     </div>
  //                     <hr>
  //                     <div id="food_list" style="display: none"></div>
  //                     <button class="order-button" id="transactionTotal" onclick="customHomepage.NavigateToActiveCart()">Go to Order</button>`;

  //   document.getElementById(slideid).innerHTML = baseListHTML;
  //   document.getElementById(slideid).style.display = "flex";
  // };

  // this.buildFoodList = function (slideid) {
  //   var foodListHTML = "";

  //   foodListHTML += `<div id="lists" style="display: none;"></div>`;

  //   document.getElementById(slideid).innerHTML = foodListHTML;
  //   document.getElementById(slideid).style.display = "block";
  // };

  // this.buildLists = function (slideid) {
  //   var listsHTML = "";

  //   for (const [index, item] of list.entries()) {
  //     listsHTML += `
  //           <div class="option">
  //           <p id="list">${item.listLabel}</p>
  //           <button id="add" onclick="customHomepage.setUUIDandNav('${item.deepLink}')"></button>
  //       </div>`;
  //   }
  //   document.getElementById(slideid).innerHTML = listsHTML;
  //   document.getElementById(slideid).style.display = "block";
  // };


  // this.buildAccountInfo = function (slideid) {
  //   var accountInfoHTML = "";

  //   accountInfoHTML += this.buildCredit();
  //   accountInfoHTML += this.buildBalance();

  //   document.getElementById(slideid).innerHTML = accountInfoHTML;
  //   document.getElementById(slideid).style.display = "block";
  // };

  // this.buildCredit = function () {
  //   var creditHTML = "";

  //   creditHTML += `<div class="credit">
  //                     <div>
  //                       <p>Credit</p>
  //                       <p id="credit"></p>
  //                     </div>
  //                     <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABQCAMAAADRPICnAAACN1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9pu+VyAAAAvXRSTlMAAQIDBAUGBwgJCgsMDg8QERIUFRYXGBobHB0eHyAhIyQnKCkqKywtLi8wMTU2Nzg5Ojs8PT4/REVGR0hJSktMTU5PUlNUVVZXWFlaXF9gYWJjZGVmZ2hpamttbm9wcXJzdHV6e3x9foCBgoOFhoeIiYqLjI2Oj5CRkpaYmZqbnJ2hoqOkpaanqKmqq6yusLGys7S2t7i5u76/wMHCw8XGx8jLzM3Oz9DR0tPU1tfY2drb3N3e3+Dh4uPk5ebl3HCbAAAAAWJLR0QB/wIt3gAABJ5JREFUWMPtWetfE0cUTYJBiCKpSBUFMVpLQw2oQQiggq+IT8D3A2hUwCAoEJ8YReOTxEcEpUV8QCukSlUI1hL0/nGdbF47mdnN7iT+fn7gfNrN3D03ezJzz9yJQjGDGXxHSP5x9reiVmaX1dlf+MB3a3nCubVra2y9Xghh0pA46tl55ub7HojCX8mJUCSnvP7aSx+f98vQjRMV+mZ0VRanIsZaW58X+85jrpad+ZrA8BBAEyu1WldpcQxj1FODXUdN2fwgO8AdBu5M09Gu/imM2+NoNOuSiMg6gBFZ1GmG3a1uXJEP7s59hjkC8SYUoE2gIgQWo7BCSYoMTktRhJxf4wDVonNk/4Wnkxj1O6d1hz5VsqZPADoEB/MffeFTf3p28UDRfBnlAi0OVC7giVBEcXieTL/utmxcqpJVLiKLY1xJj9Jwq/6t01qlT5FRLraT5WIxPXYTGqrPiKdchGCiP2EBGGIuFxiO0x87DDDKpAiBq/SHS8QXIVcu/gMpeE5nWISGVkssF+Lw0S1B+ZFYhJRyIQkr6K/gBugUK6DSsYWeoB2gl0UREo30BHsBvKd7/ob4cZuewACJgoDnpH2Nl/iDu3W3wV8R0ukZ3rBTT/R37SvKCHtOAT3BbRZq37DDUqlT4Z6zl56gkUURsvL2ArTTE2yRTD3uV0TIizoB3PSRFSyKkKhGPwndc9TiK9fjpCpCYDWKzaIPDbAoQiBd2HOusihCYhTgGH3kGIsiJO4Keo4pQP3xcfuegjQG5vSAYTUBDNADshD7+ZIslvbsZ3PTvVGYqvDfbEO7TLVUz5HcngVw0//RSomeE1uRNag9m8C2x+u51/HF8pyYmIUUidpdfP798uHi4KZhEOCU3EWI/1YjeHt282RlbhLe59yiP1mI4pfETlAd4v7HdWbXrxpan/NGwHPQQ6WRW1Vph6undRURlvMe/u2/dHDdAuzTVP0OaxvXn5QimjRBz6kL3yz7I/A9HYRBzVmENSNJSzdaul9ze/+H/vslop5jD13nvg9v1eYKqjW/6MDFZ58iP4iLm7oTYp4zGNKnP/KYjRKKFGlxvcNm0uTTtoUhzzlHT7A1svEr4de8zOi9fvcQ1g1Nv7r+2/ocFc9zHtMT/ISCVwYuz/IJtpNh4aLYc7rql6hznBpU0OjTPRl5zrbA5R1+ggY8LI/70Nt3vtb4g3zPCR42dPMTHIkKq7pSX56jZPScu4GrBn6CYoVszzlEHzke7nNyea34qFpmgj9RvyfsOcF11RZJsFkefQbq92CD8GFDsM9RO4L0XxskU6foq6zOt9xLp8Q+bEg6OOYPHTBJoVZx5SIs62ejpMOGWavMm3QxuaPLBargD/IEoztEDhto5cLqjC4XF/YbtUwbvwSd+RQKHzYEMc/fxE2S+2yNtLeeh3tOVFtrbnR4yFOwTFmTeITvOSKKTA/7FZG5qwwWObsURVIVjGgKn7po8ne2uMYwam+frdaoVcSFcsTTnF9x4gZuKb6X10QLqIwzb6LZ9NxvNucl8K+Bgojg3l5bzVqtItHQOabA98JeV5atVHwjqBckK2Ywg+8H/wN6KKgIpbeWyAAAAABJRU5ErkJggg==">
  //                   </div>`;

  //   return creditHTML;
  // };

  // this.buildBalance = function () {
  //   var balanceHTML = "";

  //   balanceHTML += `<div class="balance balance-link" onclick="customHomepage.getAgingReport()">
  //                     <div>
  //                       <p>Balance</p>
  //                       <p id="balance"></p>
  //                     </div>
  //                     <img src="https://storage.pepperi.com/PreSales/NewFoodDemoImg/balance.svg">
  //                   </div>`;

  //   return balanceHTML;
  // };
  //

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
    customConfigBody.accountInternalID = data.objects[0].InternalID || null;
    customConfigBody.accountExternalID = data.objects[0].ExternalID || null;
    var balance = data.objects[0].TSABalance || null;
    var credit = data.objects[0].TSACreditLimit || null;
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
