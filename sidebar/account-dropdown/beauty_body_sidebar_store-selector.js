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