this.storeSelector = function (accounts) {
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
  this.setActiveDropdown = function (uuid, name) {
    document.getElementById("selected-account").innerHTML = name
    document.querySelector('li.active-dropdown-item') ? document.querySelector('li.active-dropdown-item').classList.remove("active-dropdown-item") : null;
    document.getElementById(uuid).classList.add("active-dropdown-item");
    this.setSessionStorage("accountUUID", uuid);
  }
}