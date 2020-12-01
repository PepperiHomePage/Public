if (!customFunction)
    var customFunction = {}
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
    var name = eval("(" + nameOfMainJs + ")")  
    var deepLink = item.deepLink.replace(/\"/g, '%22');
    switch (item.action) {
      case 'navigation':
        return `customFunction.navigation('${deepLink}')`;
      case 'setUUIDandNav':
        return `customFunction.setUUIDandNav('${item.catalog}','${item.transaction}','${deepLink}', '${nameOfMainJs}')`;
      case 'openInNewTab':
        return `name.openInNewTab('${deepLink}')`;
      case 'createNewActivity':
        return `customFunction.createNewActivity('${item.activity}','${deepLink}', 'customHeader')`;
      case 'createNewTransaction':
        return `name.createNewOrder('${item.catalog}','${item.transaction}','${deepLink}',true)`;
      case 'zendesk':
        return `location.href = 'javascript:$zopim.livechat.window.show()'`
    }
  }
   .navigation = function (path) {
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
    window.location.href = path;
  };
  
  customFunction.setUUIDandNav = function (in_catalog = null, in_transactionName = null, deepLink = null, nameOfMainJs) {
    var name = eval("(" + nameOfMainJs + ")")  
    const uuid = customHomepage.getSessionStorage('LastOpenTransactionUUID');
    if (uuid && uuid !== "undefined") {
      deepLink = deepLink.replace('{{UUID}}', uuid.replace(/-/g, ''));
      customFunction.navigation(deepLink);
    } else {
        name.createNewOrder(in_catalog, in_transactionName, deepLink);
    }
  };