customHomepage.buildAccountsDropDown = function (thisAccounts) {
  let ddElement = document.getElementById("select-menu");
  let html = "";
  accounts = thisAccounts
  accounts.forEach((element) => {
    if ((customHomepage.getSessionStorage("accountUUID") && customHomepage.getSessionStorage("accountUUID") != '' && element.UUID == customHomepage.getSessionStorage("accountUUID"))) {
      html += `
                  <li class="active-dropdown-item" onclick="customHomepage.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); customHomepage.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>`;
      document.getElementById("selected-account").innerHTML = element.Name + `(${element.ExternalID})`
      customHomepage.setSessionStorage("accountUUID", element.UUID);
    } else
      html += `
          <li onclick="customHomepage.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); customHomepage.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>`;
  });
  ddElement.innerHTML = html;
  if (thisAccounts.length == 1) {
    document.getElementById("store-selector-hr").style.display = "none"
    document.getElementById("store-selector").style.display = "none"
  } else {
    document.getElementById("store-selector-hr").style.display = "flex"
    document.getElementById("store-selector").style.display = "flex"
  }
  if (!customHomepage.getSessionStorage("accountUUID") || customHomepage.getSessionStorage("accountUUID") == '')
    customHomepage.setActiveDropdown(customHomepage.accounts[0].UUID, customHomepage.accounts[0].Name)
  customHomepage.findTransactionForSelectedAccount(customHomepage.getSessionStorage("accountUUID"));
  document.getElementById("store-selector-hr").classList.add("sidebar-gap");
};
customHomepage.getAccounts = function (fields) {
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
customHomepage.setAccountDD = function (data) {
  console.log("accounts", data)
  if (!data.success || data.count == 0) return;
  customHomepage.accounts = data.objects;
  customHomepage.buildAccountsDropDown(customHomepage.accounts);
};

customHomepage.setActiveDropdown = function (uuid, name) {
  document.getElementById("selected-account").innerHTML = name
  document.querySelector('li.active-dropdown-item') ? document.querySelector('li.active-dropdown-item').classList.remove("active-dropdown-item") : null;
  document.getElementById(uuid).classList.add("active-dropdown-item");
  customHomepage.setSessionStorage("accountUUID", uuid);
}
customHomepage.findTransactionForSelectedAccount = function (uuid) {

  this.accountUUID = uuid;
  customHomepage.setSessionStorage("accountUUID", uuid);
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
  customHomepage.activeOrder(customHomepage.transactionName, customHomepage.transactionFields, uuid)
  customHomepage.submitedOrders(customHomepage.transactionName, customHomepage.transactionFields, uuid)
}