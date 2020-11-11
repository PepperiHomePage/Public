this.accountBalance = function (accounts) {
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
  this.setSessionStorage = function (paramName, data) {
    sessionStorage.setItem(paramName, data);
  };
  this.getSessionStorage = function (paramName) {
    return sessionStorage.getItem(paramName);
  };
  this.findTransactionForSelectedAccount = function (uuid) {

    this.accountUUID = uuid;
    this.setSessionStorage("accountUUID", uuid);
    let currentAccount = this.accounts.filter((el) => {
      return el.UUID == uuid;
    });
    console.log("blocks_config", blocks_config)
    console.log("currentAccount", currentAccount)
    if (blocks_config.free_shipping) {
      document.getElementById("free_shipping").innerHTML = `
          <div>
          <p>${blocks_config.free_shipping.text}${currentAccount[0][blocks_config.free_shipping.field]}</p>
        </div>` + (blocks_config.free_shipping.svg ? `<img src="${blocks_config.free_shipping.svg}" alt="Promotion truck icon">` : '')
    }
    if (blocks_config.account_balance) {
      document.getElementById("account_balance").innerHTML = `                  
        <div>
        <p class="dimmed">${blocks_config.account_balance.text}</p>
        <p class="title-2-sm "><b id='balance'>${currentAccount[0][blocks_config.account_balance.field]}</b> ${blocks_config.account_balance.measure_unit}</p>
      </div>` + (blocks_config.free_shipping.svg ? `<img src="${blocks_config.account_balance.svg}" alt="Go to Account Balance icon">` : '')
    }

    pepperi.api.transactions.search({
      fields: [
        "UUID",
        "Status",
        "WrntyID",
        ...this.transactionFields.map(el => el.field)
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
                Values: ["1", "1000"],
              },
            },
          },
        },
      },
      sorting: [{
        Field: "ActionDateTime",
        Ascending: false
      }],
      pageSize: 5,
      page: 1,
      responseCallback: "customHomepage.getRecentTransactionForAccountCallback",
    });
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
}