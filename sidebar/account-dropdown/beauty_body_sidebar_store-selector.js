customHomepage.getAccounts = function (callbackName) {
  console.log("callbackName ->>>>", callbackName);
  var bridgeObject = {
    fields: ["Name", "UUID", "ExternalID"],
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
    requestID: callbackName
  };
  pepperi.api.accounts.search(bridgeObject);
};
customHomepage.setAccountDD = function (data) {
  console.log("accounts", data)
  if (!data.success || data.count == 0) return;
  customHomepage.accounts = data.objects;
  console.log("data.requestID --->", data.requestID);
  customHomepage.buildAccountsDropDown(customHomepage.accounts, data.requestID);
};
customHomepage.setActiveDropdown = function (uuid, name) {
  document.getElementById("selected-account").innerHTML = name
  document.querySelector('li.active-dropdown-item') ? document.querySelector('li.active-dropdown-item').classList.remove("active-dropdown-item") : null;
  document.getElementById(uuid).classList.add("active-dropdown-item");
  customHomepage.setSessionStorage("accountUUID", uuid);
}
customHomepage.buildAccountsDropDown = function (thisAccounts, callback) {
  let ddElement = document.getElementById("store-selector");
  let html = "";
  accounts = thisAccounts
  if (thisAccounts.length == 1) {
    document.getElementById("store-selector-hr").style.display = "none"
    document.getElementById("store-selector").style.display = "none"
  } else {
    document.getElementById("store-selector-hr").style.display = "flex"
    document.getElementById("store-selector").style.display = "flex"
    document.getElementById("store-selector").classList.add("sidebar-box")
    document.getElementById("store-selector").classList.add("sidebar-gap")
  }
  var x = element.Name + `(${element.ExternalID})`;
  accounts.forEach((element) => {
    if ((customHomepage.getSessionStorage("accountUUID") && customHomepage.getSessionStorage("accountUUID") != '' && element.UUID == customHomepage.getSessionStorage("accountUUID"))) {
      html += `<label class="title-1-xs sidebar-gap" for="order-for">Order for:</label>
      <div class="custom-input-dropdown" onclick="customHomepage.openStoreSelect()">
        <p role="label" id="selected-account">${x}</p>
        <ul class="dropdown-content-fit" id="select-menu" role="select">
        <li class="active-dropdown-item" onclick="customHomepage.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); customHomepage.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>
        </ul>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                d="M5.80032148,9.28674354 L11.2542824,13.2027583 C11.6661309,13.585083 12.3338691,13.585083 12.7457176,13.2027583 L18.1996785,9.28674354 C18.611527,8.90441882 19.2792652,8.90441882 19.6911137,9.28674354 C20.1029621,9.66906826 20.1029621,10.2889391 19.6911137,10.6712638 L13.4914351,16.4265129 C12.6677383,17.1911624 11.3322617,17.1911624 10.5085649,16.4265129 L4.30888633,10.6712638 C3.89703789,10.2889391 3.89703789,9.66906826 4.30888633,9.28674354 C4.72073478,8.90441882 5.38847303,8.90441882 5.80032148,9.28674354 Z" />
        </svg>
      </div>`;
      ddElement.innerHTML = html;
      customHomepage.setSessionStorage("accountUUID", element.UUID);
    } else
      html += `<label class="title-1-xs sidebar-gap" for="order-for">Order for:</label>
      <div class="custom-input-dropdown" onclick="customHomepage.openStoreSelect()">
        <p role="label" id="selected-account">Select a store</p>
        <ul class="dropdown-content-fit" id="select-menu" role="select">
          <li onclick="customHomepage.setActiveDropdown('${element.UUID}','${element.Name}(${element.ExternalID})'); customHomepage.findTransactionForSelectedAccount('${element.UUID}')" id="${element.UUID}">${element.Name}(${element.ExternalID})</li>  
        </ul>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                d="M5.80032148,9.28674354 L11.2542824,13.2027583 C11.6661309,13.585083 12.3338691,13.585083 12.7457176,13.2027583 L18.1996785,9.28674354 C18.611527,8.90441882 19.2792652,8.90441882 19.6911137,9.28674354 C20.1029621,9.66906826 20.1029621,10.2889391 19.6911137,10.6712638 L13.4914351,16.4265129 C12.6677383,17.1911624 11.3322617,17.1911624 10.5085649,16.4265129 L4.30888633,10.6712638 C3.89703789,10.2889391 3.89703789,9.66906826 4.30888633,9.28674354 C4.72073478,8.90441882 5.38847303,8.90441882 5.80032148,9.28674354 Z" />
        </svg>
      </div>
          `;
  });
  ddElement.innerHTML = html;

  if (!customHomepage.getSessionStorage("accountUUID") || customHomepage.getSessionStorage("accountUUID") == '')
    customHomepage.setActiveDropdown(customHomepage.accounts[0].UUID, customHomepage.accounts[0].Name)
  //customHomepage.findTransactionForSelectedAccount(customHomepage.getSessionStorage("accountUUID"),callback);
  var value = '(customHomepage.getSessionStorage("accountUUID"))'
  var cb = eval("(" + callback + value + ")");
  document.getElementById("store-selector-hr").classList.add("sidebar-gap");
};