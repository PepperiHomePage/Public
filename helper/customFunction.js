if (!customFunction)
    var customFunction = {}
customFunction.transactionName = Transaction
customFunction.catalogName = Catalog
customFunction.getCatalogs = function (x) {
    console.log(x)
    pepperi.api.catalogs.search({
        fields: ["UUID", "ExternalID", "Description", "ID"],
        responseCallback: "customFunction.getCatalogsCallback",
        requestID: x        
    });
}
customFunction.getCatalogsCallback = function (res) {
    console.log("get catalog res", res);
    (res && res.objects && res.objects.length) ? customFunction.catalogs = res.objects: false;
    var fun = eval("(" + res.requestID + ")");
    fun.buildHTML();
}

customFunction.createNewActivity = function (in_transactionName, deeplink, customName) {
    var evalCustomName = eval("(" + customName + ")")
    var bridgeObject = {
      references: {
        account: {
          UUID: evalCustomName.accountUUID,
        },
      },
      type: {
        Name: !in_transactionName ? evalCustomName.transactionName : in_transactionName,
      },
  
      responseCallback: "customFunction.createNewActivityCallback",
      requestID: {deeplink, customName},
    };
  
    pepperi.app.activities.add(bridgeObject);
  };
  customFunction.createNewActivityCallback = function (res) {
    console.log(res);  
    if (res && res.success) {
      var uuid = res.id;
  
      if (res.requestID) {
        var requestID = res.requestID.replace(
          "{{UUID}}",
          uuid.replace(/-/g, "")
        );
        customFunction.navigation(requestID);
      }
    }
  };
  customFunction.handleAction = function (item, nameOfMainJs) {
    var deepLink = item.deepLink.replace(/\"/g, '%22');
    switch (item.action) {
      case 'navigation':
        return `customFunction.navigation('${deepLink}')`;
      case 'setUUIDandNav':
        return `customFunction.setUUIDandNav('${item.catalog}','${item.transaction}','${deepLink}', '${nameOfMainJs}')`;
      case 'openInNewTab':
        return `customFunction.openInNewTab('${deepLink}')`;
      case 'createNewActivity':
        return `customFunction.createNewActivity('${item.activity}','${deepLink}', '${nameOfMainJs}')`;
      case 'createNewTransaction':
        return `customFunction.createNewOrder('${item.catalog}','${item.transaction}','${deepLink}',true, '${nameOfMainJs}')`;
      case 'zendesk':
        return `location.href = 'javascript:$zopim.livechat.window.show()'`
    }
  }
  customFunction.navigation = function (path) {
    customFunction.closeAllMenusListener();
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
  
  customFunction.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null, nameOfMainJs) {
    customFunction.closeAllMenusListener();
    var name = eval("(" + nameOfMainJs + ")")  
    const uuid = name.getSessionStorage('LastOpenTransactionUUID');
    console.log("uuid --->",uuid);
    if (uuid && uuid !== "undefined") {
      deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customFunction.navigation(deepLink);
    } else {
      customFunction.createNewOrder(in_catalog, in_transactionName, deepLink, false ,nameOfMainJs);
    }
  };

  customFunction.openInNewTab = function (url) {
    var win = window.open(url, '_blank');
    win.focus();
  };

  customFunction.createNewOrder = function (inCatalog = null, in_transactionName = null, deepLink = null, skipSessionSaving,nameOfMainJs) {
    var name = eval("(" + nameOfMainJs + ")") 
    let catalogUUID = !inCatalog ? customFunction.catalogs.find((el) => el.ExternalID === name.catalogName).UUID : customFunction.catalogs.find((el) => el.ExternalID === inCatalog).UUID
    var bridgeObject = {
      references: {
        account: {
          UUID: name.accountUUID
        },
        catalog: {
          UUID: catalogUUID
        }
      },
      type: {
        Name: !in_transactionName ? name.transactionName : in_transactionName
      },
      responseCallback: skipSessionSaving ? "customFunction.createNewOrderCallback" : "customFunction.createNewOrderAndNavCallback",
      requestID: deepLink
    };
    pepperi.app.transactions.add(bridgeObject);
  };

  customFunction.createNewOrderAndNavCallback = function (res) {
    console.log('createNewOrderAndNavCallback res', res);
    if (res && res.success) {
      customFunction.setSessionStorage('LastOpenTransactionUUID', res.id);
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        customFunction.navigation(requestID);
      }
    }
  };
  customFunction.createNewOrderCallback = function (res) {
    console.log('createNewOrderCallback res', res);
    if (res && res.success) {
      let uuid = res.id;
      if (res.requestID) {
        var requestID = res.requestID.replace('{{UUID}}', uuid.replace(/-/g, ''));
        customFunction.navigation(requestID);
      }
    }
  };

  customFunction.setSessionStorage = function (paramName, data) {
    sessionStorage.setItem(paramName, data);
  };

  customFunction.closeAllMenusListener = function () {
    $('#select-menu').attr('tabindex', '-1');
    $('#select-menu').on('focusout', function () {
      $('#select-menu').removeClass('show');
    });

    $('#menuDropdown').attr('tabindex', '-1');
    $('#linksDropdown').attr('tabindex', '-1');
    $('#myDropdown').attr('tabindex', '-1');
  
    $('#menuDropdown').on('focusout', function () {
      $('#menuDropdown').removeClass('show');
    });
  
    $('#linksDropdown').on('focusout', function () {
      $('#linksDropdown').removeClass('show');
    });
  
    $('#myDropdown').on('focusout', function () {
      $('#myDropdown').removeClass('show');
    });
  };
  customFunction.openCloseMenu = function () {
    const over = document.getElementById("overlay");
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