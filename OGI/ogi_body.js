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
                height: 256px;
                width: 256px;
                background-size: contain !important;
              }
              #brands{
                grid-template-columns: repeat(3, 1fr) !important;
                height: fit-content;
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

              .promotion{
                height: 7.5rem !important
              }

              .wrapper{
                height: fit-content !important;
              }

              th, td{
                text-align: center;
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
              .accountPhoto{
                background: rgb(255, 255, 255);
                border-radius: 4px;
                box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 
                0px 4px 8px 0px rgba(0, 0, 0, 0.04);
                height: 271px;
                width: 256px;
              }
              .accountPhoto img{
                width: 100%;
                height: 100%;
              }
              .footerLinksBlocks{
                display:flex;
                justify-content:space-around;
                flex-wrap:wrap;
              }
              footer{
                min-height: 500px;
                padding-left: 2rem;
                padding-right: 2rem;
                max-width: 1964px;
              }

              .footerLinksBlock{
                display: flex;
                flex-direction:column;
                max-width: 185px;
                width: 100%;
                margin-bottom:64px
              }

              .footerLinksBlock a{
                color: rgb(23, 102, 166);
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0.12px;
                line-height: 20px;
                padding:6px 0;
              }

              .footerLinksBlock h3{
                color: rgba(26, 26, 26, 0.7);
                font-size: 18px;
                font-weight: 900;
                letter-spacing: 0.28px;
                line-height: 24px;
                width: 192px;
                padding-bottom: 16px;
                padding-top: 24px;
              }

              .paddingTop16px{
                padding-top:16px !important;
              }
              .pepperiText{
                color: rgba(26, 26, 26, 0.7);
                font-size: 14px;
                font-weight: normal;
                text-align: right;
                letter-spacing: 0.12px;
                line-height: 20px;
              }

              .links{
                color: rgb(23, 102, 166);
                font-size: 14px;
                font-weight: normal;
                text-align: right;
                letter-spacing: 0.12px;
                line-height: 20px;
              }

              .lastBlockInFooter{
                padding-top: 16px;
                display:flex;
                justify-content: space-between;
                flex-wrap: wrap;
              }

              .footerLink{
                color: rgba(26, 26, 26, 0.7);
                font-size: 16px;
                font-weight: normal;
                letter-spacing: 0.15px;
                line-height: 24px;
              }

              .response-menu{
                background-color: black !important;
              }

              @media screen and (max-width:1300px) {
                .brand{
                  height: 224px;
                  width: 224px;
                }
              }

              @media screen and (max-width:1100px) {
                .brand{
                  width: 160px;
                  height: 160px;
                }
                #brands{
                  display: flex !important;
                  flex-wrap:wrap;
                }
              }
              .socialMedia{
                display: flex;
                justify-content: space-between;
                flex-wrap:wrap
              }

              .socialMedia a {
                width: 24px;
                height: 24px;
              }

              .socialMedia a img{
                width:24px;
                height: 24px;
              }
              #sidebar{
                display: flex;
                justify-content: flex-end;
              }
              .sidebar-menu{
                width: 304px
              }
              #btn{
                color: rgb(255, 255, 255);
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                letter-spacing: 0.16px;
                line-height: 28px;
                background: rgb(0, 0, 0);
                border-radius: 0px;
              }

              #user_info{
                display:flex;
                flex-direction:column;
              }
              .userEmailAndPhone{
                display:flex;
                align-items: center;
              }
              .userEmailAndPhone img{
                padding-right: 12px
              }
              .title-4-lg{
                font-size:1.5rem
              }
              @media screen and (max-width: 600px){
                .indicators{
                  height: 2rem;
                }
                .radio-dot{
                  height: 1rem;
                  width: 1rem;
                }
                .slide-controllers button{
                  height: 2rem;
                }
                .radio-box{
                  margin-top:4px
                }
                .footerLinksBlock{
                  max-width: 150px;
                }
                .brand{
                  width: 135px;
                  height: 135px;
                }
              }
            </style>            
            <main class="wrapper">
            <section id="carousal-content">
            </section>
            <aside id="sidebar">
              <div id="response-menu" class="response-menu">
                <button onclick="customFunction.openCloseMenu();" class="regular-button" id="btn">View Sidebar</button>
              </div>
          
              <div id="sidebar-sm" class="sidebar-menu">
                <div id="store-selector" style="display:none">                  
                </div>
          
                <!--<hr>-->
                 
                <div id="dealer_level" class="sidebar-gap">
                </div>
                <hr>
          
                <hr id ="store-selector-hr" style="display:none">
          
                <div id="active-order" style="display:none">
                  
                </div>
          
                <div id="submitted_orders" style="display:none"></div>

                <div id="user_info"></div>
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
          <hr>
          <div class="footerLinksBlocks">
            <div class="footerLinksBlock">
              <h3>OGI EYEWEAR</h3>
              <hr>
              <a class="paddingTop16px" href="https://www.ogieyewear.com/our-story" target="_blank">Our Story</a>
              <a href="https://brandfolder.com/s/77xf3gtqwhh4fh9xbj47f" target="_blank">General Terms and Conditions</a>
              <a href="https://www.ogieyewear.com/news" target="_blank">News</a>
              <a href="https://www.ogieyewear.com/ogi-in-press" target="_blank">OGI in Press</a>
              <a href="https://www.ogieyewear.com/sustainability" target="_blank">Sustainability</a>
              <a href="https://www.ogieyewear.com/privacy-policy" target="_blank">Privacy</a>
            </div>
            <div class="footerLinksBlock">
              <h3>BRAND FOLDER</h3>
              <hr>
              <a class="paddingTop16px" href="https://brandfolder.com/s/fhkj88mvt7j3nztghm54k4s7" target="_blank">OGI creative assets</a>
              <a href="https://brandfolder.com/s/w4mx7vckxn7psjxc8tb7wbcr" target="_blank">Seraphin creative assets</a>
              <a href="https://brandfolder.com/s/2tfzs9rb29pf7g6f8r5sxn6" target="_blank">Seraphin Shimmer creative assets</a>
              <a href="https://brandfolder.com/s/ncnck6xkjxcrg3mk4nn2w4h" target="_blank">Red Rose creative assets</a>
              <a href="https://brandfolder.com/s/8khfg5jh3ps5sknx5nxsvp" target="_blank">OGI Kids creative assets</a>
              <a href="https://brandfolder.com/s/hgx5q88854tcbvq88t4bms" target="_blank">SCOJO New York creative assets</a>
            </div>
            <div class="footerLinksBlock">
              <h3>SOCIAL MEDIA</h3>
              <hr>
              <a class="paddingTop16px" href="https://www.linkedin.com/company/ogi-eyewear" target="_blank">LinkedIn</a>
              <a href="https://www.facebook.com/ogiframes" target="_blank">Facebook</a>
              <a href="https://twitter.com/OgiEyewear" target="_blank">Twitter</a>
              <a href="https://www.instagram.com/ogieyewear/" target="_blank">Instagram</a>
              <a href="https://www.pinterest.com/ogieyewear/" target="_blank">Pinterest</a>
              <a href="https://www.youtube.com/channel/UCazQOXpZYsn_i3VTHpuLWwg" target="_blank">Youtube</a>
            </div>
            <div class="footerLinksBlock"s>
              <h3>CONTACT US</h3>
              <hr>
              <a class="paddingTop16px" href="https://www.ogieyewear.com/ogi-sales-team" target="_blank">Sales Team</a>
              <a href="https://www.ogieyewear.com/ogi-customer-relations" target="_blank">Customer Relations</a>
              <a href="https://www.ogieyewear.com/shipping-returns" target="_blank">Shipping & Returns</a>
              <a href="https://www.ogieyewear.com/ogi-creative-team" target="_blank">Creative Team</a>
              <a href="https://www.ogieyewear.com/ogi-administration" target="_blank">Administration</a>
              <a href="https://www.ogieyewear.com/ogi-ceo" target="_blank">CEO</a>
            </div>
          </div>
        <hr>
        <div class="lastBlockInFooter">
            <div>
              <span class="pepperiText">© Pepperi 2021</span>
              <span class="links"><a href="https://www.pepperi.com/privacy-policy/">Privacy Policy</a></span>
              <span class="links"><a href="https://www.pepperi.com/cookie-policy/">Cookie Policy</a></span>
            </div>
        </div>
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
      customFunction.setSessionStorage("accountUUID", data.accountUUID)
    }
    customFunction.getCatalogs('customHomepage');
  };

  // TODO: start

  //end  
  this.buildHTML = function () {
    //try to remove ifelse, settimeout also remove
    $("#logo2").attr("src", logo);

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
      customHomepage.activeOrder(customFunction.transactionName, blocks_config["active-order"].table, uuid, "active-order")
    }
    if (blocks_config["submitted_orders"]) {
      customHomepage.submitedOrders(customFunction.transactionName, blocks_config["submitted_orders"].table, uuid, "submitted_orders")
    }
    customHomepage.getDealerlevel(uuid)

    customHomepage.getUserInfo(uuid)
  }

  customHomepage.activeOrder = function (transactionName, fields, accountUUID, id) {
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
                Values: ["2"],
              },
            },
          },
        },
      },
      sorting: [{
        Field: "ActionDateTime",
        Ascending: false
      }],
      pageSize: 3,
      page: 1,
      responseCallback: "customHomepage.getRecentTransactionForAccountCallback",
      requestID: id
    });
  }

  this.getRecentTransactionForAccountCallback = function (data) {
    this.transactionFields = blocks_config["active-order"].table
    console.log("data", data)
    console.log("blocks_config", JSON.stringify(blocks_config))
    let recentOrdBtnDeeplink = ''
    if (data && data.objects && data.objects.length) {
      let uuid = data.objects[0].UUID ? data.objects[0].UUID : "00000000";
      customFunction.setSessionStorage("LastOpenTransactionUUID", uuid);
      recentOrdBtnDeeplink = 'Transactions/Cart/' + data.objects[0].UUID;
      this.buildOpenOrdersTable(data.objects, data.requestID);
    } else {
      customFunction.setSessionStorage("LastOpenTransactionUUID", '');
      recentOrdBtnDeeplink = '/Transactions/scope_items/{{UUID}}';
      let html = `<h3 class="title-2-sm" id="currTransactionName"></h3>
    <ul class="leaders" id="currTransactionFields">`;
      this.transactionFields.forEach(el => {
        html += `
      <li>
        <span  class="dimmed">${el.text}</span>
        <span class="bold">0</span>
      </li>`
      })

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
    let html = `<div style="display: flex; align-items: center; justify-content: space-between;">
                  <h3 class="title-2-sm" id="currTransactionName" style="margin-bottom:0"></h3> 
                  <span class="bold"><a onClick="customFunction.navigation('list/all_activities')">See All</a></span>
                </div>`;
    data.forEach(element => {
      let deepLink = "/transactions/cart/" + element.UUID;

      html += `<ul class="leaders">
                <li>
                  <span  class="dimmed">Order ID</span>
                  <span class="bold"><a onClick="customFunction.navigation('${deepLink}')">${element.InternalID}</a></span>
                </li>
                <li>
                  <span  class="dimmed">Total</span><span class="bold">${element.GrandTotal}$</span>
                </li>
                <li>
                  <span  class="dimmed">Frames</span><span class="bold">${element.QuantitiesTotal}</span>
                </li>
              </ul>`
    })
    document.getElementById(id).style.display = "flex"
    document.getElementById(id).style.flexDirection = "column"
    document.getElementById(id).classList.add("sidebar-box");
    document.getElementById(id).classList.add("sidebar-gap");
    document.getElementById(id).innerHTML = html
    document.getElementById("currTransactionName").innerHTML = "Open Orders"
  };



  customHomepage.submitedOrders = function (transactionName, fields, accountUUID, id) {
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
              ApiName: "Hidden",
              Operation: "IsEqual",
              Values: ['false'],
            },
          },
        },
      },
      sorting: [{
        Field: "ActionDateTime",
        Ascending: false
      }],
      pageSize: 4,
      page: 1,
      responseCallback: "customHomepage.getRecentSubmittedTransactionForAccountCallback",
      requestID: id
    });
  };
  this.getRecentSubmittedTransactionForAccountCallback = function (data) {
    console.log("transaction data ------> ", data);
    if (data && data.objects && data.objects.length) {
      customHomepage.buildSubmittedOrdersTable(data.objects, data.requestID);
    } else {
      document.getElementById(data.requestID).style.display = "flex"
      document.getElementById(data.requestID).innerHTML = `<h3 class="title-2-sm " id="submitted_orders_name">Submitted Orders</h3>
      <hr>
      <ul id="open-orders" class="leaders"><li>No submitted orders for this account</li></ul>
        `;
    }
  };
  this.buildSubmittedOrdersTable = function (data, id) {
    let tableHtml = "";
    let Container = document.getElementById(id);
    tableHtml += `
    <h3 class="title-2-sm " id="submitted_orders_name">${blocks_config['submitted_orders'].name}</h3>
    <hr>
    <ul id="open-orders" class="leaders">`
    data.forEach((element) => {
      let dateValue = new Date(element.ActionDateTime).toLocaleDateString();
      let deepLink = "/transactions/cart/" + element.UUID;
      tableHtml += `
                    <li>
                    <span  class="dimmed">${dateValue}</span>
                    <span class="bold"><a onClick="customFunction.navigation('${deepLink}')">${element.InternalID}</a></span>
                  </li>
                      
            `;
    });
    tableHtml += `</ul>`
    document.getElementById(id).classList.add("sidebar-box");
    document.getElementById(id).style.display = "flex"
    Container.innerHTML = tableHtml;

  };

  customHomepage.getUserInfo = function (uuid) {
    pepperi.api.accounts.get({
      key: {
        UUID: uuid
      },
      fields: ["TSAMainRepName", "TSARepEmail", "TSAMainRepMobile"],
      responseCallback: "customHomepage.buildUserInfo"
    });

  }

  customHomepage.buildUserInfo = function (data) {
    console.log(data);
    var imgName = data.object.TSAMainRepName.replaceAll(" ","-")
    imgName = imgName.toLowerCase()
    console.log(imgName)
    let hrefMobilePhone = data.object.TSAMainRepMobile.replaceAll("-","")
    var html = '';
    html = `<h3 class="title-2-sm">${data.object.TSAMainRepName}</h3>
              <hr>
              <span class="bold userEmailAndPhone"><img src="https://pepperihomepage.github.io/Public/OGI/img/Icon-phone.svg" alt=""><a href="tel:+${hrefMobilePhone}">${data.object.TSAMainRepMobile}</a></span>
              <span class="bold userEmailAndPhone"><img src="https://pepperihomepage.github.io/Public/OGI/img/Icon-email.svg" alt=""><a href="mailto:${data.object.TSARepEmail}">${data.object.TSARepEmail}</a></span>
              <div class="accountPhoto">
                  <img src="https://pepperihomepage.github.io/Public/OGI/img/${imgName}.jpg" alt="">
              </div>
            `
    document.getElementById("user_info").innerHTML = html

  }

  customHomepage.buildUserInfo2 = function (data) {
    console.log(data);
  }



}.apply(customHomepage));