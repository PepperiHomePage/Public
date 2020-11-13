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
  this.cssFilePath = "";
  this.transactionFields = []
  this.transactionsHistoryFields = []
  this.setHtml = function () { 
    var str = `            
            <main class="wrapper">
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
          
                <div class="card dark-card  sidebar-gap" id="free_shipping" style="display:none">
                </div>
          
                <div class="card  sidebar-gap" id="account_balance" style="display:none">
                </div>
          
                <hr id ="store-selector-hr" style="display:none" class="sidebar-gap">
          
                <div id="active-order" class="sidebar-box  sidebar-gap" style="display:none">
                  <h3 class="title-2-sm " id="currTransactionName"></h3>
                  <ul class="leaders" id="currTransactionFields"></ul>
                  <button class="comonBtn" id="orderBtn">
                  Back to Cart</button>
                </div>
          
                <hr class="sidebar-gap">
          
                <div class="sidebar-box" id="submitted_orders" style="display:none">
                  <h3 class="title-2-sm " id="submitted_orders_name">Submitted Orders</h3>
                  <hr>
                  <ul id="open-orders" class="leaders">                    
                  </ul>
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
      JsURLs: [this.jsonFilePath,this.jsonModuleChatFilePath, this.promotionsJsonPath ,this.brandsJsonPath, this.carousalJsonPath , this.freeShippingJsonPath, this.accountBalanceJsonPath],
      cssURLs: [this.cssFilePath, this.carousalcssPath, this.brandscssPath, this.freeShippingCssPath, this.accountBalanceCssPath],
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
  this.getCatalogs = function () {
    pepperi.api.catalogs.search({
      fields: ["UUID", "ExternalID", "Description", "ID"],
      responseCallback: 'customHomepage.getCatalogsCallback'
    });
  }
  this.getCatalogsCallback = function (res) {
    (res && res.objects && res.objects.length) ? this.catalogs = res.objects : false;
    this.buildHTML();
  }
  this.createNewOrder = function (inCatalog = null, in_transactionName = null, deepLink = null, skipSessionSaving) {
    let catalogUUID = !inCatalog ? this.catalogs.find((el) => el.ExternalID === this.catalogName).UUID : this.catalogs.find((el) => el.ExternalID === inCatalog).UUID
    var bridgeObject = {
      references: {
        account: { UUID: this.accountUUID },
        catalog: { UUID: catalogUUID }
      },
      type: { Name: !in_transactionName ? this.transactionName : in_transactionName },
      responseCallback: skipSessionSaving ? "customHomepage.createNewOrderCallback" : "customHomepage.createNewOrderAndNavCallback",
      requestID: deepLink
    };
    pepperi.app.transactions.add(bridgeObject);
  };
  this.createNewActivity = function (in_transactionName, deeplink) {
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
  this.createNewOrderAndNavCallback = function (res) {
    console.log('createNewOrderAndNavCallback res', res);
    if (res && res.success) {
      customHomepage.setSessionStorage('LastOpenTransactionUUID', res.id);
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        customHomepage.navigation(requestID);
      }
    }
  };
  this.createNewOrderCallback = function (res) {
    console.log('createNewOrderCallback res', res);
    if (res && res.success) {
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        customHomepage.navigation(requestID);
      }
    }
  };
  this.createNewActivityCallback = function (res) {
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
  this.getAccounts = function (fields) {
    var bridgeObject = {
      fields: ["Name", "UUID", "ExternalID", ...fields],
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
    };
    pepperi.api.accounts.search(bridgeObject);
  };
  this.setAccountDD = function (data) {
    console.log("accounts", data)
    if (!data.success || data.count == 0) return;
    this.accounts = data.objects;
    this.buildAccountsDropDown();
  };

  this.buildAccountsDropDown = function () {
    let ddElement = document.getElementById("select-menu");
    let html = "";
    accounts = this.accounts
    accounts.forEach((element) => {
      if ((this.getSessionStorage("accountUUID") && this.getSessionStorage("accountUUID") != '' && element.UUID == this.getSessionStorage("accountUUID"))) {
        html += `
                    <li class="active-dropdown-item" onclick="customHomepage.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); customHomepage.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>`;
        document.getElementById("selected-account").innerHTML = element.Name + `(${element.ExternalID})`
        this.setSessionStorage("accountUUID", element.UUID);
      } else
        html += `
            <li onclick="customHomepage.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); customHomepage.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>`;
    });
    ddElement.innerHTML = html;
    if (this.accounts.length == 1) {
      document.getElementById("store-selector-hr").style.display = "none"
      document.getElementById("store-selector").style.display = "none"
    } else {
      document.getElementById("store-selector-hr").style.display = "flex"
      document.getElementById("store-selector").style.display = "flex"
    }
    if (!this.getSessionStorage("accountUUID") || this.getSessionStorage("accountUUID") == '')
      this.setActiveDropdown(this.accounts[0].UUID, this.accounts[0].Name)
    this.findTransactionForSelectedAccount(this.getSessionStorage("accountUUID"));
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
      customHomepage.freeShipping(uuid,blocks_config.free_shipping)
    }
    if (blocks_config.account_balance) {
      customHomepage.accountBalance(uuid,blocks_config.account_balance)
     }
    customHomepage.activeOrder(this.transactionName, this.transactionFields, uuid)
    } 
  this.findSubmittedTransactionForSelectedAccount = function () {
    let uuid = this.accountUUID;
    console.log("blocks_config",JSON.stringify(blocks_config))
    console.log({
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
          Values: [this.transactionName],
        },
        LeftNode: {
          Operation: "AND",
          RightNode: {
            ApiName: "Account.UUID",
            Operation: "IsEqual",
            Values: [uuid],
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
    },)
    pepperi.api.transactions.search({
      fields: [
        "UUID",
        ...this.transactionsHistoryFields
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
            Values: [this.transactionName],
          },
          LeftNode: {
            Operation: "AND",
            RightNode: {
              ApiName: "Account.UUID",
              Operation: "IsEqual",
              Values: [uuid],
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
    });
  };
  this.getRecentSubmittedTransactionForAccountCallback = function (data) {
    if (data && data.objects && data.objects.length) {
      this.buildSubmittedOrdersTable(data.objects);
    } else {
      document.getElementById(
        "open-orders"
      ).innerHTML = `<li>No submitted orders for this account</li>`;
    }
  };
  this.getRecentTransactionForAccountCallback = function (data) {
    console.log("data", data)
    console.log("blocks_config",JSON.stringify(blocks_config))
    let recentOrdBtnDeeplink = ''
    if (data && data.objects && data.objects.length) {
      let uuid = data.objects[0].UUID ? data.objects[0].UUID : "00000000";
      this.setSessionStorage("LastOpenTransactionUUID", uuid);
      recentOrdBtnDeeplink = 'Transactions/Cart/' + data.objects[0].UUID;
      $("#orderBtn").attr("onclick", `customHomepage.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}')`);
      $("#orderBtn").text("Back to Cart")
      this.buildOpenOrdersTable(data.objects);
    } else {
      this.setSessionStorage("LastOpenTransactionUUID", '');
      recentOrdBtnDeeplink = '/Transactions/scope_items/{{UUID}}';
      $("#orderBtn").attr("onclick", `customHomepage.setUUIDandNav(null,null,'${recentOrdBtnDeeplink}')`);
      $("#orderBtn").text("Create New Order");
      let html = '';
      this.transactionFields.forEach(el => {
        html += `<li>
        <span  class="dimmed">${el.text}</span>
        <span class="bold">0</span>
      </li>`
      })
      document.getElementById("currTransactionFields").innerHTML = html
    }
  };
  this.buildOpenOrdersTable = function (data) {
    var is_new = false;
    if (data[0].Status == 1000)
      is_new = true;
    let html = '';
    this.transactionFields.forEach(el => {
      html += `<li>
      <span  class="dimmed">${el.text}</span>
      <span class="bold">${is_new ? 0 : data[0][el.field]}</span>
    </li>`
    })
    document.getElementById("currTransactionFields").innerHTML = html
    console.log('blocks-config:', blocks_config["active-order"])
    document.getElementById("currTransactionName").innerHTML = blocks_config["active-order"].name
    this.findSubmittedTransactionForSelectedAccount()
  };
  this.buildSubmittedOrdersTable = function (data) {
    let tableHtml = "";
    let Container = document.getElementById("open-orders");
    document.getElementById("submitted_orders_name").innerHTML = blocks_config['submitted_orders'].name
    data.forEach((element) => {
      let dateValue = new Date(element[this.transactionsHistoryFields[0]]).toLocaleDateString();
      let deepLink = "/transactions/cart/" + element.UUID;
      tableHtml += `
            <li>
            <span  class="dimmed">${dateValue}</span>
            <span class="bold"><a onClick="customHomepage.navigation('${deepLink}')">${element[this.transactionsHistoryFields[1]]}</a></span>
          </li>            
            `;
    });

    Container.innerHTML = "";
    Container.innerHTML = tableHtml;
  };
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
      customHomepage.carousel("slides",CaruselData)
      customHomepage.drawImagesBlocks("brands",Brands)
      customHomepage.drawPromotions("promotions",Promotions)
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
  this.openStoreSelect = function () {
    document.getElementById('select-menu').classList.toggle('show')
  }
  this.openCloseMenu = function () {
    const over = document.getElementById("overSide");
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
  this.closeAllMenusListener = function () {
    $('#select-menu').attr('tabindex', '-1');
    $('#select-menu').on('focusout', function () {
      $('#select-menu').removeClass('show');
    });
  };
  //carousel
  
}.apply(customHomepage));
